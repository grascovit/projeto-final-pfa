import React, { Component } from 'react'
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

export default Layout
