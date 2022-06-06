import { useEffect, useState } from 'react';

import './styles/App.scss';
import Search from './components/Search';
import SplashScreen from './components/SplashScreen';
import ListMahasiswa from './components/ListMahasiswa';
import { motion } from 'framer-motion'
import library from './lib/regex'

// data
import mahasiswas from './data/data_13_21.json'
import list_fakultas from './data/list_fakultas.json'
import list_jurusan from './data/list_jurusan.json'

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const mahasiswasPerPage = 20
let arrayMahasiswas = []

function App() {
  const [datas, setDatas] = useState(mahasiswas)
  const [items, setItems] = useState([])
  const [next, setNext] = useState(10)

  const loopWithSlice = (start, end) => {
    const slicedMahasiswas = datas.slice(start, end)
    arrayMahasiswas = [...arrayMahasiswas, ...slicedMahasiswas]
    setItems(arrayMahasiswas)
  }

  useEffect(() => {
    loopWithSlice(0, mahasiswasPerPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleSearch = (e) => {
    let search = e.target.value
    let regex = RegExp(library.getRegex(search), 'i')
    console.log(search)
    console.log(regex)
    if (search !== '') {
      setDatas(library.filterMahasiswa(mahasiswas, regex))
      arrayMahasiswas = datas.slice(0, 20)
    } else {
      setDatas(mahasiswas)
      arrayMahasiswas = mahasiswas.slice(0, 20)
    }
    setItems(arrayMahasiswas)
  }

  return (
    <>
      <SplashScreen />
      <div className="App">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{duration: 4}}
        >
          <div className='header'>
            <h1>ITB NIM Finder</h1>
            <h4>By : Jason Kanggara</h4>
          </div>
        </motion.div>
        <Search handleSearch={handleSearch} />
        <ListMahasiswa 
          mahasiswas={items}
          convertKode={getFakultasOrJurusan}
        />
        <div className='button-container'>
          {datas.length > 20 && (
            <button className='load-more-button' onClick={loadMoreData}>LOAD MORE</button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
