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

    useEffect(() => {
      getConsulta()
  },[])

  async function getConsulta(){
    const response = await api.get(`/consulta/${params.id}`)
    console.log('consultas: ', response.results)
    setConsulta(response.data)
  }
  
    async function changeDate(){
    await api.put('/consulta/changeDate', {id_consulta: params.id, new_date: newDate})
    alert('Data da consulta atualizada com sucesso')
  }

  return (
    <NavBar>
        <BaseLayout title='Editar Consulta'>
        <h4>Nova Data</h4>

            Selecione a nova data da consulta.
            <h6>{newDate}</h6>
            <input type="datetime-local" id="meeting-time" onChange={e => setNewDate(e.target.value)}/>
        <br/>
        <br/>
          <Button onClick={changeDate}>Alterar</Button>
          <Button color='error' onClick={() => navigate(`/admin`)}>Cancelar</Button>

        </BaseLayout>
    </NavBar>

  );
}
