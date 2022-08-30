import { api } from '../../services/api'
import { useState, useEffect } from 'react'
import { Container, Button, Grid, TextField, Snackbar, IconButton, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function RecoverAccount({handleClose}){
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    
    async function esqueceuASenha(e){
        try{
            e.preventDefault()
            if(!email || email == null){
                handleClick()
                return
            }

            let exists = await api.get(`/usuario/getUserByEmail/${email}`)

            if(exists.data == ''){
                handleClick1()
                return 
            }
            
            await api.post("/usuario/esqueceu_a_senha", { email })
            
            handleClick2()
            setTimeout(() => {
                handleClose()
            }, 3000)
            
        } catch (err) {
            console.error("ops! ocorreu um erro" + err)
        }
    }

    const handleClick = () => {
        setOpen(true);
    };	
    
    const handleClose3 = (event, reason) => {
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
    const handleClick2 = () => {
        setOpen2(true);
    };	
    
    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen2(false);
    };

    return(
        <Container style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose3}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="warning" onClose={handleClose3} sx={{ width: '100%' }}>Preencha o e-mail e clique em esqueceu a senha novamente.</Alert>
            </Snackbar>
            
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open1}
                autoHideDuration={6000}
                onClose={handleClose1}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="warning" onClose={handleClose1} sx={{ width: '100%' }}>E-mail não encontrado.</Alert>
            </Snackbar>
            
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open2}
                autoHideDuration={6000}
                onClose={handleClose2}
                style={{width: '40%'}}
            >
                <Alert variant="filled" severity="success" onClose={handleClose2} sx={{ width: '100%' }}>O link foi enviado. Acesse o seu e-mail para redefinir a senha.</Alert>
            </Snackbar>

            <Grid item xs={12} sm={12} md={10} lg={7}>
                <h1>RECUPERAR CONTA</h1>
                <p>Insira o seu email e enviaremos um link para você redefinir a senha da sua conta.</p>
            </Grid>
                
            
            <Grid item xs={12} sm={12} md={10} lg={7}>
                <form>
                    <TextField style={{marginBottom: '1rem'}}
                        type="text"
                        fullWidth
                        id="standard-basic"
                        label="E-mail"
                        variant="standard"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Button tpye="submit" onClick={e => esqueceuASenha(e)}>
                        Enviar Link
                    </Button>
                </form>
            </Grid>
            
        </Container>
    )
}

export default RecoverAccount