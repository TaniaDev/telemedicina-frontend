import React, { useEffect, useState } from 'react'
import { Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
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
      const response = await api.get(`/horasdisponiveismedico/${id_medico}/${data}`)

      if(response){
        //Array com os dias da semana: ['1', '2', '3', '4', '5']
        let dia_da_semana = response.data.dia_semana.split(",")

        //Array com todas as horas do médico (ocupadas ou não)
        let aux = response.data.horas
        let livres = []

        console.log('day of week')
        console.log(dayOfWeek)

        if(dia_da_semana.indexOf(dayOfWeek.toString()) !== -1){
          alert("Atende")
          aux.forEach(item => {
            // console.log(item)
            livres.push(item)
          })
        }else{
          alert("não atende")
          livres = []
        }
        setHoras(livres)
      }
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
      alert('Consulta criada com sucesso!')
      navigate(`/inicio`);
  }

  return (
    <NavBar>
        <BaseLayout title='Adicionar Consulta'>

        <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', width: '100%'}}>
          <Typography variant='h4' align="center">Nova Consulta</Typography><br/>
            Data: {data}<br/>
            Day Of Week: {dayOfWeek}<br/>
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
                  // error={formik.touched.gender && formik.errors.gender}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.gender} 
                >
                  {especialidades.map(specialty => (
                    <MenuItem key={specialty.id} value={specialty.id}>{specialty.nome}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Div>

            <Div style={{flex: 1, flexDirection: 'column', minWidth: '200px'}}>
              <FormControl variant="outlined" fullWidth> 
                
                {/* {data === '' ? 
                  <>
                    <InputLabel size="small">Médico</InputLabel>
                    <Select name="medico" size="small" disabled></Select>
                  </>
                : */}
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
                      // error={formik.touched.gender && formik.errors.gender}
                      // onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                      // value={formik.values.gender} 
                    >
                      {medicos.map(doctor => (
                        <MenuItem key={doctor.id_usuario} value={doctor.id_usuario}>CRM: {doctor.crm}</MenuItem>
                      ))}
                    </Select>
                  </>
                {/* }  */}
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
                
              {/* {(data === '') || (idMedico === '')  ? 
                  <>
                    <InputLabel size="small">Hora</InputLabel>
                    <Select name="medico" size="small"  onChange={(e) => setHora(e.target.value)} disabled></Select>
                  </>
                : */}
                  <>        
                    <InputLabel size="small">Hora</InputLabel>
                    <Select
                      size="small"
                      labelId="hour"
                      id="hour"
                      label="hour"
                      name="hora" 
                      onChange={(e) => setHora(e.target.value)}
                      // error={formik.touched.gender && formik.errors.gender}
                      // onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                      // value={formik.values.gender} 
                    >
                      {horas.map((hr) => (
                        <MenuItem key={hr} value={hr}>{hr}</MenuItem>
                      ))}
                    </Select>
                  </>
                {/* }  */}
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
