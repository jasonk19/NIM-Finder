import React from 'react'
import Mahasiswa from './Mahasiswa'
import "../styles/ListMahasiswa.scss"

const ListMahasiswa = ({mahasiswas, convertKode}) => {
  return (
    <div className='ListMahasiswa'>
      {mahasiswas.map((mahasiswa) => (
        <Mahasiswa 
          nama={mahasiswa[0]}
          jurusan={convertKode(mahasiswa[2] ? mahasiswa[2].slice(0,3) : mahasiswa[1].slice(0,3))}
          nim_fakultas={mahasiswa[1]}
          nim_jurusan={mahasiswa[2]}
        />
      ))}
    </div>
  )
}

export default ListMahasiswa