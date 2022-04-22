import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {TextField, Link, Button} from '@mui/material';
import {Visibility, VisibilityOff } from '@mui/icons-material'
import { useFormik } from "formik";
import * as yup from 'yup';

import photoLogin from '../../img/photo-login.jpg'
import { useAuthContext } from '../../context/AuthContext'
import logo from '../../img/logoAzulHoriz.png'

import {
    Container,
    Left,
    Right,
    Img,
    Form,
    Div,
    LinkStyled,
    DivCadastreSe,
    DivEsqueceuASenha
} from '../../styles/Login/Login'

let Login = () => {
    const navigate = useNavigate()
    const { login } = useAuthContext()
    const [showPassword, setShowPassword] = useState(false)

    function toggleShowPassword(e){
        e.preventDefault()
        setShowPassword(!showPassword);
    }

    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: yup.object({
          email: yup
            .string()
            .email("E-mail inválido.")
            .required("O campo é obrigatório."),
          password: yup
            .string()
            .required("O campo é obrigatório.")
        }),
        onSubmit: (values) => {
            login(values.email, values.password)
        },
      });

    return(
        <Container>
            
            <Left>
                <Img src={logo} alt="Logo"/>

                <h1>Login</h1>

                <Form onSubmit={formik.handleSubmit}>
                    <Div>
                        <TextField 
                            fullWidth 
                            error={formik.touched.email && formik.errors.email}
                            id="email"
                            name="email"
                            type="email"
                            label="E-mail" 
                            variant="outlined" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}/>
                            
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{color: 'red'}}>{formik.errors.email}</div>
                            ) : null}
                    </Div>

                    <Div>
                        <TextField 
                            fullWidth 
                            error={formik.touched.password && formik.errors.password}
                            id="password" 
                            name="password"
                            type={showPassword ? "text" : "password"} 
                            label="Senha" 
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            InputProps={{
                                endAdornment: (
                                    <div onClick={toggleShowPassword} style={{cursor: 'pointer', color: '#343434'}}>
                                        {showPassword ? <Visibility size={20} /> : <VisibilityOff size={20} />}
                                    </div>  
                                ),
                            }}
                        />
                        

                        {formik.touched.password && formik.errors.password ? (
                            <div style={{color: 'red'}}>{formik.errors.password}</div>
                        ) : null}
                    </Div>

                    <DivEsqueceuASenha>
                        <LinkStyled underline="hover" onClick={() => navigate('/recuperar-senha')}>Esqueceu a senha?</LinkStyled>
                    </DivEsqueceuASenha>

                    <Div>
                        <Button fullWidth variant="contained" size="large" onClick={formik.handleSubmit}>
                            Login
                        </Button>
                    </Div>

                </Form>

                <DivCadastreSe>
                    Você não tem uma conta? <LinkStyled underline="hover" onClick={() => navigate('/cadastro')}> Cadastre-se</LinkStyled>
                </DivCadastreSe>
                
            </Left>
            
            <Right/>

        </Container> 
    )
}

export default Login