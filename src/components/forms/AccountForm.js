import React, { Component } from 'react'
import { Form, Input, Label, Button } from 'semantic-ui-react'

const initialState = { name: '', balance: '', transactions: [] }

class AccountForm extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
  }

  handleInputChange = event => {
    event.preventDefault()
    let newState = {...this.state}
    const property = event.target.name
    const value = event.target.value

    newState[property] = value
    this.setState(newState)
  }

  isValidAccount = () => {
    if (this.state.name === '' || this.state.name === undefined || this.state.name === null) return false
    if (this.state.balance === '' || this.state.balance === undefined || this.state.balance === null) return false

    return true
  }

  handleSubmit = (event, data) => {
    if (!this.isValidAccount()) {
      alert('Não foi possível criar a conta! Por favor, preencha todos os campos obrigatórios.')
      return false
    }

    this.props.add(this.state)
    this.setState(initialState)
    alert('Conta criada com sucesso!')
  }

  render () {
    return (
      <div>
        <Label as='a' color='teal' ribbon>Adicione uma nova conta:</Label>
        <Form style={{marginTop: '20px'}}>
          <Form.Group>
            <Form.Field required width={12}>
              <label>Nome</label>
              <Input name='name' value={this.state.name} onChange={this.handleInputChange} placeholder='Nome da conta' />
            </Form.Field>
            <Form.Field required width={4}>
              <label>Saldo (R$)</label>
              <Input name='balance' type='number' value={this.state.balance} onChange={this.handleInputChange} placeholder='1234,56' />
            </Form.Field>
          </Form.Group>
          <Button color='teal' onClick={this.handleSubmit}>Adicionar</Button>
        </Form>
      </div>
    )
  }
}

export default AccountForm
