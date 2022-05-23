import React, { useState, useEffect } from 'react'
import api from '../../../services/api'
import { 
    Box,
    Button,
    useTheme
} from '@mui/material'
import { Add, BorderColor, Delete, Event } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { ButtonTool, PaperStyled } from '../../../styles/UsuariosListagem'
import NavBar from '../../../components/NavBar'
import CardConsulta from '../../../components/CardConsulta'
import BaseLayout from '../../../layouts/BaseLayout'

function ConsultasListagem(){
    let navigate = useNavigate()
    let params = useParams()
    const theme = useTheme()
    const [consultas, setConsultas] = useState([])
    const [usuario, setUsuario] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadConsultas(){
            const response = await api.get(`/consulta/obter_admin/${params.id}`)
            setConsultas(response.data)
            setLoading(false)
        }
        loadConsultas()
        getUsuario()
    },[params.id])

    if (loading) {
        return <div>Carregando dados...</div>
    }

    async function getUsuario() {
        const res = await api.get(`/usuario/obter_admin/${params.id}`)
        setUsuario(res.data)
    }

    return (
        <>
            <NavBar>
                <BaseLayout title={ `Consultas agendadas para ${usuario.nome}`}>
                    {(usuario.tipo === 'Medico') && 
                        <Box
                            display='flex'
                            alignItems='center'
                            height={theme.spacing(5)}
                        >
                            {/*<TextField
                                size='small'
                                placeholder='Pesquisar...'
                            />*/}
                            <Box
                                flex={1}
                                display='flex'
                                justifyContent='end'
                                marginBottom={2}
                            >
                                <Button
                                    color='primary'
                                    variant='contained'
                                    disableElevation
                                    startIcon={<Add/>}
                                    onClick={() => navigate('/consulta/adicionar')}
                                >
                                    Adicionar Consultas
                                </Button>
                            </Box>
                        </Box>
                    }
                    
                    <div className="container">
                
                    {consultas.map(consulta => (
                        <CardConsulta
                            key={consulta.id}
                            id_consulta={consulta.id}
                            status={consulta.status}
                            id_especialidade={consulta.id_especialidade}
                            id_medico={consulta.id_medico}
                            id_paciente={consulta.id_paciente}
                            data={consulta.dt_hr_consulta}
                        />
                    ))}
                    </div>
                </BaseLayout>
            </NavBar>
        </>
    )
}

export default ConsultasListagem
