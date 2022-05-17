import { useState, useEffect } from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material'

import {
    Assignment,
    ExitToApp,
    Dashboard,
    DateRange,
    Group,
    InsertInvitation,
    MedicalServices,
    Person,
    Settings,
    EventNote,
  } from '@mui/icons-material'
import api from '../../services/api'
import ListItemLink from './ListItemLink'
import Logo from '../../img/logoAzul.png'
import { useDrawerContext } from '../../context/DrawerContext'

export default function NavBar({ children, exit }) {
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const [tipo, setTipo] = useState("")

    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext()

    useEffect(() => {
        getType()
    }, [])

    async function getType(){
        const result = await api.get('/usuario/getType')
        setTipo(result.data.tipo)
    }
    
    return (
        <Box>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
                    <Box width='100%' height={theme.spacing(20)} display='flex' alignItems='center' justifyContent='center'>
                        <img src={Logo} alt='Telemedicina' width='100vh' height='100vh' />
                    </Box>
                    <Divider />
                    <Box flex={1}>
                        <List>
                            <ListItemLink
                                icon={<Dashboard/>}
                                label='Página inicial'
                                to='/inicio'                            
                            />
                            {tipo === 'Admin' && 
                                <>
                                    <ListItemLink
                                        icon={<Group />}
                                        label='Gerenciar Usuários'
                                        to='/admin'                            
                                    />                 
                                    <ListItemLink
                                        icon={<MedicalServices />}
                                        label='Novos Médicos'
                                        to='/novos_medicos'                            
                                    />  
                                </>               
                            }
                            <ListItemLink
                                icon={<DateRange />}
                                label='Agenda'
                                to='/agenda'
                            />  
                            <ListItemLink
                                icon={<EventNote />}
                                label='Historico Consultas'
                                to='/historico'
                            />  
                            {tipo === 'Paciente' && 
                                <>
                                    <ListItemLink
                                        icon={<DateRange />}
                                        label='Minhas Consultas'
                                        to='/consultas'
                                    />
                                    <ListItemLink
                                        icon={<InsertInvitation />}
                                        label='Agendar Consulta'
                                        to='/consulta/adicionar'
                                    />
                                    <ListItemLink
                                        icon={<Assignment />}
                                        label='Histórico Médico'
                                        to='/'
                                    />
                                </>                        
                            }
                            {tipo === 'Medico' && 
                                <>
                                    <ListItemLink
                                        icon={<DateRange />}
                                        label='Minha Agenda'
                                        to='/consultas'
                                    />
                                    <ListItemLink
                                        icon={<MedicalServices />}
                                        label='Lista de Pacientes'
                                        to=''
                                    />
                                    <ListItemLink
                                        icon={<Assignment />}
                                        label='Históricos'
                                        to=''
                                    />
                                </>     
                            }
                            <ListItemLink
                                icon={<Person />}
                                label='Perfil'
                                to='/perfil'
                            />                             
                            {/* <ListItemLink
                                icon={<Settings />}
                                label='Configurações'
                                to='/config'
                            /> */}
                            <ListItemLink
                                icon={<ExitToApp />}
                                label='Sair'
                                to='exit'
                            />
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>

        </Box>
    )
}