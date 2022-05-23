import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
    AccountBox, Email, Lock, LocalPhone, LocationOn, LooksOne, Add, LocationCity, MonitorWeight, 
    Height,  PestControl, Coronavirus, SmokingRooms, Medication, ChevronRight, KeyboardArrowLeft
} from '@mui/icons-material'
import api from '../../services/api'
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material'
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
    const navigate = useNavigate()
    const [nome, setNome] = useState("")
    const [dt_nascimento, setDt_nascimento] = useState("")
    const [genero, setGenero] = useState("")
    const [tipo, setTipo] = useState("Paciente")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmasenha, setConfirmaSenha] = useState("")
    const [cep, setCep] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [peso, setPeso] = useState("")
    const [altura, setAltura] = useState("")
    const [alergia, setAlergia] = useState("")
    const [doenca, setDoenca] = useState("")
    const [vicio, setVicio] = useState("")
    const [medicamento, setMedicamento] = useState("")
    const [crm, setCrm] = useState("")

    async function handleCadastro(e) {
        e.preventDefault()
        const data = {nome, dt_nascimento, genero, telefone, email, senha, tipo}

        if (!nome || !dt_nascimento || !genero || !telefone || !email || !senha || !tipo || !cep || !numero || !cidade || !estado || (tipo == 'Paciente' ? (!peso || !altura) : (!crm))) {
            if(senha != confirmasenha){
                alert("Senhas não correspondem.")
            }

            alert("Preencha todos os campos!")
        } else {
            try {
                const response = await api.post("/usuario/cadastrar", {nome, dt_nascimento, genero, telefone, email, senha, tipo, cep, numero, complemento, cidade, estado, peso, altura, alergia, doenca, vicio, medicamento, crm});

                console.log(response.data)
                alert('Seu cadastro foi realizado!')
                navigate('/');
            } catch (err) {
                console.error("ops! ocorreu um erro: " + err);
            }
        }
    }

    function passoUm(){
        document.getElementById("passoUm").hidden = false;

        document.getElementById("passoDois").hidden = true;
        document.getElementById("passoTres").hidden = true;
    }

    function passoDois(){
        document.getElementById("passoDois").hidden = false;

        document.getElementById("passoUm").hidden = true;
        document.getElementById("passoTres").hidden = true;
    }

    function passoTres(){
        document.getElementById("passoTres").hidden = false;

        document.getElementById("passoUm").hidden = true;
        document.getElementById("passoDois").hidden = true;

        if(tipo == 'Paciente'){
            document.getElementById("medico").hidden = true;
            document.getElementById("paciente").hidden = false;
        }else{
            document.getElementById("paciente").hidden = true;
            document.getElementById("medico").hidden = false;
        }
    }

    useEffect(() => {
        passoUm();
    },[])

    return (
        <Principal>
            <PaperStyled>
                <RegisterContainer>
                    <LogoContainer>
                        <Logo src={logo} alt="Telemedicina" />
                        <Title>Cadastre-se</Title>
                    </LogoContainer>
                    <div id="passoUm">
                        {/* <UnstyledTabsCustomized/> */}
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
                        <DoubleItem>
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
                        </DoubleItem>
                        
                        <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <DoubleItem>
                            <ButtonRegister variant='contained' color="primary" id="setaEsquerda" disabled={true}><KeyboardArrowLeft/></ButtonRegister>
                                <ButtonRegister variant='contained' color="primary" id="setaDireita" onClick={passoDois}><ChevronRight/></ButtonRegister>
                            </DoubleItem>
                        </Container>
                        
                    </div>
                    <div id="passoDois">
                        <DoubleItem>
                                <Box>
                                    <InputItem
                                        style={{ width: 300 }}
                                        variant="filled"
                                        label="Informe seu cep"
                                        value={cep}
                                        onChange={e => setCep(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOn />
                                            </InputAdornment> ),}}
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
                                            </InputAdornment> ),}}
                                    />
                                </Box>
                        </DoubleItem>

                        <Box>
                            <InputItem
                                style={{ width: '100%' }}
                                variant="filled"
                                label="Complemento"
                                value={complemento}
                                onChange={e => setComplemento(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <Add />
                                    </InputAdornment> ),}}
                            />
                        </Box>
                        <DoubleItem>
                            <Box>
                                <InputItem
                                    style={{ width: 300 }}
                                    variant="filled"
                                    label="Cidade"
                                    value={cidade}
                                    onChange={e => setCidade(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationCity />
                                        </InputAdornment> ),}}
                                />
                            </Box>
                            <Box>
                                <InputItem
                                    style={{ width: 300 }}
                                    variant="filled"
                                    label="Estado"
                                    value={estado}
                                    onChange={e => setEstado(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationCity />
                                        </InputAdornment> ),}}
                                />
                            </Box>
                        </DoubleItem>

                        <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <DoubleItem>
                            <ButtonRegister variant='contained' color="primary" id="setaEsquerda" onClick={passoUm}><KeyboardArrowLeft/></ButtonRegister>
                                <ButtonRegister variant='contained' color="primary" id="setaDireita" onClick={passoTres}><ChevronRight/></ButtonRegister>
                            </DoubleItem>
                        </Container>
                    </div>
                    <div id="passoTres">
                        <div id="paciente">
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
                                            </InputAdornment> ),}}
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
                                            </InputAdornment> ),}}
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
                                            </InputAdornment> ),}}
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
                                            </InputAdornment> ),}}
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
                                            </InputAdornment> ),}}
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
                                            </InputAdornment> ),}}
                                    />
                                </Box>
                            </DoubleItem>
                        </div>
                        <div id="medico">
                            <Box>
                                <InputItem
                                    style={{ width: 300 }}
                                    variant="filled"
                                    label="CRM"
                                    value={crm}
                                    onChange={e => setCrm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <LooksOne />
                                        </InputAdornment> ),}}
                                />
                            </Box>
                                    
                        </div>
                        <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <DoubleItem>
                            <ButtonRegister variant='contained' color="primary" id="setaEsquerda" onClick={passoDois}><KeyboardArrowLeft/></ButtonRegister>
                                <ButtonRegister variant='contained' color="primary" id="setaDireita" disabled={true}><ChevronRight/></ButtonRegister>
                            </DoubleItem>
                        </Container>
                        <Container sx={{display: 'flex'}}>
                            <ButtonRegister variant="contained" color="primary" type="submit" onClick={e => handleCadastro(e)}>
                                Confirmar Cadastro
                            </ButtonRegister>
                        </Container>
                    </div>
                    
                    <Container>
                        <Text style={{alignSelf: 'center'}}>Você já possui uma conta?</Text>
                        <ButtonRegister variant='outlined' color="primary" onClick={() => navigate('/')}>
                            Fazer Login
                        </ButtonRegister>
                    </Container>
                </RegisterContainer>
            </PaperStyled>
        </Principal>
    )
}

export default Cadastro
