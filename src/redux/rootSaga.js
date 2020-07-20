import { all, call } from 'redux-saga/effects'

import { dataSagas } from './data/data.sagas'

export default function * rootSaga() {
  yield all([
    call(dataSagas)
  ])
}
