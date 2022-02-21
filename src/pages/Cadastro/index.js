import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AccountBox, Email, Lock } from '@mui/icons-material'
import logo from "../../img/logoAzulHoriz.png"
import api from '../../services/api'
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material'
import {
    ButtonRegister,
    Container,
    DoubleItem,
    InputItem,
    Logo,
    LogoContainer,
    PaperStyled,
    Principal,
    RegisterContainer,
    Text,
    Title
 } from '../../styles/Cadastro'

function Cadastro() {
    let history = useHistory();
    const [nome, setNome] = useState("")
    const [nascimento, setNascimento] = useState("")
    const [genero, setGenero] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmasenha, setConfirmaSenha] = useState("")

    async function handleCadastro(e) {
        e.preventDefault()
        const data = {
                    nome: nome,
                    dt_nascimento: nascimento,
                    genero: genero,
                    email: email,
                    senha: senha
                }
        if(!nome || !nascimento || !genero || !email || !senha) {
            alert("Preencha todos os dados para realizar o cadastro.")
        } else if (confirmasenha !== senha) {
            alert("Senhas não correspondem.")
        }
        else {
            try {
                const response = await api.post("/cadastro", data);
                console.log(response.data)
                alert('Seu cadastro foi realizado!')
                history.push('/');
            } catch (err) {
                console.error("ops! ocorreu um erro" + err);
            }
        }
    }

    return (
        <Principal>
            <PaperStyled>
                <RegisterContainer>
                    <LogoContainer>
                        <Logo src={logo} alt="Telemedicina" />
                        <Title>Cadastro</Title>
                        <Text>Faça seu login para entrar na plataforma.</Text>
                    </LogoContainer>
                    <Container>
                        <Box>
                            <InputItem
                                variant="filled"
                                label="Informe seu nome"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBox />
                                    </InputAdornment> ),}}
                            />
                        </Box>
                        <DoubleItem>
                            <InputItem
                                style={{ width: 232 }}
                                variant="filled"
                                type="date"
                                label="Informe sua data de nascimento"
                                value={nascimento}
                                onChange={e => setNascimento(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormControl variant="filled">
                                <InputLabel>Gênero</InputLabel>
                                <Select
                                    style={{ width: 232 }}                        
                                    value={genero}
                                    onChange={e => setGenero(e.target.value)}
                                >
                                    <MenuItem value="H">Homem</MenuItem>
                                    <MenuItem value="M">Mulher</MenuItem>
                                    <MenuItem value="O">Outro</MenuItem>
                                </Select>
                            </FormControl>
                        </DoubleItem>
                        <Box>
                            <InputItem
                                type="email"
                                variant="filled"
                                label="Informe seu email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment> ),}}
                            />
                        </Box>
                        <Box>
                            <InputItem
                                type="password"
                                variant="filled"
                                label="Informe sua senha"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock/>
                                    </InputAdornment> ),}}
                            />
                        </Box>
                        <Box>
                            <InputItem
                                type="password"
                                variant="filled"
                                label="Digite a senha novamente"
                                value={confirmasenha}
                                onChange={e => setConfirmaSenha(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock/>
                                    </InputAdornment> ),}}
                            />
                        </Box>
                    </Container>    
                    <Container>
                        <ButtonRegister variant="contained" color="primary" type="submit" onClick={e => handleCadastro(e)}>
                            Confirmar Cadastro
                        </ButtonRegister>
                        <Text style={{alignSelf: 'center'}}>Você já possui uma conta?</Text>
                        <ButtonRegister variant='outlined' color="primary" onClick={() => history.push('/')}>
                            Fazer Login
                        </ButtonRegister>
                    </Container>
                </RegisterContainer>
            </PaperStyled>
        </Principal>
    )
}

export default Cadastro
