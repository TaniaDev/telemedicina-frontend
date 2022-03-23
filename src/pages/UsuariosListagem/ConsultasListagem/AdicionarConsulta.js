import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../services/api'
import NavBar from '../../../components/NavBar'
import BaseLayout from '../../../layouts/BaseLayout'

export default function AdicionarConsulta() {
    let navigate = useNavigate()
    let params = useParams()
    const [dataConsulta, setDataConsulta] = useState("")
    const [especialidade, setEspecialidade] = useState([])
    const [usuario, setUsuario] = useState([])
    const [consultas, setConsultas] = useState([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
        async function loadConsultas(){
            const response = await api.get(`/admin/consultas/${params.id}`)
            setConsultas(response.data.results)
            console.log(response.data.results)
            setUsuario(response.data.others)
            setLoading(false)

        }
        loadConsultas()
    },[])


    async function criarConsulta(e){
      e.preventDefault()
      await api.post('/admin/consultas/criar', {id_medico: consultas.id_medico, id_especialidade: especialidade, dt_hr_consulta: dataConsulta})
      alert('Consulta criada com sucesso')
    }
    
    async function getSpecialtieByDoctor(){
      const response = await api.get(`/medico/getSpecialtieByDoctor/${consultas.id_medico}`)
      setEspecialidade(response.data)
      console.log(response.data)
  }
  return (
    <NavBar>
        <BaseLayout title='Adicionar Consulta'>
        <Typography variant='h4'>Nova Consulta</Typography>
            
            <Typography>Selecione a especialidade.</Typography>
            <br/>
            
            <select name="especialidade" onChange={e => setEspecialidade(e.target.value)} onBlur={getSpecialtieByDoctor}>
            <option>Selecione uma Especialidade</option>
                {especialidade.map(specialty => (
                    <option value={specialty.id}>{specialty.nome}</option>
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

  );
}
