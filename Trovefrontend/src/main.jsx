import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Scrolltotop from './hooks/Scrolltotop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Scrolltotop/>
    <App />
  </StrictMode>,
)
