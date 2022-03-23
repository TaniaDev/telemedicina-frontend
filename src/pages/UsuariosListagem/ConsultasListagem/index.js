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
import FormDialogCreate from '../../../components/FormDialogCreate'
import { configure } from '@testing-library/react'

function ConsultasListagem(){
    let navigate = useNavigate()
    let params = useParams()
    const theme = useTheme()
    const [usuario, setUsuario] = useState([])
    const [consultas, setConsultas] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadConsultas(){
            const response = await api.get(`/admin/consultas/${params.id}`)
            setConsultas(response.data.results)
            console.log(response.data.results)
            setUsuario(response.data.others)
            setLoading(false)

        }
        loadConsultas()
    },[])



    if (loading) {
        return <div>Carregando dados...</div>
    }

    return (
        <>
            <NavBar>
                <BaseLayout title={`Consultas agendadas para ${usuario[0].nome}`}>
                    {(usuario[0].tipo === 'Medico') && 
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
                            id_paciente={consulta.id_}
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
