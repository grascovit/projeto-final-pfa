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
      let balance = parseFloat(account.balance)

      if (action.transaction.type === 'debit') {
        balance -= parseFloat(action.transaction.value)
      } else {
        balance += parseFloat(action.transaction.value)
      }

      account.balance = balance

      let transactions = [...account.transactions]
      transactions.push(action.transaction)
      account.transactions = transactions

      return newState

    default:
      return state
  }
}
