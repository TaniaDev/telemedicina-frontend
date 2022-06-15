import dayjs from 'dayjs'

let Registro = ({id_paciente, id_medico, dt_hr_consulta, doenca, motivo_consulta, tempo_doente, sintoma, resumo}) => {
    return(
        <div style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>
            <div style={{flex: 1}}>
                <p><b>Paciente:</b> {id_paciente}</p> 
                <p><b>Médico:</b> {id_medico}</p>
                <p><b>Data Consulta:</b> {dayjs(dt_hr_consulta).format('DD/MM/YYYY HH:mm:ss')}</p>
                <p><b>Enfermidade:</b> {doenca}</p>
            </div>
            <div style={{flex: 1}}>
                <p><b>Motivo da Consulta:</b> {motivo_consulta}</p>
                <p><b>Tempo Doente (em dias):</b> {tempo_doente}</p>
                <p><b>Sintomas:</b> {sintoma}</p>
                
            </div>
            <div style={{width: '100%'}}>
                <p><b>Resumo:</b> {resumo}</p>
            </div>
        </div>
    )
}

export default Registro