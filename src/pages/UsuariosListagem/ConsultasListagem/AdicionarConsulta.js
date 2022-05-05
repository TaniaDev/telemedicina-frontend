import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import NavBar from '../../../components/NavBar'
import BaseLayout from '../../../layouts/BaseLayout'

export default function AdicionarConsulta() {
    let navigate = useNavigate()

    let now = new Date()
    let dia = String(now.getDate()).padStart(2, '0');
    let mes = String(now.getMonth() + 1).padStart(2, '0');
    let ano = now.getFullYear();
    
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
    verifyDayOfWeek(data)
    horasDisponiveisMedico(idMedico)
  }, [idMedico, data])

  async function horasDisponiveisMedico(id_medico){
    const response = await api.get(`/horasdisponiveismedico/${id_medico}/${data}`)

    //Verificar se o médico atende naquele dia da semana
      //Array com os dias da semana que o médico atende
    let dia_da_semana = response.data.dia_semana.split(",")

    let aux = response.data.horas
    let livres = []

    if(dia_da_semana.indexOf(dayOfWeek.toString()) !== -1){
      aux.forEach(item => {
        console.log(item)
        livres.push(item)
      })
    }else{
      // livres.push('')
    }
    setHoras(livres)
    
    //Trazer as horas daquele dia (Descontando as já agendadas)

    
  }

  function verifyDayOfWeek(date){    
    let inputDate = document.querySelector('#date').value
    let dateSplited = inputDate.split("-")
    let dia = dateSplited[2]
    let mes = ''
    let ano = dateSplited[0]

    switch(dateSplited[1]){
      case '01':
          mes = 'January'
          break
      case '02':
          mes = 'February'
          break
      case '03':
          mes = 'March'
          break
      case '04':
          mes = 'April'
          break
      case '05':
          mes = 'May'
          break
      case '06':
          mes = 'June'
          break
      case '07':
          mes = 'July'
          break
      case '08':
          mes = 'August'
          break
      case '09':
          mes = 'September'
          break
      case '10':
          mes = 'October'
          break
      case '11':
          mes = 'November'
          break
      case '12':
          mes = 'December'
          break
    }

    let formatedDate = new Date(`${mes} ${dia} ${ano} 00:00:01`);
    setDayOfWeek(parseInt(formatedDate.getDay()))
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
      const response = await api.get(`/medico/getDoctorsBySpecialty/${idEspecialidade}`)
      setMedicos(response.data)
  }   
  async function getSpecialtieByDoctor(){
      const response = await api.get(`/medico/getSpecialtieByDoctor/${idMedico}`)
      setEspecialidades(response.data)
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
              
              <Typography>Selecione a especialidade.</Typography>
              
              <select name="especialidade" onChange={e => setIdEspecialidade(e.target.value)} onBlur={getDoctorsBySpecialty}>
                <option>Selecione uma Especialidade</option>
                {especialidades.map(specialty => (
                  <option value={specialty.id}>{specialty.nome}</option>
                ))}
              </select>

              <br/>

              <Typography>Selecione o Medico.</Typography>
              {data === '' ? 
                <select name="medico" disabled>
                  <option>Selecione um(a) médico(a)</option>
                </select>
              :
                <select name="medico" onChange={(e) => setIdMedico(e.target.value)} onBlur={getSpecialtieByDoctor}>
                  <option>Selecione um(a) médico(a)</option>
                  {medicos.map(doctor => (
                    <option value={doctor.id_usuario}> CRM: {doctor.crm}</option>
                  ))}
                </select>
              }

              <br/>

              <Typography>Selecione a data da consulta.</Typography>
            
              <input id="date" type="date" onChange={(e) => setData(e.target.value)} min={`${ano}-${mes}-${dia}`} />
            {/* {(idEspecialidade === '') || (idMedico === '')  ? 
              <input type="date" disabled min={`${ano}-${mes}-${dia}`} />
            :
              <input id="date" type="date" onChange={(e) => verifyDayOfWeek(e.target.value)} min={`${ano}-${mes}-${dia}`} />
            } */}

            <br/>
            {(data === '') || (idMedico === '')  ? 
              <select onChange={(e) => setHora(e.target.value)} disabled>
                <option>Selecione a hora da consulta</option>
              </select>
            :
              <select onChange={(e) => setHora(e.target.value)}>
                <option>Selecione a hora da consulta</option>
                {horas.map((hr) => (
                  <option value={hr}>{hr}</option>
                ))}
              </select>
            }
          
            <br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button onClick={e => criarConsulta(e)}>Salvar</Button>
              <Button color='error' onClick={() => navigate(`/admin`)}>Cancelar</Button>
            </div>
          </div>
        </BaseLayout>
    </NavBar>
  )
}
