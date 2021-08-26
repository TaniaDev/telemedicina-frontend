import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { Link } from 'react-router-dom'
import logo from "../../img/logoAzul.png"
import './login.css'
import api from '../../services/api';

function Login() {
    let history = useHistory();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [isShowing, setIsShowing] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        try {
            const res = await api.post("/login", { email: email, senha: senha });
            console.log(res.data);
            setLoading(false);
            history.push('/usuarios');
        } catch (err) {
            console.error("ops! ocorreu um erro" + err)
        }
    }

    function loadLogin() {
        setLoading(true);
        setTimeout(
           () => handleLogin(),
           2000
        )
    }

    const handleChangeEyeIcon = (e) => {
        e.preventDefault()
        setIsShowing(!isShowing);
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
                        type={isShowing ? "text" : "password"}
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <div className="login-eye" onClick={handleChangeEyeIcon}>
                        {isShowing ? <HiEye size={20} /> : <HiEyeOff size={20} />}
                    </div> 
                </div>
                        
                        <button type="submit" onClick={loadLogin} disabled={loading}>
                            {loading? "carregando..." : "Entrar"}
                        </button>

                <h4>Não tenho conta!</h4>

                <button type="submit" onClick={() => history.push('/cadastro')}>
                    Cadastrar 
                </button>

            </div>
        </div>
        
    )
}

export default Login