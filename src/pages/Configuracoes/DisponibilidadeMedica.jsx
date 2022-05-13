import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Select, MenuItem, InputLabel, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { api } from '../../services/api'
import NavBar from '../../components/NavBar'
import BaseLayout from '../../layouts/BaseLayout'
import styles from './DisponibilidadeMedica.module.css'

import {
    Div,
  } from '../../styles/Cadastro/Cadastro'
import { ConstructionOutlined } from '@mui/icons-material';

let DisponibilidadeMedica = () => {
    let navigate = useNavigate()
    const [diasSelecionados, setDiasSelecionados] = useState([])
    const [diasDaSemana, setDiasDaSemana] = useState([])
    const [inicioExpediente, setInicioExpediente] = useState("")
    const [terminoExpediente, setTerminoExpediente] = useState("")
    const [inicioAlmoco, setInicioAlmoco] = useState("")
    const [terminoAlmoco, setTerminoAlmoco] = useState("")
    const [disponibilidade, setDisponibilidade] = useState([])
    const horas = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    // const horas = ['00:00', '01:00', '02:00', '03:00']

    useEffect(() => {
        getDisponibilidadeMedica()
        getDiasDaSemana()
    }, [])

    async function getDiasDaSemana(){
        const result = await api.get('/getDiasDaSemana')
        setDiasDaSemana(result.data)
    }
    async function getDisponibilidadeMedica(){
        const result = await api.get("/getDisponibilidadeMedica")

        if(result.data.length > 0){
            setDisponibilidade(result.data)

            let aux = []
        
            result.data.forEach((item) => {
                if(!aux.includes(item.dia)){
                    aux.push(item.dia)
                    aux.sort()
                }
            })

            aux.forEach((item) => {
                document.querySelectorAll('.checkbox')[item].checked = true
            })

            setInicioExpediente(result.data[0].horas)
            setTerminoExpediente(parseInt(result.data[result.data.length - 1].horas) + 1)

            let auxAlmoco = []
            result.data.map(item => {
                if(!auxAlmoco.includes(item.horas)){
                    auxAlmoco.push(item.horas)
                }
            })            

            let hrAnterior

            for (let i = 0; i < auxAlmoco.length; i++) {
                let hrMenosUm = auxAlmoco[i]
                hrMenosUm = parseInt(hrMenosUm) - 1

                if(hrMenosUm < 10){
                    hrMenosUm = String(hrMenosUm)
                    hrMenosUm = '0' + hrMenosUm
                }

                if(i == 0){
                    hrAnterior = hrMenosUm
                }

                if(String(hrAnterior) !== String(hrMenosUm)){
                    setInicioAlmoco(hrMenosUm)
                    setTerminoAlmoco(auxAlmoco[i])
                }

                hrAnterior = auxAlmoco[i]
            }
            
        }
    }

    async function enviar(e){
        e.preventDefault();

        if(disponibilidade.length > 0){
            await api.delete("/definirDisponibilidadeMedica")
        }

        let checkBoxes = document.querySelectorAll('.checkbox')
        let selecionados = []

        checkBoxes.forEach((el) => {
            if(el.checked){
                selecionados.push(el.value)
            }
        })

        setDiasSelecionados(selecionados)

        let dias_selecionados = diasSelecionados.toString()
        
        let termino = parseInt(terminoExpediente)
        let inicioAlmo = parseInt(inicioAlmoco)
        


        selecionados.map(async function inserir(selecionado){
            let inicio = parseInt(inicioExpediente)
            let intervalo = termino - inicio

            for (let i = 0; i < intervalo; i++) {
                if(inicio !== inicioAlmo){
                    if(inicio < 10){
                        inicio = String(inicio)
                        inicio = '0' + inicio
                    }
                    await api.post("/definirDisponibilidadeMedica", { horas: inicio, dia_selecionado: selecionado })
                }
                inicio++
            }      
        })

        
        alert("Disponibilidade Definida com Sucesso!")
        navigate('/inicio')
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

    function setAlmoco(hora){
        setInicioAlmoco(hora)
        setTerminoAlmoco(parseInt(hora)+1)
    }

    return(
        <NavBar>    
            <BaseLayout title='Configurações'>
                {/* <div className={styles.container}> */}
                    <form onSubmit={enviar} style={{width: '100%'}}>

                    {/* <FormGroup aria-label="position" row style={{justifyContent: 'space-between'}}>
                        {diasDaSemana.map(dia => (
                            <FormControlLabel control={<Checkbox />} label={dia.titulo} labelPlacement="bottom"/>
                        ))} 

                    </FormGroup> */}

                        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                            <div className={styles.dia} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
                                <input type="checkbox" className="checkbox" id="domingo" name="domingo" value="0" style={{width: '18px', height: '18px'}}/>
                                <label htmlFor="domingo"> Domingo</label>
                            </div>
                            <div className={styles.dia} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
                                <input type="checkbox" className="checkbox" id="segunda" name="segunda" value="1" style={{width: '18px', height: '18px'}} />
                                <label htmlFor="segunda"> Segunda-Feira</label>
                            </div>
                            <div className={styles.dia} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
                                <input type="checkbox" className="checkbox"id="terca" name="terca" value="2" style={{width: '18px', height: '18px'}} />
                                <label htmlFor="terca"> Terça-Feira</label>
                            </div>
                            <div className={styles.dia} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
                                <input type="checkbox" className="checkbox" id="quarta" name="quarta" value="3" style={{width: '18px', height: '18px'}} />
                                <label htmlFor="quarta"> Quarta-Feira</label>
                            </div>
                            <div className={styles.dia} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
                                <input type="checkbox" className="checkbox" id="quinta" name="quinta" value="4" style={{width: '18px', height: '18px'}} />
                                <label htmlFor="quinta"> Quinta-Feira</label>
                            </div>
                            <div className={styles.dia} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
                                <input type="checkbox" className="checkbox" id="sexta" name="sexta" value="5" style={{width: '18px', height: '18px'}} />
                                <label htmlFor="sexta"> Sexta-Feira</label>
                            </div>
                            <div className={styles.dia} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem'}}>
                                <input type="checkbox" className="checkbox" id="sabado" name="sabado" value="6" style={{width: '18px', height: '18px'}} />
                                <label htmlFor="sabado"> Sábado</label>
                            </div>
                        </div>
                        

                        
                        {/* <div className={styles.expediente}> */}
                            {/* <div className={styles.leftSide}>
                                <p>Inicio:</p>
                                <input type="time" id="inicioExpediente" defaultValue={inicioExpediente} onChange={(e) => setInicioExpediente(e.target.value)}/>
                            </div> */}

                            {/* <div className={styles.rightSide}>
                                <p>Termino:</p>
                                {inicioExpediente === '' ? 
                                    <input type="time" id="terminoExpediente" disabled/>
                                :
                                    <input type="time" defaultValue={terminoExpediente} onChange={(e) => setTerminoExpediente(e.target.value)}/>
                                }
                            </div> */}

                            <Div style={{width: '100%', marginTop: '2rem'}}>
                                <FormControl variant="outlined" fullWidth> 
                                    <>       
                                        <InputLabel size="small">Inicio Expediente</InputLabel>
                                        <Select
                                            size="small"
                                            labelId="inicioExpediente"
                                            id="inicioExpediente"
                                            label="inicioExpediente"
                                            name="inicioExpediente" 
                                            onChange={(e) => setInicioExpediente(e.target.value)}
                                            value={inicioExpediente}
                                        >
                                            {horas.map(hr => (<MenuItem key={hr} value={hr}>{hr}</MenuItem>))}
                                        </Select>
                                    </>
                                </FormControl>
                            </Div>

                            <Div style={{width: '100%'}}>
                                <FormControl variant="outlined" fullWidth disabled={(!inicioExpediente) ? true : false}> 
                                    <>       
                                        <InputLabel size="small">Termino Expediente</InputLabel>
                                        <Select
                                            size="small"
                                            labelId="terminoExpediente"
                                            id="terminoExpediente"
                                            label="terminoExpediente"
                                            name="terminoExpediente" 
                                            onChange={(e) => setTerminoExpediente(e.target.value)}
                                            value={terminoExpediente}
                                        >
                                            {horas.map(hr => {
                                                if(parseInt(hr) > parseInt(inicioExpediente)){
                                                    return(<MenuItem key={hr} value={hr}>{hr}</MenuItem>)
                                                }
                                            })}
                                        </Select>
                                    </>
                                </FormControl>
                            </Div>
                        {/* </div> */}
                        
                       
                        
                        {/* <div className={styles.almoco}> */}
                            {/* <div className={styles.leftSide}>
                                <p>Inicio:</p>
                                <input type="time" id="inicioAlmoco" defaultValue={inicioAlmoco} onChange={(e) => setInicioAlmoco(e.target.value)}/>
                            </div> */}

                            {/* <div className={styles.rightSide}>
                                <p>Termino:</p>
                                {inicioAlmoco === '' ? 
                                    <input type="time" id="terminoAlmoco" disabled/>
                                :
                                    <input type="time" defaultValue={terminoAlmoco} onChange={(e) => setTerminoAlmoco(e.target.value)}/>
                                }
                            </div> */}

                            <Div style={{width: '100%'}}>
                                <FormControl variant="outlined" fullWidth disabled={(!inicioExpediente && !terminoExpediente) ? true : false}> 
                                    <>        
                                        <InputLabel size="small">Inicio Almoço</InputLabel>
                                        <Select
                                            size="small"
                                            labelId="inicioAlmoco"
                                            id="inicioAlmoco"
                                            label="inicioAlmoco"
                                            name="inicioAlmoco" 
                                            onChange={(e) => setAlmoco(e.target.value)}
                                            value={inicioAlmoco}
                                        >
                                            {horas.map(hr => {
                                                if((parseInt(hr) > parseInt(inicioExpediente)) && parseInt(hr) < parseInt(terminoExpediente)){
                                                    return(<MenuItem key={hr} value={hr}>{hr}</MenuItem>)
                                                }
                                            })}   
                                        </Select>
                                    </>
                                </FormControl>
                            </Div>
                            
                            
                            {/* {horas.map(hr => (<h1>{hr}</h1>))}    */}

                            <Div style={{width: '100%'}}>
                                <FormControl variant="outlined" fullWidth disabled> 
                                    <>       
                                        <InputLabel size="small">Fim Almoço</InputLabel>
                                        <Select
                                            size="small"
                                            labelId="terminoAlmoco"
                                            id="terminoAlmoco"
                                            label="terminoAlmoco"
                                            name="terminoAlmoco" 
                                            value={terminoAlmoco}
                                        >
                                            <MenuItem key={terminoAlmoco} value={terminoAlmoco}>{terminoAlmoco}</MenuItem>  
                                        </Select>
                                    </>
                                </FormControl>
                            </Div>
                        {/* </div> */}
                        
                        <Button variant="contained" fullWidth onClick={enviar} style={{marginTop: '1rem'}}>Salvar</Button>
                        
                    </form>
                {/* </div> */}
            </BaseLayout>
        </NavBar>
    )
}

export default DisponibilidadeMedica