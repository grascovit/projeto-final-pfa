import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import Layout from '../components/layout/Layout'
import { addAccount, addTransaction } from '../reducers/accounts/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Cadastro extends Component {
  render() {
    return (
      <Layout router={this.props.history} icon='dollar' header='Cadastro' subheader='Cadastro de transações'>
        <Grid columns={16} stackable padded='vertically'>
          <Grid.Row>
            <Grid.Column width={16} stretched>
              Cadastro
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

Cadastro.contextTypes = {
  router: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  accounts: state.accounts
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addAccount,
  addTransaction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cadastro))
