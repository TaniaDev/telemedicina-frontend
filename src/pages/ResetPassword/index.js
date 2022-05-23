import api from '../../services/api'
import {useState, useEffect} from 'react'
import { Container, Button, Grid, TextField, Snackbar, IconButton, Alert } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';

function ResetPassword(){  
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    useEffect(() => {
        getEmail()
    }, [])

    let url = window.location.pathname;
    let token = url.substring(url.lastIndexOf('/') + 1);

    async function getEmail(){
        const res = await api.get(`/usuario/getEmail/${token}`)
        setEmail(res.data.email)
    }

    async function redefinirSenha(e){
        e.preventDefault();
        try{
            if(!senha || senha == null){
                handleClick()
                return
            }
            const res = await api.post(`/usuario/redefinir_senha/${token}`, { senha });
    
            if(res.status === 200){
                handleClick1()
                window.location.href = '/'
            }          
        }catch (err) {
            console.error("ops! ocorreu um erro" + err)
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

    return(
        <Container>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="warning" onClose={handleClose} sx={{ width: '100%' }}>Prencha a senha.</Alert>
            </Snackbar>

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open1}
                autoHideDuration={6000}
                onClose={handleClose1}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose1} sx={{ width: '100%' }}>Senha alterada.</Alert>
            </Snackbar>
            <Grid container marginY={5}> 
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <h1>REDEFINIR SENHA</h1>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            <Grid container marginY={2}> 
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <form>
                        <TextField type="text" fullWidth id="standard-basic" label="E-mail" variant="standard" value={email} disabled/><br/><br/>
                        <TextField type="password" fullWidth id="standard-basic" label="Senha" variant="standard" onChange={e => setSenha(e.target.value)}/><br/><br/>
                        <Button variant="outlined" color="success" startIcon={<SaveIcon />} onClick={redefinirSenha}>Atualizar</Button>
                    </form>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>  
        </Container>
    )
}

export default ResetPassword