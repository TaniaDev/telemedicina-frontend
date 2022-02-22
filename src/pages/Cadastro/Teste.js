import React, { useState, useEffect } from 'react'

function Teste(){
    
    const [tipo, setTipo] = useState("medico")

    useEffect(() => {
        pageUm();
    },[])

    function pageUm(){
        document.getElementById("divUm").hidden = false;
        document.getElementById("divDois").hidden = true;
        document.getElementById("divTresPaciente").hidden = true;
        document.getElementById("divTresMedico").hidden = true;
    }
    
    function pageDois(){
        document.getElementById("divUm").hidden = true;
        document.getElementById("divDois").hidden = false;
        document.getElementById("divTresPaciente").hidden = true;
        document.getElementById("divTresMedico").hidden = true;
    }
    
    function pageTres(){
        document.getElementById("divUm").hidden = true;
        document.getElementById("divDois").hidden = true;
        if(tipo == 'paciente'){
            document.getElementById("divTresPaciente").hidden = false;
            document.getElementById("divTresMedico").hidden = true;   
        }else{
            document.getElementById("divTresPaciente").hidden = true;
            document.getElementById("divTresMedico").hidden = false;   
        }
        
    }


    return(
        <>
            <button id="um" onClick={pageUm}><h1>1</h1></button>
            <button id="dois" onClick={pageDois}><h1>2</h1></button>
            <button id="tres" onClick={pageTres}><h1>3</h1></button>
            <br/><br/><br/>
            <div id="divUm">
                <h1>DIV UM</h1>
                <form>
                   NOME: <input type="text" id="nome" name="nome"/><br/>
                   <select id="tipo" name="tipo" onChange={e => setTipo(e.target.value)}>
                       <option value="paciente">Paciente</option>
                       <option value="medico">MEDICO</option>
                   </select><br/>
                   TELEFONE: <input type="text" id="telefone" name="telefone"/><br/>
                   EMAIL: <input type="text" id="email" name="email"/><br/>
                   SENHA: <input type="password" id="senha" name="senha"/><br/>
                </form>
            </div>

            <div id="divDois">
                <h1>DIV DOIS</h1>
                CEP: <input type="text" id="cep" name="cep"/><br/>
                NUMERO: <input type="text" id="numero" name="numero"/><br/>
                COMPLEMENTO: <input type="text" id="complemento" name="complemento"/><br/>
                CIDADE: <input type="text" id="cidade" name="cidade"/><br/>
                ESTADO: <input type="text" id="estado" name="estado"/><br/>
            </div>

            <div id="divTresPaciente">
                <h1>DIV TRÊS PACIENTE</h1>
                PESO: <input type="text" id="peso" name="peso"/><br/>
                ALTURA: <input type="text" id="altura" name="altura"/><br/>
                ALERGIA: <input type="text" id="alergia" name="alergia"/><br/>
                DOENCA CRONICA: <input type="text" id="doenca_cronica" name="doenca_cronica"/><br/>
                VICIO: <input type="text" id="vicio" name="vicio"/><br/>
                MEDICAMENTO: <input type="text" id="medicamento" name="medicamento"/><br/>
            </div>

            <div id="divTresMedico">
                <h1>DIV TRÊS MEDICO</h1>
                CRM: <input type="text" id="crm" name="crm"/><br/>
                ESPECIALIDADE: <input type="text" id="especialidade" name="especialidade"/><br/>

            </div>
        </>
    )
}

export default Teste