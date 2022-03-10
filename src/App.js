import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { theme } from './themes'
import Routes from './routes'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Routes />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App

