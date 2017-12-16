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
      newState[action.index].transactions.push(action.transaction)
      return newState

    default:
      return state
  }
}