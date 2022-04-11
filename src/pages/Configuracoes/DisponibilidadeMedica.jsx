import {useState, useEffect} from 'react'

import { api } from '../../services/api'
import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'
import styles from './DisponibilidadeMedica.module.css'


let DisponibilidadeMedica = () => {
    const [diasSelecionados, setDiasSelecionados] = useState([])
    const [inicioExpediente, setInicioExpediente] = useState("")
    const [terminoExpediente, setTerminoExpediente] = useState("")
    const [inicioAlmoco, setInicioAlmoco] = useState("")
    const [terminoAlmoco, setTerminoAlmoco] = useState("")
    const [disponibilidade, setDisponibilidade] = useState([])

    useEffect(() => {
        getDisponibilidadeMedica()
    }, [])

    async function getDisponibilidadeMedica(){
        const result = await api.get("/getDisponibilidadeMedica")
        setDisponibilidade(result.data)
    }

    function preencherFormulario(){
        let aux = disponibilidade[0].dia_semana
        let array = aux.split(',')
     
        array.forEach((item) => {
            document.querySelectorAll('.checkbox')[item].checked = true
        })

        document.querySelector('#inicioExpediente').value = '09:00'
        document.querySelector('#terminoExpediente').value = '18:00'
        document.querySelector('#inicioAlmoco').value = '12:00'
        document.querySelector('#terminoAlmoco').value = '13:00'
    }

    async function enviar(e){
        e.preventDefault();

        let dias_selecionados = diasSelecionados.toString()
        let inicio = parseInt(inicioExpediente)
        let termino = parseInt(terminoExpediente)
        let inicioAlmo = parseInt(inicioAlmoco)
        let intervalo = termino - inicio

        for (let i = 0; i < intervalo; i++) {
            if(inicio !== inicioAlmo){
                await api.post("/definirDisponibilidadeMedica", { horas: inicio, dia_semana: dias_selecionados })
            }else{
                alert('almoco')
            }
            inicio++
        }
    }

    function verificarDiasSelecionados(){
        let checkBoxes = document.querySelectorAll('.checkbox')
        let dias_selecionados = []

        checkBoxes.forEach((el) => {
            if(el.checked){
                dias_selecionados.push(el.value)
            }
        })

        setDiasSelecionados(dias_selecionados)
    }


    return(
        <NavBar>    
            <BaseLayout title='Configurações'>
                <div className={styles.container}>
                    <button onClick={preencherFormulario}>Preencher Form</button>
                    <form onSubmit={enviar} onLoad={preencherFormulario}>
                        <fieldset className={styles.filtrosDias}>
                        <legend>Dias da Semana</legend>
                                <div className={styles.dia}>
                                    <input type="checkbox" className="checkbox" id="domingo" name="domingo" value="0"/>
                                    <label htmlFor="domingo"> Domingo</label>
                                </div>
                                <div className={styles.dia}>
                                    <input type="checkbox" className="checkbox" id="segunda" name="segunda" value="1"/>
                                    <label htmlFor="segunda"> Segunda-Feira</label>
                                </div>
                                <div className={styles.dia}>
                                    <input type="checkbox" className="checkbox"id="terca" name="terca" value="2"/>
                                    <label htmlFor="terca"> Terça-Feira</label>
                                </div>
                                <div className={styles.dia}>
                                    <input type="checkbox" className="checkbox" id="quarta" name="quarta" value="3"/>
                                    <label htmlFor="quarta"> Quarta-Feira</label>
                                </div>
                                <div className={styles.dia}>
                                    <input type="checkbox" className="checkbox" id="quinta" name="quinta" value="4"/>
                                    <label htmlFor="quinta"> Quinta-Feira</label>
                                </div>
                                <div className={styles.dia}>
                                    <input type="checkbox" className="checkbox" id="sexta" name="sexta" value="5"/>
                                    <label htmlFor="sexta"> Sexta-Feira</label>
                                </div>
                                <div className={styles.dia}>
                                    <input type="checkbox" className="checkbox" id="sabado" name="sabado" value="6"/>
                                    <label htmlFor="sabado"> Sábado</label>
                                </div>
                        </fieldset>

                        <fieldset>
                        <legend>Expediente</legend>
                            <div className={styles.expediente}>
                                <div className={styles.leftSide}>
                                    <p>Inicio:</p>
                                    <input type="time" id="inicioExpediente" onChange={(e) => setInicioExpediente(e.target.value)}/>
                                </div>

                                <div className={styles.rightSide}>
                                    <p>Termino:</p>
                                    {inicioExpediente === '' ? 
                                        <input type="time" id="terminoExpediente" disabled/>
                                    :
                                        <input type="time" onChange={(e) => setTerminoExpediente(e.target.value)}/>
                                    }
                                </div>
                            </div>
                        </fieldset>
                       
                        <fieldset>
                            <legend>Almoço</legend>
                            <div className={styles.almoco}>
                                <div className={styles.leftSide}>
                                    <p>Inicio:</p>
                                    <input type="time" id="inicioAlmoco" onChange={(e) => setInicioAlmoco(e.target.value)}/>
                                </div>

                                <div className={styles.rightSide}>
                                    <p>Termino:</p>
                                    {inicioAlmoco === '' ? 
                                        <input type="time" id="terminoAlmoco" disabled/>
                                    :
                                        <input type="time" onChange={(e) => setTerminoAlmoco(e.target.value)}/>
                                    }
                                </div>
                            </div>
                        </fieldset>
                        <div className={styles.submit}>
                            <input type="submit" id="btnSubmit" value="Enviar" onClick={verificarDiasSelecionados} />
                        </div>
                    </form>
                </div>
            </BaseLayout>
        </NavBar>
    )
}

export default DisponibilidadeMedica