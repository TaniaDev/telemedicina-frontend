import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { InputAdornment } from '@mui/material'
import { Email, Https, Visibility, VisibilityOff } from '@mui/icons-material'
import logo from "../../img/logoAzulHoriz.png"
import { useAuthContext } from '../../context/AuthContext'
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
    const navigate = useNavigate()
    const { login } = useAuthContext()
    const [isShowing, setIsShowing] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            senha: ''
        },
        onSubmit: (values) => {
            login(values.email, values.senha)
        }
    })

    const handleChangeEyeIcon = (e) => {
        e.preventDefault()
        setIsShowing(!isShowing);
    }

    return (
        <Principal columns={16}>
            <PaperStyled elevation={10}>
                <LoginContainer>
                    <form onSubmit={formik.handleSubmit}>
                        <LogoContainer>
                            <Logo src={logo} alt="Telemedicina" />
                            <Title>Olá novamente!</Title>
                            <Text>Faça seu login para entrar na plataforma.</Text>
                        </LogoContainer> 
                        <Container>
                            <InputItem
                                id='email'
                                type='text'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),}}
                                value={formik.email}
                                onChange={formik.handleChange}
                                label="Digite seu email"
                                variant="filled"
                            />
                            <InputItem
                                id='senha'
                                type={isShowing ? "text" : "password"}
                                InputProps={{
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
                                value={formik.senha}
                                onChange={formik.handleChange}
                                label="Digite sua senha"
                                variant="filled"
                            />
                        </Container>
                        <Container>
                            <ButtonLogin
                                variant="contained"
                                color="primary"
                                type='submit'
                            >
                               Entrar 
                            </ButtonLogin>
                            <Text style={{alignSelf: 'center'}} textDecaration='none'>
                                <Link to="/recuperar-senha">
                                    Esqueceu a senha?
                                </Link>
                            </Text>
                            <Text style={{alignSelf: 'center'}}>Você é novo?</Text>
                            <ButtonLogin variant='outlined' color="primary" onClick={() => navigate('/cadastro')}>
                                Cadastrar
                            </ButtonLogin>
                        </Container>
                    </form>
                </LoginContainer>
            </PaperStyled>
        </Principal>
    )
}

export default Login
