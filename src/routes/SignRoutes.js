import React from 'react'
import { 
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

import Cadastro from '../pages/Cadastro'
import Login from '../pages/Login'
import ResetPassword from '../pages/ResetPassword'
import RecoverAccount from '../pages/RecoverAccount'

export default function SignRoutes() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/cadastro' exact element={<Cadastro/>} />
                <Route path='/recuperar-senha' exact element={<RecoverAccount/>} />
                <Route path='/usuario/redefinir_senha/:token' exact element={<ResetPassword/>} />
            </Routes>
        </Router>
    )
}
