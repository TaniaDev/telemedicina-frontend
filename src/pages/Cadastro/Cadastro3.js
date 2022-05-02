import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, Radio, RadioGroup, FormControlLabel, Alert } from '@mui/material';
import {ChevronLeft} from '@mui/icons-material'

import logo from '../../img/logoAzulHoriz.png'
import CreateUserType from '../../components/FormDadosPessoais/CreateUserForm'
import CreateAddressForm from '../../components/FormEndereco/CreateAddressForm'
import CreatePatientForm from '../../components/FormPaciente/CreatePatientForm'

import {
    Container,
    Left,
    Right,
} from '../../styles/Cadastro/Cadastro'

let Cadastro3 = () => {
    const navigate = useNavigate()
    const [userType, setUserType] = useState(null)
    const [userId, setUserId] = useState(null)
    const [step, setStep] = useState(1)

    const handleOnChange = (n) => setStep(n)
    const handleOnSetUserId = (id) => setUserId(id)

    return(
        <Container>
            <Left>
                <Button fullWidth variant="contained" size="large" onClick={() => navigate('/')} style={{borderRadius: '0px'}}><ChevronLeft fontSize="large" /> Voltar</Button>
            </Left>

            <Right>
                <img src={logo} alt="Logo" style={{width: '50%'}}/>
                <h1 style={{margin: '1rem'}}>Criar Conta</h1>
                ID: {userId}
                {userType === null && (
                    <>
                        <h2>Escolha o tipo:</h2>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel 
                                value="Paciente" 
                                control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 28,},}}/>} 
                                label="Paciente" 
                                labelPlacement="top"
                                onChange={e => setUserType(e.target.value)}
                            />
                            <FormControlLabel 
                                value="Medico" 
                                control={
                                    <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 28,},}}/>
                                }  
                                label="Médico" 
                                labelPlacement="top"
                                onChange={e => setUserType(e.target.value)}
                            />
                        </RadioGroup>
                    </>
                )}

                {userType === 'Paciente' && step === 1  &&(
                    <CreateUserType handleOnChange={handleOnChange} handleOnSetUserId={handleOnSetUserId} type={userType}/>
                )}

                {step === 2 && userId && (
                    <CreateAddressForm handleOnChange={handleOnChange} userId={userId}/>
                )}

                {step === 3 && userId && (
                    <CreatePatientForm userId={userId}/>
                )}

                {userType === 'Medico' && (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Alert severity="warning" style={{flex: 1, width: '45vw', minWidth: '300px', textAlign: 'center'}}>Em construção!</Alert>
                        <Button onClick={() => setUserType(null)} style={{borderRadius: '0px'}}>Voltar</Button>
                    </div>
                )}
                             
            </Right>
        </Container>
    )
}

export default Cadastro3