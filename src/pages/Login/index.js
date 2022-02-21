import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { InputAdornment } from '@mui/material'
import { Email, Https, Visibility, VisibilityOff } from '@mui/icons-material'
import logo from "../../img/logoAzulHoriz.png"
import api from '../../services/api'
import {
    ButtonLogin,
    Container,
    InputItem,
    Logo,
    LoginContainer,
    LogoContainer,
    PaperStyled,
    Principal,
    Text,
    Title
} from '../../styles/Login'

function Login() {
    let history = useHistory();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [isShowing, setIsShowing] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        try {
            const res = await api.post("/login", { email: email, senha: senha });
            console.log(res.data);
            setLoading(false);
            history.push('/index');
        } catch (err) {
            console.error("ops! ocorreu um erro" + err)
        }
    }

    function loadLogin() {
        setLoading(true);
        setTimeout(
           () => handleLogin(),
           2000
        )
    }

    const handleChangeEyeIcon = (e) => {
        e.preventDefault()
        setIsShowing(!isShowing);
    }

    return (
        <Principal columns={16} >
            <PaperStyled elevation={10}>
                <LoginContainer>
                    <LogoContainer>
                        <Logo src={logo} alt="Telemedicina" />
                        <Title>Olá novamente!</Title>
                        <Text>Faça seu login para entrar na plataforma.</Text>
                    </LogoContainer>
                    <Container>
                        <InputItem InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment> ),}}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            label="Digite seu email"
                            variant="filled"
                        />
                        <InputItem InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <Https />
                            </InputAdornment> ),
                            endAdornment: (
                            <InputAdornment position="end">
                                <div onClick={handleChangeEyeIcon}>
                                    {isShowing ? <Visibility size={20} /> : <VisibilityOff size={20} />}
                                </div>
                            </InputAdornment>
                            ),}}
                            type={isShowing ? "text" : "password"}
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            label="Digite sua senha"
                            variant="filled"
                        />
                    </Container>
                    <Container>
                        <ButtonLogin variant="contained" color="primary" onClick={loadLogin} disabled={loading}>
                            {loading? "carregando..." : "Entrar"}
                        </ButtonLogin>
                        <Text style={{alignSelf: 'center'}}>Você é novo?</Text>
                        <ButtonLogin variant='outlined' color="primary" onClick={() => history.push('/cadastro')}>
                            Cadastrar
                        </ButtonLogin>
                    </Container>
                </LoginContainer>
            </PaperStyled>
        </Principal>
    )
}

export default Login
