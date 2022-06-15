import React from 'react';
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'
import PatientsAppointmentHistory from '../../components/PatientsAppointmentHistory'
import DoctorsAppointmentHistory from '../../components/DoctorsAppointmentHistory'
import api from '../../services/api'

function HistoricoConsultas(){
    const navigate = useNavigate()
    const [typeUser, setTypeUser] = useState()

    useEffect(() => {
        getType()
    }, [])

    async function getType(){
        const result = await api.get('/usuario/getType')
        setTypeUser(result.data.tipo)
    }

    return(
        <>
            <NavBar>
                <BaseLayout title="Historico de Consultas">
                    {typeUser === 'Medico' && <DoctorsAppointmentHistory/> }
                    {typeUser === 'Paciente' && <PatientsAppointmentHistory/> }
                </BaseLayout>
            </NavBar>
        </>
    )
}
export default HistoricoConsultas;