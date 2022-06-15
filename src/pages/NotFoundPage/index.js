import React from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import NotFound from '../../img/notFound.png'
import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'

function NotFoundPage(){
    const navigate = useNavigate()
    return(
        <>
            <NavBar>
                <BaseLayout title="404 - Not Found">
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <img src={NotFound} style={{maxWidth: '300px'}}/>
                        <h3>Página Não Encontrada.</h3>
                        <Button variant="contained" full onClick={() => navigate('/inicio')}>Voltar para Home</Button>
                    </div>
                </BaseLayout>
            </NavBar>
        </>
    )
}
export default NotFoundPage;