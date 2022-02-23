import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import {
    AppBar,
    Button,
    ButtonGroup,
    CssBaseline,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'

import Navbar from '../../components/Navbar'

import {
    Principal
} from '../../styles/Dashboard'


function Dashboard() {

    const [users, setUsers] = useState([])
    
    useEffect(() => {
        async function loadUsers(){
        const response = await api.get('/inicio')
        setUsers(response.data)
        }
        loadUsers();
    },[])

    return (
        <>
            <Navbar />
        </>
    )
}

export default Dashboard