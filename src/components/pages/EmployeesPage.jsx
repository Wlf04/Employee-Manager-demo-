// src/components/EmployeesPage.jsx
import React from 'react';

// Recibe como props los datos y las funciones para manejar los eventos
const EmployeesPage = ({ employeeData, handleOpenEditModal, handleDeleteEmployee }) => {
  return (
    <div className="employee-page-container">
      <h1>Gestión de Empleados</h1>
      <p>Lista de todos los empleados activos en el sistema.</p>
      
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Departamento</th>
              <th>Tareas Completadas</th>
              <th>Horas Trabajadas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map(employee => (
              <tr key={employee.id}>
                <td>
                  <span className="employee-name">{employee.name}</span>
                  <span className="employee-id">ID: {employee.id}</span>
                </td>
                <td>
                  <span className="department-tag">{employee.department}</span>
                </td>
                <td>{employee.tasksCompleted}</td>
                <td>{employee.hoursWorked}</td>
                <td>
                  <div className="action-buttons">
                    {/* Botón de Editar: Llama a la función para abrir el modal en modo edición */}
                    <button 
                      className="icon-btn edit" 
                      title="Editar Empleado" 
                      onClick={() => handleOpenEditModal(employee)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    {/* Botón de Eliminar: Llama a la función para eliminar el empleado */}
                    <button 
                      className="icon-btn delete" 
                      title="Eliminar Empleado" 
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesPage;