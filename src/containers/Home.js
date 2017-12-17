import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Accordion, Icon, List, Divider } from 'semantic-ui-react'
import Layout from '../components/layout/Layout'
import FiltersForm from '../components/forms/FiltersForm'

export const TRANSACTION_TYPES = { debit: 'Débito', credit: 'Crédito' }

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: null
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({activeIndex: newIndex})
  }

  renderAccount = (account, index) => {
    const { activeIndex } = this.state

    return (
      <div key={index}>
        <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
          <Icon name='dropdown'/>
          {account.name}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          <p>Saldo: R${account.balance}</p>
          {
            account.transactions.map((transaction, index) => {
              return this.renderTransaction(transaction, index)
            })
          }
        </Accordion.Content>

      </div>

    )
  }

  renderTransaction = (transaction, index) => {
    const { activeIndex } = this.state

    return (
      <List.Item key={index} active={activeIndex === index}>
        <List.Content>
          <List.Header>{TRANSACTION_TYPES[transaction.type]} no valor de R${transaction.value} no dia {transaction.date}</List.Header>
        </List.Content>
      </List.Item>
    )
  }

  render() {
    return (
      <Layout router={this.props.history} icon='home' header='Home' subheader='Posição consolidada das contas'>
        <Grid columns={16} stackable padded='vertically'>
          <Grid.Row>
            <Grid.Column width={16}>
              <FiltersForm accounts={this.props.accounts} style={{marginTop: '20px'}}/>
            </Grid.Column>
          </Grid.Row>

          {this.props.accounts && this.props.accounts.length > 0 && (
            <Grid.Row>
              <Grid.Column width={16} stretched>
                <Divider style={{marginBottom: '30px'}}/>
                <Accordion>
                  {this.props.accounts.map((account, index) => this.renderAccount(account, index))}
                </Accordion>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  accounts: state.accounts
})

Home.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withRouter(Home))
