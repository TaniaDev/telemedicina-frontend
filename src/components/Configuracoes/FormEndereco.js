import React, { useState, useEffect } from 'react'
import { LocationOn, LooksOne, Add, LocationCity, EmojiTransportation} from '@mui/icons-material'
import api from '../../services/api'
import { Box, InputAdornment, Button, Snackbar, IconButton, Alert } from '@mui/material'
import {DoubleItem, InputItem} from '../../styles/Cadastro'

function UpdateAddressForm() {
    const [cep, setCep] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [bairro, setBairro] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);

    useEffect(() => {
        getEndereco();
    },[])

    async function getEndereco(){
        const result = await api.get('/usuario/endereco')       
        setCep(result.data.cep)
        setNumero(result.data.numero)
        setComplemento(result.data.complemento)
        setCidade(result.data.cidade)     
        setEstado(result.data.estado)     
    }

    function checkCep(e){
        const cepLimpo = cep.replace(/\D/g, '')
        fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
            .then(res => res.json())
            .then(data => {
                setLogradouro(data.logradouro)
                setBairro(data.bairro)
                setCidade(data.localidade)
                setEstado(data.uf)
        })
    }

    async function atualizarEndereco(){
        if(!cep){
            handleClick()
            return
        }

        if(!numero){
            handleClick1()
            return
        }

        if(!cidade){
            handleClick2()
            return
        }

        if(!estado){
            handleClick3()
            return
        }
    
        handleClick4()
        await api.put('/usuario/endereco', {cep, numero, complemento, cidade, estado})
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

    const handleClick3 = () => {
        setOpen3(true);
    };	
    
    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen3(false);
    };

    const handleClick4 = () => {
        setOpen4(true);
    };	
    
    const handleClose4 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen4(false);
    };

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose} sx={{ width: '100%' }}>Cep é obrigatório.</Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open1}
                autoHideDuration={6000}
                onClose={handleClose1}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose1} sx={{ width: '100%' }}>Número é obrigatório.</Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open2}
                autoHideDuration={6000}
                onClose={handleClose2}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose2} sx={{ width: '100%' }}>Cidade é obrigatório.</Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open3}
                autoHideDuration={6000}
                onClose={handleClose3}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose3} sx={{ width: '100%' }}>Estado é obrigatório.</Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open4}
                autoHideDuration={6000}
                onClose={handleClose4}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose4} sx={{ width: '100%' }}>Endereço Atualizado.</Alert>
            </Snackbar>
            <Box>
                <InputItem
                    style={{ width: 300 }}
                    variant="filled"
                    label="Informe seu cep"
                    value={cep}
                    onChange={e => setCep(e.target.value)}
                    onBlur={checkCep}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationOn />
                            </InputAdornment>),
                    }}
                />
            </Box>

            <DoubleItem>
                <Box>
                    <InputItem
                        style={{ width: 300 }}
                        variant="filled"
                        label="Logradouro"
                        value={logradouro}
                        disabled={true}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmojiTransportation />
                                </InputAdornment>),
                        }}
                    />
                </Box>

                <Box>
                    <InputItem
                        style={{ width: 300 }}
                        variant="filled"
                        label="Número"
                        value={numero}
                        onChange={e => setNumero(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LooksOne />
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
                        label="Bairro"
                        value={bairro}
                        disabled={true}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmojiTransportation />
                                </InputAdornment>),
                        }}
                    />
                </Box>
                <Box>
                    <InputItem
                        style={{ width: 300 }}
                        variant="filled"
                        label="Complemento"
                        value={complemento}
                        onChange={e => setComplemento(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Add />
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
                        label="Cidade"
                        value={cidade}
                        disabled={true}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationCity />
                                </InputAdornment>),
                        }}
                    />
                </Box>
                <Box>
                    <InputItem
                        style={{ width: 300 }}
                        variant="filled"
                        label="Estado"
                        value={estado}
                        disabled={true}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationCity />
                                </InputAdornment>),
                        }}
                    />
                </Box>
            </DoubleItem>
            <Button variant="contained" size="large" color="success" sx={{ margin: 1 }} onClick={atualizarEndereco}><h4>ATUALIZAR</h4></Button>
        </>
    )
}

export default UpdateAddressForm