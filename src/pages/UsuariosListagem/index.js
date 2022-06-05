import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { 
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    useTheme,
    Snackbar, 
    IconButton, 
    Alert
} from '@mui/material'
import { Add, BorderColor, Delete, Event } from '@mui/icons-material'
import { ButtonBox, ButtonTool, PaperStyled } from '../../styles/UsuariosListagem'
import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'

function UsuariosListagem(){
    let navigate = useNavigate()
    const theme = useTheme()
    const [users, setUsers] = useState([])
    const [tipo, setTipo] = useState("")
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getType()
        loadUsers()
    },[])

    setInterval(loadUsers, 60000)

    async function loadUsers(){
        const response = await api.get('/admin')
        setUsers(response.data)
        setLoading(false)
    }

    async function getType(){
        const result = await api.get('/usuario/getType')
        setTipo(result.data.tipo)
    }

    async function remove(id){
        const res = window.confirm('Deseja realmente excluir?')
        if(res){
            try {
                const result = await api.put(`/usuario/${id}`)
                console.log(result.data)
                handleClick()
                setTimeout(() => {
                    window.location.reload()
                }, 3000)                
            } catch(err) {
                console.log("ops! ocorreu um erro" + err)
            }
        }
    }

    if (loading) {
        return <div>Carregando dados...</div>
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
        <>
            <NavBar>
                <BaseLayout title='Gerenciar Usuários'>
                    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        style={{width: '40%'}}
                    >
                        <Alert variant="filled" severity="success" onClose={handleClose} sx={{ width: '100%' }}>Usuário excluido com sucesso.</Alert>
                    </Snackbar>
                    <Box
                        display='flex'
                        alignItems='center'
                        height={theme.spacing(5)}
                    >
                        {/*<TextField
                            size='small'
                            placeholder='Pesquisar...'
                        />*/}
                        <Box
                            flex={1}
                            display='flex'
                            justifyContent='end'
                            marginBottom={2}
                        >
                            <Button
                                color='primary'
                                variant='contained'
                                disableElevation
                                startIcon={<Add/>}
                            >
                                Novo Usuário
                            </Button>
                        </Box>
                    </Box>
                    
                    {tipo === 'Medico' && <h1>MEDICO</h1>}
                    {tipo === 'Paciente' && <h1>PACIENTE</h1>}
                    <PaperStyled>
                        <h2>Listagem de Usuários</h2>
                        <TableContainer component={Paper} elevation={0}>
                            <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>NOME</TableCell>
                                    <TableCell>DATA DE NASCIMENTO</TableCell>
                                    <TableCell>GÊNERO</TableCell>
                                    <TableCell>E-MAIL</TableCell>
                                    <TableCell>CRIADO EM</TableCell>
                                    <TableCell>ATUALIZADO EM</TableCell>
                                    <TableCell>AÇÕES</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(u => (
                                    <TableRow key={u.id}>
                                        <TableCell component="th" scope="row">{u.id}</TableCell>
                                        <TableCell component="th" scope="row">{u.nome}</TableCell>
                                        <TableCell>{new Date(u.dt_nascimento).toLocaleDateString('pt-br')}</TableCell>
                                        <TableCell>{u.genero}</TableCell>
                                        <TableCell>{u.email}</TableCell>
                                        <TableCell>{new Date(u.criado_em).toLocaleString('pt-br')}</TableCell>
                                        <TableCell>{new Date(u.atualizado_em).toLocaleString('pt-br')}</TableCell>
                                        <TableCell>
                                            <ButtonBox>
                                                <ButtonTool
                                                    size="small"
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => navigate(`/usuario/consultas/${u.id}`)}
                                                >
                                                    <Event/>
                                                </ButtonTool>
                                                <ButtonTool
                                                    size="small"
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => navigate(`/usuario/editar/${u.id}`)}
                                                >
                                                    <BorderColor/>
                                                </ButtonTool>
                                                <ButtonTool
                                                    size="small"
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => remove(u.id)}
                                                >
                                                    <Delete/>
                                                </ButtonTool>
                                            </ButtonBox>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </PaperStyled>
                </BaseLayout>
            </NavBar>
        </>
    )
}

export default UsuariosListagem
