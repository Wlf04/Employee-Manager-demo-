// src/components/DashboardPage.jsx
import React, { useState } from 'react';
import ActivityChart from '../ActivityChart';
import FilterControls from '../FilterControls';

const metricLabels = {
  hoursWorked: "Horas Trabajadas",
  tasksCompleted: "Tareas Completadas"
};

// Este componente ahora es más simple. Recibe los datos y la función para abrir el modal.
const DashboardPage = ({ employeeData, handleOpenModal }) => {
  const [metric, setMetric] = useState('hoursWorked');

  // La lógica del ancho del gráfico sigue viviendo aquí porque es específica de esta página
  const EMPLOYEE_LIMIT_BEFORE_SCROLL = 12;
  const BAR_SPACE = 80;
  const needsScroll = employeeData.length > EMPLOYEE_LIMIT_BEFORE_SCROLL;
  const chartWidth = needsScroll ? employeeData.length * BAR_SPACE : '100%';

  return (
    <>
      <div className="header-actions">
        {/* El botón ahora llama a la función `handleOpenModal` que viene desde App.jsx */}
        <button className="add-employee-btn" onClick={() => handleOpenModal()}>
          + Añadir Empleado
        </button>
      </div>

      <h1>Dashboard de Actividad</h1>
      <FilterControls setActivityMetric={setMetric} />

      <div className="chart-container" style={{position: 'relative'}}>
        <h2>{metricLabels[metric]} por Empleado</h2>
        <ActivityChart 
          data={employeeData} 
          dataKey={metric} 
          label={metricLabels[metric]}
          width={chartWidth}
          needsScroll={needsScroll} 
        />
      </div>
    </>
  );
};

export default DashboardPage;