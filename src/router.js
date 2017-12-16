import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './containers/Home'
import Formulario from './containers/Formulario'

const router = (
  <BrowserRouter>
    <div>
      <Route path='/' exact component={Home} />
      <Route path='/formulario' exact component={Formulario} />
    </div>
  </BrowserRouter>
)

export default router
