import {useState, useEffect} from 'react'
import { Button, Modal, Container, Box } from '@mui/material'
import dayjs from 'dayjs'

import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'
import api from '../../services/api'
import { useAuthContext } from '../../context/AuthContext'
import UpdateUserForm from '../../components/FormDadosPessoais/UpdateUserForm'
import UpdateAddressForm from '../../components/FormEndereco/UpdateAddressForm'
import UpdatePatientForm from '../../components/FormPaciente/UpdatePatientForm'

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Perfil() {
  const { logout } = useAuthContext()
  const [user, setUser] = useState([])
  const [userType, setUserType] = useState([])
  const [address, setAddress] = useState([])
  const [patient, setPatient] = useState([])
  const [openModalUser, setOpenModalUser] = useState(false);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [openModalPatient, setOpenModalPatient] = useState(false);

  const handleOpenModalUser = () => setOpenModalUser(!openModalUser);
  const handleOpenModalAddress = () => setOpenModalAddress(!openModalAddress);
  const handleOpenModalPatient = () => setOpenModalPatient(!openModalPatient);

  useEffect(() => {
    getUser()
    getUserType()
    getAddress()
  }, [])

  async function getUser(){
    const result = await api.get('/usuario/getUserById')
    setUser(result.data)
  }

  async function getAddress(){
    const result = await api.get('/usuario/endereco')
    setAddress(result.data)
  }

  async function getPatient(){
    const result = await api.get('/paciente')
    setPatient(result.data)
  }

  async function getUserType(){
    const result = await api.get('/usuario/getType')
    setUserType(result.data.tipo)

    if(result.data.tipo === 'Paciente'){
      getPatient()
    }
  }

  async function disableAccount() {
    const res = window.confirm('Deseja realmente desativar sua conta?')
    if (res) {
        try {
            await api.put('/usuario/disable')
            logout()
        } catch (err) {
            alert("ops! ocorreu um erro" + err)
        }
    }
  }

  return (
    <div>
        <NavBar>
          <BaseLayout title={`Perfil de ${user.nome}.`}>
          
              <Container style={{display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap'}}>

                <Box style={{padding: '10px', maxWidth: '250px', width: '100%'}} xs={12} sm={6} md={4} >
                  <h2>Dados Pessoais:</h2> {/* Tabela usuário */}

                  <p style={{margin: '5px 0px'}}><b>Nome:</b> {user.nome}</p>
                  <p style={{margin: '5px 0px'}}><b>Gênero: </b> 
                                {user.genero === 'H' && 'Masculino'}
                                {user.genero === 'M' && 'Feminino'}
                                {user.genero === 'O' && 'Outro'}
                                
                  </p>
                  <p style={{margin: '5px 0px'}}><b>Data de Nascimento:</b> {dayjs(user.dt_nascimento).format('DD/MM/YYYY')}</p>
                  <p style={{margin: '5px 0px'}}><b>Telefone:</b> {user.telefone}</p>
                  <p style={{margin: '5px 0px'}}><b>E-mail:</b> {user.email}</p>
                  <Button size="large" variant="contained" color='primary' style={{width: '100%'}} onClick={handleOpenModalUser}>Editar</Button>
                </Box>

                <Modal
                  open={openModalUser}
                  onClose={handleOpenModalUser}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  
                  <Box sx={style} style={{padding: '0px 1.5rem 1.5rem 1.5rem'}}>
                    <Button onClick={handleOpenModalUser} color='error' style={{fontSize: '25px', fontWeight: 'bold'}}>X</Button>
                    <UpdateUserForm 
                      toggleModal={handleOpenModalUser} 
                      name={user.nome} 
                      gender={user.genero} 
                      telephone={user.telefone} 
                      email={user.email}

                    />
                  </Box>
                </Modal>


                <Box style={{padding: '10px', maxWidth: '250px', width: '100%'}} xs={12} sm={6} md={4} >
                  <h2>Endereço:</h2> {/* Tabela endereço */}
                  
                  <p style={{margin: '5px 0px'}}><b>Endereço:</b> Logradouro, {address.numero}</p>
                  <p style={{margin: '5px 0px'}}><b>Cep:</b> {address.cep}</p>
                  <p style={{margin: '5px 0px'}}><b>Complemento: </b>{!address.completo? 'editar para adicionar' : address.complemento}</p>
                  <p style={{margin: '5px 0px'}}><b>Cidade:</b> {address.cidade}</p>
                  <p style={{margin: '5px 0px'}}><b>Estado:</b> {address.estado}</p>
                  <Button size="large" variant="contained" color='primary' style={{width: '100%'}} onClick={handleOpenModalAddress}>Editar</Button>
                </Box>

                <Modal
                  open={openModalAddress}
                  onClose={handleOpenModalAddress}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  
                  <Box sx={style} style={{padding: '0px 1.5rem 1.5rem 1.5rem'}}>
                    <Button onClick={handleOpenModalAddress} color='error' style={{fontSize: '25px', fontWeight: 'bold'}}>X</Button>
                    <UpdateAddressForm
                      toggleModal={handleOpenModalAddress} 
                      cep={address.cep}
                      number={address.numero} 
                      complement={address.complemento} 
                      city={address.cidade} 
                      state={address.estado}
                    />
                  </Box>
                </Modal>
                

                {userType === 'Paciente' && (
                  <>
                    <Box style={{padding: '10px', maxWidth: '250px', width: '100%'}} xs={12} sm={6} md={4} >
                      <h2>Dados do Paciente:</h2> 

                      <p style={{margin: '5px 0px'}}><b>Altura:</b> {patient.altura}</p>
                      <p style={{margin: '5px 0px'}}><b>Peso:</b> {patient.peso} Kg</p>
                      <p style={{margin: '5px 0px'}}><b>Médicamentos:</b> {!patient.medicamento ? 'editar para adicionar' : patient.medicamento}</p>
                      <p style={{margin: '5px 0px'}}><b>Doenças Crônicas:</b> {!patient.doenca_cronica ? 'editar para adicionar' : patient.doenca_cronica}</p>
                      <p style={{margin: '5px 0px'}}><b>Alergias:</b> {!patient.alergia ? 'editar para adicionar' : patient.alergia}</p>
                      <p style={{margin: '5px 0px'}}><b>Vicios:</b> {!patient.vicio ? 'editar para adicionar' : patient.vicio}</p>
                      <Button size="large" variant="contained" color='primary' style={{width: '100%'}} onClick={handleOpenModalPatient}>Editar</Button>
                    </Box>
                    <Modal
                      open={openModalPatient}
                      onClose={handleOpenModalPatient}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                    
                    <Box sx={style} style={{padding: '0px 1.5rem 1.5rem 1.5rem'}}>
                      <Button onClick={handleOpenModalPatient} color='error' style={{fontSize: '25px', fontWeight: 'bold'}}>X</Button>
                      <UpdatePatientForm
                        toggleModal={handleOpenModalPatient} 
                        height={patient.altura}
                        weight={patient.peso}
                        medicine={patient.medicamento}
                        disease={patient.doenca_cronica}
                        allergies={patient.alergia}
                        addiction={patient.vicio}
                      />
                    </Box>
                  </Modal>
                </>
                )}


                <Box style={{padding: '10px', maxWidth: '250px', width: '100%'}} xs={12} sm={6} md={4} >
                  <h2>Desativar Conta: </h2>
                  <Button size="large" variant="contained" color='error' style={{width: '100%'}} onClick={disableAccount}>Desativar</Button>
                </Box>

              </Container>

          </BaseLayout> 
        </NavBar>
    </div>

  )
}
