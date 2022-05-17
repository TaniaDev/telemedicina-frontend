import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Navigate, Routes } from 'react-router-dom'
import AuthProvider, { useAuthContext } from './context/AuthContext'

import Cadastro from './pages/Cadastro'
import Cadastro2 from './pages/Cadastro/Cadastro2'
import Cadastro3 from './pages/Cadastro/Cadastro3'
import Login from './pages/Login'
import Login2 from './pages/Login/Login'
import Dashboard from './pages/Dashboard'
import Perfil from './pages/Perfil'
import Configuracoes from './pages/Configuracoes'
import DisponibilidadeMedica from './pages/Configuracoes/DisponibilidadeMedica'
import UsuariosListagem from './pages/UsuariosListagem'
import CheckNewDoctors from './pages/CheckNewDoctors'
import UsuariosEditar from './pages/UsuariosListagem/UsuariosEditar'
import UsuariosCadastrar from './pages/UsuariosListagem/UsuariosCadastrar'
import ResetPassword from './pages/ResetPassword'
import AgendarConsulta from './pages/Consultas/AgendarConsulta'
import MinhasConsultas from './pages/Consultas/MinhasConsultas'
import RecoverAccount from './pages/RecoverAccount'
import ConsultasListagem from './pages/UsuariosListagem/ConsultasListagem'
import EditarConsulta from './pages/UsuariosListagem/ConsultasListagem/EditarConsulta'
import AdicionarConsulta from './pages/UsuariosListagem/ConsultasListagem/AdicionarConsulta'
import NotFoundPage from './pages/NotFoundPage'
import Agenda from './pages/Agenda'
import HistoricoConsultas from './pages/HistoricoConsultas'

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
    
    const Logged = ({children}) => {
        const { authenticated } = useAuthContext()

        if(authenticated) {
            return <Navigate to="/inicio"/>
        }
        return children
    }

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Views Refatoradas */}
                    <Route path='/login' exact element={<Login />} /> {/* View Antiga */}
                    <Route path='/' exact element={<Logged><Login2/></Logged>}/>

                    <Route path='/cadastroAntigo' exact element={<Cadastro/>} /> {/* View Antiga */}
                    <Route path='/cadastro1' exact element={<Logged><Cadastro2/></Logged>} />
                    <Route path='/cadastro' exact element={<Logged><Cadastro3/></Logged>} />
                    
                    <Route path='/recuperar-senha' exact element={<RecoverAccount/>} />
                    <Route path='/usuario/redefinir_senha/:token' exact element={<ResetPassword/>} />
                    {/* <Route path='/login' exact element={Login} /> Mesma página que a rota raiz */}
                    <Route path='/inicio' exact element={<Private><Dashboard /></Private>} /> 
                    <Route path='/perfil' exact element={<Private><Perfil/></Private>} />
                    <Route path='/config' exact element={<Private><Configuracoes/></Private>} />
                    <Route path='/config/disponibilidademedica' exact element={<Private><DisponibilidadeMedica/></Private>} />
                    <Route path='/admin' exact element={<Private><UsuariosListagem/></Private>} /> 
                    <Route path='/novos_medicos' exact element={<Private><CheckNewDoctors/></Private>} /> 
                    <Route path='/usuario/editar/:id' exact element={<Private><UsuariosEditar/></Private>} /> {/* Falta resolver o problema do value={xxx} */}
                    {/* <Route path='/usuario/:id' exact element={UsuariosEditar} /> Mesma página que a rota usuario/editar/:id */}
                    <Route path='/consulta/agendar' exact element={<Private><AgendarConsulta/></Private>} />
                    <Route path='/consultas' exact element={<Private><MinhasConsultas/></Private>} />
                    <Route path='/agenda' exact element={<Private><Agenda/></Private>} />
                    <Route path='/consulta/editar/:id' exact element={<Private><EditarConsulta/></Private>} />
                    <Route path='/consulta/adicionar' exact element={<Private><AdicionarConsulta/></Private>} />
                    <Route path='/usuario/consultas/:id' exact element={<Private><ConsultasListagem/></Private>} />
                    <Route path='/usuario/cadastrar' exact element={<Private><UsuariosCadastrar/></Private>} />
                    <Route path='/historico' exact element={<Private><HistoricoConsultas/></Private>} />
                    <Route path="*" element={<Private><NotFoundPage/></Private>} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}
