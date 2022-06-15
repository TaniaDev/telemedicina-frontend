import {TextField, Button} from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';

import api from '../../services/api'

import {
    Form,
    Div,
} from '../../styles/Cadastro/Cadastro'

function FormEndereco({handleOnChange, userId}){

    const formik = useFormik({
        initialValues: {
            cep: "",
            address: "",
            complement: "",
            city: "",
            number: "",
            state: "",
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
            create(values)
        }
    });

    function checkCep(){
        let cep = formik.values.cep
        const cepLimpo = cep.replace(/\D/g, '')

        if (cepLimpo === ''){return}
        if(cepLimpo.length !== 8){return}

        fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
            .then(res => res.json())
            .then(data => {
                formik.values.address = data.logradouro
                formik.values.city = data.localidade
                formik.values.state = data.uf
        })
    }

    async function create({cep, address, number, complement, city, state}){     
        await api.post("/usuario/endereco", {
            id_usuario: userId,
            cep, 
            logradouro: address,
            numero: number,
            complemento: complement,
            cidade: city,
            estado: state,
        });
        handleOnChange(3)
    }

    return(
        <Form onSubmit={formik.handleSubmit} xs={12}>
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
                    onBlur={(e) => {
                        checkCep()
                    }}
                    value={formik.values.cep}
                />
                {formik.touched.cep && formik.errors.cep ? (
                    <div style={{color: 'red'}}>{formik.errors.cep}</div>
                ) : null}
            </Div>

            
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Div style={{flex: 3, minWidth: '300px'}}>
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
                </Div>

                <Div style={{flex: 1, minWidth: '100px', flexDirection: 'column'}}>
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
            </div>


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

            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Div style={{flex: 3, minWidth: '300px'}}>
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

                <Div style={{flex: 1, minWidth: '100px'}}>
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
            </div>

            <Button fullWidth variant="contained" style={{marginBottom: '1rem'}} onClick={formik.handleSubmit}>
                Próximo
            </Button>
        </Form>  
    )
}

export default FormEndereco