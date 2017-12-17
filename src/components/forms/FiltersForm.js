import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Label, Button } from 'semantic-ui-react'

class FiltersForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accountIndex: '',
      accountName: '',
      value: '',
      startDate: '',
      endDate: ''
    }
  }

  handleInputChange = (event) => {
    const property = event.target.name
    const value = event.target.value

    this.setState({[property]: value})
  }

  handleAccountChange = (event, data) => {
    let accountName = this.props.accounts.find(element => {
      return element.name === data.value
    }).name
    let accountIndex = this.props.accounts.findIndex(element => {
      return element.name === data.value
    })

    this.setState({accountName, accountIndex})
  }

  accountOptions = () => {
    return this.props.accounts.map(account => {
      return {
        value: account.name,
        text: account.name
      }
    })
  }

  handleSubmit = (event, data) => {
    const { accounts } = this.props

    if (accounts.length === 0){
      alert('Ainda não existem contas ou transações cadastradas.')
      return false
    }

    this.props.addFilters(this.state)
  }

  render() {
    return (
      <div>
        <Label as='a' color='teal' ribbon>Filtros:</Label>
        <Form style={{marginTop: '20px'}}>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Filtro por conta</label>
              <Select name='account' value={this.state.account} onChange={this.handleAccountChange} placeholder='Filtrar por conta' options={this.accountOptions()} />
            </Form.Field>
            <Form.Field>
              <label>Filtro por valor</label>
              <Input name='value' value={this.state.value} onChange={this.handleInputChange} placeholder='Filtrar por valor da transação' />
            </Form.Field>
            <Form.Field>
              <label>Data inicial</label>
              <Input name='startDate' type='date' value={this.state.startDate} onChange={this.handleInputChange} placeholder='Data inicial' />
            </Form.Field>
            <Form.Field>
              <label>Data final</label>
              <Input name='endDate' type='date' value={this.state.endDate} onChange={this.handleInputChange} placeholder='Data final' />
            </Form.Field>
          </Form.Group>
          <Button color='teal' onClick={this.handleSubmit}>Aplicar filtros</Button>
        </Form>
      </div>
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