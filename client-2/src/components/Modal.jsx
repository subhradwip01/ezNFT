import React from 'react';
import ReactDOM from 'react-dom';
import { FaCross } from 'react-icons/fa'; 
import Success from "../assets/success.png"
import Cancel from "../assets/cancel.png"
const Modal = (props) => {
  return ReactDOM.createPortal (
    <div className={`fixed z-[9999] w-[100%] h-[100%] top-0 left-0 bg-[#1616168c] flex justify-center items-center overflow-hidden ${!props.active? "hidden":"block"}`}>
        <div className={`w-[500px] h-[300px] bg-white rounded-lg overflow-hidden transition-all ${props.active?"scale-100":"scale-0"}`}>
            <div className='w-100 flex justify-end items-center mt-3 mr-4'>
                <button className=''onClick={props.onClose}>
                    X
                </button>
            </div>
            <div className='flex justify-center items-center flex-col'>
             <img src={props.success ? Success : Cancel} alt="Logo" className='w-[30%] h-[30%] mt-3'/>
             {props.success ? <p className='text-[1.2rem] mt-5 w-100 text-center'>SuccessFully Deployed your NFT</p>
              : <p className='text-[1.2rem] mt-5 w-100 text-center'>Oops! Unable to Mint nft from your account! May be limit exceed (Max NFT per account 3)</p>}
            </div>
        </div>
    </div>,document.getElementById("modal")
  )
}

export default Modal