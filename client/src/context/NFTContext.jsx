import { createContext, useState,useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "../utils/contractDetails";

export const NFTContext = createContext();
const { ethereum } = window;

const getNFTContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const nftContract = new ethers.Contract(contractAddress, abi, signer);
  return nftContract;
};

export const NFTContextProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkIfWalletIsConnected=async()=>{
    try {
        if (!ethereum) {
            // Modal Create
            alert("Please Install Metamusk");
          }
          const acc = await ethereum.request({
            method: "eth_requestAccounts",
          });
          if(acc.length>0){

              setConnectedAccount(acc[0]);
          }else{
            console.log("Sorry no accouts found");
          }

    } catch (error) {
        console.log(error)
    }
  }


  // Connecting to metamusk for authentication
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        //   Modal Create
        alert("Please Install Metamusk");
      }
      setIsLoading(true)
      const acc = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsLoading(false)
      setConnectedAccount(acc[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    checkIfWalletIsConnected()
  },[])


  const contextVal={
      connectWallet,
      isLoading,
      connectedAccount
  }

  return <NFTContext.Provider value={contextVal}>{children}</NFTContext.Provider>;
};


