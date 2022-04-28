import React,{useContext} from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes,Route, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Form from "./components/Form"
import AllMints from "./components/AllMints"
import { NFTContext } from './context/NFTContext'
import { AnimatePresence } from 'framer-motion'

const App = () => {
  const ntx=useContext(NFTContext)
  const location = useLocation();

  return (
    <div className='app-background'>
      <Navbar/>
      <AnimatePresence>
        <Routes key={location.path} location={location}>
          <Route path='/' element={<Home/>}/>
          {ntx.connectedAccount && <>
          <Route path='/mint' element={<Form/>}/>
          <Route path='/allMint' element={<AllMints/>}/>
          </>}
        </Routes>
        </AnimatePresence>
        
      <Footer/>
    </div>
  )
}

export default App