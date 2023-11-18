import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Formulario } from './Formularios';
import Url from '../Url/VariableUrl';

export const Medicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);

  const abrirModal = (medico) => {
    setMedicoSeleccionado(medico);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setMedicoSeleccionado(null);
    setModalAbierto(false);
  };

  const obtenerMedicos = () => {
    axios.get(Url + 'medicos')
      .then(response => {
        setMedicos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  };

  useEffect(() => {
    obtenerMedicos();
  }, []);

  const agregarMedico = async (nuevoMedico) => {
    try {
      const response = await axios.post(Url + 'medicos', nuevoMedico);
      console.log('Respuesta del servidor:', response.data);
      cerrarModal();
      obtenerMedicos();
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  const editarMedico = async (medicoEditado) => {
    try {
      const response = await axios.put(`${Url}medicos/${medicoEditado.id}`, medicoEditado);
      console.log('Respuesta del servidor (editar):', response.data);
      cerrarModal();
      obtenerMedicos();
    } catch (error) {
      alert('No se pudo borrar el médico. Hay turnos asociados')
      console.error('Error al enviar datos:', error);
    }
  };

  const borrarMedico = async (id) => {
    try {
      const response = await axios.delete(`${Url}medicos/${id}`);
      console.log('Respuesta del servidor (borrar):', response.data);
      obtenerMedicos();
    } catch (error) {
      alert('No se pudo borrar el médico. Hay turnos asociados')
      console.error('Error al borrar médico:', error);
    }
  };

  return (
    <div className="container mt-4">
      <Button color="primary" className='my-2' onClick={() => abrirModal(null)}>
        AGREGAR MEDICO
      </Button>
      <table className="table table-primary table-bordered border-primary">
        <thead>
          <tr className="table-dark">
            <th>#ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Especialidad</th>
            <th>EMAIL</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((medico) => (
            <tr key={medico.id}>
              <td>{medico.id}</td>
              <td>{medico.nombre}</td>
              <td>{medico.apellido}</td>
              <td>{medico.dni}</td>
              <td>{medico.especialidad}</td>
              <td>{medico.email}</td>
              <td>
                <button type="button" className="btn btn-primary" onClick={() => abrirModal(medico)}>
                  Modificar
                </button>
                <button type="button" className="btn btn-danger" onClick={() => borrarMedico(medico.id)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalAbierto} toggle={cerrarModal}>
        <ModalHeader toggle={cerrarModal}>
          {medicoSeleccionado ? 'EDITAR MEDICO' : 'AGREGAR MEDICO'}
        </ModalHeader>
        <ModalBody>
          <Formulario onGuardar={medicoSeleccionado ? editarMedico : agregarMedico} medico={medicoSeleccionado} />
        </ModalBody>
      </Modal>
    </div>
  );
};
