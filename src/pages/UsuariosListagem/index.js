import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow }from '@mui/material'
import Navbar from '../../components/Navbar'

function UsuariosListagem(){
    
    const [users, setUsers] = useState([])
    const [tipo, setTipo] = useState("")

    useEffect(() => {
        getType()
        async function loadUsers(){
        const response = await api.get('/index')
        setUsers(response.data)
        }
        loadUsers();
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

    return (
        <>
            <Navbar/>
            {tipo === 'Medico' && <h1>MEDICO</h1>}
            {tipo === 'Paciente' && <h1>PACIENTE</h1>}
            <Paper>
                <h2>Listagem de Usuários</h2>
                <TableContainer component={Paper}>
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
                                        <Button color="primary" href={`/usuario/editar/${u.id}`}>Atualizar</Button>
                                        <Button color="secondary" onClick={() => remove(u.id)}>Excluir</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    )
}

export default UsuariosListagem
