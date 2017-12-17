import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import Layout from '../components/layout/Layout'
import { addAccount, addTransaction } from '../reducers/accounts/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AccountForm from '../components/forms/AccountForm'
import TransactionForm from '../components/forms/TransactionForm'

class Cadastro extends Component {
  render() {
    return (
      <Layout router={this.props.history} icon='dollar' header='Cadastro' subheader='Cadastro de contas e transações'>
        <Grid columns={16} stackable padded='vertically'>
          <Grid.Row>
            <Grid.Column width={16} stretched>
              <AccountForm add={this.props.addAccount}/>
              <TransactionForm accounts={this.props.accounts} add={this.props.addTransaction}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

Cadastro.propTypes = {
  addAccount: PropTypes.func.isRequired,
  addTransaction: PropTypes.func.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      date: PropTypes.number.isRequired
    }))
  }))
}

const mapStateToProps = state => ({
  accounts: state.accounts
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addAccount,
  addTransaction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cadastro))
