import React from 'react'
import { 
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Perfil from '../pages/Perfil'
import Configuracoes from '../pages/Configuracoes'
import UsuariosListagem from '../pages/UsuariosListagem'
import UsuariosEditar from '../pages/UsuariosListagem/UsuariosEditar'
import UsuariosCadastrar from '../pages/UsuariosListagem/UsuariosCadastrar'
import AgendarConsulta from '../pages/Consultas/AgendarConsulta'
import MinhasConsultas from '../pages/Consultas/MinhasConsultas'
import ConsultasListagem from '../pages/UsuariosListagem/ConsultasListagem'
import EditarConsulta from '../pages/UsuariosListagem/ConsultasListagem/EditarConsulta'
import AdicionarConsulta from '../pages/UsuariosListagem/ConsultasListagem/AdicionarConsulta'

export default function AuthRoutes() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/perfil' exact element={<Perfil/>} />
                <Route path='/config' exact element={<Configuracoes/>} />
                <Route path='/admin' exact element={<UsuariosListagem/>} /> 
                <Route path='/usuario/editar/:id' exact element={<UsuariosEditar/>} />
                <Route path='/agendar' exact element={<AgendarConsulta/>} />
                <Route path='/consultas' exact element={<MinhasConsultas/>} />
                <Route path='/consulta/editar/:id' exact element={<EditarConsulta/>} />
                <Route path='/consulta/adicionar' exact element={<AdicionarConsulta/>} />
                <Route path='/admin/usuario/consultas/:id' exact element={<ConsultasListagem/>} />
                <Route path='/usuario/cadastrar' exact element={<UsuariosCadastrar/>} />
            </Routes>
        </Router>
    )
}
