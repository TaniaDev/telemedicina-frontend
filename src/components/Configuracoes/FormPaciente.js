import React, { useState, useEffect } from 'react'
import {
    MonitorWeight,Height, PestControl, Coronavirus, SmokingRooms, Medication} from '@mui/icons-material'
import api from '../../services/api'
import { Box, InputAdornment, Button } from '@mui/material'
import {DoubleItem, InputItem} from '../../styles/Cadastro'

function FormPaciente() {
    const [peso, setPeso] = useState("")
    const [altura, setAltura] = useState("")
    const [alergia, setAlergia] = useState("")
    const [doenca, setDoenca] = useState("")
    const [vicio, setVicio] = useState("")
    const [medicamento, setMedicamento] = useState("")

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
            alert('Peso é obrigatório!')
            return
        }

        if (!altura) {
            alert('Altura é obrigatório!')
            return
        }

        alert('Usuario atualizado com sucesso!')
        await api.put('/paciente', { peso, altura, alergia, doenca_cronica: doenca, vicio, medicamento })
        window.location.reload(false)

    }

    return (
        <>
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