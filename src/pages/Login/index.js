import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import HttpsIcon from '@material-ui/icons/Https'
import EmailIcon from '@material-ui/icons/Email'
import logo from "../../img/logoAzulHoriz.png"
import photo from "../../img/photo_login.png"
import api from '../../services/api'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    logo: {
        width: 400,
        marginBottom: 15
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    containerLogo: {
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        padding: 10,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    containerItem: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontSize: 16,
        alignText: 'center',
        marginBottom: 20
    },
    marginItem: {
        marginBottom: 10
    }
}))

function Login() {
    let history = useHistory();
    const classes = useStyles();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [isShowing, setIsShowing] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        try {
            const res = await api.post("/login", { email: email, senha: senha });
            console.log(res.data);
            setLoading(false);
            history.push('/index');
        } catch (err) {
            console.error("ops! ocorreu um erro" + err)
        }
    }

    function loadLogin() {
        setLoading(true);
        setTimeout(
           () => handleLogin(),
           2000
        )
    }

    const handleChangeEyeIcon = (e) => {
        e.preventDefault()
        setIsShowing(!isShowing);
    }

    return (
        <div className={classes.root}>
            <Grid container style={{ minHeight: '100vh' }} spacing={3}>
                <Grid item xs={12} sm={6}>
                    <img className={classes.img} src={photo} alt="Telemedicina" />
                </Grid>
                <Grid container item xs={12} sm={6} className={classes.container}>
                    <div/>
                    <div className={classes.containerItem} style={{ maxWidth: 400, minWidth: 300 }}>
                        <Grid container className={classes.containerLogo}>
                            <img className={classes.logo} src={logo} alt="Telemedicina" />
                            <h1 className={classes.title}>ENTRAR NO WEBMED</h1>
                        </Grid>
                        <TextField className={classes.marginItem} InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment> ),}}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            label="Digite seu email"
                            variant="filled" />
                        <TextField className={classes.marginItem} InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <HttpsIcon />
                            </InputAdornment> ),
                            endAdornment: (
                            <InputAdornment position="end">
                                <div onClick={handleChangeEyeIcon}>
                                    {isShowing ? <VisibilityIcon size={20} /> : <VisibilityOffIcon size={20} />}
                                </div>
                            </InputAdornment>
                            ),}}
                            type={isShowing ? "text" : "password"}
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            label="Digite sua senha"
                            variant="filled" />
                            <div className={classes.containerItem}>
                                <Button className={classes.marginItem} variant="contained" color="primary" onClick={loadLogin} disabled={loading}>
                                    {loading? "carregando..." : "Entrar"}
                                </Button>
                                <p className={classes.title} style={{alignSelf: 'center'}}>Você é novo?</p>
                                <Button className={classes.marginItem} variant='outlined' color="primary" onClick={() => history.push('/cadastro')}>
                                    Cadastrar
                                </Button>
                            </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login
