import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ImageCarousel.css';

const ImageCarousel = ({ items, onAddToFavorites, onShowDetails, onPlayTrailer }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    if (favorites.includes(item.id)) {
      setFavorites(favorites.filter((id) => id !== item.id));
    } else {
      setFavorites([...favorites, item.id]);
    }
    onAddToFavorites(item); // Llamar a la función de agregar a favoritos desde props
  };

  const handleShowDetails = (item) => {
    onShowDetails(item); // Llamar a la función de mostrar detalles desde props
  };

  const handleTMDBLink = (item) => {
    const url = `https://www.themoviedb.org/${item.media_type || 'movie'}/${item.id}`;
    window.open(url, '_blank');
  };

  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} infiniteLoop useKeyboardArrows showIndicators={false} showStatus={false} centerMode centerSlidePercentage={20}>
        {items.map((item) => (
          <div key={item.id} className="carousel-item" onClick={() => handleTMDBLink(item)}>
            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
            <div className="overlay">
              <span
                className={`favorite-button ${favorites.includes(item.id) ? 'active' : ''}`}
                onClick={(e) => {e.stopPropagation(); toggleFavorite(item);}}
              >
                &#10084; {/* Corazón Unicode */}
              </span>
              {onPlayTrailer && (
                <button className="play-trailer-button" onClick={(e) => {e.stopPropagation(); onPlayTrailer(item.videoKey);}}>Ver Trailer</button>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
