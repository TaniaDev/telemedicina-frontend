import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { InputAdornment } from '@mui/material'
import { Email, Https, LocalConvenienceStoreOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
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
            if(!email){
                alert("Campo e-mail é obrigatório!")
                return
            }
            
            if(!senha){
                alert("Campo senha é obrigatório!")
                return
            }

            const res = await api.post("/login", { email: email, senha: senha });

            const usuario = res.data

            if(!usuario.accessToken){
                alert("E-mail e/ou senha incorreto(s)!")
                return
            }else{
                localStorage.setItem("token", usuario.accessToken)
                setLoading(false)
                history.push('/admin')
            }
        } catch (err) {
            console.error("ops! ocorreu um erro" + err)
        }
    }

    async function esqueceuASenha(){
        try{
            if(!email || email == null){
                alert('Preencha o e-mail e clique em esqueceu a senha novamente')
                return
            }

            const res = await api.post("/usuario/esqueceu_a_senha", { email });
            window.location.href = `/usuario/redefinir_senha/${res.data.token}`
        } catch (err) {
            console.error("ops! ocorreu um erro" + err)
        }
    }

    const handleChangeEyeIcon = (e) => {
        e.preventDefault()
        setIsShowing(!isShowing);
    }

    return (
        <Principal columns={16}>
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
                        <ButtonLogin variant="contained" color="primary" onClick={handleLogin} disabled={loading}>
                            {loading? "carregando..." : "Entrar"}
                        </ButtonLogin>
			            <Text style={{alignSelf: 'center'}}>
                            <a href="#" onClick={esqueceuASenha}>
                                Esqueceu a senha?
                            </a>
                        </Text>
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
