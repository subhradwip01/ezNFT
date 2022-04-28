import React from 'react'
import HeroSection from './HeroSection'
import Services from './Services'
import { motion } from 'framer-motion'
const Home = () => {
  return (
    <motion.div initial={{x:50}} animate={{x:0}} exit={{x:50}}>
        <HeroSection/>
        <Services/>
    </motion.div>
  )
}

export default Home