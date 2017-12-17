import { each } from 'lodash/each'

export const initialState = {
  activeFilters: {},
  filteredAccounts: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      let newState = {...state}
      let filteredAccounts = action.accounts

      if (action.filters.account && Object.keys(action.filters.account).length) {
        filteredAccounts = filteredAccounts.filter(element => {
          return element === action.filters.account
        })
      }

      if (action.filters.value) {
        filteredAccounts = filteredAccounts.filter(element => {
          return element.transactions.some(transaction => {
            return parseFloat(transaction.value) === parseFloat(action.filters.value)
          })
        })
      }

      if (action.filters.startDate || action.filters.endDate) {
        filteredAccounts = filteredAccounts.filter(element => {
          return element.transactions.some(transaction => {
            const date = new Date(transaction.date)
            const startDate = action.filters.startDate ? new Date(action.filters.startDate) : undefined
            const endDate = action.filters.endDate ? new Date(action.filters.endDate) : undefined

            if (startDate && endDate) {
              return date >= startDate && date <= endDate
            } else if (startDate && !endDate) {
              return date >= startDate
            } else if (!startDate && endDate) {
              return date <= endDate
            }          
          })
        })
      }

      return {
        ...state,
        activeFilters: action.filters,
        filteredAccounts: filteredAccounts
      }

    default:
      return state
  }
}
