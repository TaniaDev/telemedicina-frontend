import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Typography } from '@mui/material';
import NavBar from '../../../components/NavBar'
import BaseLayout from '../../../layouts/BaseLayout'
import api from '../../../services/api'
import { useAuthContext } from '../../../context/AuthContext'

export default function EditarConsulta() {
  let navigate = useNavigate()
  let params = useParams()
  const { usuario } = useAuthContext()
  const [consulta, setConsulta] = useState({})
  const [newDate, setNewDate] = useState("")
  const [hrConsulta, setHrConsulta] = useState('')
  const [especialidade, setEspecialidade] = useState({})
  const [especialidades, setEspecialidades] = useState([])
  const [paciente, setPaciente] = useState({})
  const [pacientes, setPacientes] = useState([])

  useEffect(() => {
    getConsulta()
    getPacientes()
    getEspecialidades()
  },[])

  async function getConsulta(){
    const response = await api.get(`/consulta/obter/${params.id}`)
    setConsulta(response.data[0])
    console.log(consulta.id_paciente)
    let horaConsulta = response.data[0].dt_hr_consulta
    console.log(horaConsulta)
    setHrConsulta(horaConsulta.replace(':00.000Z', ''))
    getEspecialidade()
    getPaciente()
  }

  async function getEspecialidade(){
    const res = await api.get(`/especialidade/obter/${consulta.id_especialidade}`)
    console.log(res.data[0])
    setEspecialidade(res.data[0])
    
  }

  async function getPaciente(){
    const res = await api.get(`/paciente/obter/${consulta.id_paciente}`)
    console.log(res.data[0])
    setPaciente(res.data[0])
  }

  async function getPacientes(){
    const res = await api.get(`/paciente/obter_medico/${usuario.result[0].id}`)
    setPacientes(res.data)
  }

  async function getEspecialidades(){
    const res = await api.get(`/especialidade/obter_medico/${usuario.result[0].id}`)
    setEspecialidades(res.data)
  }
  
  async function editarConsulta(){
    await api.put(`/consulta/editar/${params.id}`, { 
      id_medico: usuario.result[0].id,
      dt_hr_consulta: newDate,
      id_especialidade: especialidade,
      id_paciente: paciente
    })
    alert('Data da consulta atualizada com sucesso')
    //navigate(`/`)
  }

  return (
    <NavBar>
        <BaseLayout title='Editar Consulta'>
          <h4>Nova Data</h4>

              Selecione a nova data da consulta.

          <br/>
          <br/>
          
          <input type="datetime-local" id="meeting-time" defaultValue={hrConsulta} onChange={e => setNewDate(e.target.value)}/>
          <br/>
          <br/>
          <br/>

          <Typography>Selecione uma Especialidade</Typography>

          <br/>
          <br/>
            
            <select name="especialidade" onChange={e => setEspecialidade(e.target.value)} onBlur={getEspecialidades}>
              <option>{especialidade.nome}</option>
              {especialidades.map((specialty, i) => (
                <option key={i} value={specialty.id}>{specialty.nome}</option>
              ))}
            </select>

            <br/>
            <br/>

            <Typography>Selecione o Paciente</Typography>
            <br/>
            
            <select name="paciente" onChange={e => setPaciente(e.target.value)} onBlur={getPacientes}>
              <option>{paciente.nome}</option>
              {pacientes.map((patient, i) => (
                <option key={i} value={patient.id_usuario}> {patient.nome}</option>
              ))}
            </select>

            <Button onClick={e => editarConsulta(e)}>Alterar</Button>
            <Button color='error' onClick={() => navigate(`/consultas`)}>Cancelar</Button>
        </BaseLayout>
    </NavBar>

  );
}
