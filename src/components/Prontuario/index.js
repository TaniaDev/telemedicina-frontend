import React, { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination';

import api from '../../services/api'
import Registro from './Registro'

let Prontuario = ({idPaciente}) => {
    const [prontuarios, setProntuarios] = useState([])
    const [registro, setRegistro] = useState({})

    useEffect(() => {
        getProntuario()
        getProntuarioById()
    }, [])

    
    async function getProntuario(){
        const result = await api.get(`/prontuario/${idPaciente}`)
        setProntuarios(result.data)

        if(result.data.length > 0){
            setRegistro(result.data[0])
        }else{
            setRegistro(null)
        }
        
    }

    function getProntuarioById(n){
        if(n){
            setRegistro(prontuarios[n-1])
        }
    }

    return(
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{marginTop: '0px'}}>PRONTUARIO</h1><hr/>

            {(registro) ? (
                <Registro 
                    key={registro.id}
                    id_paciente={registro.id_paciente} 
                    id_medico={registro.id_medico}
                    dt_hr_consulta={registro.dt_hr_consulta} 
                    doenca={registro.doenca} 
                    motivo_consulta={registro.motivo_consulta} 
                    tempo_doente={registro.tempo_doente} 
                    sintoma={registro.sintoma} 
                    resumo={registro.resumo}
                />
            ) : (
               'Não Há Registros'
            )}


            <Pagination count={prontuarios.length} color="primary" onClick={(e) => getProntuarioById(e.target.textContent)}/>
        </div>
    )
}

export default Prontuario