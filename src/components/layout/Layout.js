import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Grid, Icon, Header } from 'semantic-ui-react'
import Navbar from './Navbar'

class Layout extends Component {
  render() {
    return (
      <Container>
        <Navbar router={this.props.router}/>

        <Grid columns={16} stackable padded='vertically'>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as='h2' color='teal'>
                <Icon name={this.props.icon} />
                <Header.Content>
                  {this.props.header}
                  <Header.Subheader>
                    {this.props.subheader}
                  </Header.Subheader>
                </Header.Content>
              </Header>

              {this.props.children}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

Layout.propTypes = {
  router: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Layout
