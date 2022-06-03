import React from 'react'
import '../styles/Mahasiswa.scss'

const Mahasiswa = ({nama, jurusan, nim_jurusan, nim_fakultas}) => {
  return (
    <div className='Mahasiswa'>
      <div className='card'>
        <div className='nama-jurusan'>
          <p>{nama}</p>
          <p>{jurusan}</p>
        </div>
        <div className='nim'>
          <p>{nim_jurusan}</p>
          <p>{nim_fakultas}</p>
        </div>
      </div>
    </div>
  )
}

export default Mahasiswa