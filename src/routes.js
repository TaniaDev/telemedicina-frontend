import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import history from './services/history'

import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'
import Configuracoes from './pages/Configuracoes'
import UsuariosListagem from './pages/UsuariosListagem'
import UsuariosEditar from './pages/UsuariosListagem/UsuariosEditar'
import Reset_Password from './pages/Reset_Password'
import AgendarConsulta from './pages/Consultas/AgendarConsulta'

export default function Routes() {
        
    return (
        <Router history={history}>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/cadastro' exact component={Cadastro} />
                {/* <Route path='/login' exact component={Login} /> Mesma página que a rota raiz */}
                <Route path='/inicio' exact component={Dashboard} /> 
                <Route path='/perfil' exact component={Perfil} />
                <Route path='/config' exact component={Configuracoes} />
                <Route path='/admin' exact component={UsuariosListagem} /> 
                <Route path='/usuario/editar/:id' exact component={UsuariosEditar} /> {/* Falta resolver o problema do value={xxx} */}
                {/* <Route path='/usuario/:id' exact component={UsuariosEditar} /> Mesma página que a rota usuario/editar/:id */}
                <Route path='/usuario/redefinir_senha/:token' exact component={Reset_Password} />

                <Route path='/consulta/agendar' exact component={AgendarConsulta} />
            </Switch>
        </Router>
    )
}
