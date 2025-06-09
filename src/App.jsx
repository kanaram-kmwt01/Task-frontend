import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Compontents/Login'
import Signup from './Compontents/Signup'
import Forgetpassword from './Pages/Password/Forgetpassword'
import Home from './Compontents/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/forget' element={<Forgetpassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
