import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Accordion, Icon, List, Divider, Label } from 'semantic-ui-react'
import Layout from '../components/layout/Layout'
import FiltersForm from '../components/forms/FiltersForm'
import { addFilters } from '../reducers/filters/actions'
import { bindActionCreators } from 'redux'

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
      <div key={index} style={{ marginBottom: '15px' }}>
        <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
          <Icon name='dropdown'/>
          <Label as='a' color='teal' pointing='left' basic style={{ padding: '10px 40px' }}>
            {account.name}
            <Label circular color='teal' floating>R${account.balance}</Label>
          </Label>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          {(account.transactions && account.transactions.length > 0) ? (
            <div>
              <p>Transações:</p><br/>

              <List relaxed>
                {account.transactions.map((transaction, index) => this.renderTransaction(transaction, index))}
              </List>
            </div>
          ) : (
            <p>Não existem transações cadastradas nesta conta.</p>
          )}
        </Accordion.Content>
      </div>
    )
  }

  renderTransaction = (transaction, index) => {
    const { activeIndex } = this.state
    const iconOptions = transaction.type === 'credit' ? { icon: 'add circle', color: 'green' } : { icon: 'minus circle', color: 'red' }

    return (
      <List.Item key={index} active={activeIndex === index}>
        <List.Icon name={iconOptions.icon} size='large' verticalAlign='middle' color={iconOptions.color} />
        <List.Content>
          <List.Header>{TRANSACTION_TYPES[transaction.type]} no valor de R${transaction.value}</List.Header>
          <List.Description>Em: {transaction.date}</List.Description>
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
              <FiltersForm accounts={this.props.accounts} style={{marginTop: '20px'}} addFilters={this.props.addFilters}/>
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

const mapDispatchToProps = dispatch => bindActionCreators({
  addFilters
}, dispatch)

Home.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))
