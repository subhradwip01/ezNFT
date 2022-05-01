import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "../utils/contractDetails";
import { create } from "ipfs-http-client";

 
export const NFTContext = createContext();
const { ethereum } = window;


// Getting NFTPunk contract
const getNFTContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const nftContract = new ethers.Contract(contractAddress, abi, signer);
  return nftContract;
};

export const NFTContextProvider = ({ projectId,projectSecret, children }) => {
  console.log(projectId,projectSecret)
  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

  const [connectedAccount, setConnectedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success,setIsSuccess]=useState(null);
  const [allNFT,setAllNFT]=useState()
  
  // Inital checking if the wallet is already connected to site
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        // Modal Create
        return alert("Please Install Metamusk");
      }
      const acc = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (acc.length > 0) {
        setConnectedAccount(acc[0]);
        getAllNFTs()
        
      } else {
        console.log("Sorry no accouts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Minting NFT
  const mintNFT = async (data) => {
    setIsLoading(true)
    try{
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
    const tokenId=await nftC.getTotalNUmberDeployedNFT()

    const res = await ipfs.add({
      path:`${tokenId}-nft.${image.type.split("/")[1]}`,
      content:image
    });

    // 2. Uploading meta data to IPFS
    // Creating meta data
    
    const jData={
      name:name,
      description:desc,
      tokenId:tokenId.toNumber(),
      image:`https://ipfs.io/ipfs/${res.cid._baseCache.get("z")}?filename=${tokenId}-nft.${image.type.split("/")[1]}`,
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
          value:stamina
        },
        
      ]
    }
    const jsonData=JSON.stringify(jData)
    const mres=await ipfs.add(jsonData);

    // 3. Minting that NFT
    const response=await nftC.mint(`https://ipfs.io/ipfs/${mres.path}`,{value:ethers.utils.parseEther((0.01).toString())})
    setIsSuccess(true)
    getAllNFTs()
  }
  catch(e){
    console.log(e.message)
    setIsSuccess(false)
  }
  setIsLoading(false)
  };

  // Connecting to metamusk for authentication
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please Install Metamusk");
      }
      setIsLoading(true);
      const acc = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsLoading(false);
      setConnectedAccount(acc[0]);
      getAllNFTs()
    } catch (error) {
      console.log(error);
    }
  };

  // getting all NFTs
  const getAllNFTs=async ()=>{
    if(!ethereum) {
      return alert("Please install metamusk")
    }
    try{
    const nftC=getNFTContract();
        const data=await nftC.getAllNFTDetails();
        const aNFTS=data.map(d=>({
          owner:d.owner,
          tokenId:d.tokenId.toNumber(),
          uri:d.uri,
          timeStamp:new Date(d.timeStamp.toNumber() * 1000).toLocaleString()

        }))
        setAllNFT(aNFTS)
      }
      catch(e){
        console.log(e.message)
      }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const contextVal = {
    connectWallet,
    isLoading,
    connectedAccount,
    mintNFT,
    success,
    allNFT
  };

  return (
    <NFTContext.Provider value={contextVal}>{children}</NFTContext.Provider>
  );
};
