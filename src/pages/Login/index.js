import React, { useState } from 'react'
import './login.css'

import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        setShow(!show);
    }
    return (
        <div className="login">
            <div className="login-logo">
                <img 
                    src="https://anzuns.org/wp-content/uploads/2018/02/admin_login.png" 
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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="login-eye">
                        {show ? (
                            <HiEye
                                size={20}
                                OnClick={handleClick}
                            />
                        ) : (
                            <HiEyeOff
                                size={20}
                                OnClick={handleClick}
                            />
                        )}
                    </div> 
                </div>

                <button type="submit">
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