import React from 'react'

import { useAuthContext } from '../context/AuthContext'
import SignRoutes from './SignRoutes'
import AuthRoutes from './AuthRoutes'

export default function AppRoutes() {
    const { authenticated, loading } = useAuthContext()
    
    return authenticated ? <AuthRoutes /> : <SignRoutes />

}
