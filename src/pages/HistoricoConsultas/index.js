import React from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'
import StickyHeadTable from '../../components/StickyHeadTable'

function HistoricoConsultas(){
    const navigate = useNavigate()
    return(
        <>
            <NavBar>
                <BaseLayout title="Historico de Consultas">
                    <StickyHeadTable/> 
                </BaseLayout>
            </NavBar>
        </>
    )
}
export default HistoricoConsultas;