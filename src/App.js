import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { theme } from './themes'
import Routes from './routes'
import DrawerProvider from './context/DrawerContext'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <DrawerProvider>
          <Routes />
        </DrawerProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App

