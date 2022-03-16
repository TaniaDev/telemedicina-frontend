import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { useHistory, Link } from 'react-router-dom'
import {Box, Button } from '@mui/material'

import NavBar from '../../components/NavBar/NavBar'
import {Principal} from '../../styles/Dashboard'

function Dashboard() {
    let history = useHistory();
    const [tipo, setTipo] = useState("")

    useEffect(() => {
        verificaLogado()
        getType()
    },[])

    function verificaLogado(){
        if(localStorage.getItem('token') == null){
            history.push('/');
        }
    }

    function logout(){
        localStorage.removeItem("token")
        verificaLogado()
    }

    async function getType(){
        const result = await api.get('/usuario/getType')
        setTipo(result.data.tipo)
    }

    function agendarConsulta(){
        history.push('/consulta/agendar')
    }

    function minhasConsultas(){
        history.push('/consultas')
    }

    function configuracoes(){
        history.push('/config')
    }



    return (
        <>
            <NavBar user={tipo} exit={logout}/>
            {/* <Box sx={{marginX: 10}}>
                <Button variant="contained" size="large" color="primary" sx={{margin: 1}}><h1>primary</h1></Button>
                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}}><h1>secondary</h1></Button>
                <Button variant="contained" size="large" color="success" sx={{margin: 1}}><h1>success</h1></Button>
                <Button variant="contained" size="large" color="error" sx={{margin: 1}}><h1>error</h1></Button>
                <Button variant="contained" size="large" color="info" sx={{margin: 1}}><h1>info</h1></Button>
                <Button variant="contained" size="large" color="warning" sx={{margin: 1}}><h1>warning</h1></Button>
            </Box>
            <hr/> */}
            <h1>TIPO DO USUARIO LOGADO: {tipo}</h1>
            <br/><hr/><br/>

            <h2>USUÁRIO</h2>
                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}} onClick={logout}><h2>Logout</h2></Button>
                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}} onClick={configuracoes}><h2>Configurações</h2></Button>
                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}}><h2>Realizar Consulta (Video Chamada)</h2></Button>
                <Button variant="contained" size="large" color="secondary" sx={{margin: 1}}><h2>CONSULTAS</h2></Button>

            {tipo === 'Paciente' && 
                <>
                    <h2>PACIENTE</h2>
                    <Button variant="contained" size="large" color="success" sx={{margin: 1}} onClick={agendarConsulta}><h2>Agendar Consulta</h2></Button>
                    <Button variant="contained" size="large" color="success" sx={{margin: 1}} onClick={minhasConsultas}><h2>Minhas Consultas</h2></Button>
                </>                    
            }

            {tipo === 'Medico' && 
                <>
                    <h2>MÉDICO</h2>
                    <Button variant="contained" size="large" color="warning" sx={{margin: 1}}><h2>Definir disponibilidade (horário)</h2></Button>
                </>   
            }
        </>
    )
}

export default Dashboard