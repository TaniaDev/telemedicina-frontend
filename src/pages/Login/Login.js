import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {TextField, Link, Button, Modal, Box} from '@mui/material';
import {Visibility, VisibilityOff } from '@mui/icons-material'
import { useFormik } from "formik";
import * as yup from 'yup';

import { useAuthContext } from '../../context/AuthContext'
import logo from '../../img/logoAzulHoriz.png'
import RecoverAccount from '../RecoverAccount'

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
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', boxShadow: 24, p: 4,padding: '0px 1.5rem 1.5rem 1.5rem'}}>
                    <Button onClick={handleClose} color='error' style={{fontSize: '25px', fontWeight: 'bold'}}>X</Button>
                    <div style={{display: 'flex', width: '100%'}}>
                        <div style={{flex: 1}}>
                            <RecoverAccount handleClose={handleClose}/>
                        </div>
                    </div>
                </Box>
            </Modal>
            <Right/>
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
                        <LinkStyled underline="hover" onClick={handleOpen}>Esqueceu a senha?</LinkStyled>
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
            
            

        </Container> 
    )
}

export default Login