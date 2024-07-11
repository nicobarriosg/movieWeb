import React, { useState } from 'react';
import './Favorites.css'; // Importa los estilos para la página de favoritos

const Favorites = ({ favorites }) => {
  const [showVoteCount, setShowVoteCount] = useState(false);
  const [currentVotes, setCurrentVotes] = useState(null);

  const handleCircleClick = (votes) => {
    setShowVoteCount(!showVoteCount);
    setCurrentVotes(votes);
  };

  const formatPercentage = (score) => Math.floor(score * 10); // Multiplica por 10 y redondea hacia abajo

  return (
    <div className="favorites-page">
      <h1>Mis Favoritos</h1>
      <div className="favorites-container">
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <div className="favorite-card" key={item.id}>
              <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="favorite-image" />
              <div className="favorite-details">
                <h3>{item.title || item.name}</h3>
                <p>{item.overview}</p>
                <div className="rating-container">
                  <div className="circle-container" onClick={() => handleCircleClick(item.vote_count)}>
                    <div className="circle" style={{ background: `conic-gradient(#9ab ${formatPercentage(item.vote_average)}%, #e0e0e0 0)` }}>
                      <span className="rating">{formatPercentage(item.vote_average)}%</span>
                    </div>
                  </div>
                  <div className="user-rating">
                    <span>Puntuación de usuarios</span>
                    {showVoteCount && currentVotes === item.vote_count && (
                      <div className="vote-count">{item.vote_count} votos</div>
                    )}
                  </div>
                </div>
                <p>Fecha de estreno: {item.release_date || item.first_air_date}</p>
              </div>
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
