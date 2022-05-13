import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import AuthProvider from './context/AuthContext'
import { theme } from './themes'
import AppRoutes from './routes'
import DrawerProvider from './context/DrawerContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <DrawerProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </DrawerProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App

