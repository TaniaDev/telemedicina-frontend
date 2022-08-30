import React, { useState } from 'react'
import {TextField, Button, Snackbar, IconButton, Alert} from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';

import api from '../../services/api'

import {
    Form,
    Div,
} from '../../styles/Cadastro/Cadastro'

function FormEndereco({toggleModal, cep, address, complement, city, number, state}){
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            cep: cep,
            address: address,
            complement: complement,
            city: city,
            number: number,
            state: state,
        },  
        validationSchema: yup.object({
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
        }),
        onSubmit: (values) => {
            update(values)
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

    async function update({cep, number, complement, city, state}){       
        await api.put("/usuario/endereco", {
            cep, 
            numero: number,
            complemento: complement,
            cidade: city,
            estado: state,
        });
        handleClick()
        setTimeout(() => {
            toggleModal()
        }, 3000)
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
        <>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose} sx={{ width: '100%' }}>Endereço Atualizado.</Alert>
            </Snackbar>
            <Form style={{width: '70vw'}} onSubmit={formik.handleSubmit} xs={12}>
                <h3 style={{margin: 0, marginBottom: '1rem'}} align="center">Editar Endereço</h3>
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

                {/* <Div>
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
                </Div> */}

                <Div>
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
                </Div>

                <Div>
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
                </Div>

                <Button fullWidth variant="contained" style={{marginBottom: '1rem'}} onClick={formik.handleSubmit}>
                    Atualizar
                </Button>
            </Form>  
        </>
    )
}

export default FormEndereco