import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../recursos/img-1.jpg'
import img2 from '../recursos/img-2.jpg'
import img3 from '../recursos/img-3.jpg'


export const Inicio = () => {
  return (
    <>
    <div className='titulo'>
    <h1 className='tit'>Clinica Central UIS</h1>
    </div>
    <div className='inicioContainer'>
        <div className='card1'>
            <div className='content'>
                <h1>Medicos</h1>
                <img src={img1} className='img' alt='' />
                <Link className="nav-link active btn btn-primary" to="/medicos">IR</Link>
            </div>
        </div>
        <div className='card1'>
            <div className='content'>
                <h1>Pacientes </h1>
                <img src={img2} className='img' alt='' />
                <Link className="nav-link active btn btn-primary" to="/pacientes">IR</Link>
            </div>
        </div>
        <div className='card1'>
            <div className='content'>
                <h1>Turnos </h1>
                <img src={img3} className='img' alt=''/>
                <Link className="nav-link active btn btn-primary" to="/turnos">IR</Link>
            </div>
        </div>
       

    </div>
    </>
  )
}
