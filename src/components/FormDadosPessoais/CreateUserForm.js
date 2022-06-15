import {TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';

import api from '../../services/api'

import {
    Form,
    Div,
    BirthDate,
} from '../../styles/Cadastro/Cadastro'

function CreateUserForm({handleOnChange, handleOnSetUserId, type}){

    const formik = useFormik({
        initialValues: {
        name: "",
        birthDate: "",
        gender: "",
        telephone: "",
        email: "",
        password: "",
        confirmPassword: "",
        tipo: type
        },
        validationSchema: yup.object({
        name: yup
            .string()
            .required("O campo é obrigatório."),
        birthDate: yup
            .string()
            .required("O campo é obrigatório."),
        gender: yup
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
        }),
        onSubmit: (values) => {
            create(values)
        }
    });

    async function create({name, birthDate, gender, telephone, email, password}){     
        let res
        if(type === "Medico"){
            res = await api.post("/usuario/createUser", {
                nome: name, 
                dt_nascimento: birthDate,
                genero: gender, 
                telefone: telephone, 
                email,
                senha: password,
                tipo: type,
                aguardando_validacao: 1
            });
        }else{
            res = await api.post("/usuario/createUser", {
                nome: name, 
                dt_nascimento: birthDate,
                genero: gender, 
                telefone: telephone, 
                email,
                senha: password,
                tipo: type
            });
        }
        
        handleOnSetUserId(res.data.id)
        handleOnChange(2)
    }

    return(
        <Form onSubmit={formik.handleSubmit} xs={12}>
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
                    <></>
                ) : null}
            </Div>

            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Div style={{flex: 1, flexDirection: 'column', minWidth: '200px'}}>
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
                </Div>

                <Div style={{flex: 1, flexDirection: 'column', minWidth: '200px'}}>
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
                </Div>
            </div>

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

            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Div style={{flex: 1, flexDirection: 'column', minWidth: '200px'}}>
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
                </Div>
                
                <Div style={{flex: 1, flexDirection: 'column', minWidth: '200px'}}>
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
                </Div>
            </div>
        
            <Button fullWidth variant="contained" style={{marginBottom: '1rem'}} onClick={formik.handleSubmit}>
                Próximo
            </Button>
        </Form>  
    )
}

export default CreateUserForm