import React, { useEffect, useState } from 'react'
import { Button, Typography, Select, MenuItem, InputLabel, FormControl, Snackbar, IconButton, Alert } from '@mui/material';
import {Done, Close} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import api from '../../../services/api'
import NavBar from '../../../components/NavBar'
import BaseLayout from '../../../layouts/BaseLayout'

import {
  Div,
  BirthDate,
} from '../../../styles/Cadastro/Cadastro'

export default function AdicionarConsulta() {
    let navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const [especialidades, setEspecialidades] = useState([])
    const [medicos, setMedicos] = useState([])
    const [idEspecialidade, setIdEspecialidade] = useState("")
    const [idMedico, setIdMedico] = useState("")
    const [data, setData] = useState("")
    const [hora, setHora] = useState("")
    const [horas, setHoras] = useState([])
    const [dayOfWeek , setDayOfWeek] = useState("")
    const [dt_hr_consulta, setDr_hr_consulta] = useState("")

    useEffect(() => {
      getSpecialties()
      getDoctors()
  },[])

  useEffect(() => {
    horasDisponiveisMedico(idMedico)
  }, [idMedico, data])

  function setDataAndDayOfWeek(n){
    setData(n)
    setDayOfWeek(dayjs(n).day())
  }

  async function horasDisponiveisMedico(id_medico){
    if(id_medico && data){    
      console.log(id_medico)
      console.log(data)
      const response = await api.get(`/horasdisponiveismedico/${id_medico}/${data}`)
      console.log(response.data)

      // if(response){
      //   let dia_da_semana = response.data.dia_semana.split(",")

      //   let aux = response.data.horas
      //   let livres = []

      //   if(dia_da_semana.indexOf(dayOfWeek.toString()) !== -1){
      //     if(data === dayjs().format('YYYY-MM-DD')){
      //       aux.forEach(item => {
      //         if(item >= dayjs().format('HH:mm:ss')){
      //           livres.push(item)  
      //         }
      //       })
      //     }else{
      //       aux.forEach(item => {
      //         livres.push(item)
      //       })
      //     } 
      //   }else{
      //     livres = []
      //   }
      //   setHoras(livres)
      // }

    }else{
      return
    }

    
  }

  async function getSpecialties(){
      const response = await api.get('/medico/especialidades')
      setEspecialidades(response.data)
  }

  async function getDoctors(){   
      const response = await api.get('/medico/getDoctors')
      setMedicos(response.data)
  }  

  async function getDoctorsBySpecialty(){  
      if(idEspecialidade){
        const response = await api.get(`/medico/getDoctorsBySpecialty/${idEspecialidade}`)
        setMedicos(response.data)
      }
      return
  }   

  async function getSpecialtieByDoctor(){
      if(idMedico){
        const response = await api.get(`/medico/getSpecialtieByDoctor/${idMedico}`)
        setEspecialidades(response.data)
      }
      return
  }

  async function criarConsulta(e){
      e.preventDefault()
      setDr_hr_consulta(`${data} ${hora}`)
      let url_consulta = `telemed${idMedico}${data}${idEspecialidade}`
      await api.post('/agendarconsulta', {id_medico: idMedico, id_especialidade: idEspecialidade, data, hora, dt_hr_consulta, url_consulta})
      handleClick()
      setTimeout(() => {
        navigate(`/inicio`);
    }, 7000);
      
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
);
  
  return (
    <NavBar>
        <BaseLayout title='Adicionar Consulta'>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            style={{width: '40%'}}
        >
          <Alert variant="filled" severity="success" onClose={handleClose} sx={{ width: '100%' }}>Consulta Criada com Sucesso!</Alert>
        </Snackbar>
        <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', width: '100%'}}>
          <Typography variant='h4' align="center">Nova Consulta</Typography><br/>
            <Div style={{flex: 1, flexDirection: 'column', minWidth: '200px'}}>
              <FormControl variant="outlined" fullWidth> 
                <InputLabel size="small">Especialidade</InputLabel>
                <Select
                  size="small"
                  labelId="specialty"
                  id="specialty"
                  name="specialty"
                  label="Especialidade"
                  onChange={e => setIdEspecialidade(e.target.value)} 
                  onBlur={getDoctorsBySpecialty}
                >
                  {especialidades.length > 0 ? (
                    especialidades.map(specialty => (
                      <MenuItem key={specialty.id} value={specialty.id}>{specialty.nome}</MenuItem>
                    ))
                  ): 
                    <MenuItem disabled>Não há especialidades</MenuItem>
                  }
                </Select>
              </FormControl>
            </Div>

            <Div style={{flex: 1, flexDirection: 'column', minWidth: '200px'}}>
              <FormControl variant="outlined" fullWidth> 
                  <>
                    <InputLabel size="small">Médico</InputLabel>
                    <Select
                      size="small"
                      labelId="doctor"
                      id="doctor"
                      label="doctor"
                      name="medico" 
                      onChange={(e) => setIdMedico(e.target.value)} 
                      onBlur={getSpecialtieByDoctor}
                    >
                      {medicos.length > 0 ? (
                        medicos.map(doctor => (
                          <MenuItem key={doctor.id_usuario} value={doctor.id_usuario}>CRM: {doctor.crm}</MenuItem>
                        ))
                      ): 
                        <MenuItem disabled>Não há Médicos</MenuItem>
                      }
                    </Select>
                  </>
              </FormControl>
            </Div>
                
            <Div>
                <BirthDate 
                    type="date" 
                    id="date" 
                    name="birthDate"
                    onChange={(e) => setDataAndDayOfWeek(e.target.value)} 
                    min={dayjs().format('YYYY-MM-DD')}
                />
            </Div>

            <Div>
              <FormControl variant="outlined" fullWidth> 
                  <>        
                    <InputLabel size="small">Hora</InputLabel>
                    <Select
                      size="small"
                      labelId="hour"
                      id="hour"
                      label="hour"
                      name="hora" 
                      onChange={(e) => setHora(e.target.value)}
                    >

                    {horas.length > 0 ? (
                      horas.map(hr => (
                        <MenuItem key={hr} value={hr}>{hr}</MenuItem> 
                      ))
                    ): 
                      <MenuItem disabled>Não há Horários Disponiveis nessa Data</MenuItem>
                    }
                    </Select>
                  </>
              </FormControl>
            </Div>

            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button onClick={e => criarConsulta(e)}>Salvar</Button>
              <Button color='error' onClick={() => navigate(`/inicio`)}>Cancelar</Button>
            </div>
          </div>
        </BaseLayout>
    </NavBar>
  )
}
