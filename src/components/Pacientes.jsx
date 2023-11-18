import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FormularioPaciente } from './Formularios';
import Url from '../Url/VariableUrl';


export const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  
  const abrirModal = (paciente) => {
    setPacienteSeleccionado(paciente);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setPacienteSeleccionado(null);
    setModalAbierto(false);
  };

  const obtenerPacientes = () => {
    axios.get(Url + 'pacientes') 
      .then(response => {
        setPacientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  };

  useEffect(() => {
    obtenerPacientes();
  }, []);

  const agregarPaciente = async (nuevoPaciente) => {
    try {
      const response = await axios.post(Url + 'pacientes', nuevoPaciente); 
      console.log('Respuesta del servidor:', response.data);
      cerrarModal();
      obtenerPacientes();
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  const editarPaciente = async (pacienteEditado) => {
    try {
      const response = await axios.put(`${Url}pacientes/${pacienteEditado.id}`, pacienteEditado); 
      console.log('Respuesta del servidor (editar):', response.data);
      cerrarModal();
      obtenerPacientes();
    } catch (error) {
      alert('No se pudo modificar el paciente. Hay turnos asociados')
      console.error('Error al enviar datos:', error);
    }
  };

  const borrarPaciente = async (id) => {
    try {
      const response = await axios.delete(`${Url}pacientes/${id}`); 
      console.log('Respuesta del servidor (borrar):', response.data);
      obtenerPacientes();
    } catch (error) {
      alert('No se pudo borrar el paciente. Hay turnos asociados')
      console.error('Error al borrar paciente:', error);
    }
  };

  return (
    <div className="container mt-4">
      <Button color="primary" className='my-2' onClick={() => abrirModal(null)}>
        AGREGAR PACIENTE
      </Button>
      <table className="table table-primary table-bordered border-primary">
        <thead>
          <tr className="table-dark">
            <th>#ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.id}</td>
              <td>{paciente.nombre}</td>
              <td>{paciente.apellido}</td>
              <td>{paciente.dni}</td>
              <td>{paciente.email}</td>
              <td>{paciente.telefono}</td>
              <td>
                <button type="button" className="btn btn-primary" onClick={() => abrirModal(paciente)}>
                  Modificar
                </button>
                <button type="button" className="btn btn-danger" onClick={() => borrarPaciente(paciente.id)}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalAbierto} toggle={cerrarModal}>
        <ModalHeader toggle={cerrarModal}>
          {pacienteSeleccionado ? 'EDITAR PACIENTE' : 'AGREGAR PACIENTE'}
        </ModalHeader>
        <ModalBody>
          <FormularioPaciente onGuardar={pacienteSeleccionado ? editarPaciente : agregarPaciente} paciente={pacienteSeleccionado} />
        </ModalBody>
      </Modal>
    </div>
  );
};
