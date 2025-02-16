import { createRoot } from 'react-dom/client'
import './index.css'
import './button.css'
import './checkbox.css'
import './slider.css'
import './switch.css'
import App from './App.tsx'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')!).render(
    <><App/><Analytics/></>
)
