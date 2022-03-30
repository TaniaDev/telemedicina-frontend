import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import NavBar from '../../../components/NavBar'
import BaseLayout from '../../../layouts/BaseLayout'

export default function AdicionarConsulta() {
    let navigate = useNavigate()
    const [dataConsulta, setDataConsulta] = useState("")
    const [especialidades, setEspecialidades] = useState([])
    const [medicos, setMedicos] = useState([])
    const [idEspecialidade, setIdEspecialidade] = useState("")
    const [idMedico, setIdMedico] = useState("")

    useEffect(() => {
      getSpecialties()
      getDoctors()
  },[])


  async function getSpecialties(){
      const response = await api.get('/medico/especialidades')
      setEspecialidades(response.data)
  }
  async function getDoctors(){   
      const response = await api.get('/medico/getDoctors')
      setMedicos(response.data)
  }    
  async function getDoctorsBySpecialty(){  
      const response = await api.get(`/medico/getDoctorsBySpecialty/${idEspecialidade}`)
      setMedicos(response.data)
  }   
  async function getSpecialtieByDoctor(){
      const response = await api.get(`/medico/getSpecialtieByDoctor/${idMedico}`)
      setEspecialidades(response.data)
  }

  async function criarConsulta(e){
      e.preventDefault()
      await api.post('/consulta/criar', {id_medico: idMedico, dt_hr_consulta: dataConsulta, id_especialidade: idEspecialidade})
      alert('Consulta criada com sucesso!')
      navigate(`/admin`);
  }

  return (
    <NavBar>
        <BaseLayout title='Adicionar Consulta'>
        <Typography variant='h4'>Nova Consulta</Typography>
            
            <Typography>Selecione a especialidade.</Typography>
            <br/>
            
            <select name="especialidade" onChange={e => setIdEspecialidade(e.target.value)} onBlur={getDoctorsBySpecialty}>
              <option>Selecione uma Especialidade</option>
              {especialidades.map(specialty => (
                <option value={specialty.id}>{specialty.nome}</option>
              ))}
            </select>

            <br/>
            <br/>

            <Typography>Selecione o Medico.</Typography>
            <br/>
            
            <select name="medico" onChange={e => setIdMedico(e.target.value)} onBlur={getSpecialtieByDoctor}>
              <option>Selecione um(a) médico(a)</option>
              {medicos.map(doctor => (
                <option value={doctor.id_usuario}> CRM: {doctor.crm}</option>
              ))}
            </select>

            <br/>
            <br/>

            <Typography>Selecione a data da consulta.</Typography>
          <h6>{dataConsulta}</h6>
          <input type="datetime-local" id="meeting-time" onChange={e => setDataConsulta(e.target.value)}/>         
          <br/>
          <br/>
          <Button onClick={e => criarConsulta(e)}>Salvar</Button>
          <Button color='error' onClick={() => navigate(`/admin`)}>Cancelar</Button>
        </BaseLayout>
    </NavBar>

  )
}
