import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RootProvider } from '@/providers/RootProvider'
import '@/index.css'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </StrictMode>
)
