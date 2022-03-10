import React, { useState, useEffect } from 'react'
import api from '../../../services/api'

function AgendarConsulta(){
    const [doctors, setDoctors] = useState([])
    const [specialties, setSpecialties] = useState([])
    const [idEspecialidade, setIdEspecialidade] = useState("")

    useEffect(() => {
        getSpecialties()
        getDoctors()
    },[])

    async function getDoctors(){
        if(idEspecialidade != ''){
            const response = await api.get('/medico/getDoctors', {id_especialidade: 'e2e8194a-877e-11ec-a8a3-0242ac120002'})
            setDoctors(response.data)
        }else{
            const response = await api.get('/medico/getDoctors')
            setDoctors(response.data)
        }
        
    }

    async function getSpecialties(){
        const response = await api.get('/medico/especialidades')
        setSpecialties(response.data)
        getDoctors()
    }

    return(
        <>
            <h1>AGENDAR CONSULTA</h1><br/><hr/><br/>

            Especialidade<br/>
            <select name="especialidade" onChange={e => setIdEspecialidade(e.target.value)}>
                {specialties.map(specialty => (
                        <option value={specialty.id}>{specialty.nome}</option>
                    ))}
            </select>
            <br/><br/>

            Medico<br/>
            <select name="medico">
                {doctors.map(doctor => (
                    <option value={doctor.id_usuario}>CRM: {doctor.crm}</option>
                ))}
            </select><br/><br/>
            
            Data e hora<br/>
            <input type="datetime-local" id="meeting-time"/>
            
            <br/>

            
        </>
    )
}

export default AgendarConsulta