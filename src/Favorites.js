import React from 'react';
import './Favorites.css'; // Importa los estilos para la página de favoritos

const Favorites = ({ favorites }) => {
  return (
    <div className="favorites-page">
      <h1>Mis Favoritos</h1>
      <div className="favorites-container">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <div className="favorite-card" key={item.id}>
              <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="favorite-image" />
              <p>{item.title || item.name}</p>
            </div>
          ))
        ) : (
          <p>No has agregado ninguna película o serie a tus favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
