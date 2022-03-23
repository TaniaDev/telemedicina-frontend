import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Icon
} from '@mui/material'
import { useAuthContext } from '../../../context/AuthContext'


export default function ListItemLink(props) {
    const navigate = useNavigate()
    const { logout } = useAuthContext()

    const handleLogout = () => {
        logout()
    }
    
    const handleClick = () => {
        if (props.to === 'exit') {
            handleLogout()
        } else {
            navigate(props.to)
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