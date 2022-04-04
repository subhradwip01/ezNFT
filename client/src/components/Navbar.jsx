import React, { useEffect, useState } from "react";
import logo from "../assets/nft.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [connected, setConnected] = useState(false);
  const [mobileView,setMobileView]=useState(false);
  const [showMenu,setShowMenu]=useState(false)
  const walletConnector = () => {
    setConnected(true);
  };

  useEffect(()=>{
    mobileViewHandler()
  },[])

  const mobileViewHandler=()=>{
    if(window.innerWidth<=788){
      setMobileView(true)
    }
  }
  window.addEventListener("resize",mobileViewHandler)

  const showMenuHandler=()=>{
    setShowMenu(pre=>!pre)
  }
  return (
    <>
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center justify-center">
        <img src={logo} className="cursor-pointer w-12 py-5 mx-4" />
        <p className="text-3xl font-bold">ezNFT</p>
      </div>
      {!mobileView && <><div className={`flex ${connected? 'justify-between' : 'justify-center'} items-center w-[450px] text-white text-[20px] font-bold`}>
      <NavLink
        to="/"
        className={(navData) =>
          navData.isActive
            ? "bg-[#49b8ba] py-2 px-8 rounded-full cursor-pointer"
            : " cursor-pointer hover:bg-[#49b8ba] py-2 px-8 rounded-full"
        }
      >
        Home
      </NavLink>
      {connected && (
        <>
          <NavLink
            to="/mint"
            className={(navData) =>
              navData.isActive
                ? "bg-[#49b8ba] py-2 px-8 rounded-full cursor-pointer"
                : " cursor-pointer hover:bg-[#49b8ba] py-2 px-8 rounded-full"
            }
          >
            Mint
          </NavLink>
          <NavLink
            to="/allMint"
            className={(navData) =>
              navData.isActive
                ? "bg-[#49b8ba] py-2 px-8 rounded-full cursor-pointer"
                : " cursor-pointer hover:bg-[#49b8ba] py-2 px-8 rounded-full"
            }
          >
            All Mint
          </NavLink>
        </>
      )}
      </div>
      <div>
        {!connected && (
          <button
            className="mr-[5rem] bg-[#49b8ba] py-4 px-8 rounded-full text-white font-bold border-2"
            onClick={walletConnector}
          >
            Connect Your Wallet
          </button>
        )}
        {connected && (
          <div className="mr-[5rem] bg-[#49b8ba] py-4 px-8 rounded-full text-white font-bold border-2 cursor-pointer">
            0x90913ghh...whdk77
          </div>
        )}
      </div>
      </>}

      {mobileView && <div className={`menu-btn cursor-pointer ${showMenu ? 'open' : ''}`} >
        <div className="menu-btn__burger cursor-pointer" onClick={showMenuHandler}></div>
      </div>}
    </div>
    {mobileView && <div className={`flex relative bg-[#4f4c4c75] flex-col justify-center items-center z-50 py-5 transition transform  ease-in delay-400 ${!showMenu ? 'translate-y-[-550px]': 'translate-y-0'}`}>
    <div className='flex flex-col justify-center items-center w-[450px] text-white text-[20px] font-bold'>
      <NavLink
        to="/"
        className={(navData) =>
          navData.isActive
            ? "bg-[#49b8ba] py-2 px-8 rounded-full cursor-pointer"
            : " cursor-pointer hover:bg-[#49b8ba] py-2 px-8 rounded-full"
        }
      >
        Home
      </NavLink>
      {connected && (
        <>
          <NavLink
            to="/mint"
            className={(navData) =>
              navData.isActive
                ? "bg-[#49b8ba] py-2 px-8 rounded-full cursor-pointer"
                : " cursor-pointer hover:bg-[#49b8ba] py-2 px-8 rounded-full"
            }
          >
            Mint
          </NavLink>
          <NavLink
            to="/allMint"
            className={(navData) =>
              navData.isActive
                ? "bg-[#49b8ba] py-2 px-8 rounded-full cursor-pointer"
                : " cursor-pointer hover:bg-[#49b8ba] py-2 px-8 rounded-full"
            }
          >
            All Mint
          </NavLink>
        </>
      )}
      </div>
      <div>
        {!connected && (
          <button
            className="my-3 bg-[#49b8ba] py-4 px-8 rounded-full text-white font-bold border-2"
            onClick={walletConnector}
          >
            Connect Your Wallet
          </button>
        )}
        {connected && (
          <div className="my-5 bg-[#49b8ba] py-4 px-8 rounded-full text-white font-bold border-2 cursor-pointer">
            0x90913ghh...whdk77
          </div>
        )}
      </div>

    </div>}
    </>
  );
};

export default Navbar;
