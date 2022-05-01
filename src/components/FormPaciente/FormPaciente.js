import {TextField, Button} from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';

import api from '../../services/api'

import {
    Form,
    Div,
} from '../../styles/Cadastro/Cadastro'

function FormPaciente({toggleModal, height, weight, medicine, disease, allergies, addiction}){
    const formik = useFormik({
        initialValues: {
            height: height, 
            weight: weight, 
            allergies: allergies, 
            disease: disease, 
            addiction: addiction, 
            medicine: medicine, 
        },  
        validationSchema: yup.object({
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
        }),
        onSubmit: (values) => {
            update(values)
        }
    });

    async function update({height, weight, allergies, disease, addiction, medicine}){       
        await api.put("/paciente", {
            altura: height, 
            peso: weight, 
            alergia: allergies,
            doenca_cronica: disease,
            vicio: addiction,
            medicamento: medicine
        });
        alert('Dados do Paciente Atualizados!')
        toggleModal()
    }

    return(
        <Form style={{width: '70vw'}} onSubmit={formik.handleSubmit} xs={12}>
            <h3 style={{margin: 0, marginBottom: '1rem'}} align="center">Editar Dados do Paciente</h3>
            <Div>
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

            <Div>
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
                Atualizar
            </Button>
        </Form>  
    )
}

export default FormPaciente