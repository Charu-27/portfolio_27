import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './theme/ThemeProvider.tsx'
import './index.css'

const saved = localStorage.getItem('portfolio-theme')
if (saved === 'light' || saved === 'dark') {
  document.documentElement.setAttribute('data-theme', saved)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

