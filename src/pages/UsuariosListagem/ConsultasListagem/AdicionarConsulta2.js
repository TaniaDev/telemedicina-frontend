import {useState, useEffect} from 'react'
import { Button, Typography, Select, MenuItem, InputLabel, FormControl, Snackbar, IconButton, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import api from '../../../services/api'
import NavBar from '../../../components/NavBar'
import BaseLayout from '../../../layouts/BaseLayout'

import {
  Div,
  BirthDate,
} from '../../../styles/Cadastro/Cadastro'

function AdicionarConsulta2(){
  let navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [especialidades, setEspecialidades] = useState([])
  const [medicos, setMedicos] = useState([])
  const [idEspecialidade, setIdEspecialidade] = useState()
  const [idMedico, setIdMedico] = useState()
  const [data, setData] = useState()
  const [diaDaSemana, setDiaDaSemana] = useState()
  const [horas, setHoras] = useState([])
  const [hora, setHora] = useState()

  useEffect(() => {
    getSpecialties()
    getDoctors()
  }, [])

  useEffect(() => {
    getDoctorsBySpecialty()
  }, [idEspecialidade])

  useEffect(() => {
    getSpecialtieByDoctor()
  }, [idMedico])

  useEffect(() => {
    horasDisponiveisMedico()
  }, [data])

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

  async function horasDisponiveisMedico(){
    if(idMedico && data){    
      const response = await api.get(`/horasdisponiveismedico/${idMedico}/${data}`)
      console.log(response.data)
      setHoras(response.data)
    }
    return
  }

  async function criarConsulta(e){
    e.preventDefault()
    let url_consulta = `telemed${idMedico}${data}${idEspecialidade}`
    await api.post('/agendarconsulta', {id_medico: idMedico, id_especialidade: idEspecialidade, dt_hr_consulta: `${data} ${hora}:00:00.000`, url_consulta})
    handleClick()
    setTimeout(() => {
      navigate(`/inicio`);
    }, 3000);
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

  return(
    <NavBar>
      <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            style={{width: '40%'}}
        >
          <Alert variant="filled" severity="success" onClose={handleClose} sx={{ width: '100%' }}>Consulta Criada com Sucesso!</Alert>
      </Snackbar>

      <BaseLayout title='Adicionar Consulta'>
        <Typography variant='h4' align="center">Nova Consulta</Typography><br/>
        
        {/* <h3>ESPECIALIDADE</h3>
        <select style={{width: '100%'}} onChange={(e) => setIdEspecialidade(e.target.value)}>
          {especialidades.map(especialidade => (
            <option key={especialidade.id}>{especialidade.id}</option>
          ))}
        </select> */}
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
          
        {/* <h3>MÉDICO</h3>
        <select style={{width: '100%'}} onChange={(e) => setIdMedico(e.target.value)}>
          {medicos.map(medico => (
            <option key={medico.id}>{medico.id}</option>
          ))}
        </select> */}

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
                      <MenuItem key={doctor.id_usuario} value={doctor.id_usuario}>{doctor.nome}</MenuItem>
                    ))
                  ): 
                    <MenuItem disabled>Não há Médicos</MenuItem>
                  }
                </Select>
              </>
          </FormControl>
        </Div>

        {/* <h3>DATA</h3>
        <input type="date" style={{width: '100%'}} onChange={(e) => {
                                                                      setData(e.target.value);
                                                                      setDiaDaSemana(dayjs(e.target.value).day());
                                                                    }
        }/> */}

        <Div>
          <BirthDate 
              type="date" 
              id="date" 
              name="birthDate"
              onChange={(e) => {setData(e.target.value); setDiaDaSemana(dayjs(e.target.value).day());}} 
              min={dayjs().format('YYYY-MM-DD')}
          />
        </Div>

        {/* <h3>HORA</h3>
        <select style={{width: '100%'}}>
          {horas.map(h => (
            <option key={h}>{h}</option>
          ))}
        </select> */}

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
      </BaseLayout>
    </NavBar>
  )
}

export default AdicionarConsulta2