import { each } from 'lodash/each'

export const initialState = {
  activeFilters: {},
  filteredItems: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      let newState = {...state}

      // TODO: return something like { activeFilters: {accountName: 'Conta corrente'}, filteredItems: [...] }
      // TODO: action.accounts is available here, just filter it and return


      // each(action.filters, (filter, value) => {
      //
      // })

      return newState

    default:
      return state
  }
}
