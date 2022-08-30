import { styled } from '@mui/system'
import { Link, } from '@mui/material'
import photoLogin from '../../img/photo-login.jpg'

export const Container = styled('div')({
    display: 'flex',
    height: '100vh', 
    width: '100vw', 
    maxWidth: '1440px',
})

export const Left = styled('div')({
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center'
})

export const Right = styled('div')(({theme}) => ({
    flex: 1, 
    backgroundImage: `url(${photoLogin})`, 
    backgroundPosition: 'center', 
    backgroundSize: 'cover',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}))

export const Img = styled('img')({
    width: '50%'
})

export const Form = styled('form')({
    width: '90%'
})

export const LinkStyled = styled(Link)({
    marginBottom: '1rem', 
    marginLeft: '5px', 
    cursor: 'pointer'
})

export const Div = styled('div')({
    marginBottom: '1rem'   
})

export const DivCadastreSe = styled('div')({
    display: 'flex', 
    marginBottom: '1rem', 
    justifyContent: 'center'    
})

export const DivEsqueceuASenha = styled('div')({
    display: 'flex', 
    marginBottom: '1rem', 
    justifyContent: 'end', 
    paddingRight: '1rem'
})

