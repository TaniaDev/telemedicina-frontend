import React, { useState, useEffect } from 'react'
import {
    MonitorWeight,Height, PestControl, Coronavirus, SmokingRooms, Medication} from '@mui/icons-material'
import api from '../../services/api'
import { Box, InputAdornment, Button, Snackbar, IconButton, Alert } from '@mui/material'
import {DoubleItem, InputItem} from '../../styles/Cadastro'

function FormPaciente() {
    const [peso, setPeso] = useState("")
    const [altura, setAltura] = useState("")
    const [alergia, setAlergia] = useState("")
    const [doenca, setDoenca] = useState("")
    const [vicio, setVicio] = useState("")
    const [medicamento, setMedicamento] = useState("")
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    useEffect(() => {
        getPaciente();
    }, [])

    async function getPaciente() {
        const result = await api.get('/paciente')
        setPeso(result.data.peso)
        setAltura(result.data.altura)
        setAlergia(result.data.alergia)
        setDoenca(result.data.doenca_cronica)
        setVicio(result.data.vicio)
        setMedicamento(result.data.medicamento)
    }

    async function atualizarPaciente() {
        if (!peso) {
            handleClick()
            return
        }

        if (!altura) {
            handleClick1()
            return
        }

        handleClick2()
        await api.put('/paciente', { peso, altura, alergia, doenca_cronica: doenca, vicio, medicamento })
        setTimeout(() => {
            window.location.reload(false)
        }, 3000)

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
                <Alert variant="filled" severity="warning" onClose={handleClose} sx={{ width: '100%' }}>Peso é obrigatório.</Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open1}
                autoHideDuration={6000}
                onClose={handleClose1}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="warning" onClose={handleClose1} sx={{ width: '100%' }}>Altura é obrigatório.</Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open2}
                autoHideDuration={6000}
                onClose={handleClose2}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose2} sx={{ width: '100%' }}>Usuario Atualizado.</Alert>
            </Snackbar>

            <DoubleItem>
                <Box>
                    <InputItem
                        style={{ width: 300 }}
                        variant="filled"
                        label="Peso"
                        value={peso}
                        onChange={e => setPeso(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MonitorWeight />
                                </InputAdornment>),
                        }}
                    />
                </Box>
                <Box>
                    <InputItem
                        style={{ width: 300 }}
                        variant="filled"
                        label="Altura"
                        value={altura}
                        onChange={e => setAltura(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Height />
                                </InputAdornment>),
                        }}
                    />
                </Box>
            </DoubleItem>
            <DoubleItem>
                <Box>
                    <InputItem
                        style={{ width: 300 }}
                        variant="filled"
                        label="Alergia(s)"
                        value={alergia}
                        onChange={e => setAlergia(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    < PestControl />
                                </InputAdornment>),
                        }}
                    />
                </Box>
                <Box>
                    <InputItem
                        style={{ width: 300 }}
                        variant="filled"
                        label="Doença(s) cronica"
                        value={doenca}
                        onChange={e => setDoenca(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Coronavirus />
                                </InputAdornment>),
                        }}
                    />
                </Box>
            </DoubleItem>
            <DoubleItem>
                <Box>
                    <InputItem
                        style={{ width: 300 }}
                        variant="filled"
                        label="Vicio(s)"
                        value={vicio}
                        onChange={e => setVicio(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SmokingRooms />
                                </InputAdornment>),
                        }}
                    />
                </Box>
                <Box>
                    <InputItem
                        style={{ width: 300 }}
                        variant="filled"
                        label="Medicamento(s)"
                        value={medicamento}
                        onChange={e => setMedicamento(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Medication />
                                </InputAdornment>),
                        }}
                    />
                </Box>
            </DoubleItem>
            <Button variant="contained" size="large" color="success" sx={{ margin: 1 }} onClick={atualizarPaciente}><h4>ATUALIZAR</h4></Button>
        </>
    )
}

export default FormPaciente