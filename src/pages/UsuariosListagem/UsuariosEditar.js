import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AccountBox, ArrowBack, Email, Lock } from '@mui/icons-material'
import { Box, Button, FormControl, InputAdornment, InputLabel, Paper, NativeSelect, TextField, Snackbar, IconButton, Alert } from '@mui/material'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    buttonBack: {
        borderStyle: 'none',
        borderRadius: 10
    },
    container: {
        marginLeft: 70,
        display: 'flex',
        padding: 10,
        alignItems: 'right',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 1000,
        height: 550
    },
    containerItem: {
        flex: 1,
        marginLeft: 30
    }
}))

function UsuariosEditar() {
    const navigate = useNavigate()
    const classes = useStyles()
    const [nome, setNome] = useState("")
    const [dt_nascimento, setDt_Nascimento] = useState("")
    const [genero, setGenero] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmasenha, setConfirmaSenha] = useState("")
    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    useEffect(() => {
      async function getUsuario() {
        var response = await api.get(`/usuario/${id}`)
        // console.log(response)
        setNome(response.data.nome);
        setDt_Nascimento(response.data.dt_nascimento);
        setGenero(response.data.genero);
        setEmail(response.data.email);
        setSenha(response.data.senha);
      }
      getUsuario();
    }, [])

    async function atualizar(id){
        const data = {nome, dt_nascimento, genero, email, senha}
          if(nome !== '' && dt_nascimento !== '' && genero !== '' && email !== '' && senha !== ''){
              console.log('1')
            if(!senha) {
              handleClick1()
            }else {
                console.log('3')
              try {
                console.log('4')
                const response = await api.put(`/usuario/editar/${id}`, {data});
                console.log(response.data)
                handleClick()
                setTimeout(() => {
                    navigate('/admin');
                }, 3000)
            } catch (err) {
                console.error("ops! ocorreu um erro" + err);
            }
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

    const handleClick1 = () => {
        setOpen1(true);
    };	
    
    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen1(false);
    };

    return (
      <>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            style={{width: '40%'}}
        >
            <Alert variant="filled" severity="success" onClose={handleClose} sx={{ width: '100%' }}>Alteração realizada.</Alert>
        </Snackbar>

        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open1}
            autoHideDuration={6000}
            onClose={handleClose1}
            style={{width: '40%'}}
        >
            <Alert variant="filled" severity="warning" onClose={handleClose1} sx={{ width: '100%' }}>Por favor, digite a senha para confirmar a alteração.</Alert>
        </Snackbar>

                <Link to="/admin">
                    <Button type="link" className={classes.buttonBack}>
                        <ArrowBack/>
                    </Button>
                </Link>
              <Paper className={classes.container}>
                    <h1 className={classes.containerItem}>Atualizar Dados</h1>
                    <Box className={classes.containerItem}>
                        <TextField
                            style={{width: 400}}
                            variant="filled"
                            label="Informe seu nome"
                            id="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountBox />
                                </InputAdornment> ),}}
                        />
                        <TextField
                            style={{width: 400, marginLeft: 15}}
                            variant="filled"
                            type="date"
                            label="Informe sua data de nascimento"
                            id="dt_nascimento"
                            value={dt_nascimento}
                            onChange={e => setDt_Nascimento(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                    <Box className={classes.containerItem}>
                        <FormControl className={classes.formControl}>
                        <InputLabel>Gênero</InputLabel>
                            <NativeSelect
                                style={{width: 400}}
                                variant="filled"
                                id="genero"
                                value={genero}
                                onChange={e => setGenero(e.target.value)}
                            >
                                <option aria-label="None" value="" />
                                <option value="H">Homem</option>
                                <option value="M">Mulher</option>
                                <option value="O">Outro</option>
                            </NativeSelect>
                            </FormControl>
                       <TextField
                            style={{width: 400, marginLeft: 15}}
                            type="email"
                            variant="filled"
                            label="Informe seu email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment> ),}}
                      />
                    </Box>
                    <Box className={classes.containerItem}>
                        <TextField
                            style={{width: 400}}
                            type="password"
                            variant="filled"
                            label="Informe sua senha"
                            id="senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Lock/>
                                </InputAdornment> ),}}
                        />
                        <TextField
                            style={{width: 400, marginLeft: 15}}
                            type="password"
                            variant="filled"
                            label="Digite a senha novamente"
                            id="confirmasenha"
                            value={confirmasenha}
                            onChange={e => setConfirmaSenha(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Lock/>
                                </InputAdornment> ),}}
                        />
                    </Box>
                    <Box className={classes.containerItem}>
                        <Button variant="contained" color="primary" type="submit" onClick={() => atualizar(id)}>
                            Confirmar Alteração
                        </Button>
                    </Box>
                </Paper>
      </>
    )
}

export default UsuariosEditar
