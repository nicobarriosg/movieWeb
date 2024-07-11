import React, { useState } from 'react';
import './Login.css';
import facebookLogo from './img/facebook.svg';  // Ruta a la imagen de Facebook
import googleLogo from './img/google.svg';        // Ruta a la imagen de Google
import appleLogo from './img/apple.svg';          // Ruta a la imagen de Apple
import xboxLogo from './img/xbox.svg';            // Ruta a la imagen de Xbox
import playstationLogo from './img/playstation.svg';  // Ruta a la imagen de PlayStation

const Login = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de inicio de sesión
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesion</h2>
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
        <p className="forgot-password">¿Olvidaste tu contraseña?</p>
        <button type="submit">Entrar</button>

        {/* Botones de inicio de sesión con logos */}
        <div className="social-login">
          <button type="button" className="social-button facebook" onClick={() => alert('Iniciar sesión con Facebook')}>
            <img src={facebookLogo} alt="Facebook" />
          </button>
          <button type="button" className="social-button google" onClick={() => alert('Iniciar sesión con Google')}>
            <img src={googleLogo} alt="Google" />
          </button>
          <button type="button" className="social-button apple" onClick={() => alert('Iniciar sesión con Apple')}>
            <img src={appleLogo} alt="Apple" />
          </button>
          <button type="button" className="social-button xbox" onClick={() => alert('Iniciar sesión con Xbox')}>
            <img src={xboxLogo} alt="Xbox" />
          </button>
          <button type="button" className="social-button playstation" onClick={() => alert('Iniciar sesión con PlayStation')}>
            <img src={playstationLogo} alt="PlayStation" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
