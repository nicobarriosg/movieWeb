import React, { useState } from 'react';
import Movies from './Movies';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Favorites from './Favorites'; // Importa el componente de favoritos
import Register from './Register'; // Importa el componente de registro
import Login from './Login'; // Importa el componente de inicio de sesión
import './App.css';
import bannerImage from './components/img/banner.png';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [currentView, setCurrentView] = useState('home'); // Estado para la vista actual

  const handleAddToFavorites = (item) => {
    if (!favorites.some(favorite => favorite.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigate} />
      {currentView === 'home' && (
        <>
          <div className="banner">
            <img src={bannerImage} alt="Banner" />
            <div className="banner-text">
              <p>Sigue las comedias que ves.</p>
              <p>Ranquea peliculas.</p>
              <p>Todo sobre el cine Chileno.</p>
            </div>
            <div className="banner-button-container">
              <button className="banner-button" onClick={() => handleNavigate('register')}>
                ¡Comienza, es gratis!
              </button>
            </div>
          </div>
          <Movies onAddToFavorites={handleAddToFavorites} />
        </>
      )}
      {currentView === 'favorites' && <Favorites favorites={favorites} />}
      {currentView === 'register' && <Register onNavigate={handleNavigate} />}
      {currentView === 'login' && <Login onNavigate={handleNavigate} />}
      {currentView === 'about' && <div>Sobre nosotros</div>}
      {currentView === 'profile' && <div>Mi perfil</div>}
      <Footer />
    </div>
  );
}

export default App;
