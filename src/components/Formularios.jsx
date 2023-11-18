// Formulario.jsx
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export const Formulario = ({ onGuardar, medico }) => {
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    especialidad: '',
    dni: '',
    email: '',
  });

  useEffect(() => {
    if (medico) {
      setDatos({
        nombre: medico.nombre || '',
        apellido: medico.apellido || '',
        especialidad: medico.especialidad || '',
        dni: medico.dni || '',
        email: medico.email || '',
      });
    }
  }, [medico]);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ ...datos, id: medico ? medico.id : null });
    setDatos({
      nombre: '',
      apellido: '',
      especialidad: '',
      dni: '',
      email: '',
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="nombre">Nombre</Label>
        <Input placeholder='Nombre' type="text" name="nombre" id="nombre" value={datos.nombre} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="apellido">Apellido</Label>
        <Input placeholder='Apellido' type="text" name="apellido" id="apellido" value={datos.apellido} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="especialidad">Especialidad</Label>
        <Input placeholder='Ejemplo psiquiatra' type="text" name="especialidad" id="especialidad" value={datos.especialidad} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="dni">DNI</Label>
        <Input placeholder='dni' type="text" name="dni" id="dni" value={datos.dni} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input placeholder='ejemplo@gmail.com' type="email" name="email" id="email" value={datos.email} onChange={handleChange} />
      </FormGroup>
      <Button color="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
};



export const FormularioPaciente = ({ onGuardar, paciente }) => {
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    telefono: '',
  });

  useEffect(() => {
    if (paciente) {
      setDatos({
        nombre: paciente.nombre || '',
        apellido: paciente.apellido || '',
        dni: paciente.dni || '',
        email: paciente.email || '',
        telefono: paciente.telefono || '',
      });
    }
  }, [paciente]);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ ...datos, id: paciente ? paciente.id : null });
    setDatos({
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      telefono: '',
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="nombre">Nombre</Label>
        <Input placeholder='nombre' type="text" name="nombre" id="nombre" value={datos.nombre} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="apellido">Apellido</Label>
        <Input placeholder='apellido' type="text" name="apellido" id="apellido" value={datos.apellido} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="dni">DNI</Label>
        <Input placeholder='dni' type="text" name="dni" id="dni" value={datos.dni} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input placeholder='ejemplo@gmail.com' type="email" name="email" id="email" value={datos.email} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="telefono">Teléfono</Label>
        <Input placeholder='123456' type="text" name="telefono" id="telefono" value={datos.telefono} onChange={handleChange} />
      </FormGroup>
      <Button color="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
};


export const FormularioTurnos = ({ onGuardar, paciente }) => {
  const [datos, setDatos] = useState({
    medicoId: '',
    pacienteId: '',
    fecha: '',
    hora: '',
  });

  useEffect(() => {
    if (paciente) {
      setDatos({
        medicoId: paciente.medicoId || '',
        pacienteId: paciente.pacienteId || '',
        fecha: paciente.fecha || '',
        hora: paciente.hora || '',
      });
    }
  }, [paciente]);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({ ...datos, id: paciente ? paciente.id : null });
    setDatos({
      medicoId: '',
      pacienteId: '',
      fecha: '',
      hora: '',
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="medicoId">ID del Médico</Label>
        <Input placeholder='medico ID' type="text" name="medicoId" id="medicoId" value={datos.medicoId} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="pacienteId">ID del Paciente</Label>
        <Input placeholder='paciente ID' type="text" name="pacienteId" id="pacienteId" value={datos.pacienteId} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="fecha">Fecha</Label>
        <Input placeholder='01-01-2023' type="text" name="fecha" id="fecha" value={datos.fecha} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="hora">Hora</Label>
        <Input placeholder='12:30' type="text" name="hora" id="hora" value={datos.hora} onChange={handleChange} />
      </FormGroup>
      <Button color="primary" type="submit">
        Guardar
      </Button>
    </Form>
  );
};

