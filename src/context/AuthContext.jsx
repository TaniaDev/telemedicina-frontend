import { createContext, useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, createSession } from '../services/api'

const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUsuario = localStorage.getItem('usuario')
        const token = localStorage.getItem('token')

        if (recoveredUsuario && token) {
            setUsuario(JSON.parse(recoveredUsuario))
            api.defaults.headers.Authorization = `Bearer ${token}`
        }

        setLoading(false)
    }, [])

    async function login(email, senha) {
        try {
            const res = await createSession(email, senha)

            const usuarioLogado = res.data
            const accessToken = res.data.accessToken

            localStorage.setItem('usuario', JSON.stringify(usuarioLogado))
            localStorage.setItem('token', accessToken)

            api.defaults.headers.Authorization = `Bearer ${accessToken}`
            
            setUsuario(usuarioLogado)

            const result = await api.get(`/medico/verifyapproval/${email}`)
            if(result.data.aguardando_validacao != null){
                alert('Usuário Aguardando Aprovação, Você será notificado quando seu acesso for liberado!')
                logout()
            }

            navigate('/inicio')
        } catch (err) {
            console.error("ops! ocorreu um erro" + err)
            alert('Usuário e/ou Senha Incorreto(s)!')
        }
    }

    function logout(){
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = null
        setUsuario(null)
        navigate('/')
    }  

    return (
        <AuthContext.Provider value={{ authenticated: !!usuario, usuario, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}