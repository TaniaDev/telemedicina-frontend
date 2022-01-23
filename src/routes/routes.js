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
            <Route path='/' exact component={Login} />
            <Route path='/cadastro' component={Cadastro} />
            {/* <Route path='/login' component={Login} /> Mesma página que a rota raiz */}
            <Route path='/index' component={UsuariosListagem} /> 
            <Route path='/usuario/cadastrar' component={UsuariosCadastrar} />
            <Route path='/usuario/editar/:id' component={UsuariosEditar} /> {/* Falta resolver o problema do value={xxx} */}
            {/* <Route path='/usuario/:id' component={UsuariosEditar} /> Mesma página que a rota usuario/editar/:id */}
        </Router>
    );
}
