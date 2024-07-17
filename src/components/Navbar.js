// src/components/Navbar.js

import React, { useState } from 'react';
import './Navbar.css';
import logo from './img/logo.png'; // Ruta a tu imagen de logo

const Navbar = ({ onNavigate, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => onNavigate('home')}>
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className="navbar-links">
          <a href="#!" className="navbar-link" onClick={() => onNavigate('register')}>Registrarse</a>
          <a href="#!" className="navbar-link" onClick={() => onNavigate('about')}>Sobre nosotros</a>
          <a href="#!" className="navbar-link" onClick={() => onNavigate('profile')}>Mi perfil</a>
          <a href="#!" className="navbar-link" onClick={() => onNavigate('favorites')}>Favoritos</a>
          <div className="navbar-search">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Buscar..."
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
