import React, { useState } from 'react';
import './Register.css';
import facebookLogo from './img/facebook.svg';  // Ruta a la imagen de Facebook
import googleLogo from './img/google.svg';        // Ruta a la imagen de Google
import appleLogo from './img/apple.svg';          // Ruta a la imagen de Apple
import xboxLogo from './img/xbox.svg';            // Ruta a la imagen de Xbox
import playstationLogo from './img/playstation.svg';  // Ruta a la imagen de PlayStation

const Register = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica de registro
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Registrarse</h2>
        <div className="form-group">
          <label>Usuario:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <p className="login-link">
        ¿Ya tienes cuenta? <span onClick={() => onNavigate('login')}>Inicia sesión</span>
        </p>
        <button type="submit">Registrarse</button>

        {/* Botones de registro con logos */}
        <div className="social-register">
          <button type="button" className="social-button facebook" onClick={() => alert('Registrarse con Facebook')}>
            <img src={facebookLogo} alt="Facebook" />
          </button>
          <button type="button" className="social-button google" onClick={() => alert('Registrarse con Google')}>
            <img src={googleLogo} alt="Google" />
          </button>
          <button type="button" className="social-button apple" onClick={() => alert('Registrarse con Apple')}>
            <img src={appleLogo} alt="Apple" />
          </button>
          <button type="button" className="social-button xbox" onClick={() => alert('Registrarse con Xbox')}>
            <img src={xboxLogo} alt="Xbox" />
          </button>
          <button type="button" className="social-button playstation" onClick={() => alert('Registrarse con PlayStation')}>
            <img src={playstationLogo} alt="PlayStation" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
