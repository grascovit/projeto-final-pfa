import React from 'react'
import { Route } from 'react-router-dom'
import Home from './containers/Home'
import Cadastro from './containers/Cadastro'

const router = (
  <div>
    <Route path='/' exact component={Home} />
    <Route path='/cadastro' exact component={Cadastro} />
  </div>
)

export default router
