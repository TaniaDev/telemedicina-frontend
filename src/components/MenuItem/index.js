import React from 'react'
import { 
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  Assignment,
  ExitToApp,
  Dashboard,
  DateRange,
  InsertInvitation,
  MedicalServices,
  Person,
  Settings,
  
} from '@mui/icons-material'

export default function MenuItem(props) {
    <ListItem button>
      <ListItemIcon>
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.title} />
    </ListItem>
}