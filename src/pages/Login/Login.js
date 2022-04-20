import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {TextField, Link, Button} from '@mui/material';
import {Visibility, VisibilityOff } from '@mui/icons-material'
import { useFormik } from "formik";
import * as yup from 'yup';

import photoLogin from '../../img/photo-login.jpg'
import { useAuthContext } from '../../context/AuthContext'
import logo from '../../img/logoAzulHoriz.png'

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
        <div style={{display: 'flex', height: '100vh', width: '100vw', maxWidth: '1440px'}}>
            
            <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <img src={logo} alt="Logo" style={{width: '50%'}}/>

                <h1>Login</h1>

                <form onSubmit={formik.handleSubmit} style={{width: '90%'}}>
                    <div style={{marginBottom: '1rem'}}>
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
                    </div>

                    <div style={{marginBottom: '1rem'}}>
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
                                    <div onClick={toggleShowPassword} style={{cursor: 'pointer'}}>
                                        {showPassword ? <Visibility size={20} style={{color: '#343434'}} /> : <VisibilityOff size={20}  style={{color: '#343434'}} />}
                                    </div>  
                                ),
                            }}
                        />
                        

                        {formik.touched.password && formik.errors.password ? (
                            <div style={{color: 'red'}}>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div style={{display: 'flex', marginBottom: '1rem', justifyContent: 'end', paddingRight: '1rem'}}>
                        <Link underline="hover" onClick={() => navigate('/recuperar-senha')} style={{cursor: 'pointer'}}>Esqueceu a senha?</Link>
                    </div>

                    <div style={{marginBottom: '1rem'}}>
                        <Button fullWidth variant="contained" size="large" onClick={formik.handleSubmit}>
                            Login
                        </Button>
                    </div>

                </form>

                <div style={{display: 'flex', marginBottom: '1rem', justifyContent: 'center'}}>
                    Você não tem uma conta? <Link underline="hover" style={{marginBottom: '1rem', marginLeft: '5px', cursor: 'pointer'}} onClick={() => navigate('/cadastro')}> Cadastre-se</Link>
                </div>
                
            </div>
            <div style={{flex: 1, backgroundImage: `url(${photoLogin})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
            </div>
        </div>

        
    )
}

export default Login