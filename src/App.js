import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navb} from './components/Navb';
import './index.css'

import { Pacientes } from './components/Pacientes';
import { Medicos } from './components/Medicos';
import { Turnos } from './components/Turnos';
import { Inicio } from './components/Inicio';


function App() {
  return (
    <div className='fondo'>
      <BrowserRouter>

        <Navb />
      
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/medicos' element={<Medicos />} />
          <Route path='/pacientes' element={<Pacientes />} />
          <Route path='turnos' element={<Turnos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
