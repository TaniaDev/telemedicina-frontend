import React from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'
import ReactBigCalendar from '../../components/ReactBigCalendar'

function Agenda(){
    const navigate = useNavigate()
    return(
        <>
            <NavBar>
                <BaseLayout title="Agenda">
                    <ReactBigCalendar/>
                </BaseLayout>
            </NavBar>
        </>
    )
}
export default Agenda;