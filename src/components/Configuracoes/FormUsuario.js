import React, { useState, useEffect } from 'react'
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, Button, Snackbar, IconButton, Alert } from '@mui/material'
import {AccountBox, Email, Lock, LocalPhone} from '@mui/icons-material'
import api from '../../services/api'
import {DoubleItem, InputItem} from '../../styles/Cadastro'

function FormUsuario() {
    const [nome, setNome] = useState("")
    const [genero, setGenero] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);

    useEffect(() => {
        getUsuario();
    },[])

    async function getUsuario(){
        const result = await api.get('/usuario')
        setNome(result.data.nome)
        setGenero(result.data.genero)
        setEmail(result.data.email)
        setTelefone(result.data.telefone)     
    }

    async function atualizarDadosUsuario(){
        if(!nome){
            handleClick()
            return
        }

        if(!genero){
            handleClick1()
            return
        }

        if(!email){
            handleClick2()
            return
        }

        if(!telefone){
            handleClick3()
            return
        }

        if(senha){
            await api.put('/usuario/editar', {data:{nome, genero, email, telefone, senha}})
        }else{
            await api.put('/usuario/editar', {data:{nome, genero, email, telefone}})
        }
        handleClick3()
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
            <Alert variant="filled" severity="warning" onClose={handleClose} sx={{ width: '100%' }}>Nome é obrigatório.</Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open1}
            autoHideDuration={6000}
            onClose={handleClose1}
            style={{width: '40%'}}
        >
            <Alert variant="filled" severity="warning" onClose={handleClose1} sx={{ width: '100%' }}>Genero é obrigatório.</Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open2}
            autoHideDuration={6000}
            onClose={handleClose2}
            style={{width: '40%'}}
        >
            <Alert variant="filled" severity="warning" onClose={handleClose2} sx={{ width: '100%' }}>E-mail é obrigatório.</Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open3}
            autoHideDuration={6000}
            onClose={handleClose3}
            style={{width: '40%'}}
        >
            <Alert variant="filled" severity="warning" onClose={handleClose3} sx={{ width: '100%' }}>Telefone é obrigatório.</Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open4}
            autoHideDuration={6000}
            onClose={handleClose4}
            style={{width: '40%'}}
        >
            <Alert variant="filled" severity="success" onClose={handleClose4} sx={{ width: '100%' }}>Dados Atualizados.</Alert>
        </Snackbar>


            <form>
                <DoubleItem>
                    <Box>
                        <InputItem
                            style={{ width: '100%' }}
                            variant="filled"
                            label="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBox />
                                    </InputAdornment>),
                            }}
                        />
                    </Box>
                    <Box>
                        <FormControl variant="filled">
                            <InputLabel>Gênero</InputLabel>
                            <Select
                                style={{ width: 208 }}
                                value={genero}
                                onChange={e => setGenero(e.target.value)}
                            >
                                <MenuItem value="H">Homem</MenuItem>
                                <MenuItem value="M">Mulher</MenuItem>
                                <MenuItem value="O">Outro</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DoubleItem>
                <DoubleItem>
                    <Box>
                        <InputItem
                            style={{ width: '100%' }}
                            type="tel"
                            variant="filled"
                            label="Telefone"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalPhone />
                                    </InputAdornment>),
                            }}
                        />
                    </Box>
                    <Box>
                        <InputItem
                            style={{ width: '100%' }}
                            type="email"
                            variant="filled"
                            label="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>),
                            }}
                        />
                    </Box>
                </DoubleItem>

                <DoubleItem>
                    <Box>
                        <InputItem
                            style={{ width: '100%' }}
                            type="password"
                            variant="filled"
                            label="Senha"
                            onChange={e => setSenha(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>),
                            }}
                        />
                    </Box>
                    
                </DoubleItem>
                <Button variant="contained" size="large" color="success" sx={{ margin: 1 }} onClick={atualizarDadosUsuario}><h4>ATUALIZAR</h4></Button>

            </form>
        </>
    )
}

export default FormUsuario