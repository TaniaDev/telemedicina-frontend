import React, { useState, useEffect } from 'react'
import {Box, Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import { BorderColor, Delete } from '@mui/icons-material'
import api from '../../services/api'
import FormDialog from '../FormDialog'
import { useNavigate } from 'react-router-dom';

function CardConsulta({id_consulta, id_especialidade, id_medico, id_paciente, status, data}){
    let navigate = useNavigate()
    const [paciente, setPaciente] = useState([])
    const [medico, setMedico] = useState([])
    const [especialidade, setEspecialidade] = useState([])

    useEffect(() => {
        getDoctor()
        getSpecialtie()
        //getPaciente()
    },[])

    //async function getPaciente(){
    //    const result = await api.get(`/paciente/getPaciente/${id_paciente}`)
    //   setPaciente(result.data)
    //}

    async function getDoctor(){
        const result = await api.get(`/medico/getDoctor/${id_medico}`)
        setMedico(result.data)
    }

    async function getSpecialtie(){
        const result = await api.get(`/medico/getSpecialtie/${id_especialidade}`)
        console.log(result.data)
        setEspecialidade(result.data)
    }

    async function cancelarConsulta(){
        const res = window.confirm('Deseja realmente cancelar a consulta?')
        if (res) {
            await api.put('/consulta/cancelar', {id_consulta})
            alert('Consulta Cancelada!')
        }
    }
    async function removerConsulta(id){
        const res = window.confirm('Deseja realmente excluir?')
        if(res){
            try {
                const result = await api.delete(`/admin/consultas/deletar/${id_consulta}`)
                console.log(result.data)
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
                        {data}
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
                {/*{(status === 'Agendado') &&
                    <Typography gutterBottom variant="p" component="div">
                        <b>Paciente:</b> {paciente.nome} 
                    </Typography>
                }*/}              
                <Typography gutterBottom variant="p" component="div">
                    <b>Especialidade:</b> {especialidade.nome}
                </Typography>

                <Typography gutterBottom variant="p" component="div">
                    <b>Médico:</b> {medico.nome} 
                </Typography>         
            </CardContent>
          
            <Box display='flex' alignItems='center' justifyContent='center'>
                <CardActions>
                        <Button size="small" color='error' onClick={removerConsulta}><Delete/></Button>
                        <Button size="small" color='secondary' onClick={() => navigate(`/consulta/editar/${id_consulta}`)}><BorderColor/></Button>
                        {status === 'Agendado' ? 
                            <>
                                <Button size="small" color='warning' disabled>Cancelar</Button>
                                
                            </>
                        :
                            <Button size="small" color='warning' disabled>Agendar</Button>
                        }
                </CardActions>
            </Box>
            
        </Card>

        

    )
}

export default CardConsulta