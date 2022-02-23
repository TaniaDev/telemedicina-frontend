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

export const pacienteListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary="Página Inicial" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DateRange />
      </ListItemIcon>
      <ListItemText primary="Minhas Consultas" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <InsertInvitation />
      </ListItemIcon>
      <ListItemText primary="Nova Consulta" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Histórico Médico" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="Perfil" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Configurações" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);

export const medicoListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary="Página Inicial" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DateRange />
      </ListItemIcon>
      <ListItemText primary="Minha Agenda" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MedicalServices />
      </ListItemIcon>
      <ListItemText primary="Lista de Pacientes" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Histórico Médico" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="Perfil" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Configurações" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);