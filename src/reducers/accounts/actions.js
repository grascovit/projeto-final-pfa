export const addAccount = account => {
  return dispatch => {
    dispatch({
      type: 'ADD_ACCOUNT',
      account
    })
  }
}

export const addTransaction = (index, transaction) => {
  return dispatch => {
    dispatch({
      type: 'ADD_TRANSACTION',
      index,
      transaction
    })
  }
}
