import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {TextField, Button, Select, MenuItem, InputLabel, FormControl, Snackbar, IconButton, Alert } from '@mui/material';
import {ChevronLeft, ChevronRight} from '@mui/icons-material'

import { useFormik } from "formik";
import * as yup from 'yup';

import api from '../../services/api'
import logo from '../../img/logoAzulHoriz.png'

import {
    Container,
    Left,
    Right,
    Form,
    BirthDate,
    Div,
    ItemLeft,
    ItemRight,
} from '../../styles/Cadastro/Cadastro'

let Cadastro2 = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    useEffect(() => {
        step1();
    },[])

    const formik = useFormik({
        initialValues: {
          name: "",
          gender: "",
          userType: "",
          birthDate: "",
          telephone: "",
          email: "",
          password: "",
          confirmPassword: "",
          cep: "",
          address: "",
          complement: "",
          city: "",
          number: "",
          state: "",
          height: "",
          weight: "",
          medicine: "",
          disease: "",
          allergies: "",
          addiction: "",
          crm: ""
        },
        validationSchema: yup.object({
          name: yup
            .string()
            .required("O campo é obrigatório."),
          gender: yup
            .string()
            .required("O campo é obrigatório."),
          userType: yup
            .string() 
            .required("O campo é obrigatório."),
          birthDate: yup
            .string()
            .required("O campo é obrigatório."),
          telephone: yup
            .string()
            .required("O campo é obrigatório."),
          email: yup
            .string()
            .email("E-mail inválido.")
            .required("O campo é obrigatório."),
          password: yup
            .string()
            .required("O campo é obrigatório."),
          confirmPassword: yup
            .string()
            .required("O campo é obrigatório."),
          cep: yup
            .string()
            .required("O campo é obrigatório."),
          address: yup
            .string()
            .required("O campo é obrigatório."),
          complement: yup
            .string(),
          city: yup
            .string()
            .required("O campo é obrigatório."),
          number: yup
            .string()
            .required("Obrigatório."),
          state: yup
            .string()
            .required("O campo é obrigatório."),
          height: yup
            .string(),
          weight: yup
            .string(),
          medicine: yup
            .string(),
          disease: yup
            .string(),
          allergies: yup
            .string(),
          addiction: yup
            .string(),
          crm: yup
            .string(),
        }),
        onSubmit: (values) => {
            register(values)
        }
    });
    
    function checkCep(){
        let cep = formik.values.cep
        const cepLimpo = cep.replace(/\D/g, '')
        fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
            .then(res => res.json())
            .then(data => {
                formik.values.address = data.logradouro
                formik.values.city = data.localidade
                formik.values.state = data.uf
        })
    }
    
    async function register({name, birthDate, gender, telephone, email, password, userType, cep, number, complement, city, state, weight, height, allergies, disease, addiction, medicine, crm}){       
        await api.post("/cadastrar", {
            nome: name, 
            dt_nascimento: birthDate, 
            genero: gender, 
            telefone: telephone, 
            email, 
            senha: password, 
            tipo: userType, 
            cep, 
            numero: number, 
            complemento: complement, 
            cidade: city, 
            estado: state, 
            peso: weight, 
            altura: height, 
            alergia: allergies, 
            doenca: disease, 
            vicio: addiction, 
            medicamento: medicine, 
            crm
        });

        handleClick();
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }

    function step1(){
        document.getElementById("step1").hidden = false;
        document.getElementById("step2").hidden = true;
        document.getElementById("step3").hidden = true;
    }

    function step2(){
        document.getElementById("step2").hidden = false;
        document.getElementById("step1").hidden = true;
        document.getElementById("step3").hidden = true;
    }

    function step3(){
        document.getElementById("step3").hidden = false;
        document.getElementById("step1").hidden = true;
        document.getElementById("step2").hidden = true;

        if(formik.values.userType == 'Paciente'){
            document.getElementById("medico").hidden = true;
            document.getElementById("paciente").hidden = false;
        }else{
            document.getElementById("paciente").hidden = true;
            document.getElementById("medico").hidden = false;
        }
    }

    const handleClick = () => {
        setOpen(true);
    };	
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return(
        <Container>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose} sx={{ width: '100%' }}>Cadastro Realizado.</Alert>
            </Snackbar>
            <Left>
                <Button fullWidth variant="contained" size="large" onClick={() => navigate('/')} style={{borderRadius: '0px'}}><ChevronLeft fontSize="large" /> Voltar</Button>
            </Left>

            <Right>
                <img src={logo} alt="Logo" style={{width: '50%'}}/>
                <h1 style={{margin: '1rem'}}>Criar Conta</h1>

                <Form onSubmit={formik.handleSubmit}>
                    <div id="step1">
                        <h3 style={{margin: 0, marginBottom: '1rem'}}>Dados Pessoais</h3>
                        <Div style={{flexDirection: 'column'}}>
                            <TextField 
                                fullWidth 
                                error={formik.touched.name && formik.errors.name}
                                size="small"
                                id="name"
                                name="name"
                                type="text"
                                label="Nome" 
                                variant="outlined" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div style={{color: 'red'}}>{formik.errors.name}</div>
                            ) : null}
                        </Div>

                        <Div>
                            <ItemLeft>
                                <FormControl variant="outlined" fullWidth> 
                                    <InputLabel size="small">Gênero</InputLabel>
                                        <Select
                                            size="small"
                                            labelId="genero"
                                            id="gender"
                                            name="gender"
                                            label="Genero"
                                            error={formik.touched.gender && formik.errors.gender}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.gender} 
                                        >
                                            <MenuItem value="H">Homem</MenuItem>
                                            <MenuItem value="M">Mulher</MenuItem>
                                            <MenuItem value="O">Outro</MenuItem>
                                        </Select>
                                </FormControl>
                                {formik.touched.gender && formik.errors.gender ? (
                                    <div style={{color: 'red'}}>{formik.errors.gender}</div>
                                ) : null}
                            </ItemLeft>

                            <ItemRight>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel size="small">Tipo de Usuário</InputLabel>
                                        <Select
                                            size="small"
                                            labelId="userType"
                                            id="userType"
                                            name="userType"
                                            label="Tipo de Usuário"
                                            error={formik.touched.userType && formik.errors.userType}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.userType} 
                                        >
                                            <MenuItem value="Paciente">Paciente</MenuItem>
                                            <MenuItem value="Medico">Médico</MenuItem>
                                        </Select>
                                </FormControl>
                                {formik.touched.userType && formik.errors.userType ? (
                                    <div style={{color: 'red'}}>{formik.errors.userType}</div>
                                ) : null}
                            </ItemRight>
                        </Div>

                       <Div>
                           <ItemLeft>
                                <BirthDate 
                                    type="date" 
                                    id="birthDate" 
                                    name="birthDate"
                                    style={formik.touched.birthDate && formik.errors.birthDate ? {borderColor: 'red'} : {backgroundColor: 'none'}}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.birthDate}
                                />
                                {formik.touched.birthDate && formik.errors.birthDate ? (
                                    <div style={{color: 'red'}}>{formik.errors.birthDate}</div>
                                ) : null}
                            </ItemLeft>

                            <ItemRight>
                                <TextField 
                                    fullWidth
                                    error={formik.touched.telephone && formik.errors.telephone}
                                    size="small"
                                    id="telephone"
                                    name="telephone"
                                    type="text"
                                    label="Telefone" 
                                    variant="outlined" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.telephone}
                                />
                                {formik.touched.telephone && formik.errors.telephone ? (
                                    <div style={{color: 'red'}}>{formik.errors.telephone}</div>
                                ) : null}
                            </ItemRight>
                        </Div>

                        <Div style={{flexDirection: 'column'}}>
                            <TextField 
                                fullWidth 
                                error={formik.touched.email && formik.errors.email}
                                size="small"
                                id="email"
                                name="email"
                                type="email"
                                label="E-mail" 
                                variant="outlined" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{color: 'red'}}>{formik.errors.email}</div>
                            ) : null}
                        </Div>
                    

                        <Div>
                           <ItemLeft>
                                <TextField 
                                    fullWidth 
                                    error={formik.touched.password && formik.errors.password}
                                    size="small"
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Senha" 
                                    variant="outlined" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />    
                                {formik.touched.password && formik.errors.password ? (
                                    <div style={{color: 'red'}}>{formik.errors.password}</div>
                                ) : null}
                            </ItemLeft>
                            
                            <ItemRight>
                                <TextField 
                                    fullWidth 
                                    error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    size="small"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirme a Senha" 
                                    variant="outlined" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                /> 
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>
                                ) : null}
                            </ItemRight>
                        </Div>

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant='contained' color="primary" id="setaEsquerda" disabled={true}> <ChevronLeft/> </Button>
                            <Button variant='contained' color="primary" id="setaDireita" onClick={step2}> <ChevronRight/> </Button>
                        </div> 
                    </div>

                    <div id="step2">
                        <h3 style={{margin: 0, marginBottom: '1rem'}}>Endereço</h3>
                        
                        <Div style={{flexDirection: 'column'}}>
                            <TextField 
                                fullWidth 
                                error={formik.touched.cep && formik.errors.cep}
                                size="small"
                                id="cep"
                                name="cep"
                                type="text"
                                label="Cep" 
                                variant="outlined" 
                                onChange={formik.handleChange}
                                onBlur={
                                    checkCep
                                }
                                value={formik.values.cep}
                            />
                            {formik.touched.cep && formik.errors.cep ? (
                                <div style={{color: 'red'}}>{formik.errors.cep}</div>
                            ) : null}
                        </Div>

                        <Div>
                           <ItemLeft style={{flex: 4}}>
                                <TextField 
                                        fullWidth 
                                        error={formik.touched.address && formik.errors.address}
                                        size="small"
                                        id="address"
                                        name="address"
                                        type="text"
                                        label="Endereço" 
                                        variant="outlined" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.address}
                                        disabled
                                />
                                {formik.touched.address && formik.errors.address ? (
                                    <div style={{color: 'red'}}>{formik.errors.address}</div>
                                ) : null}
                            </ItemLeft>

                            <ItemRight>
                                <TextField 
                                    fullWidth 
                                    error={formik.touched.number && formik.errors.number}
                                    size="small"
                                    id="text"
                                    name="number"
                                    type="text"
                                    label="Número" 
                                    variant="outlined" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.number}
                                />  
                                {formik.touched.number && formik.errors.number ? (
                                    <div style={{color: 'red'}}>{formik.errors.number}</div>
                                ) : null}
                            </ItemRight>
                        </Div>


                        <Div style={{flexDirection: 'column'}}>
                            <TextField 
                                fullWidth 
                                size="small"
                                id="complement"
                                name="complement"
                                type="text"
                                label="Complemento" 
                                variant="outlined" 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.complement}
                            />
                        </Div>

                        <Div>
                           <ItemLeft>
                                <TextField 
                                    fullWidth 
                                    error={formik.touched.city && formik.errors.city}
                                    size="small"
                                    id="city"
                                    name="city"
                                    type="text"
                                    label="Cidade" 
                                    variant="outlined" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                    disabled
                                />
                                {formik.touched.city && formik.errors.city ? (
                                    <div style={{color: 'red'}}>{formik.errors.city}</div>
                                ) : null}
                            </ItemLeft>

                            <ItemRight>
                                <TextField 
                                    fullWidth 
                                    error={formik.touched.state && formik.errors.state}
                                    size="small"
                                    id="state"
                                    name="state"
                                    type="text"
                                    label="Estado" 
                                    variant="outlined" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.state}
                                    disabled
                                />
                                {formik.touched.state && formik.errors.state ? (
                                    <div style={{color: 'red'}}>{formik.errors.state}</div>
                                ) : null}
                            </ItemRight>
                        </Div>

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant='contained' color="primary" id="setaEsquerda" onClick={step1}> <ChevronLeft/> </Button>
                            <Button variant='contained' color="primary" id="setaDireita" onClick={step3}> <ChevronRight/> </Button>
                        </div> 
                    </div>

                    <div id="step3">
                        <h3 style={{margin: 0, marginBottom: '1rem'}}>Dados Médicos</h3>
                        <div id="paciente">
                            <Div>
                                <ItemLeft>
                                    <TextField  
                                        fullWidth
                                        error={formik.touched.height && formik.errors.height}
                                        size="small"
                                        id="height"
                                        name="height"
                                        type="text"
                                        label="Altura" 
                                        variant="outlined" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.height}
                                    /> 
                                    {formik.touched.height && formik.errors.height ? (
                                        <div style={{color: 'red'}}>{formik.errors.height}</div>
                                    ) : null}
                                </ItemLeft>

                                <ItemRight>
                                    <TextField  
                                        fullWidth
                                        error={formik.touched.weight && formik.errors.weight}
                                        size="small"
                                        id="weight"
                                        name="weight"
                                        type="text"
                                        label="Peso" 
                                        variant="outlined" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.weight}
                                    />
                                    {formik.touched.weight && formik.errors.weight ? (
                                        <div style={{color: 'red'}}>{formik.errors.weight}</div>
                                    ) : null}
                                </ItemRight>
                            </Div>

                            <Div style={{flexDirection: 'column'}}>
                                <TextField 
                                    fullWidth 
                                    size="small"
                                    id="medicine"
                                    name="medicine"
                                    type="text"
                                    label="Medicamento(s)" 
                                    variant="outlined" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.medicine}
                                />
                            </Div>

                            <Div style={{flexDirection: 'column'}}>
                                <TextField 
                                    fullWidth 
                                    size="small"
                                    id="disease"
                                    name="disease"
                                    type="text"
                                    label="Doença(s) Crônicas " 
                                    variant="outlined" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.disease}/>
                            </Div>

                            <Div>
                                <ItemLeft>
                                    <TextField 
                                        fullWidth 
                                        size="small"
                                        id="allergies"
                                        name="allergies"
                                        type="text"
                                        label="Alergia(s)" 
                                        variant="outlined" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.allergies}
                                    />
                                </ItemLeft>

                                <ItemRight>
                                    <TextField 
                                        fullWidth 
                                        size="small"
                                        id="addiction"
                                        name="addiction"
                                        type="text"
                                        label="Vicio(s)" 
                                        variant="outlined" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.addiction}
                                    />
                                </ItemRight>
                            </Div>
                        </div>

                        <div id="medico">
                            <TextField
                                fullWidth 
                                style={{marginBottom: '1rem'}}
                                variant="outlined" 
                                label="CRM"
                                type="text"
                                error={formik.touched.crm && formik.errors.crm}
                                id="crm"
                                name="crm"
                                size="small"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.crm}
                            />
                            {formik.touched.crm && formik.errors.crm ? (
                                <div style={{color: 'red'}}>{formik.errors.crm}</div>
                            ) : null}
                        </div>

                        <Button fullWidth variant="contained" style={{marginBottom: '1rem'}} onClick={formik.handleSubmit}>
                            Confirmar Cadastro
                        </Button>
                                
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant='contained' color="primary" id="setaEsquerda" onClick={step2}> <ChevronLeft/> </Button>
                            <Button variant='contained' color="primary" id="setaDireita" disabled> <ChevronRight/> </Button>
                        </div> 
                    </div>
                      
                </Form>  
                             
            </Right>
        </Container>
    )
}

export default Cadastro2