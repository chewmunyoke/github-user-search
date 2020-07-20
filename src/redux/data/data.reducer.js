import DATA_ACTION_TYPES from './data.types'

const INITIAL_STATE = {
  users: null,
  links: null,
  user: null,
  isFetching: false,
  isShowScrollToTop: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DATA_ACTION_TYPES.FETCH_USERS_START:
      return {
        ...state,
        isFetching: true
      }
    case DATA_ACTION_TYPES.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        links: action.payload.links,
        user: null,
        isFetching: false
      }
    case DATA_ACTION_TYPES.FETCH_USERS_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case DATA_ACTION_TYPES.FETCH_USER_START:
      return {
        ...state,
        isFetching: true
      }
    case DATA_ACTION_TYPES.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false
      }
    case DATA_ACTION_TYPES.FETCH_USER_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case DATA_ACTION_TYPES.SET_SHOW_SCROLL_TO_TOP:
      return {
        ...state,
        isShowScrollToTop: action.payload
      }
    case DATA_ACTION_TYPES.CLEAR_DATA:
      return INITIAL_STATE
    default:
      return state
  }
}
