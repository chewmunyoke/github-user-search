import DATA_ACTION_TYPES from './data.types'

export const fetchUsersStart = params => ({
  type: DATA_ACTION_TYPES.FETCH_USERS_START,
  payload: params
})

export const fetchUsersSuccess = (users, links) => ({
  type: DATA_ACTION_TYPES.FETCH_USERS_SUCCESS,
  payload: { users, links }
})

export const fetchUsersFailure = () => ({
  type: DATA_ACTION_TYPES.FETCH_USERS_FAILURE
})

export const fetchUserStart = username => ({
  type: DATA_ACTION_TYPES.FETCH_USER_START,
  payload: username
})

export const fetchUserSuccess = users => ({
  type: DATA_ACTION_TYPES.FETCH_USER_SUCCESS,
  payload: users
})

export const fetchUserFailure = () => ({
  type: DATA_ACTION_TYPES.FETCH_USER_FAILURE
})

export const setIsShowScrollToTop = isShowScrollToTop => ({
  type: DATA_ACTION_TYPES.SET_SHOW_SCROLL_TO_TOP,
  payload: isShowScrollToTop
})

export const clearData = () => ({
  type: DATA_ACTION_TYPES.CLEAR_DATA
})
