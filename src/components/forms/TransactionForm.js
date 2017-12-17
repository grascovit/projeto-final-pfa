import React, { Component } from 'react'
import { Form, Input, Select, Label, Button } from 'semantic-ui-react'
import TransactionType from '../../enums/TransactionType'

const initialState = {
  accountIndex: '',
  accountName: '',
  transaction: {
    type: '',
    value: '',
    date: ''
  }
}

class TransactionForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleInputChange = (event) => {
    let transaction = {...this.state.transaction}
    const property = event.target.name
    const value = event.target.value

    transaction[property] = value

    this.setState({transaction})
  }

  handleSelectChange = (event, data) => {
    let transaction = {...this.state.transaction}
    const property = data.name
    const value = data.value

    transaction[property] = value

    this.setState({transaction})
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

  isValidTransaction = () => {
    const { accountName, accountIndex, transaction } = this.state

    if (transaction.type === '' || transaction.type === undefined || transaction.type === null) return false
    if (transaction.value === '' || transaction.value === undefined || transaction.value === null) return false
    if (transaction.date === '' || transaction.date === undefined || transaction.date === null) return false
    if (accountName === '' || accountName === undefined || accountName === null) return false
    if (accountIndex === '' || accountIndex === undefined || accountIndex === null) return false

    return true
  }

  handleSubmit = (event, data) => {
    if (!this.isValidTransaction()) {
      alert('Não foi possível criar a transação! Por favor, preencha todos os campos obrigatórios.')
      return false
    }

    this.props.add(this.state.accountIndex, this.state.transaction)
    this.setState(initialState)
    alert('Transação criada com sucesso!')
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
      <div style={{marginTop: '30px'}}>
        <Label as='a' color='teal' ribbon>Adicione uma nova transação:</Label>
        <Form style={{marginTop: '20px'}}>
          <Form.Group widths='equal'>
            <Form.Field required>
              <label>Tipo</label>
              <Select name='type' value={this.state.transaction.type} onChange={this.handleSelectChange} placeholder='Tipo da transação' options={TransactionType.options()} />
            </Form.Field>
            <Form.Field>
              <label>Valor</label>
              <Input name='value' value={this.state.transaction.value} onChange={this.handleInputChange} placeholder='Valor (R$)' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field required>
              <label>Conta</label>
              <Select name='account' value={this.state.accountName} onChange={this.handleAccountChange} placeholder='Conta' options={this.accountOptions()} />
            </Form.Field>
            <Form.Field required>
              <label>Data da transação</label>
              <Input name='date' type='date' value={this.state.transaction.date} onChange={this.handleInputChange} placeholder='Data (dd/mm/yyyy)' />
            </Form.Field>
          </Form.Group>
          <Button color='teal' onClick={this.handleSubmit}>Adicionar</Button>
        </Form>
      </div>
    )
  }
}

export default TransactionForm