import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'
import UsuariosListagem from '../pages/UsuariosListagem'
import UsuariosCadastrar from '../pages/UsuariosListagem/UsuariosCadastrar'
import UsuariosEditar from '../pages/UsuariosListagem/UsuariosEditar'

export default function Routes() {
    return (
        <Router>
            <Route exact path='/' component={Login} />
            <Route path='/cadastro' exact component={Cadastro} />
            <Route path='/login' exact component={Login} />
            <Route path='/index' exact component={UsuariosListagem} />
            <Route path='/usuario/cadastrar' exact component={UsuariosCadastrar} />
            <Route path='/usuario/editar/:id' exact component={UsuariosEditar} />
            <Route path='/usuario/:id' exact component={UsuariosEditar} />
        </Router>
    );
}
