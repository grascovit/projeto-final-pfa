import React, { Component } from 'react'
import { Form, Input, Select, Label, Button } from 'semantic-ui-react'
import TransactionType from '../../enums/TransactionType'

class TransactionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accountIndex: '',
      accountName: '',
      transaction: {
        type: '',
        value: ''
      }
    }
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
    let transaction = {...this.state.transaction}
    let accountName = this.props.accounts.find(element => {
      return element.name === data.value
    }).name
    let accountIndex = this.props.accounts.findIndex(element => {
      return element.name === data.value
    })

    this.setState({accountName, accountIndex})
  }

  handleSubmit = (event, data) => {
    event.preventDefault()

    this.props.add(this.state.accountIndex, this.state.transaction)
    this.setState({
      accountName: '',
      accountIndex: '',
      transaction: {
        type: '',
        value: ''
      }
    })
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
      <div>
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
          <Form.Field required>
            <label>Conta</label>
            <Select name='account' value={this.state.accountName} onChange={this.handleAccountChange} placeholder='Conta' options={this.accountOptions()} />
          </Form.Field>
          <Button color='teal' onClick={this.handleSubmit}>Adicionar</Button>
        </Form>
      </div>
    )
  }
}

export default TransactionForm