import React from 'react'
import '../styles/Search.scss'
import { motion } from 'framer-motion'

const Search = ({handleSearch}) => {

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 4.5 }}
    >
      <div className='Search'>
        <h3>Search</h3>
        <input onChange={handleSearch} type="search" placeholder="Search by (name, jurusan, nim)"></input>
      </div>
    </motion.div>
  )
}

export default Search