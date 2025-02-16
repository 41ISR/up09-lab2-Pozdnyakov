
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Routers from './app/router/router'
import Chat from './contexts/ChatContext'
function App() {

  return (
    <>
      <Chat>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </Chat>
    </>
  )
}

export default App
