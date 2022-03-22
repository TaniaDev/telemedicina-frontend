import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../../services/api'

function AgendarConsulta(){
    let history = useHistory();
    const [doctors, setDoctors] = useState([])
    const [specialties, setSpecialties] = useState([])
    const [idEspecialidade, setIdEspecialidade] = useState("")
    const [idMedico, setIdMedico] = useState("")
    const [dtHrConsulta, setDtHrConsulta] = useState("")

    useEffect(() => {
        getSpecialties()
        getDoctors()
    },[])


    async function getSpecialties(){
        const response = await api.get('/medico/especialidades')
        setSpecialties(response.data)
    }
    async function getDoctors(){   
        const response = await api.get('/medico/getDoctors')
        setDoctors(response.data)
    }    
    async function getDoctorsBySpecialty(){  
        const response = await api.get(`/medico/getDoctorsBySpecialty/${idEspecialidade}`)
        setDoctors(response.data)
    }   
    async function getSpecialtieByDoctor(){
        const response = await api.get(`/medico/getSpecialtieByDoctor/${idMedico}`)
        setSpecialties(response.data)
    }

    async function createAppointment(e){
        e.preventDefault()
        await api.post('/paciente/consulta/agendar', {id_medico: idMedico, dt_hr_consulta: dtHrConsulta, id_especialidade: idEspecialidade})
        alert('Consulta Cadastrada com sucesso!')
        history.push('/');
    }

    return(
        <>
            <h1>AGENDAR CONSULTA</h1><br/><hr/><br/>

            Especialidade<br/>
            <select name="especialidade" onChange={e => setIdEspecialidade(e.target.value)} onBlur={getDoctorsBySpecialty}>
            <option >Selecione uma Especialidade</option>
                {specialties.map(specialty => (
                        <option value={specialty.id} >{specialty.nome}</option>
                ))}
            </select>
            <br/><br/>

            Medico<br/>
            <select name="medico" onChange={e => setIdMedico(e.target.value)} onBlur={getSpecialtieByDoctor}>
                <option >Selecione um médico(a)</option>
                {doctors.map(doctor => (
                    <option value={doctor.id_usuario}>CRM: {doctor.crm}</option>
                ))}
            </select><br/><br/>
            
            Data e hora<br/>
            <input type="datetime-local" id="meeting-time" onChange={e => setDtHrConsulta(e.target.value)}/>
            
            <br/><br/>
            <button onClick={createAppointment}><h3>Cadastrar</h3></button>

            
        </>
    )
}

export default AgendarConsulta