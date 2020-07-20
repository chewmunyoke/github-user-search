import { createSelector } from 'reselect'

const selectData = state => state.data

export const selectUsers = createSelector(
  [selectData],
  data => data.users
)

export const selectLinks = createSelector(
  [selectData],
  data => data.links
)

export const selectUser = createSelector(
  [selectData],
  data => data.user
)

export const selectIsFetching = createSelector(
  [selectData],
  data => data.isFetching
)

export const selectIsShowScrollToTop = createSelector(
  [selectData],
  data => data.isShowScrollToTop
)
