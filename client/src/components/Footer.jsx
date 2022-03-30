import React from 'react'
import {FaGithubSquare,FaLinkedin,FaTwitterSquare} from "react-icons/fa"

const Footer = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center bg-[#211d1d] p-10 mt-3'>
        <div className='flex justify-between items-center'>
            <a href="" target="_blank" rel="noopener noreferrer" className='mr-3'>
                <FaGithubSquare size={30} color="white"/>
            </a>
            <a href="" target="_blank" rel="noopener noreferrer" className='mr-3'>
                <FaLinkedin size={30} color="white"/>
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
                <FaTwitterSquare size={30} color="white"/>
            </a>
        </div>
        <div className='flex justify-center items-center mt-4 border-t pt-3 text-white w-80'>
            <p>Made with Love 💟 </p>
        </div>
    </div>
  )
}

export default Footer