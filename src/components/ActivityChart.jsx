// src/components/ActivityChart.jsx - VERSIÓN CORREGIDA FINAL

import React from 'react';
// 1. CORRECCIÓN: Eliminamos 'defs', 'linearGradient', y 'stop' de esta línea.
// Solo importamos los componentes que Recharts sí exporta.
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// --- Función Auxiliar (sin cambios) ---
const getGradientId = (hours) => {
  if (hours <= 24) return 'greenGradient';
  if (hours >= 25 && hours <= 27) return 'orangeGradient';
  return 'redGradient';
};

// --- Componente Principal (sin cambios en la lógica) ---
const ActivityChart = ({ data, dataKey, label, width, needsScroll }) => {
  const isHoursChart = dataKey === 'hoursWorked';

  return (
    <div className={needsScroll ? "chart-scroll-container" : ""}>
      <ResponsiveContainer width={width} height={400}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
        >
          {/* 2. Estas etiquetas funcionan directamente como SVG, no como componentes de React importados */}
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#86e38a" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#28a745" stopOpacity={1} />
            </linearGradient>
            
            <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fdd889" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#ffc107" stopOpacity={1} />
            </linearGradient>
            
            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f78a8a" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#dc3545" stopOpacity={1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />

          <Bar dataKey={dataKey} name={label}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  isHoursChart
                    ? `url(#${getGradientId(entry.hoursWorked)})`
                    : '#8884d8'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;