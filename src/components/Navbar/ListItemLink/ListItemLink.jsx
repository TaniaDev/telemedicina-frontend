import { useHistory } from 'react-router-dom'
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Icon
} from '@mui/material'


export default function ListItemLink(props) {
    const history = useHistory()

    const handleClick = () => {
        history(props.to)
        props.onClick?.()
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