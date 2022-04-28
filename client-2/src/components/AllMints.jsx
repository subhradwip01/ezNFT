import React, { useContext } from 'react'
import { NFTContext } from '../context/NFTContext'
import PageHeader from './PageHeader'
import Placeholder from "../assets/placeholder.png"
import { addressShortner } from '../utils/addressShortner'
import { motion } from 'framer-motion'

const AllMints = () => {
  const ntx = useContext(NFTContext)
  const [nftData, setNFTData] = React.useState([])

  const dataSet = async () => {
    let imageURI, name;
    let data = []

    if (ntx.allNFT) {
      for (let i = 0; i < 5; i++) {
        const uriData = await fetch(ntx.allNFT[i].uri)
        const uriJson = await uriData.json()
        imageURI = uriJson.image;
        name = uriJson.name;
        const upadateData = { ...ntx.allNFT[i], name, imageURI }
        data.push(upadateData)
      }
    }
    setNFTData(data)
  }
  React.useEffect(() => {
    dataSet()
  }, [ntx.allNFT])

  return (
    <div className='h-[90vh]'>
      <PageHeader title="NFTS of NFTPunk" />
      {nftData.length > 0 && <NFTLists NFTData={nftData} />}
    </div>
  )
}

const NFTLists = ({ NFTData }) => {
  return (
    <div className='w-100 flex justify-center items-center flex-wrap'>
      {NFTData.map(({ name, owner, imageURI, timeStamp, uri, tokenId }) => (
        <NFTItem name={name} imageURI={imageURI} owner={owner} tokenId={tokenId} timeStamp={timeStamp} uri={uri} />
      ))}
    </div>
  )
}


const NFTItem = ({ name, owner, imageURI, timeStamp, uri, tokenId }) => {
  return (
    <motion.div initial={{x:50}} animate={{x:0}} exit={{x:50}} className='w-[300px] h-[350px] bg-[transparent] flex justify-center items-center  flex-col mx-2 mt-4 px-4 cursor-pointer nftcard'>

      <div className='nftcard-inner rounded-3xl bg-white'>
        <div className='nftcard-front'>
          <img src={imageURI ? imageURI : Placeholder} alt="nft-img" srcset="" className='w-[100%] object-contain p-5' />
          <p className='font-semibold text-[1.7rem] px-4'>{name}</p>
        </div>
        <div className='nftcard-back w-[100%] my-4 px-5'>
          <div className='flex justify-between'>
            <p className='font-semibold text-lg'>Owner:</p>
            <p>{addressShortner(owner)}</p>

          </div>
          <div className='flex justify-between'>
            <p className='font-semibold text-lg'>Time:</p>
            <p>{timeStamp}</p>

          </div>
          <div className='flex justify-between'>
            <p className='font-semibold text-lg'>tokenId:</p>
            <p>{tokenId}</p>

          </div>
          <div className='bg-[#93CFB7] rounded-lg mt-3 text-center py-4 px-2'>
            <a href={`https://testnets.opensea.io/assets/0x5149d0f1fd0b1dbf3988637910014d0809dde6b9/${tokenId}`} target="_blank" rel='norel'>Visit Opensea to view NFT</a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AllMints