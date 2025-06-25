// src/App.jsx - VERSIÓN FINAL CON LOCALSTORAGE

import React, { useState, useEffect } from 'react'; // Importamos useEffect
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardPage from './components/pages/DashboardPage';
import EmployeesPage from './components/pages/EmployeesPage';
import AddEmployeeModal from './components/AddEmployeeModal';
import '/index.css';

// Datos iniciales (sólo se usarán si no hay nada en localStorage)
const initialEmployeeData = [
  { id: 1, name: 'Ana', department: 'Ventas', tasksCompleted: 8, hoursWorked: 40 },
  { id: 2, name: 'Luis', department: 'Marketing', tasksCompleted: 5, hoursWorked: 38 },
  { id: 3, name: 'Carlos', department: 'Desarrollo', tasksCompleted: 12, hoursWorked: 45 },
  { id: 4, name: 'Sofía', department: 'Desarrollo', tasksCompleted: 15, hoursWorked: 42 },
  { id: 5, name: 'Marta', department: 'Ventas', tasksCompleted: 10, hoursWorked: 41 },
  { id: 6, name: 'Javier', department: 'Marketing', tasksCompleted: 7, hoursWorked: 35 },
];


function App() {
  // --- PASO 1: CARGAR DATOS DE LOCALSTORAGE AL INICIAR ---
  // Pasamos una función a useState. Esta función se ejecuta SÓLO la primera vez que el componente se renderiza.
  const [employeeData, setEmployeeData] = useState(() => {
    const savedData = localStorage.getItem('employeeData'); // Intenta leer los datos guardados
    // Si hay datos guardados, los convierte de texto a objeto y los usa.
    // Si no, usa los datos iniciales de 'initialEmployeeData'.
    return savedData ? JSON.parse(savedData) : initialEmployeeData;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  
  // --- PASO 2: GUARDAR DATOS EN LOCALSTORAGE CADA VEZ QUE CAMBIAN ---
  // useEffect se ejecuta cada vez que las dependencias en su array (en este caso, 'employeeData') cambian.
  useEffect(() => {
    // Convierte la lista de empleados a formato de texto (JSON) y la guarda.
    localStorage.setItem('employeeData', JSON.stringify(employeeData));
  }, [employeeData]);


  // --- LÓGICA PARA MANEJAR EL MODAL (Sin cambios) ---
  const handleOpenModal = (employee = null) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmployeeToEdit(null);
  };

  // --- LÓGICA PARA GUARDAR (AÑADIR O EDITAR) (Sin cambios) ---
  const handleSaveEmployee = (formData) => {
    if (employeeToEdit) {
      const updatedData = employeeData.map(emp =>
        emp.id === employeeToEdit.id ? { ...emp, ...formData } : emp
      );
      setEmployeeData(updatedData);
    } else {
      const newId = employeeData.length > 0 ? Math.max(...employeeData.map(emp => emp.id)) + 1 : 1;
      const newEmployee = { id: newId, ...formData };
      setEmployeeData([...employeeData, newEmployee]);
    }
    handleCloseModal();
  };

  // --- LÓGICA PARA ELIMINAR (Sin cambios) ---
  const handleDeleteEmployee = (idToDelete) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este empleado?')) {
      const updatedData = employeeData.filter(employee => employee.id !== idToDelete);
      setEmployeeData(updatedData);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* El resto del JSX no cambia en absoluto */}
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<DashboardPage employeeData={employeeData} handleOpenModal={handleOpenModal} />}
          />
          <Route
            path="/employees"
            element={<EmployeesPage employeeData={employeeData} handleOpenEditModal={handleOpenModal} handleDeleteEmployee={handleDeleteEmployee} />}
          />
        </Routes>
      </main>

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSaveEmployee={handleSaveEmployee}
        employeeToEdit={employeeToEdit}
      />
    </div>
  );
}

export default App;