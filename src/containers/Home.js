import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Layout from '../components/layout/Layout'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <Layout router={this.props.history} icon='home' header='Home' subheader='Posição consolidada das carteiras'>
        <Grid columns={16} stackable padded='vertically'>
          <Grid.Row>
            <Grid.Column width={16} stretched>
              Home
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
})

Home.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withRouter(Home))
