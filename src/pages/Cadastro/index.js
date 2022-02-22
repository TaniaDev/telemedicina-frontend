import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import photo from "../../img/photo_register.png"
import { AccountBox, ArrowBack, Email, Lock, LocalPhone } from '@mui/icons-material'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, NativeSelect, Select, TextField } from '@mui/material'
import UnstyledTabsCustomized from './UnstyledTabsCustomized'
import logo from '../../img/logoAzulHoriz.png'
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
    const [dt_nascimento, setDt_nascimento] = useState("")
    const [genero, setGenero] = useState("")
    const [tipo, setTipo] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmasenha, setConfirmaSenha] = useState("")

    async function handleCadastro(e) {
        e.preventDefault()
        const data = {nome, dt_nascimento, genero, telefone, email, senha, tipo}

        if(!nome || !dt_nascimento || !genero || !telefone || !email || !senha || !tipo) {
            alert("Preencha todos os dados para realizar o cadastro.")
        } else if (confirmasenha !== senha) {
            alert("Senhas não correspondem.")
        }
        else {
            try {
                const response = await api.post("/cadastrar", {nome, dt_nascimento, genero, telefone, email, senha, tipo});
                console.log(response.data)
                alert('Seu cadastro foi realizado!')
                history.push('/');
            } catch (err) {
                // console.error("ops! ocorreu um erro" + err);
            }
        }
    }

    return (
        <Principal>
            <PaperStyled>
                <RegisterContainer>
                    <LogoContainer>
                        <Logo src={logo} alt="Telemedicina" />
                        <Title>Cadastre-se</Title>
                    </LogoContainer>
                    <Container>
                        <UnstyledTabsCustomized/>
                        <DoubleItem>
                            <Box>
                                <InputItem
                                    style={{ width: 416 }}
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
                        </DoubleItem>
                        <DoubleItem>
                            <InputItem
                                style={{ width: 208 }}
                                variant="filled"
                                type="date"
                                label="Informe sua data de nascimento"
                                value={dt_nascimento}
                                onChange={e => setDt_nascimento(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Box>
                                <FormControl variant="filled">
                                    <InputLabel>Tipo de Usuário</InputLabel>
                                    <Select
                                        style={{ width: 192 }} 
                                        value={tipo}
                                        onChange={e => setTipo(e.target.value)}
                                    >
                                        <MenuItem value="Medico">Médico</MenuItem>
                                        <MenuItem value="Paciente">Paciente</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <InputItem
                                    style={{ width: 208 }} 
                                    type="tel"
                                    variant="filled"
                                    label="Informe seu telefone"
                                    value={telefone}
                                    onChange={e => setTelefone(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <LocalPhone />
                                        </InputAdornment> ),}}
                                />
                            </Box>
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
