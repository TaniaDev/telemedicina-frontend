import React, { useState, useEffect } from 'react'
import api from '../../../services/api'
import BaseLayout from '../../../layouts/BaseLayout'
import NavBar from '../../../components/NavBar/NavBar'

function AgendarConsulta(){
    const [doctors, setDoctors] = useState([])
    const [specialties, setSpecialties] = useState([])
    const [idEspecialidade, setIdEspecialidade] = useState("")

    useEffect(() => {
        getSpecialties()
        getDoctors()
    },[])


    async function getSpecialties(){
        const response = await api.get('/medico/especialidades')
        setSpecialties(response.data)
    }
    async function getDoctors(){
        if(specialties != ''){
            const response = await api.get('/medico/getDoctors', {id_especialidade: idEspecialidade})
            setDoctors(response.data)
        }else{
            const response = await api.get('/medico/getDoctors')
            setDoctors(response.data)
        }        
    }

    function useRefreshSelectDoctors(){
        alert('1')
        useEffect(() => {
            getDoctors()
        },[])
    }

    function useRefreshSelectSpecialties(){
        alert('2')
        useEffect(() => {
            getSpecialties()
        },[])
    }
    

    

    return(
        <NavBar>
            <BaseLayout title='Agendar Consulta'>

                Especialidade<br/>
                <select name="especialidade" onChange={e => setIdEspecialidade(e.target.value)} onBlur={useRefreshSelectDoctors}>
                    {specialties.map(specialty => (
                            <option value={specialty.id} >{specialty.nome}</option>
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
            </BaseLayout>
        </NavBar>
    )
}

export default AgendarConsulta