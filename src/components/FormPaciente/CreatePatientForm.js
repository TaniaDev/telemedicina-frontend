import {TextField, Button} from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'

import {
    Form,
    Div,
} from '../../styles/Cadastro/Cadastro'

function CreatePatientForm({userId}){
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            height: "", 
            weight: "", 
            allergies: "", 
            disease: "", 
            addiction: "", 
            medicine: "", 
        },  
        validationSchema: yup.object({
            height: yup
                .string()
                .required("O campo é obrigatório."),
            weight: yup
                .string()
                .required("O campo é obrigatório."),
            medicine: yup
                .string(),
            disease: yup
                .string(),
            allergies: yup
                .string(),
            addiction: yup
                .string(),
        }),
        onSubmit: (values) => {
            create(values)
        }
    });

    async function create({height, weight, allergies, disease, addiction, medicine}){       
        await api.post("/paciente", {
            id_usuario: userId,
            peso: weight, 
            altura: height, 
            alergia: allergies,
            doenca_cronica: disease,
            vicio: addiction,
            medicamento: medicine
        });
        alert('Cadastro Concluido!')
        navigate('/')
    }

    return(
        <Form onSubmit={formik.handleSubmit} xs={12}>
            <h3 style={{margin: 0, marginBottom: '1rem'}}>Dados do Paciente</h3>
            
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <Div style={{flex: 1, minWidth: '200px', flexDirection: 'column'}}>
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
                </Div>

                <Div style={{flex: 1, minWidth: '200px', flexDirection: 'column'}}>
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
                </Div>
            </div>

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
            </Div>

            <Div>
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
            </Div>
                        
            <Button fullWidth variant="contained" style={{marginBottom: '1rem'}} onClick={formik.handleSubmit}>
                Criar
            </Button>
        </Form>  
    )
}

export default CreatePatientForm