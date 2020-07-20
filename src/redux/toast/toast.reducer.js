import TOAST_ACTION_TYPES from './toast.types'

const INITIAL_STATE = {
  type: 'info',
  message: null
}

const TOAST_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOAST_ACTION_TYPES.SET_TOAST:
      return action.payload
    case TOAST_ACTION_TYPES.SET_INFO_TOAST: {
      if (action.payload && state.message && !state.message.includes(action.payload)) {
        action.payload = `${state.message}\n${action.payload}`
      }
      return {
        type: TOAST_TYPES.INFO,
        message: action.payload
      }
    }
    case TOAST_ACTION_TYPES.SET_SUCCESS_TOAST: {
      if (action.payload && state.message && !state.message.includes(action.payload)) {
        action.payload = `${state.message}\n${action.payload}`
      }
      return {
        type: TOAST_TYPES.SUCCESS,
        message: action.payload
      }
    }
    case TOAST_ACTION_TYPES.SET_WARNING_TOAST: {
      if (action.payload && state.message && !state.message.includes(action.payload)) {
        action.payload = `${state.message}\n${action.payload}`
      }
      return {
        type: TOAST_TYPES.WARNING,
        message: action.payload
      }
    }
    case TOAST_ACTION_TYPES.SET_ERROR_TOAST: {
      if (action.payload && state.message && !state.message.includes(action.payload)) {
        action.payload = `${state.message}\n${action.payload}`
      }
      return {
        type: TOAST_TYPES.ERROR,
        message: action.payload
      }
    }
    case TOAST_ACTION_TYPES.UNSET_TOAST:
      return {
        ...state,
        message: null
      }
    default:
      return state
  }
}
