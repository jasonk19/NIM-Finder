import { useEffect, useState } from 'react';

import './styles/App.scss';
import Search from './components/Search';
import SplashScreen from './components/SplashScreen';
import ListMahasiswa from './components/ListMahasiswa';
import { motion } from 'framer-motion'
import { kmp } from './lib/kmp'

// data
import mahasiswas from './data/data_13_21.json'
import list_fakultas from './data/list_fakultas.json'
import list_jurusan from './data/list_jurusan.json'
import kode_fakultas from './data/kode_fakultas.json'
import kode_jurusan from './data/kode_jurusan.json'

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const mahasiswasPerPage = 10
let arrayMahasiswas = []

function App() {

  const [items, setItems] = useState([])
  const [next, setNext] = useState(10)

  const loopWithSlice = (start, end) => {
    const slicedMahasiswas = mahasiswas.slice(start, end)
    arrayMahasiswas = [...arrayMahasiswas, ...slicedMahasiswas]
    setItems(arrayMahasiswas)
  }

  useEffect(() => {
    loopWithSlice(0, mahasiswasPerPage)
  }, [])

  const loadMoreData = () => {
    loopWithSlice(next, next + mahasiswasPerPage)
    setNext(next + mahasiswasPerPage)
  }

  const getFakultasOrJurusan = (kode) => {
    if (kode in list_fakultas) {
      return list_fakultas[kode]
    } else if (kode in list_jurusan) {
      return list_jurusan[kode]
    }
  }

  return (
    <>
      <SplashScreen />
      <div className="App">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{duration: 6}}
        >
          <div className='header'>
            <h1>ITB NIM Finder</h1>
            <h4>By : Jason Kanggara</h4>
          </div>
        </motion.div>
        <Search />
        <ListMahasiswa 
          mahasiswas={items}
          convertKode={getFakultasOrJurusan}
        />
        <div className='button-container'>
          <button className='load-more-button' onClick={loadMoreData}>Load More</button>
        </div>
      </div>
    </>
  );
}

export default App;
