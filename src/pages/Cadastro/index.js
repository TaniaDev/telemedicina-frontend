import React, { useState } from 'react'
import './register.css'

import { MdEmail, MdLock, MdAccountCircle, MdChangeHistory, MdDateRange } from "react-icons/md"

function Register() {
    const [nome, setNome] = useState("")
    const [nascimento, setNascimento] = useState("")
    const [genero, setGenero] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmasenha, setConfirmaSenha] = useState("")


    return (
        
        <div className="register">
            {/*
            <div className="register-logo">
                <img 
                    src="https://anzuns.org/wp-content/uploads/2018/02/admin_login.png" 
                    alt="MdLockregister App" 
                />
            </div>
            */}
            <div className="register-box">
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
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
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


                <button type="submit">
                    Confirmar Cadastro
                </button>  

            </div>
        </div>
        
    )
}

export default Register