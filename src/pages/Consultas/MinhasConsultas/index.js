import React, { useState, useEffect } from 'react'
import CardConsulta from '../../../components/CardConsulta'
import './styles.css';
import api from '../../../services/api'


function MinhasConsultas(){
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        getAppointments()
    },[])

    async function getAppointments(){
        const response = await api.get('/consulta/getMyAppointments')
        setAppointments(response.data)
    }

    return(
        <>
            <h1 className="title">Minhas Consulta(s)</h1>
            <div className="container">
                
                {appointments.map(appointment => (
                    <CardConsulta key={appointment.id} id_consulta={appointment.id} status={appointment.status} id_especialidade={appointment.id_especialidade} id_medico={appointment.id_medico} data={appointment.dt_hr_consulta}/>
                ))}
            </div>
        </>
    )
}

export default MinhasConsultas