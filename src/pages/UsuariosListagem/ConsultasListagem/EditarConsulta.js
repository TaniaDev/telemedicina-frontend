import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material';
import NavBar from '../../../components/NavBar'
import BaseLayout from '../../../layouts/BaseLayout'
import api from '../../../services/api'

export default function EditarConsulta() {
  let navigate = useNavigate()
  let params = useParams()
  const [newDate, setNewDate] = useState("")
  const [consulta, setConsulta] = useState([])
  const [hrConsulta, setHrConsulta] = useState('')

  useEffect(() => {
    getConsulta()
  },[])

  async function getConsulta(){
    const response = await api.get(`/consulta/${params.id}`)
    setConsulta(response.data)  

    let horaConsulta = response.data.dt_hr_consulta
    setHrConsulta(horaConsulta.replace(':00.000Z', ''))
  }
  
  async function changeDate(){
    await api.put('/consulta/changeDate', {id_consulta: params.id, new_date: newDate})
    alert('Data da consulta atualizada com sucesso')
    navigate(`/consultas`)
  }

  return (
    <NavBar>
        <BaseLayout title='Editar Consulta'>
          <h4>Nova Data</h4>

              Selecione a nova data da consulta.
          
              <input type="datetime-local" id="meeting-time" defaultValue={hrConsulta} onChange={e => setNewDate(e.target.value)}/>
          <br/>
          <br/>
            <Button onClick={changeDate}>Alterar</Button>
            <Button color='error' onClick={() => navigate(`/consultas`)}>Cancelar</Button>
        </BaseLayout>
    </NavBar>

  );
}
