import React from 'react'
import { Route } from 'react-router-dom'
import Home from './containers/Home'
import Formulario from './containers/Formulario'

const router = (
  <div>
    <Route path='/' exact component={Home} />
    <Route path='/formulario' exact component={Formulario} />
  </div>
)

export default router
