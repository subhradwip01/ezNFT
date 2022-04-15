import React from 'react'
import {FcLock} from "react-icons/fc"
import {FcLike} from "react-icons/fc"
import {FcCustomerSupport} from "react-icons/fc"
import PageHeader from './PageHeader'

const ServiceCard=({icon,title,subtitle})=>{
    return (
        <div className='flex justify-center items-center flex-col bg-[#ffff] py-4 px-5 rounded-lg md:w-[20%] w-[70%] h-[200px] text-center mx-3 my-4'>
            {icon}
            <h1 className='font-2xl font-bold'>{title}</h1>
            <p className='pt-3'>{subtitle}</p>
        </div>
    )
}

const Services = () => {
  return (
      <>
      <PageHeader title="Services We Provide"/>
    <div className='w-full my-4 mdmx-5 mx-0 flex flex-wrap justify-center items-center'>
        <ServiceCard icon={<FcCustomerSupport size={50}/>} title="24/7 Customer Service" subtitle="Customer is our is our first priority. Our executive is always ready to help you"/>
        <ServiceCard icon={<FcLike size={50}/>} title="Most Trustable Platform" subtitle="Trustable product for minting NFT"/>
        <ServiceCard icon={<FcLock size={50}/>} title="Mint Securely" subtitle="Most secure transaction. Mint your NFT with most secure and easy way"/>
    </div>
    </>
  )
}

export default Services