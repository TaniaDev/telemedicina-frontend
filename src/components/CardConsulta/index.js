import React, { useState, useEffect } from 'react'
import {Box, Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Snackbar, IconButton, Alert } from '@mui/material'
import { BorderColor, Delete } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

import api from '../../services/api'
import Prontuario from '../Prontuario'
import FormProntuario from '../Prontuario/FormProntuario'

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
  
function CardConsulta({id_consulta, id_especialidade, id_medico, id_paciente, status, data, url_consulta}){
    let navigate = useNavigate()
    const [paciente, setPaciente] = useState([])
    const [medico, setMedico] = useState([])
    const [especialidade, setEspecialidade] = useState([])
    const [typeUser, setTypeUser] = useState('')
    const [limitTime, setLimitTime] = useState('')
    const [agora, setAgora] = useState('')
    const [formattedDate, setFormattedDate] = useState('')
    const [openConsulta, setOpenConsulta] = useState(false);
    const [openProntuario, setOpenProntuario] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const handleOpenConsulta = () => setOpenConsulta(true);
    const handleCloseConsulta = () => setOpenConsulta(false);
    const handleOpenProntuario = () => setOpenProntuario(true);
    const handleCloseProntuario = () => setOpenProntuario(false);
  

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
        var limitTimeForChange = dayjs(data).subtract(1, 'hour').format('DD/MM/YYYY HH:mm:ss')
        setLimitTime(limitTimeForChange)
    }

    function dateNow(){
        setAgora(dayjs().format('DD/MM/YYYY HH:mm:ss'))
    }

    function formatDateAppointment(){
        setFormattedDate(dayjs(data).format('DD/MM/YYYY HH:mm:ss'))
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
            await api.put(`/consulta/cancelar/${id_consulta}`)
            handleClick()
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        }
    }

    async function removerConsulta(id){
        const res = window.confirm('Deseja realmente excluir?')
        if(res){
            try {
                const result = await api.delete(`/admin/consultas/deletar/${id_consulta}`)
                handleClick1()
                window.location.reload()
            } catch(err) {
                console.log("ops! ocorreu um erro" + err)
            }
        }
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClick1 = () => {
        setOpen1(true);
    };	

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen1(false);
    };

    function done(){
        api.put(`/consulta/done/${id_consulta}`)
    }

    return(
        <Card sx={{ 
            maxWidth: 300,
            margin: 3,
        }}>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose1} sx={{ width: '100%' }}>Consulta Cancelada.</Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open1}
                autoHideDuration={6000}
                onClose={handleClose1}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose1} sx={{ width: '100%' }}>Consulta excluida com sucesso.</Alert>
            </Snackbar>
            <Modal
                open={openConsulta}
                onClose={handleCloseConsulta}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{padding: '0px 1.5rem 1.5rem 1.5rem'}}>
                    <Button onClick={handleCloseConsulta} color='error' style={{fontSize: '25px', fontWeight: 'bold'}}>X</Button>
                    <div style={{display: 'flex', width: '100%'}}>
                        <div style={{flex: 1}}>
                        <iframe src={`https://meet.jit.si/${url_consulta}`} frameborder="0" width="100%" height="500" allow="microphone; camera"/>
                        </div>

                        {(typeUser === 'Medico') && (
                            <div>
                                <FormProntuario id_paciente={id_paciente}/>
                            </div>
                        )}
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openProntuario}
                onClose={handleCloseProntuario}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{padding: '0px 1.5rem 1.5rem 1.5rem'}}>
                    <Button onClick={handleCloseProntuario} color='error' style={{fontSize: '25px', fontWeight: 'bold'}}>X</Button>
                    <Prontuario idPaciente={id_paciente}/>
                </Box>
            </Modal>

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
                
                {(typeUser === 'Medico') &&
                    <Typography gutterBottom variant="p" component="div">
                        <b>Paciente:</b> {paciente.nome} 
                    </Typography>
                }       

                {(typeUser === 'Paciente') &&
                   <Typography gutterBottom variant="p" component="div">
                       <b>Médico:</b> {medico.nome} 
                    </Typography> 
                }    

                <Typography gutterBottom variant="p" component="div">
                    <b>Especialidade:</b> {especialidade.nome}
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

                        {(typeUser === 'Medico') && (
                            <Button onClick={handleOpenProntuario}>Prontuário</Button>
                        )}

                        {(status === 'Agendado') && (agora <= limitTime) && (
                            <Button size="small" color='warning' onClick={cancelarConsulta}>Cancelar</Button>
                        )}

                        {(
                            (status === 'Agendado') 
                        && 
                            (agora >= dayjs(data).subtract(10, 'minute').format('DD/MM/YYYY HH:mm:ss')) 
                        && 
                            (agora <= dayjs(data).add(1, 'hour').format('DD/MM/YYYY HH:mm:ss'))
                        ) && (
                            typeUser === "Paciente" ? (
                            <Button onClick={() => {handleOpenConsulta(); setTimeout(done, 60000);}}>Acessar Consulta</Button>) : (
                            <Button onClick={handleOpenConsulta}>Acessar Consulta</Button>)
                        )}
                            

                </CardActions>
            </Box>
            
        </Card>       
    )
}

export default CardConsulta