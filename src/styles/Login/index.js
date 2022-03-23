import { styled } from '@mui/system'
import { Button, Grid, Paper, TextField } from '@mui/material'
import PhotoLogin from '../../img/photo-login.jpg'

export const ButtonLogin = styled(Button)({
    margin: '0px 8px 8px 8px'
})

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

export const InputItem = styled(TextField)({
    display: 'flex',
    marginBottom: 16,
    width: '100%'
})

export const Logo = styled('img')({
    width: 400,
    margin: '32px 8px 16px 8px'
})

export const LoginContainer  = styled(Container)({
    justifyContent: 'center'
})

export const LogoContainer = styled(Container)({
    alignItems: 'center'
})

export const PaperStyled = styled(Paper)({
    padding: 24,
    height: '80vh',
    width: 400,
    margin: '20px auto'

})

export const Principal = styled(Grid)({
    backgroundImage: `url(${PhotoLogin})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    height: '100vh'

})

export const Text = styled('div')({
    margin: '8px 0px 16px 0px'
})

export const Title = styled('h1')({
    alignText: 'center',
    margin: 8
})
