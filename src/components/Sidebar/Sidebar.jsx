// src/components/Sidebar/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {

  const getNavLinkClass = ({ isActive }) => {
    // Esta función aplica la clase 'active' de nuestro módulo cuando el enlace está activo
    return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
  };

  return (
    // 👇 Esta clase aplica el fondo oscuro y el padding principal
    <aside className={styles.sidebar}>
    
      {/* 👇 Esta clase se encarga de los estilos del título "Metri-Dash" */}
      <div className={styles.sidebarHeader}>
        <h2>Metri-Dash</h2>
      </div>

      {/* 👇 ¡ESTA ES CLAVE! Aplica los estilos al contenedor del menú */}
      <nav className={styles.sidebarMenu}>
        <ul>
          <li>
            {/* 👇 La función aplica 'navLink' y 'active' a los enlaces de navegación */}
            <NavLink to="/" className={getNavLinkClass}>
              📊 Dashboard Principal
            </NavLink>
          </li>
          <li>
            <NavLink to="/employees" className={getNavLinkClass}>
              👥 Empleados
            </NavLink>
          </li>
          <li>
            {/* 👇 Los enlaces normales también necesitan la clase 'navLink' */}
            <a href="#" className={styles.navLink}>📈 Reportes</a>
          </li>
          <li>
            <a href="#" className={styles.navLink}>⚙️ Configuración</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;