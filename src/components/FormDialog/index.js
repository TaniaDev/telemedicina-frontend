import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BorderColor } from '@mui/icons-material'

import api from '../../services/api'
import { useAuthContext } from '../../context/AuthContext'

export default function FormDialog({ idConsulta, idPaciente, idEspecialidade }) {
  const { usuario } = useAuthContext()
  const [open, setOpen] = useState(false)
  const [newDate, setNewDate] = useState("")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  async function changeAppointment(){
    await api.put(`/consulta/editar/${idConsulta}`, {
      id_medico_admin: usuario.result[0].id,
      id_paciente: idPaciente,
      id_especialidade: idEspecialidade,
      dt_hr_consulta: newDate
    })
    alert('Data da consulta atualizada com sucesso')
  }

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        <BorderColor/>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova Data</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Selecione a nova data da consulta.
          </DialogContentText>
          <h6>{newDate}</h6>
          
          <input type="datetime-local" id="meeting-time" onChange={e => setNewDate(e.target.value)}/>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={changeAppointment}>Editar</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}