import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import api from '../../../services/api'
import BaseLayout from '../../../layouts/BaseLayout'
import NavBar from '../../../components/NavBar'
import CardConsulta from '../../../components/CardConsulta'

function AgendarConsulta(){
    let navigate = useNavigate()
    let params = useParams()
    const [consultas, setConsultas] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getConsultasDisponiveis(){
            const response = await api.get(`/consulta/getConsultasDisponiveis`)
            setConsultas(response.data)
            console.log(response.data)
            setLoading(false)

        }
        getConsultasDisponiveis()
    },[])

    if (loading) {
        return <div>Carregando dados...</div>
    }

    return(
        <NavBar>
            <BaseLayout title='Agendar Consulta'>
                <Box display='flex' flexDirection='row' flexWrap='wrap'>
                {consultas.map(consulta => (
                    
                        <CardConsulta
                            key={consulta.id}
                            id_consulta={consulta.id}
                            status={consulta.status}
                            id_especialidade={consulta.id_especialidade}
                            id_medico={consulta.id_medico}
                            data={consulta.dt_hr_consulta}
                        />
                ))}
                </Box>     
           </BaseLayout>
       </NavBar>
    )
}

export default AgendarConsulta