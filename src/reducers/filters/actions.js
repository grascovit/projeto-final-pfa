export const addFilters = filters => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FILTER',
      accounts: getState().accounts,
      filters
    })
  }
}
