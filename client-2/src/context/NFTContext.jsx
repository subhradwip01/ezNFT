import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "../utils/contractDetails";
import { create } from "ipfs-http-client";

 
export const NFTContext = createContext();
const { ethereum } = window;


const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

// Getting NFTPunk contract
const getNFTContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const nftContract = new ethers.Contract(contractAddress, abi, signer);
  return nftContract;
};

export const NFTContextProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        // Modal Create
        alert("Please Install Metamusk");
      }
      const acc = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (acc.length > 0) {
        setConnectedAccount(acc[0]);
      } else {
        console.log("Sorry no accouts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Minting NFT
  const mintNFT = async (data) => {
    console.log(data);
    console.log(projectId,projectSecret)
    const { name, desc, image,cuteness,power,stamina } = data;

    // Connecting to ifura ipfs
    let ipfs;
    ipfs = create({
      url: "https://ipfs.infura.io:5001",
      headers: {
        authorization,
      },
    });

    // getting nft contract
    const nftC=getNFTContract()

    // 1. Uploading Image to IPFS

    const res = await ipfs.add(image);

    // 2. Uploading meta data to IPFS
    // Creating meta data
    const tokenId=await nftC.getTotalNUmberDeployedNFT()
    const jData={
      name:name,
      description:desc,
      tokenId:tokenId.toNumber(),
      iamge:`https://ipfs.infura.io/ipfs/${res.path}`,
      attributes:[
        {
          trait_type:"Cuteness",
          value:cuteness
        },
        {
          trait_type:"Power",
          value:power
        },
        {
          trait_type:"Stamina",
          stamina:stamina
        },
        
      ]
    }
    const jsonData=JSON.stringify(jData)
    const mres=await ipfs.add(jsonData);
    console.log(`https://ipfs.infura.io/ipfs/${mres.path}`)

    // 3. Minting that NFT
  };

  // Connecting to metamusk for authentication
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        //TOD0:   Modal Create
        alert("Please Install Metamusk");
      }
      setIsLoading(true);
      const acc = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsLoading(false);
      setConnectedAccount(acc[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const contextVal = {
    connectWallet,
    isLoading,
    connectedAccount,
    mintNFT,
  };

  return (
    <NFTContext.Provider value={contextVal}>{children}</NFTContext.Provider>
  );
};
