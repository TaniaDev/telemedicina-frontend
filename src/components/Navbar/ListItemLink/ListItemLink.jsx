import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Icon
} from '@mui/material'


export default function ListItemLink(props) {
    let history = useHistory()

    useEffect(() => {
        verificaLogado()
    }, [])

    function verificaLogado(){
        if(localStorage.getItem('token') == null){
            history.push('/');
        }
    }
    
    function logout(){
        localStorage.removeItem("token")
        verificaLogado()
    }
    
    const handleClick = () => {
        if (props.to === 'exit') {
            logout()
        } else {
            history.push(props.to)
        }
    }

    return (
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
                <Icon>
                    {props.icon}
                </Icon>
            </ListItemIcon>
            <ListItemText primary={props.label} />
        </ListItemButton>
    )
}