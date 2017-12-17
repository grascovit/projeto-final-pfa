export const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ACCOUNT':
      return [
        ...state,
        action.account
      ]

    case 'ADD_TRANSACTION':
      let newState = [...state]
      let account = newState[action.index]
      let balance = parseInt(account.balance)

      if (action.transaction.type === 'debit') {
        balance -= parseInt(action.transaction.value)
      } else {
        balance += parseInt(action.transaction.value)
      }

      account.balance = balance
      account.transactions.push(action.transaction)

      return newState

    default:
      return state
  }
}
