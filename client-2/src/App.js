import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Form from "./components/Form"


const App = () => {
  return (
    <div className='app-background'>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/mint' element={<Form/>}/>
          {/* <Route path='/' element={<Home/>}/> */}
        </Routes>
      <Footer/>
    </div>
  )
}

export default App