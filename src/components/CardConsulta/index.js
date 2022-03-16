import React, { useState, useEffect } from 'react'
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';

import api from '../../services/api'
import FormDialog from '../FormDialog'

function CardConsulta({id_consulta, id_especialidade, id_medico, status, data}){
    const [medico, setMedico] = useState([])
    const [especialidade, setEspecialidade] = useState([])

    useEffect(() => {
        getDoctor()
        getSpecialtie()
    },[])

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
    
    return(
        <Card sx={{ 
            maxWidth: 300,
            margin: 3,
        }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://via.placeholder.com/300x140"
            />
            <CardContent>
                <Typography gutterBottom variant="p" component="span">
                    <b>Status:</b> {status}
                </Typography>               

                <Typography gutterBottom variant="p" component="div">
                    <b>Especialidade:</b> {especialidade.nome}
                </Typography>

                <Typography gutterBottom variant="p" component="div">
                    <b>Médico:</b> {medico.nome} 
                </Typography>

                {status != 'Cancelado' && 
                    <Typography gutterBottom variant="p" component="div">
                        <b>Data:</b> {data}
                    </Typography>
                }                    
            </CardContent>

            {status != 'Cancelado' && 
                <CardActions>
                    <FormDialog idConsulta={id_consulta} status={status}/>
                    <Button size="small" onClick={cancelarConsulta}>Cancelar</Button>
                </CardActions>
            }
            
        </Card>

        

    )
}

export default CardConsulta