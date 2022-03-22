import React, { useState, useEffect } from 'react'
import CardConsulta from '../../../components/CardConsulta'
import './styles.css';
import api from '../../../services/api'
import BaseLayout from '../../../layouts/BaseLayout'
import NavBar from '../../../components/NavBar/NavBar'

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
            <NavBar>
                <BaseLayout title='Minhas Consultas'>
                    <div className="container">
                
                    {appointments.map(appointment => (
                        <CardConsulta key={appointment.id} id_consulta={appointment.id} status={appointment.status} id_especialidade={appointment.id_especialidade} id_medico={appointment.id_medico} data={appointment.dt_hr_consulta}/>
                    ))}
                    </div>
                </BaseLayout>
            </NavBar>
            
        </>
    )
}

export default MinhasConsultas