import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Snackbar, IconButton, Alert} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'
// import { Principal } from '../../styles/Dashboard'

function Dashboard() {
    const navigate = useNavigate()
    const [tipo, setTipo] = useState("")
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        getType()
    }, [])

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

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

                <BaseLayout title="Página Inicial">
                    <h1>TIPO DO USUARIO LOGADO: {tipo}</h1>
                    <button onClick={(e) => alert('Clicou')}>ALERT</button>

                    <div>
                        <Button onClick={handleClick}>Open simple snackbar</Button>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            style={{width: '40%'}}
                        >
                            <Alert variant="filled" severity="error" onClose={handleClose} sx={{ width: '100%' }}>Alert Clicou!</Alert>
                        </Snackbar>
                    </div>
                    
                    <br/><hr/><br/>

                    <h2>USUÁRIO</h2>
                        <Button variant="contained" size="large" color="secondary" sx={{margin: 1}} onClick={configuracoes}><h2>Configurações</h2></Button>
                        <Button variant="contained" size="large" color="secondary" sx={{margin: 1}}><h2>Realizar Consulta (Video Chamada)</h2></Button>
                        <Button variant="contained" size="large" color="secondary" sx={{margin: 1}}><h2>CONSULTAS</h2></Button>

                    {tipo === 'Paciente' && 
                        <>
                            <h2>PACIENTE</h2>
                            <Button variant="contained" size="large" color="success" sx={{margin: 1}} onClick={() => navigate('/consulta/adicionar')}><h2>Agendar Consulta</h2></Button>
                            <Button variant="contained" size="large" color="success" sx={{margin: 1}} onClick={minhasConsultas}><h2>Minhas Consultas</h2></Button>
                        </>                    
                    }

                    {tipo === 'Medico' && 
                        <>
                            <h2>MÉDICO</h2>
                            <Button variant="contained" size="large" color="warning" sx={{margin: 1}} onClick={() => navigate('/config/disponibilidademedica')}><h2>Definir disponibilidade (horário)</h2></Button>
                        </>   
                    }
                </BaseLayout>
            </NavBar>
        </>
    )
}

export default Dashboard