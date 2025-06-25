// src/components/AddEmployeeModal.jsx
import React, { useState, useEffect } from 'react';

// El nombre de la prop ahora es 'onSaveEmployee' para ser consistente
const AddEmployeeModal = ({ isOpen, onClose, onSaveEmployee, employeeToEdit }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Ventas');
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [hoursWorked, setHoursWorked] = useState(0);

  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setDepartment(employeeToEdit.department);
      setTasksCompleted(employeeToEdit.tasksCompleted);
      setHoursWorked(employeeToEdit.hoursWorked);
    } else {
      setName('');
      setDepartment('Ventas');
      setTasksCompleted(0);
      setHoursWorked(0);
    }
  }, [employeeToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      alert('El nombre es obligatorio.');
      return;
    }

    // AHORA LLAMA A 'onSaveEmployee', que es la función correcta que viene de App.jsx
    onSaveEmployee({ 
      name, 
      department, 
      tasksCompleted: parseInt(tasksCompleted, 10),
      hoursWorked: parseInt(hoursWorked, 10) 
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{employeeToEdit ? 'Editar Empleado' : 'Añadir Nuevo Empleado'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="department">Departamento</label>
            <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="Ventas">Ventas</option>
              <option value="Marketing">Marketing</option>
              <option value="Desarrollo">Desarrollo</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tasks">Tareas Completadas</label>
            <input type="number" id="tasks" value={tasksCompleted} onChange={(e) => setTasksCompleted(e.target.value)} min="0" />
          </div>
          <div className="form-group">
            <label htmlFor="hours">Horas Trabajadas</label>
            <input type="number" id="hours" value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)} min="0" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-save">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;