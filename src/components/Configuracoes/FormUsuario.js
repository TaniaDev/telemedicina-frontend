import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'

import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material'
import {AccountBox, Email, Lock, LocalPhone} from '@mui/icons-material'
import api from '../../services/api'
import {DoubleItem, InputItem} from '../../styles/Cadastro'
import { useAuthContext } from '../../context/AuthContext'

function FormUsuario() {
    const { usuario } = useAuthContext()
    const [id, setId] = useState('')
    const [nome, setNome] = useState("")
    const [genero, setGenero] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")

    useEffect(() => {
        getUsuario()
        getIdUsuario()
    },[])

    function getIdUsuario(){
        setId(usuario.result[0].id)
    }

    async function getUsuario(){
        const result = await api.get('/usuario/obter')
        setNome(result.data.nome)
        setGenero(result.data.genero)
        setEmail(result.data.email)
        setTelefone(result.data.telefone)     
    }

    async function atualizarDadosUsuario(){
        if(!nome){
            alert('Nome é obrigatório!')
            return
        }

        if(!genero){
            alert('Genero é obrigatório!')
            return
        }

        if(!email){
            alert('E-mail é obrigatório!')
            return
        }

        if(!telefone){
            alert('Telefone é obrigatório!')
            return
        }

        if(senha){
            await api.put('/usuario/atualizar', { nome, genero, email, telefone, senha })
        }else{
            await api.put('/usuario/atualizar', { nome, genero, email, telefone })
        }
        alert('Dados de usuário atualizado com sucesso!')
        window.location.reload(false)
        
    }

    return (
        <>
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