import React from 'react';
import ReactDOM from 'react-dom';
import { FaCross } from 'react-icons/fa'; 

const Modal = (props) => {
  return ReactDOM.createPortal (
    <div className="fixed z-[9999] w-100 h-100 bg-[#1616168c]">
        <div className='modal-content'>
            <div className='modal-close'>
                <button className='btn-outline' style={{borderColor:"red",padding:"0",width:"50px"}} onClick={props.onClose}>
                    <FaCross/>
                </button>
            </div>
            <div>

            </div>
        </div>
    </div>,document.getElementById("modal")
  )
}

export default Modal