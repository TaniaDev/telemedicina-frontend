import React, { useState, useEffect } from 'react'
import {Box, Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material'
import { BorderColor, Delete } from '@mui/icons-material'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

function CardConsulta({id_consulta, id_especialidade, id_medico, id_paciente, status, data}){
    let navigate = useNavigate()
    const [paciente, setPaciente] = useState([])
    const [medico, setMedico] = useState([])
    const [especialidade, setEspecialidade] = useState([])
    const [typeUser, setTypeUser] = useState('')
    const [limitTime, setLimitTime] = useState('')
    const [agora, setAgora] = useState('')
    const [formattedDate, setFormattedDate] = useState('')

    useEffect(() => {
        getDoctor()
        getSpecialtie()
        getType()
        getPaciente()
        limitTimeForChange()
        dateNow()
        formatDateAppointment()
    }, [])

    async function getPaciente(){
        const result = await api.get(`/paciente/getPaciente/${id_paciente}`)
        setPaciente(result.data)
    }

    function limitTimeForChange(){
        let dtHrConsulta = data
        let hrConsulta = dtHrConsulta.substr(11, 2)
        var limitTimeForChange = dtHrConsulta.replace('T'+hrConsulta, 'T'+(hrConsulta-1))
        setLimitTime(limitTimeForChange)
    }

    function dateNow(){
        let date = new Date()
        let hour = date.getHours()
        let minute = date.getMinutes()
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
        let dateNow = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + '00.000Z'
        setAgora(dateNow)
    }

    function formatDateAppointment(){
        let year = data.substr(0, 4)
        let month = data.substr(5, 2)
        let day = data.substr(8, 2)
        let hour = data.substr(11, 2)
        let minute = data.substr(14, 2)
        let format = day + '/' + month + '/' + year + ' às ' + hour + 'H' + minute
        setFormattedDate(format)
        
    }

    async function getType(){
        const result = await api.get('/usuario/getType')
        setTypeUser(result.data.tipo)
    }

    async function getDoctor(){
        const result = await api.get(`/medico/getDoctor/${id_medico}`)
        setMedico(result.data)
    }

    async function getSpecialtie(){
        const result = await api.get(`/medico/getSpecialtie/${id_especialidade}`)
        setEspecialidade(result.data)
    }

    async function cancelarConsulta(){
        const res = window.confirm('Deseja realmente cancelar a consulta?')
        if (res) {
            console.log(id_consulta)
            await api.put(`/consulta/cancelar/${id_consulta}`)
            alert('Consulta Cancelada!')
            window.location.reload()
        }
    }
    async function agendarConsulta() {
        const res = window.confirm('Deseja realmente agendar esta consulta?')
        if (res) {
            console.log(id_consulta)
            await api.put(`/consulta/agendar/${id_consulta}`)
            alert('Consulta Agendada!')
            navigate('/consultas')
        }
    }
    async function removerConsulta(id){
        const res = window.confirm('Deseja realmente excluir?')
        if(res){
            try {
                const result = await api.delete(`/admin/consultas/deletar/${id_consulta}`)
                alert('Consulta excluida com sucesso!')
                window.location.reload()
            } catch(err) {
                alert("ops! ocorreu um erro" + err)
            }
        }
    }
    
    return(
        <Card sx={{ 
            maxWidth: 300,
            margin: 3,
        }}>
            <Box
                display='flex'
                flexDirection='column'
                alignContent='center'
                alignItems='center'
            >
                <Typography gutterBottom variant="h6" component="div" alignSelf='center'>
                    <b>Data</b>
                </Typography>
            {status != 'Cancelado' ? 
                    <Typography gutterBottom variant="p" component="div">
                        {formattedDate}
                    </Typography>
                :
                    <Typography gutterBottom variant="p" component="div">
                        Cancelada
                    </Typography>
                }
            </Box>
            <CardContent>
                <Typography gutterBottom variant="p" component="span">
                    <b>Status:</b> {status}
                </Typography>
                {(status === 'Agendado') &&
                    <Typography gutterBottom variant="p" component="div">
                        <b>Paciente:</b> {paciente.nome} 
                    </Typography>
                }              
                <Typography gutterBottom variant="p" component="div">
                    <b>Especialidade:</b> {especialidade.nome}
                </Typography>

                <Typography gutterBottom variant="p" component="div">
                    <b>Médico:</b> {medico.nome} 
                </Typography>         
            </CardContent>
          
            <Box display='flex' alignItems='center' justifyContent='center'>
                <CardActions>
                        {((typeUser === 'Medico' || typeUser === 'Admin') && status === 'Livre') &&
                            <Button size="small" color='secondary' onClick={() => navigate(`/consulta/editar/${id_consulta}`)}>
                                <BorderColor/>
                            </Button>
                        }
                        {(typeUser === 'Admin') && 
                                <Button size="small" color='error' onClick={removerConsulta}>
                                    <Delete/>
                                </Button>
                        }

                        {(status === 'Agendado') && (agora <= limitTime) ?
                            <>
                                
                                <Button size="small" color='warning' onClick={cancelarConsulta}>Cancelar</Button>
                            </>
                        :
                            <Button size="small" color='success' onClick={agendarConsulta}>Agendar</Button>
                        }
                </CardActions>
            </Box>
            
        </Card>       
    )
}

export default CardConsulta