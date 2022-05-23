import * as React from 'react';
import { useState, useEffect } from 'react'
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import api from '../../services/api'
import NavBar from '../../components/NavBar'
import FormUsuario from '../../components/Configuracoes/FormUsuario'
import FormEndereco from '../../components/Configuracoes/FormEndereco'
import FormPaciente from '../../components/Configuracoes/FormPaciente'
import { Button, Snackbar, IconButton, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../styles/Configuracoes'
import BaseLayout from '../../layouts/BaseLayout'


const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default function Configuracoes() {
  const navigate = useNavigate()
  const [tipo, setTipo] = useState("")
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getType()
  },[])

  async function getType(){
    const result = await api.get('/usuario/getType')
    setTipo(result.data.tipo)
  }

  async function desativarConta() {
    const res = window.confirm('Deseja realmente excluir?')
    if (res) {
        try {
            await api.put('/usuario/disable')
            handleClick()
            localStorage.removeItem("token")
            setTimeout(() => {
              navigate('/');
            }, 3000)  
        } catch (err) {
            console.log("ops! ocorreu um erro" + err)
        }
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

  return (
    <NavBar>
      <BaseLayout title='Configurações'>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          style={{width: '40%'}}
        >
            <Alert variant="filled" severity="success" onClose={handleClose} sx={{ width: '100%' }}>Usuário desativado!.</Alert>
        </Snackbar>
        <Container>
          <Button variant="contained" size="large" color="error" sx={{ margin: 1 }} onClick={desativarConta}><h4>DESATIVAR CONTA</h4></Button>
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab>Dados de Acesso</Tab>
              <Tab>Endereço</Tab>
              {tipo === 'Paciente' && <Tab>Dados do Paciente</Tab>}
            </TabsList>
            <TabPanel value={0}>
              <FormUsuario/>
            </TabPanel>
            <TabPanel value={1}><FormEndereco/></TabPanel>
            <TabPanel value={2}>
              {tipo === 'Paciente' && <FormPaciente/>}
            </TabPanel>
          </TabsUnstyled>
        </Container>
      </BaseLayout>
    </NavBar>
  )
}