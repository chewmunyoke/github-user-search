import { all, call, takeLatest, put, select } from 'redux-saga/effects'
import axios from 'axios'
import parseLinkHeader from 'parse-link-header'

import {
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserSuccess,
  fetchUserFailure
} from './data.actions'
import DATA_ACTION_TYPES from './data.types'
import { setErrorToast } from '../toast/toast.actions'
import CONSTANTS from '../../config/constants'
import DEFAULT_PARAMS from '../../config/defaultParams'

const getPagination = (total, pageTotal, page, perPage) => {
  if (pageTotal > 0) {
    const isMoreThan1000 = total > 1000
    const firstPage = 1
    const lastPage = Math.ceil((isMoreThan1000 ? 1000 : total) / perPage)
    const firstInPage = ((page - 1) * perPage) + 1
    const lastInPage = firstInPage + pageTotal - 1
    const label = `Showing ${firstPage} - ${lastInPage} out of ${isMoreThan1000 ? 'the first 1000' : total} result${total > 1 ? 's' : ''}`
    return {
      firstPage,
      lastPage,
      label
    }
  } else {
    return {
      label: 'No results found'
    }
  }
}

// #3
function * fetchUsers({ payload: params }) {
  const users = yield select(state => state.data.users)
  try {
    const newParams = {
      ...DEFAULT_PARAMS.SEARCH,
      ...params
    }
    const response = yield axios({
      method: 'get',
      baseURL: CONSTANTS.API_URL,
      url: CONSTANTS.API_SEARCH_USERS,
      params: newParams
    })
    let newUsers = {}
    let links = {}
    if (response.headers && response.headers.link) {
      links = parseLinkHeader(response.headers.link)
    }
    if (response.data) {
      let newItems = response.data.items
      if (newParams.page > 1) {
        newItems = [...users.items, ...response.data.items]
      }
      newUsers = {
        items: newItems,
        total: response.data.total_count,
        currentPage: newParams.page,
        perPage: newParams.per_page,
        q: newParams.q,
        ...getPagination(response.data.total_count, response.data.items.length, newParams.page, newParams.per_page)
      }
    } else {
      throw new Error('Invalid data format returned.')
    }
    yield put(fetchUsersSuccess(newUsers, links))
  } catch (error) {
    console.error(error)
    yield put(setErrorToast(error.message ? error.message : error))
    yield put(fetchUsersFailure(error.message ? error.message : error))
  }
}

function * fetchUser({ payload: username }) {
  try {
    const response = yield axios({
      method: 'get',
      baseURL: CONSTANTS.API_URL,
      url: `${CONSTANTS.API_USERS}/${username}`
    })
    if (response.data) {
      const user = Object.assign({}, response.data)
      if (user.repos_url) {
        const reposResponse = yield axios({
          method: 'get',
          url: user.repos_url
        })
        if (reposResponse.data) {
          user.reposItems = reposResponse.data
        }
      }
      if (user.followers_url) {
        const followersResponse = yield axios({
          method: 'get',
          url: user.followers_url
        })
        if (followersResponse.data) {
          user.followersItems = followersResponse.data
        }
      }
      if (user.following_url) {
        const followingResponse = yield axios({
          method: 'get',
          url: user.following_url.replace('{/other_user}', '')
        })
        if (followingResponse.data) {
          user.followingItems = followingResponse.data
        }
      }
      yield put(fetchUserSuccess(user))
    } else {
      throw new Error('Invalid data format returned.')
    }
  } catch (error) {
    console.error(error)
    yield put(setErrorToast(error.message ? error.message : error))
    yield put(fetchUserFailure(error.message ? error.message : error))
  }
}

// #2
function * onFetchUsersStart() {
  yield takeLatest(DATA_ACTION_TYPES.FETCH_USERS_START, fetchUsers)
}

function * onFetchUserStart() {
  yield takeLatest(DATA_ACTION_TYPES.FETCH_USER_START, fetchUser)
}

// #1
export function * dataSagas() {
  yield all([
    call(onFetchUsersStart),
    call(onFetchUserStart)
  ])
}
