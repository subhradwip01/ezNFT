import React from 'react'
import logo from "../assets/nft.png"

const Navbar = () => {
  return (
    <div className='w-full flex flex-start'>
      <div className='flex items-center justify-center'>
        <img src={logo} className='cursor-pointer w-12 py-5 mx-4'/>
        <p className='text-3xl font-bold'>ezNFT</p>
      </div>
        
    </div>
  )
}

export default Navbar