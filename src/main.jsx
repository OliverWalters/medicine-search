import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import './assets/index.css'

import { CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <>
    <SnackbarProvider>
      <CssBaseline />
      <App />
    </SnackbarProvider>
  </>
)
