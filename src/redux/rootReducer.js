import { combineReducers } from 'redux'

import data from './data/data.reducer'
import toast from './toast/toast.reducer'

export default combineReducers({
  data,
  toast
})
