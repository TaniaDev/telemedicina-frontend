import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'
import Usuarios from '../pages/Usuarios'
import Listagem from '../pages/Listagem'

export default function Routes() {
    return (
        <Router>
            <Route exact path='/' component={Login} />
            <Route path='/cadastro' component={Cadastro} />
            <Route path='/login' component={Login} />
            <Route path='/usuarios' component={Listagem} />
        </Router>
    );
}
