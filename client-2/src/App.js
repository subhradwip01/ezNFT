import React,{useContext} from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Form from "./components/Form"
import AllMints from "./components/AllMints"
import { NFTContext } from './context/NFTContext'

const App = () => {
  const ntx=useContext(NFTContext)
  return (
    <div className='app-background'>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {ntx.connectedAccount && <>
          <Route path='/mint' element={<Form/>}/>
          <Route path='/allMint' element={<AllMints/>}/>
          </>}
        </Routes>
        
      <Footer/>
    </div>
  )
}

export default App