import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dossier from './dossier/Dossier.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dossier />
  </StrictMode>,
)
