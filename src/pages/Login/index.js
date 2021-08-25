import React, { useState } from 'react'
import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"
import logo from "../../img/logoAzul.png"
import './login.css'
import api from '../../services/api';

function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [show, setShow] = useState(false)

    const handleLogin = async e => {
        e.preventDefault()
        if (!email || !senha) {
            alert("Preencha todos os dados para fazer login");
        } else {
            try {
                const response = await api.post("/login", { email: email, senha: senha });
                console.log(response.data);
    
            } catch (err) {
                console.error("ops! ocorreu um erro" + err) 
            }
                
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        setShow(!show);
    }

    return (
        <div className="login">
            <div className="login-logo">
                <img 
                    src={logo} 
                    alt="MdLockLogin App" 
                />
            </div>

            <div className="login-right">
                <h1>Acessar App</h1>

                <div className= "login-loginInputEmail">
                    <MdEmail/>
                    <input
                        type="email"
                        placeholder="Digite um email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />    
                </div>
                <div className="login-loginInputPassword">
                    <MdLock/>
                    <input
                        placeholder="Digite sua senha"
                        type={show ? "text" : "password"}
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <div className="login-eye">
                        {show ? (
                            <HiEye
                                size={20}
                                onClick={handleClick}
                            />
                        ) : (
                            <HiEyeOff
                                size={20}
                                onClick={handleClick}
                                />
                            )}
                    </div> 
                </div>

                <button type="submit" onClick={handleLogin}>
                    Entrar
                </button>

                <h4>Não tenho conta!</h4>

                <button type="submit">
                    Cadastrar
                </button>  

            </div>
        </div>
        
    )
}

export default Login