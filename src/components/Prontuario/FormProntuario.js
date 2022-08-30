import { useState } from 'react'
import Button from '@mui/material/Button';

import api from '../../services/api'

let FormProntuario = ({id_paciente}) => {
    const [doenca, setDoenca] = useState("")
    const [motivoConsulta, setMotivoConsulta] = useState("")
    const [tempoDoente, setTempoDoente] = useState("")
    const [sintoma, setSintoma] = useState("")
    const [resumo, setResumo] = useState("")
    const [showForm, setShowForm] = useState(true)
    const [showMessage, setShowMessage] = useState(false)

    async function cadastrar(e){
        e.preventDefault()
        setShowForm(false)
        setShowMessage(true)

        setTimeout(() => {
            setShowMessage(false)
        }, 5000);

        await api.post("/prontuario", {
            id_paciente,
            doenca,
            motivo_consulta: motivoConsulta,
            tempo_doente: tempoDoente,
            sintoma,
            resumo
        });
    }
    
    return(
        <>
            {showForm ?
                <div style={{width: '300px', padding: '0px 1rem'}}>
                    <div>
                        <h3 align="center">Preencha o prontuario</h3>
                        <form style={{display: 'flex', flexDirection: 'column'}}>
                            <label htmlFor="doenca"><b>Doença(s)</b></label>
                            <input type="text" id="doenca" placeholder="Doença" style={{marginBottom: '1rem'}} onChange={(e) => setDoenca(e.target.value)}/>

                            <label htmlFor="motivo"><b>Motivo da Consulta</b></label>
                            <input type="text" id="motivo" placeholder="motivo" style={{marginBottom: '1rem'}} onChange={(e) => setMotivoConsulta(e.target.value)}/>

                            <label htmlFor="tempo"><b>Tempo Doente (em dias)</b></label>
                            <input type="number" id="tempo" placeholder="tempo doente" style={{marginBottom: '1rem'}} onChange={(e) => setTempoDoente(e.target.value)}/>

                            <label htmlFor="sintoma"><b>Sintoma(s)</b></label>
                            <input type="text" id="sintoma" placeholder="sintomas" style={{marginBottom: '1rem'}} onChange={(e) => setSintoma(e.target.value)}/>

                            <label htmlFor="resumo"><b>Resumo</b></label>
                            <textarea id="resumo" placeholder="resumo" rows="7" maxlength="1000" style={{marginBottom: '1rem'}} onChange={(e) => setResumo(e.target.value)}/>

                            <Button variant="contained" onClick={cadastrar}>Salvar</Button>
                        </form>
                    </div>
                </div>
            :
                showMessage && (
                    <div style={{width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh', paddingLeft: '1rem'}}>
                        <div style={{backgroundColor: '#d4edda', border: '1px solid #155724', padding: '3rem', width: '100%', borderRadius: '10px'}}>
                            <h1 align="center">Salvo!</h1>
                        </div>
                    </div>
                )
                
            }
        </>
)}

export default FormProntuario