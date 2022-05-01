import {TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';

import api from '../../services/api'

import {
    Form,
    Div,
} from '../../styles/Cadastro/Cadastro'

function FormDadosPessoais({toggleModal, name, gender, telephone, email}){

    const formik = useFormik({
        initialValues: {
        name: name,
        gender: gender,
        telephone: telephone,
        email: email,
        },
        validationSchema: yup.object({
        name: yup
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
        }),
        onSubmit: (values) => {
            update(values)
        }
    });

    async function update({name, gender, telephone, email}){       
        await api.put("/usuario/updateDadosPessoais", {
            nome: name, 
            genero: gender, 
            telefone: telephone, 
            email
        });
        alert('Dados Pessoais Atualizados!')
        toggleModal()
    }

    return(
        <Form style={{width: '70vw'}} onSubmit={formik.handleSubmit} xs={12}>
            <h3 style={{margin: 0, marginBottom: '1rem'}} align="center">Editar Dados Pessoais</h3>
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

            <Div>
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
        
            <Button fullWidth variant="contained" style={{marginBottom: '1rem'}} onClick={formik.handleSubmit}>
                Atualizar
            </Button>
        </Form>  
    )
}

export default FormDadosPessoais