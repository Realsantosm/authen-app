import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import SignUp from './pages/SignUp'
import LogIn from './pages/Login'


function App() {


  return ( 
  <>
    {/* <h1 className='text-3xl font-bold'>Welcome to the App</h1> */}
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  </>
  )
}

export default App
