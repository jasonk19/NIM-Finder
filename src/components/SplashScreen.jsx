import React from 'react'
import "../styles/SplashScreen.scss"
import illustration from '../assets/illustration.png'
import { motion } from 'framer-motion'

const SplashScreen = () => {
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-100vh" },
  }

  return (
    <motion.div
      initial="visible"
      animate="hidden"
      variants={variants}
      transition={{ ease: "easeIn", duration: 2, delay: 0.5 }}
      className='SplashScreen'
    >
        <img src={illustration} alt="illustration"></img>
        <h1>Best Site To Find <br /> ITB Students</h1>
    </motion.div>
  )
}

export default SplashScreen