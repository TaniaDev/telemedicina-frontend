import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { 
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Snackbar, 
    IconButton, 
    Alert
} from '@mui/material'
import {ExpandMore} from '@mui/icons-material';
import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'

function CheckNewDoctors(){    
    const [newDoctors, setNewDoctors] = useState([])
    const [specialties, setSpecialties] = useState([])
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    useEffect(() => {
        getNewDoctors()
        getAllSpecialities()
    },[])

    async function getNewDoctors(){
        const result = await api.get('/medico/getNewDoctors')
        setNewDoctors(result.data)
    }

    setInterval(getNewDoctors, 60000)

    async function getAllSpecialities(){
        const result = await api.get(`/medico/getSpecialityByDoctor`)
        setSpecialties(result.data)
    }

    async function deleteMedicoEspecialidade(id_medico, id_especialidade){
        const res = window.confirm('Deseja Realmente Remover Essa Especialidade?')
        if (res) {
            await api.delete(`/medico/medico_especialidade/${id_medico}/${id_especialidade}`)
            handleClick()
            getAllSpecialities()
        }
    }

    async function aprovarCadastro(id_medico, nome, email){
        const res = window.confirm("Ao clicar em 'OK' você concorda com todas as especialidades selecionadas")
        if (res) {
            await api.put(`/medico/validar_medico/${id_medico}/${nome}/${email}`)
            handleClick1()
            getNewDoctors()
        }
    }
    async function reprovarCadastro(id_medico, nome, email){
        const res = window.confirm("Deseja realmente reprovar o cadastro?")
        if (res) {
            await api.delete(`/medico/reprovarMedico/${id_medico}/${nome}/${email}`)
            handleClick2()
            getNewDoctors()
        }
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

    
    const handleClick1 = () => {
        setOpen1(true);
    };	
    
    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen1(false);
    };

    const handleClick2 = () => {
        setOpen2(true);
    };	
    
    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen2(false);
    };



    return (
        <>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            style={{width: '40%'}}
        >
            <Alert variant="filled" severity="success" onClose={handleClose} sx={{ width: '100%' }}>Especialidade Removida.</Alert>
        </Snackbar>

        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open1}
            autoHideDuration={6000}
            onClose={handleClose1}
            style={{width: '40%'}}
        >
            <Alert variant="filled" severity="success" onClose={handleClose1} sx={{ width: '100%' }}>Médico Aprovado.</Alert>
        </Snackbar>

        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open2}
            autoHideDuration={6000}
            onClose={handleClose2}
            style={{width: '40%'}}
        >
            <Alert variant="filled" severity="error" onClose={handleClose2} sx={{ width: '100%' }}>Médico Reprovado.</Alert>
        </Snackbar>

            <NavBar>
                <BaseLayout title='Gerenciar Usuários'>
                    <h1>NOVOS MÉDICOS</h1>
                    {newDoctors.length === 0 ? <p>Não Há Registros.</p> : <p>Aguardando Verificação do Administrador.</p>}
                    
                    
                    <div>
                        {newDoctors.map(doctor => (
                            <>
                            <Accordion>
                                {/* Head */}
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography><b>Médico:</b> {doctor.nome}</Typography>
                                </AccordionSummary>
                                
                                {/* Body */}
                                <AccordionDetails>
                                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                        <p style={{flex: 1}}><b>Telefone: </b>{doctor.telefone}</p>
                                        <p style={{flex: 1}}><b>E-mail: </b>{doctor.email}</p>
                                        <p style={{flex: 1}}><b>CRM: </b>{doctor.crm}</p>
                                    </div>
                                    <p><b>Especialidades</b></p>
                                    <ul>
                                        {specialties.map(item => {
                                            if(item.id_medico === doctor.id){
                                                return(
                                                    <li style={{marginTop: '1rem'}}>
                                                        <div style={{display: 'flex'}}>
                                                            <div style={{flex: 1}}>{item.nome}</div>
                                                            <div style={{flex: 1}}>
                                                            <Button variant="contained" size="small" color="error" onClick={() => {deleteMedicoEspecialidade(item.id_medico, item.id_especialidade)}}>X</Button>
                                                            </div>

                                                        </div>
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ul>
                                   
                                </AccordionDetails>
                                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                                    <Button variant="contained" size="small" fullWidth onClick={() => {aprovarCadastro(doctor.id, doctor.nome, doctor.email)}} style={{flex: 1, maxWidth: '45%'}}>Aprovar</Button>
                                    <Button variant="contained" size="small" color="error" fullWidth onClick={() => {reprovarCadastro(doctor.id, doctor.nome, doctor.email)}} style={{flex: 1, maxWidth: '45%'}}>Reprovar</Button>
                                </div>
                            </Accordion>
                            </>  
                        ))}

                    </div>
                </BaseLayout>
            </NavBar>
        </>
    )
}

export default CheckNewDoctors
