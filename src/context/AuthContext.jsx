import { createContext, useEffect, useContext, useState } from 'react'
import { api, createSession } from '../services/api'

const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const recoveredUsuario = localStorage.getItem('usuario')
        console.log(recoveredUsuario)
        const token = localStorage.getItem('token')
        console.log(token)

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
            console.log(usuarioLogado)
            const accessToken = res.data.accessToken
            console.log(accessToken)

            localStorage.setItem('usuario', JSON.stringify(usuarioLogado))
            localStorage.setItem('token', accessToken)

            api.defaults.headers.Authorization = `Bearer ${accessToken}`
            
            setUsuario(usuarioLogado)
            return 
        } catch (err) {
            console.error("ops! ocorreu um erro" + err)
        }
    }
    
    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        api.defaults.headers.Authorization = null
        setUsuario(null)
    }  

    return (
        <AuthContext.Provider value={{ authenticated: !!usuario, usuario, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}