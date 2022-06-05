import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { Box, Button} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'
// import { Principal } from '../../styles/Dashboard'

function Dashboard() {
    const navigate = useNavigate()
    const [tipo, setTipo] = useState("")

    useEffect(() => {
        getType()
    }, [])

    async function getType(){
        const result = await api.get('/usuario/getType')
        setTipo(result.data.tipo)
    }

    function minhasConsultas(){
        navigate('/consultas')
    }

    function configuracoes(){
        navigate('/config')
    }

    return (
        <>
            <NavBar>
            {/* <Box sx={{marginX: 10}}>
                <Button variant="contained" size="large" color="primary" sx={{margin: 1}}><h1>primary</h1></Button>
                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}}><h1>secondary</h1></Button>
                <Button variant="contained" size="large" color="success" sx={{margin: 1}}><h1>success</h1></Button>
                <Button variant="contained" size="large" color="error" sx={{margin: 1}}><h1>error</h1></Button>
                <Button variant="contained" size="large" color="info" sx={{margin: 1}}><h1>info</h1></Button>
                <Button variant="contained" size="large" color="warning" sx={{margin: 1}}><h1>warning</h1></Button>
            </Box>
            <hr/> */}

                <BaseLayout title={`Página Inicial (${tipo})`}>
                    <div style={{marginTop: '100px', display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                        {tipo === 'Paciente' && 
                            <>
                                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}} style={{color: '#fff'}} onClick={() => navigate('/consulta/adicionar')}><h2>Nova Consulta</h2></Button>
                            </>             
                        }

                        {tipo === 'Medico' && 
                            <>
                                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}} style={{color: '#fff'}} onClick={() => navigate('/config/disponibilidademedica')}><h2>Definir Disponibilidade</h2></Button>
                            </> 
                        }

                        {(tipo === 'Paciente' || tipo === 'Medico')  && 
                            <>
                                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}} style={{color: '#fff'}} onClick={() => navigate('/consultas')}><h2>Consultas</h2></Button>
                                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}} style={{color: '#fff'}} onClick={() => navigate('/agenda')}><h2>Minha Agenda</h2></Button>
                                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}} style={{color: '#fff'}} onClick={() => navigate('/historico')}><h2>Historico de Consultas</h2></Button>
                            </>
                        }

                        {tipo === 'Admin' && 
                            <>
                                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}} style={{color: '#fff'}} onClick={() => navigate('/admin')}><h2>Gerenciar Usuários</h2></Button>
                                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}} style={{color: '#fff'}} onClick={() => navigate('/novos_medicos')}><h2>Novos Médicos</h2></Button>
                            </>  
                        }
                    </div>
                </BaseLayout>
            </NavBar>
        </>
    )
}

export default Dashboard