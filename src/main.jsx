import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const koucodeInfo = {
  name: 'koucode',
  age: 30
}
// globalでつかえるようにする
const KoucodeContext = createContext(koucodeInfo)
createRoot(document.getElementById('root')).render(
  <KoucodeContext.Provider value={koucodeInfo}>
  <StrictMode>
    <App />
    </StrictMode>
  </KoucodeContext.Provider>
)

export default KoucodeContext
