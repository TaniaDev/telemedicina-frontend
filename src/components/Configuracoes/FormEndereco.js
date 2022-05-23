import React, { useState, useEffect } from 'react'
import { LocationOn, LooksOne, Add, LocationCity, EmojiTransportation} from '@mui/icons-material'
import api from '../../services/api'
import { Box, InputAdornment, Button } from '@mui/material'
import {DoubleItem, InputItem} from '../../styles/Cadastro'
import { useAuthContext } from '../../context/AuthContext'

function FormEndereco() {
    const { usuario } = useAuthContext()
    const [id, setId] = useState('')
    const [cep, setCep] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [bairro, setBairro] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")

    useEffect(() => {
        getEndereco()
        getIdUsuario()
    },[])

    async function getEndereco(){
        const result = await api.get('/usuario/obter')       
        setCep(result.data.cep)
        setNumero(result.data.numero)
        setComplemento(result.data.complemento)
        setCidade(result.data.cidade)     
        setEstado(result.data.estado)
        setLogradouro(result.data.logradouro)
        setBairro(result.data.bairro)
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

    function getIdUsuario(){
        setId(usuario.result[0].id)
    }

    async function atualizarEndereco(){
        if(!cep){
            alert('Cep é obrigatório!')
            return
        }

        if(!numero){
            alert('Número é obrigatório!')
            return
        }

        if(!cidade){
            alert('Cidade é obrigatório!')
            return
        }

        if(!estado){
            alert('Estado é obrigatório!')
            return
        }
    
        alert('Endereço atualizado com sucesso!')
        await api.put('/usuario/atualizar/endereco', {id_usuario_admin: id, logradouro, bairro, cep, numero, complemento, cidade, estado})
        window.location.reload(false)
        
    }

    return (
        <>
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
                        value={logradouro || ''}
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
                        value={numero || ''}
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
                        value={bairro || ''}
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
                        value={complemento || ''}
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
                        value={cidade || ''}
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
                        value={estado || ''}
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

export default FormEndereco