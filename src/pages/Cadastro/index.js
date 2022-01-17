import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import photo from "../../img/photo_register.png"
import { AccountBox, ArrowBack, Email, Lock } from '@mui/icons-material'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, Paper, NativeSelect, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    buttonBack: {
        borderStyle: 'none',
        borderRadius: 10
    },
    container: {
        marginTop: 20,
        marginLeft: 20,
        display: 'flex',
        padding: 10,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 500,
        height: 550

    },
    containerItem: {
        flex: 1
    },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}))

function Cadastro() {
    let history = useHistory();
    const classes = useStyles();
    const [nome, setNome] = useState("")
    const [nascimento, setNascimento] = useState("")
    const [genero, setGenero] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmasenha, setConfirmaSenha] = useState("")

    async function handleCadastro(e) {
        e.preventDefault()
        const data = {
                    nome: nome,
                    dt_nascimento: nascimento,
                    genero: genero,
                    email: email,
                    senha: senha
                }
        if(!nome || !nascimento || !genero || !email || !senha) {
            alert("Preencha todos os dados para realizar o cadastro.")
        } else if (confirmasenha !== senha) {
            alert("Senhas não correspondem.")
        }
        else {
            try {
                const response = await api.post("/cadastro", data);
                console.log(response.data)
                alert('Seu cadastro foi realizado!')
                history.push('/login');
            } catch (err) {
                console.error("ops! ocorreu um erro" + err);
            }
        }
    }

    return (
        <Grid container style={{ minHeight: '100vh' }} spacing={3}>
            <Grid container item xs={12} sm={6}>
                <Link to="/login">
                    <Button type="link" className={classes.buttonBack}>
                        <ArrowBack/>
                    </Button>
                </Link>
                <Paper className={classes.container}>
                    <h1 className={classes.containerItem}>Cadastro</h1>
                    <Box className={classes.containerItem}>
                        <TextField
                            style={{width: 400}}
                            variant="filled"
                            label="Informe seu nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountBox />
                                </InputAdornment> ),}}
                        />
                    </Box>
                    <Box className={classes.containerItem}>
                        <TextField
                            style={{width: 400}}
                            variant="filled"
                            type="date"
                            label="Informe sua data de nascimento"
                            value={nascimento}
                            onChange={e => setNascimento(e.target.value)}
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
                                value={genero}
                                onChange={e => setGenero(e.target.value)}
                            >
                                <option aria-label="None" value="" />
                                <option value="H">Homem</option>
                                <option value="M">Mulher</option>
                                <option value="O">Outro</option>
                            </NativeSelect>
                            </FormControl>
                    </Box>
                    <Box className={classes.containerItem}>
                        <TextField
                            style={{width: 400}}
                            type="email"
                            variant="filled"
                            label="Informe seu email"
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
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Lock/>
                                </InputAdornment> ),}}
                        />
                    </Box>
                    <Box className={classes.containerItem}>
                        <TextField
                            style={{width: 400}}
                            type="password"
                            variant="filled"
                            label="Digite a senha novamente"
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
                        <Button variant="contained" color="primary" type="submit" onClick={e => handleCadastro(e)}>
                            Confirmar Cadastro
                        </Button>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <img className={classes.img} src={photo} alt="Telemedicina" />
            </Grid>
        </Grid>
    )
}

export default Cadastro
