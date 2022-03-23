import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { 
    Box,
    Button,
    ButtonGroup,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    useTheme
} from '@mui/material'
import { Add, BorderColor, Delete, Event } from '@mui/icons-material'
import { ButtonTool, PaperStyled } from '../../styles/UsuariosListagem'
import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'

function UsuariosListagem(){
    const theme = useTheme()
    const [users, setUsers] = useState([])
    const [tipo, setTipo] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getType()
        async function loadUsers(){
            const response = await api.get('/admin')
            setUsers(response.data)
            setLoading(false)
        }
        loadUsers()
    },[])

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
                alert('Usuário excluido com sucesso!')
                window.location.reload()
            } catch(err) {
                alert("ops! ocorreu um erro" + err)
            }
        }
    }

    if (loading) {
        return <div>Carregando dados...</div>
    }

    return (
        <>
            <NavBar>
                <BaseLayout title='Gerenciar Usuários'>
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
                                            <ButtonGroup aria-label="outlined primary button group">
                                                <ButtonTool color="primary" href={`/usuario/consultas/${u.id}`}><Event/></ButtonTool>
                                                <ButtonTool color="primary" href={`/usuario/editar/${u.id}`}><BorderColor/></ButtonTool>
                                                <ButtonTool color="error" onClick={() => remove(u.id)}><Delete/></ButtonTool>
                                            </ButtonGroup>
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
