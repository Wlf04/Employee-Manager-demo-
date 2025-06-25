// src/components/FilterControls.jsx
import React from 'react';

// Este componente recibe una función desde su padre para cambiar la métrica
const FilterControls = ({ setActivityMetric }) => {
  return (
    <div className="filter-controls">
      <button onClick={() => setActivityMetric('hoursWorked')}>
        Horas Trabajadas
      </button>
      <button onClick={() => setActivityMetric('tasksCompleted')}>
        Tareas Completadas
      </button>
    </div>
  );
};

export default FilterControls;