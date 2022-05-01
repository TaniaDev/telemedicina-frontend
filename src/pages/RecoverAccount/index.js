import { api } from '../../services/api'
import { useState, useEffect } from 'react'
import { Container, Button, Grid, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function RecoverAccount({handleClose}){
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
            handleClose()
            navigate('/')
        } catch (err) {
            console.error("ops! ocorreu um erro" + err)
        }
    }

    return(
        <Container style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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