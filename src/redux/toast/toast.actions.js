import TOAST_ACTION_TYPES from './toast.types'

export const setToast = toast => ({
  type: TOAST_ACTION_TYPES.SET_TOAST,
  payload: toast
})

export const setInfoToast = message => ({
  type: TOAST_ACTION_TYPES.SET_INFO_TOAST,
  payload: message
})

export const setSuccessToast = message => ({
  type: TOAST_ACTION_TYPES.SET_SUCCESS_TOAST,
  payload: message
})

export const setWarningToast = message => ({
  type: TOAST_ACTION_TYPES.SET_WARNING_TOAST,
  payload: message
})

export const setErrorToast = message => ({
  type: TOAST_ACTION_TYPES.SET_ERROR_TOAST,
  payload: message
})

export const unsetToast = () => ({
  type: TOAST_ACTION_TYPES.UNSET_TOAST
})
