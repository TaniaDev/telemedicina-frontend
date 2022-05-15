import {useEffect, useState} from 'react'
import {TextField, Button, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom'

import api from '../../services/api'

import {Form, Div} from '../../styles/Cadastro/Cadastro'

function FormMedico({userId}){
    const [specialties, setSpecialties] = useState([])
    const [crm, setCrm] = useState("")
    const [selectedSpecialties, setSelectedSpecialties] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllSpecialties()
    }, [])

    async function getAllSpecialties(){
        const result = await api.get('/medico/especialidades')
        setSpecialties(result.data)      
    }

    function onSpecialtyChange(object, value){
        let aux = value
        let selected = []
        aux.map((item) => {
            selected.push(item.id)
        })
        setSelectedSpecialties(selected);
    }

    function verifyCrmInput(){
        if(crm.length === 0){
            document.querySelector('#crmError').style.display = "block";
            return false
        }else{
            document.querySelector('#crmError').style.display = "none";
            return true
        }
    }

    function verifySpecialtiesInput(){
        if(selectedSpecialties.length === 0){
            document.querySelector('#specialtiesError').style.display = "block";
            return false
        }else{
            document.querySelector('#specialtiesError').style.display = "none";
            return true
        }
    }  

    function submit(){
        verifyCrmInput()
        verifySpecialtiesInput()
        if(verifyCrmInput() && verifySpecialtiesInput()){
            create()
        }
    }

    async function create(){  
        await api.post("/medico/createDoctor", {id_usuario: userId, crm});

        selectedSpecialties.map(async function(specialty){
            await api.post("/medico/createDoctorSpecialty", {id_medico: userId, id_especialidade: specialty})
        })

        alert('Cadastro Concluido!')
        navigate('/')
    }

    return(
        <Form xs={12}>
            <h3 style={{margin: 0, marginBottom: '1rem'}}>Dados do Médico</h3>
                <Div style={{flex: 1, minWidth: '200px', flexDirection: 'column'}}>
                    <TextField  
                        fullWidth
                        size="small"
                        id="crm"
                        name="crm"
                        type="text"
                        label="CRM" 
                        variant="outlined" 
                        onChange={e => setCrm(e.target.value)}
                        onBlur={verifyCrmInput}
                    /> 
                    <p id="crmError" style={{color: 'red', margin: 0, marginTop: 10, display: 'none'}}>O Campo é Obrigatório.</p>
                </Div>

                <Div style={{flex: 1, minWidth: '200px', flexDirection: 'column'}}>
                    <Autocomplete
                        fullWidth
                        multiple
                        size="small"
                        id="especialidades"
                        name="especialidades"
                        onChange={onSpecialtyChange}
                        onBlur={verifySpecialtiesInput}
                        options={specialties}
                        getOptionLabel={(option) => option.nome}
                        filterSelectedOptions
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Especialidades"
                            placeholder="Escolha uma ou mais especialidades"
                        />
                        )}
                    />
                    <p id="specialtiesError" style={{color: 'red', margin: 0, marginTop: 10, display: 'none'}}>Selecione um ou mais especialidades.</p>
                </Div>

            <Button fullWidth variant="contained" style={{marginBottom: '1rem'}} onClick={submit}>
                Criar
            </Button>
        </Form>  
    )
}

export default FormMedico