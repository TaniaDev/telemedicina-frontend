import { blue, cyan } from '@mui/material/colors'
import { createTheme } from '@mui/material'

import '@fontsource/roboto'
import '@fontsource/ubuntu'


export const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[600],
      dark: blue[900],
      contrastText: '#fff',
    },
    secondary: {
      light: cyan[300],
      main: cyan[600],
      dark: cyan[900],
      contrastText: '#000',
    },
    background: {
      default: '#f7f6f3',
      paper: '#fff',
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Ubuntu',
      'Roboto Slab',
      'sans-serif'
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*, *::before, *::after": {
          margin: 0,
          padding: 0
        },
      },
    },
  },
})
