import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Navigate, Routes } from 'react-router-dom'
import AuthProvider, { useAuthContext } from './context/AuthContext'

import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'
import Configuracoes from './pages/Configuracoes'
import UsuariosListagem from './pages/UsuariosListagem'
import UsuariosEditar from './pages/UsuariosListagem/UsuariosEditar'
import UsuariosCadastrar from './pages/UsuariosListagem/UsuariosCadastrar'
import ResetPassword from './pages/ResetPassword'
import AgendarConsulta from './pages/Consultas/AgendarConsulta'
import MinhasConsultas from './pages/Consultas/MinhasConsultas'
import RecoverAccount from './pages/RecoverAccount'
import ConsultasListagem from './pages/UsuariosListagem/ConsultasListagem'
import EditarConsulta from './pages/UsuariosListagem/ConsultasListagem/EditarConsulta'
import AdicionarConsulta from './pages/UsuariosListagem/ConsultasListagem/AdicionarConsulta'

export default function AppRoutes() {
    const Private = ({children}) => {
        const { authenticated, loading } = useAuthContext()

        if (loading) {
            return <div>Carregando...</div>
        }
        
        if(!authenticated) {
            return <Navigate to="/"/>
        }

        return children
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/' exact element={<Login />} />
                    <Route path='/cadastro' exact element={<Cadastro/>} />
                    <Route path='/recuperar-senha' exact element={<RecoverAccount/>} />
                    <Route path='/usuario/redefinir_senha/:token' exact element={<ResetPassword/>} />
                    {/* <Route path='/login' exact element={Login} /> Mesma página que a rota raiz */}
                    <Route path='/inicio' exact element={<Private><Dashboard /></Private>} /> 
                    <Route path='/perfil' exact element={<Private><Perfil/></Private>} />
                    <Route path='/config' exact element={<Private><Configuracoes/></Private>} />
                    <Route path='/admin' exact element={<Private><UsuariosListagem/></Private>} /> 
                    <Route path='/usuario/editar/:id' exact element={<Private><UsuariosEditar/></Private>} /> {/* Falta resolver o problema do value={xxx} */}
                    {/* <Route path='/usuario/:id' exact element={UsuariosEditar} /> Mesma página que a rota usuario/editar/:id */}
                    <Route path='/consulta/agendar' exact element={<Private><AgendarConsulta/></Private>} />
                    <Route path='/consultas' exact element={<Private><MinhasConsultas/></Private>} />
                    <Route path='/consulta/editar/:id' exact element={<Private><EditarConsulta/></Private>} />
                    <Route path='/consulta/adicionar' exact element={<Private><AdicionarConsulta/></Private>} />
                    <Route path='/usuario/consultas/:id' exact element={<Private><ConsultasListagem/></Private>} />
                    <Route path='/usuario/cadastrar' exact element={<Private><UsuariosCadastrar/></Private>} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}
