import { 
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
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
    
  } from '@mui/icons-material'
import ListItemLink from './ListItemLink'
import Logo from '../../img/logoAzul.png'

export default function NavBar(props) {
    const theme = useTheme()

    return (
        <>
            <Drawer variant='permanent'>
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
                            {props.user === 'Admin' && 
                                <>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Group />
                                        </ListItemIcon>
                                        <ListItemText primary="Gerenciar Usuários" />
                                    </ListItemButton>
                                </>                  
                            }
                            {props.user === 'Paciente' && 
                                <>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <DateRange />
                                        </ListItemIcon>
                                        <ListItemText primary="Minhas Consultas" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <InsertInvitation />
                                        </ListItemIcon>
                                        <ListItemText primary="Nova Consulta" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Assignment />
                                        </ListItemIcon>
                                        <ListItemText primary="Histórico Médico" />
                                    </ListItemButton>
                                </>                        
                            }
                            {props.user === 'Medico' && 
                                <>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <DateRange />
                                        </ListItemIcon>
                                        <ListItemText primary="Minha Agenda" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <MedicalServices />
                                        </ListItemIcon>
                                        <ListItemText primary="Lista de Pacientes" />
                                    </ListItemButton>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Assignment />
                                        </ListItemIcon>
                                        <ListItemText primary="Históricos" />
                                    </ListItemButton>
                                </>     
                            }
                            <ListItemButton>
                                <ListItemIcon>
                                    <Person />
                                </ListItemIcon>
                                <ListItemText primary="Perfil" />
                            </ListItemButton>                             
                            <ListItemButton>
                                <ListItemIcon>
                                    <Settings />
                                </ListItemIcon>
                                <ListItemText primary="Configurações" />
                            </ListItemButton> 
                            <ListItemButton onClick={props.exit}>
                                <ListItemIcon>
                                    <ExitToApp />
                                </ListItemIcon>
                                <ListItemText primary="Sair" />
                            </ListItemButton> 
                        </List>
                    </Box>
                </Box>
            </Drawer>
            {/*            <Box height='100vh' marginLeft={theme.spacing(28)}>
                teste
                        </Box>*/}

        </>
    )
}