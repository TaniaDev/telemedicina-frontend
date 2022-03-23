import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BorderColor } from '@mui/icons-material'

import api from '../../services/api'

export default function FormDialog({idConsulta}) {
  const [open, setOpen] = React.useState(false);
  const [newDate, setNewDate] = React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function changeDate(id){
    await api.put('/consulta/changeDate', {id_consulta: idConsulta, new_date: newDate})
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
          <Button onClick={changeDate}>Alterar</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}