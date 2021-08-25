import React, { useState } from 'react'
import './register.css'
import logo from "../../img/logoAzul.png"
import { MdEmail, MdLock, MdAccountCircle, MdChangeHistory, MdDateRange, MdKeyboardArrowLeft } from "react-icons/md"
import api from '../../services/api'

function Cadastro() {
    const [nome, setNome] = useState("")
    const [nascimento, setNascimento] = useState("")
    const [genero, setGenero] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmasenha, setConfirmaSenha] = useState("")

    const handleCadastro = async e => {
        e.preventDefault()
        const data = { 
                    nome: nome,
                    dt_nascimento: nascimento,
                    genero: genero,
                    email: email,
                    senha: senha
                }
        if(!nome || !nascimento || !genero || !email || !senha) {
            alert("Preencha todos os dados para realizar o cadastro.")
        } else if (confirmasenha !== senha) {
            alert("Senhas não correspondem.")
        }
        else {
            try {
                const response = await api.post("/cadastro", data);
                console.log(response.data)
                alert('Seu cadastro foi realizado!')
            } catch (err) {
                console.error("ops! ocorreu um erro" + err);
            }
        }
    }

    return (
        
        <div className="register">
            <div className="register-box">
                <button type="submit" className= "botao-voltar">
                <MdKeyboardArrowLeft/>
                    Voltar
                </button>  


                <h1>Cadastro</h1>

                <div className= "register-registerInputData">
                    <MdAccountCircle/>
                    <input
                        type="string"
                        placeholder="Informe seu nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />    
                </div>

                <div className= "register-registerInputData">
                    <MdDateRange/>
                    <input
                        type="date"
                        placeholder="Informe sua data de nascimento"
                        value={nascimento}
                        onChange={e => setNascimento(e.target.value)}
                    />    
                </div>

                <div className= "register-registerInputData">
                    <MdChangeHistory/>
                    <select className= "register-registerInputSelect-box " value={genero} onChange={e => setGenero(e.target.value)}>
                        <option>Informe seu genero</option>
                        <option value="H">Homem</option>
                        <option value="M">Mulher</option>
                        <option value="O">Outro</option>
                    </select>        
                </div>

                <div className= "register-registerInputData">
                    <MdEmail/>
                    <input
                        type="email"
                        placeholder="Informe seu email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />    
                </div>

                <div className= "register-registerInputData">
                    <MdLock/>
                    <input
                        type="password"
                        placeholder="Informe sua senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />    
                </div>
                <div className= "register-registerInputData">
                    <MdLock/>
                    <input
                        type="password"
                        placeholder="Digite a senha novamente"
                        value={confirmasenha}
                        onChange={e => setConfirmaSenha(e.target.value)}
                    />    
                </div>

                <button type="submit" className= "botao-cadastro" onClick={handleCadastro}>
                    Confirmar Cadastro
                </button>  

            </div>

            <div className="register-logo">
                <img 
                    src={logo} 
                    alt="MdLockLogin App" 
                />
            </div>
        </div>
        
    )
}

export default Cadastro