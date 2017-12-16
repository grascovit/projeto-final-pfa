import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: ''
    }

    this.handleItemClick = this.handleItemClick.bind(this)
  }

  componentWillMount() {
    const pathName = this.props.router.location.pathname
    const name = pathName === '/' ? 'home' : 'formulario'
    this.setState({ activeItem: name })
  }

  handleItemClick(e, { name }){
    e.preventDefault()

    const { router } = this.props
    name === 'home' ? router.push('/') : router.push('/' + name)
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu pointing secondary>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name='formulario' active={activeItem === 'formulario'} onClick={this.handleItemClick} />
      </Menu>
    )
  }
}

export default Navbar
