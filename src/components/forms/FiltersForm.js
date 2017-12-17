import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Label, Button } from 'semantic-ui-react'

const initialState = {
  accountName: '',
  filters: {
    account: {},
    value: '',
    startDate: '',
    endDate: ''
  }
}

class FiltersForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleInputChange = (event) => {
    let filters = {...this.state.filters}
    const property = event.target.name
    const value = event.target.value

    filters[property] = value

    this.setState({filters})
    this.props.addFilters(filters)
  }

  handleAccountChange = (event, data) => {
    let filters = {...this.state.filters}
    let account = this.props.accounts.find(element => {
      return element.name === data.value
    })
    let accountName = account.name

    filters['account'] = account

    this.setState({filters, accountName})
    this.props.addFilters(filters)
  }

  handleCleanFiltersClick = (event, data) => {
    this.setState(initialState, this.props.addFilters({}))
  }

  accountOptions = () => {
    return this.props.accounts.map(account => {
      return {
        value: account.name,
        text: account.name
      }
    })
  }

  render() {
    return (
      <Form style={{marginTop: '20px'}}>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Filtro por conta</label>
            <Select name='account' value={this.state.accountName} onChange={this.handleAccountChange} placeholder='Filtrar por conta' options={this.accountOptions()} />
          </Form.Field>
          <Form.Field>
            <label>Filtro por valor</label>
            <Input name='value' value={this.state.filters.value} onChange={this.handleInputChange} placeholder='Filtrar por valor da transação' />
          </Form.Field>
          <Form.Field>
            <label>Data inicial</label>
            <Input name='startDate' type='date' value={this.state.filters.startDate} onChange={this.handleInputChange} placeholder='Data inicial' />
          </Form.Field>
          <Form.Field>
            <label>Data final</label>
            <Input name='endDate' type='date' value={this.state.filters.endDate} onChange={this.handleInputChange} placeholder='Data final' />
          </Form.Field>
        </Form.Group>
        <Button color='teal' onClick={this.handleCleanFiltersClick}>Limpar filtros</Button>
      </Form>
    )
  }
}

FiltersForm.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      date: PropTypes.string.isRequired
    }))
  })),
  addFilters: PropTypes.func.isRequired
}

export default FiltersForm