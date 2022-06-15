import React, { useState, useEffect } from 'react'
import CardConsulta from '../../../components/CardConsulta'
import './styles.css';
import api from '../../../services/api'
import BaseLayout from '../../../layouts/BaseLayout'
import NavBar from '../../../components/NavBar'
import { ButtonGroup, Button } from '@mui/material'

function MinhasConsultas(){
    const [appointments, setAppointments] = useState([])
    const [filterActived, setFilterActived] = useState("all")

    useEffect(() => {
        getAppointments()
    },[filterActived])

    async function getAppointments(){
        const response = await api.get(`/consultas/getMyAppointments/${filterActived}`)
        setAppointments(response.data)
    }


    return(
        <>
            <NavBar>
                <BaseLayout title='Minhas Consultas'>
                    <div className="filters">
                        <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{boxShadow: 'none', borderRadius: '0px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <Button style={{width: '100%', minWidth: '120px', maxWidth: '120px', borderRadius: '0px'}} onClick={(e) => setFilterActived('today')} actived={filterActived == "today"? "true" : "false"}>Hoje</Button>
                            <Button style={{width: '100%', minWidth: '120px', maxWidth: '120px', borderRadius: '0px'}} onClick={(e) => setFilterActived('all')} actived={filterActived == "all"? "true" : "false"}>Todos</Button>
                            <Button style={{width: '100%', minWidth: '120px', maxWidth: '120px', borderRadius: '0px'}} onClick={(e) => setFilterActived('week')} actived={filterActived == "week"? "true" : "false"}>Semana</Button>
                            <Button style={{width: '100%', minWidth: '120px', maxWidth: '120px', borderRadius: '0px'}} onClick={(e) => setFilterActived('scheduled')} actived={filterActived == "scheduled"? "true" : "false"}>Agendado</Button>
                            <Button style={{width: '100%', minWidth: '120px', maxWidth: '120px', borderRadius: '0px'}} onClick={(e) => setFilterActived('canceled')} actived={filterActived == "canceled"? "true" : "false"}>Cancelado</Button>
                        </ButtonGroup>
                    </div>
                    <div className="container" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                        {appointments?.map(appointment => (
                            <>
                                <CardConsulta 
                                    style={{minWidth: '200px'}}
                                    key={appointment.id} 
                                    id_consulta={appointment.id} 
                                    status={appointment.status} 
                                    id_especialidade={appointment.id_especialidade} 
                                    id_medico={appointment.id_medico} 
                                    id_paciente={appointment.id_paciente} 
                                    data={appointment.dt_hr_consulta}
                                    url_consulta={appointment.url_consulta}
                                />
                            </>
                        ))}
                    </div>
                </BaseLayout>
            </NavBar>
            
        </>
    )
}

export default MinhasConsultas