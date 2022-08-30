import * as React from 'react';
import { Button, Snackbar, IconButton, Alert} from '@mui/material'
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
  const [open1, setOpen1] = useState(false);
  const [newDate, setNewDate] = React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick1 = () => {
    setOpen1(true);
};	

const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen1(false);
};

  async function changeDate(id){
    await api.put('/consulta/changeDate', {id_consulta: idConsulta, new_date: newDate})
    handleClick1();
  }

  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open1}
        autoHideDuration={6000}
        onClose={handleClose1}
        style={{width: '40%'}}
      >
        <Alert variant="filled" severity="success" onClose={handleClose1} sx={{ width: '100%' }}>Data Atualizada.</Alert>
      </Snackbar>

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