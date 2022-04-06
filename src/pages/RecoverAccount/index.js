import { api } from '../../services/api'
import { useState, useEffect } from 'react'
import { Container, Button, Grid, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function RecoverAccount(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    
    async function esqueceuASenha(e){
        try{
            e.preventDefault()
            if(!email || email == null){
                alert('Preencha o e-mail e clique em esqueceu a senha novamente')
                return
            }

            let exists = await api.get(`/usuario/getUserByEmail/${email}`)

            if(exists.data == ''){
                alert('E-mail não encontrado!')
                return 
            }
            
            await api.post("/usuario/esqueceu_a_senha", { email })
            
            alert("O link foi enviado. Acesse o seu e-mail para redefinir a senha")
            navigate('/')
        } catch (err) {
            console.error("ops! ocorreu um erro" + err)
        }
    }

    return(
        <Container>
            <Grid container marginY={5}> 
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <h1>RECUPERAR CONTA</h1>
                    <p>Insira o seu email e enviaremos um link para você redefinir a senha da sua conta.</p>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
            <Grid container marginY={2}> 
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <form>
                        <TextField
                            type="text"
                            fullWidth
                            id="standard-basic"
                            label="E-mail"
                            variant="standard"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <br/><br/>
                        <Button tpye="submit" onClick={e => esqueceuASenha(e)}>
                            Enviar Link
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>  
        </Container>
    )
}

export default RecoverAccount