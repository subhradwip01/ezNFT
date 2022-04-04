import React,{useState} from 'react'
import nftHero from "../assets/nftHero.png"
import { motion } from "framer-motion"

const HeroSection = () => {
      const heading="ezNFT";
      const sub="A platform to deploy your NFT in opensea in just on click"
      const sentence={
        hidden:{
          opacity:1
        },
        visible:{
          opacity:1,
          transition:{
            delay:0.5,
            staggerChildren:0.1
          }
        }
      }
      const letter = {
        hidden:{
          opacity:0,
          y:50
        },
        visible: {
          opacity:1,
          y:0
        }
      };
  return (
    <div className='flex flex-wrap-reverse items-center justify-center h-[100vh]'>
        <motion.div className='text-center' variants={sentence} initial="hidden" animate="visible">
          {
            heading.split("").map((char,i)=>(
              <motion.span key={`${char}-${i}`} className="md:text-[15rem] text-[5rem] font-semibold" variants={letter}>
                {char}
              </motion.span>
            ))
          }
          <br/>
          {
            sub.split("").map((char,i)=>(
              <motion.span key={`${char}-${i}`} variants={letter} className="text-[2rem]">
                {char}
              </motion.span>
            ))
          }

        </motion.div>
        <div className='flex justify-center items-center -z-10'>
            <img className='w-[600px] animate-bounce' src={nftHero}></img>
        </div>
        
    </div>
  )
}

export default HeroSection