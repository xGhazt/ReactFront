import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FormularioTurnos } from './Formularios';
import Url from '../Url/VariableUrl';
    
  
  export const Turnos = () => {
    const [turnos, setTurnos] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  
    const abrirModal = (turno) => {
      setTurnoSeleccionado(turno);
      setModalAbierto(true);
    };
  
    const cerrarModal = () => {
      setTurnoSeleccionado(null);
      setModalAbierto(false);
    };
  
    useEffect(() => {
      const fetchTurnos = async () => {
        try {
          const response = await axios.get( Url + 'turnos');
    
          const turnosConApellidos = await Promise.all(
            response.data.map(async (turno) => {
              const medicoResponse = await axios.get(
                `${Url}medicos/${turno.medicoId}`
              );
    
              const pacienteResponse = await axios.get(
                `${Url}pacientes/${turno.pacienteId}`
              );
    
              return {
                ...turno,
                medicoApellido: medicoResponse.data.apellido,
                pacienteApellido: pacienteResponse.data.apellido,
              };
            })
          );
    
          setTurnos(turnosConApellidos);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
    
      fetchTurnos();
    }, []);
  
   
    const agregarTurno = async (nuevoTurno) => {
      try {
        const response = await axios.post(Url + 'turnos', nuevoTurno);
        console.log('Respuesta del servidor:', response.data);
        cerrarModal();
        alert('turno agregado refrescar pagina')
      
      } catch (error) {
        alert('verifique que el ID de paciente o medico exista')
        console.error('Error al enviar datos:', error);
      }
    };
  
    const editarTurno = async (turnoEditado) => {
      try {
        const response = await axios.put(`${Url}turnos/${turnoEditado.id}`, turnoEditado);
        console.log('Respuesta del servidor (editar):', response.data);
        cerrarModal();
        alert('turno eliminado refrescar pagina')
      
      } catch (error) {
        alert('verifique que el ID de paciente o medico exista')
        console.error('Error al enviar datos:', error);
      }
    };
  
    const borrarTurno = async (id) => {
      try {
        const response = await axios.delete(`${Url}turnos/${id}`);
        console.log('Respuesta del servidor (borrar):', response.data);
        alert('turno eliminado refrescar pagina')
      
      } catch (error) {
        alert('No se pudo borrar el turno. Hay algo asociado');
        console.error('Error al borrar turno:', error);
      }
    };
  
    return (
      <div className="container mt-4">
        <Button color="primary" className='my-2' onClick={() => abrirModal(null)}>
          AGREGAR TURNO
        </Button>
        <table className="table table-primary table-bordered border-primary">
          <thead>
            <tr className="table-dark">
              <th>#ID</th>
              <th>Medico ID</th>
              <th>Medico Apellido</th>
              <th>Paciente ID</th>
              <th>Paciente Apellido</th> 
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno) => (
              <tr key={turno.id}>
                <td>{turno.id}</td>
                <td>{turno.medicoId}</td>
                <td>{turno.medicoApellido}</td>
                <td>{turno.pacienteId}</td>
                <td>{turno.pacienteApellido}</td>
                <td>{turno.fecha}</td>
                <td>{turno.hora}</td>
                <td>
                  <button type="button" className="btn btn-primary" onClick={() => abrirModal(turno)}>
                    Modificar
                  </button>
                  <button type="button" className="btn btn-danger" onClick={() => borrarTurno(turno.id)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={modalAbierto} toggle={cerrarModal}>
          <ModalHeader toggle={cerrarModal}>
            {turnoSeleccionado ? 'EDITAR TURNO' : 'AGREGAR TURNO'}
          </ModalHeader>
          <ModalBody>
            <FormularioTurnos onGuardar={turnoSeleccionado ? editarTurno : agregarTurno} paciente={turnoSeleccionado} />
          </ModalBody>
        </Modal>
      </div>
    );
  };
  