import {styled} from '@mui/system'
import photoRegister from '../../img/photo-register.jpg'

export const Container = styled('div')({
    display: 'flex', 
    height: '100vh',
    width: '100vw', 
    maxWidth: '1440px',
})

export const Left = styled('div')(({theme}) => ({
    flex: 1, 
    backgroundImage: `url(${photoRegister})`, 
    backgroundPosition: 'center', 
    backgroundSize: 'cover',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}))

export const Right = styled('div')({
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center'
})

export const Form = styled('form')({
    width: '90%', 
    display: 'flex', 
    flexDirection: 'column',
    flexWrap: 'wrap',
})

export const BirthDate = styled('input')(({theme}) => ({
    width: '100%',
    height: '40px', 
    color: 'rgba(0, 0, 0, 0.6)',
    border: '1px solid #C2C1BF',
    borderRadius: '4px',
    paddingLeft: '14px',
    paddingRight: '10px',
    backgroundColor: '#F7F6F3',
    fontSize: '16px',  
}))

export const Div = styled('div')(({theme}) => ({
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
        // > 600px
        marginBottom: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
        // < 600px
        flexDirection: 'column',        
    },
}))

export const ItemLeft = styled('div')(({theme}) => ({
    flex: 1,
    
    [theme.breakpoints.up('sm')]: {
        marginRight: '5px',   
    },

    [theme.breakpoints.down('sm')]: {
        marginBottom: '1rem',        
    },
}))

export const ItemRight = styled('div')(({theme}) => ({
    flex: 1,
    [theme.breakpoints.up('sm')]: {
        marginLeft: '5px',   
    },
}))

