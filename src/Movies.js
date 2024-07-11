import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCarousel from './components/ImageCarousel';
import './Movies.css'; // Importa los estilos adicionales

const Movies = ({ onAddToFavorites }) => {
  const [trending, setTrending] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularAnimeJapanese, setPopularAnimeJapanese] = useState([]);
  const [popularAnimeAmerican, setPopularAnimeAmerican] = useState([]);
  const [latestTrailers, setLatestTrailers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Estado para almacenar el elemento seleccionado
  const [selectedTrailer, setSelectedTrailer] = useState(null); // Estado para almacenar el trailer seleccionado
  const [timeWindow, setTimeWindow] = useState('day'); // Estado para el período de tiempo
  const [popularCategory, setPopularCategory] = useState('tv'); // Estado para la categoría de "Lo más Popular"
  const [animeCategory, setAnimeCategory] = useState('japanese'); // Estado para la categoría de Anime

  const API_KEY = '80e89e656f3520c549cf1e304130baec';

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // Obtener las tendencias (hoy o esta semana)
        const response = await axios.get(`https://api.themoviedb.org/3/trending/all/${timeWindow}?api_key=${API_KEY}`);
        setTrending(response.data.results.slice(0, 20)); // Obtener las 20 primeras tendencias
      } catch (error) {
        console.error('Error fetching trending:', error);
      }
    };

    const fetchPopularTV = async () => {
      try {
        // Obtener lo más popular en televisión
        const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`);
        setPopularTV(response.data.results.slice(0, 20)); // Obtener las 20 primeras series de TV populares
      } catch (error) {
        console.error('Error fetching popular TV:', error);
      }
    };

    const fetchPopularMovies = async () => {
      try {
        // Obtener lo más popular en cine
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        setPopularMovies(response.data.results.slice(0, 20)); // Obtener las 20 primeras películas populares
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    const fetchPopularAnimeJapanese = async () => {
      try {
        // Obtener animes populares (solo de animación japonesa)
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja`);
        setPopularAnimeJapanese(response.data.results.slice(0, 20)); // Obtener los 20 primeros animes populares de animación japonesa
      } catch (error) {
        console.error('Error fetching popular anime:', error);
      }
    };

    const fetchPopularAnimeAmerican = async () => {
      try {
        // Obtener animación americana (género de animación y país de origen USA)
        const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=en`);
        setPopularAnimeAmerican(response.data.results.slice(0, 20)); // Obtener las 20 primeras animaciones americanas
      } catch (error) {
        console.error('Error fetching popular anime:', error);
      }
    };

    const fetchLatestTrailers = async () => {
      try {
        // Obtener los últimos trailers
        const upcomingResponse = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`);
        const upcomingMovies = upcomingResponse.data.results.slice(0, 20); // Obtener las 20 primeras películas próximas

        const trailers = await Promise.all(
          upcomingMovies.map(async (movie) => {
            const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`);
            const videoKey = videoResponse.data.results.length > 0 ? videoResponse.data.results[0].key : null;
            return {
              ...movie,
              videoKey
            };
          })
        );

        setLatestTrailers(trailers.filter((trailer) => trailer.videoKey)); // Filtrar solo las películas que tienen trailers
      } catch (error) {
        console.error('Error fetching latest trailers:', error);
      }
    };

    fetchTrending();
    fetchPopularTV();
    fetchPopularMovies();
    fetchPopularAnimeJapanese();
    fetchPopularAnimeAmerican();
    fetchLatestTrailers();
  }, [API_KEY, timeWindow]);

  const handleShowDetails = (item) => {
    setSelectedItem(item); // Establecer el elemento seleccionado
  };

  const handleCloseDetails = () => {
    setSelectedItem(null); // Limpiar el elemento seleccionado al cerrar los detalles
  };

  const handleTimeWindowChange = (window) => {
    setTimeWindow(window); // Cambiar el período de tiempo
  };

  const handlePopularCategoryChange = (category) => {
    setPopularCategory(category); // Cambiar la categoría de "Lo más Popular"
  };

  const handleAnimeCategoryChange = (category) => {
    setAnimeCategory(category); // Cambiar la categoría de Anime
  };

  const handlePlayTrailer = (videoKey) => {
    setSelectedTrailer(videoKey); // Establecer el trailer seleccionado
  };

  const handleCloseTrailer = () => {
    setSelectedTrailer(null); // Limpiar el trailer seleccionado al cerrar el modal
  };

  return (
    <div>
      <div>
        <h2 style={{ fontSize: '2em', color: '#789', marginTop: '100px' }}>Tendencias</h2>
        <div className="time-window-buttons">
          <button className={timeWindow === 'day' ? 'active' : ''} onClick={() => handleTimeWindowChange('day')}>Hoy</button>
          <button className={timeWindow === 'week' ? 'active' : ''} onClick={() => handleTimeWindowChange('week')}>Esta Semana</button>
        </div>
        <ImageCarousel items={trending} onAddToFavorites={onAddToFavorites} onShowDetails={handleShowDetails} />
      </div>

      <div>
        <h2 style={{ fontSize: '2em', color: '#789', marginTop: '80px' }}>Lo más Popular</h2>
        <div className="category-buttons">
          <button className={popularCategory === 'tv' ? 'active' : ''} onClick={() => handlePopularCategoryChange('tv')}>en Televisión</button>
          <button className={popularCategory === 'movie' ? 'active' : ''} onClick={() => handlePopularCategoryChange('movie')}>en Cine</button>
        </div>
        {popularCategory === 'tv' && <ImageCarousel items={popularTV} onAddToFavorites={onAddToFavorites} onShowDetails={handleShowDetails} />}
        {popularCategory === 'movie' && <ImageCarousel items={popularMovies} onAddToFavorites={onAddToFavorites} onShowDetails={handleShowDetails} />}
      </div>

      <div>
        <h2 style={{ fontSize: '2em', color: '#789', marginTop: '80px' }}>Animación Popular</h2>
        <div className="category-buttons">
          <button className={animeCategory === 'japanese' ? 'active' : ''} onClick={() => handleAnimeCategoryChange('japanese')}>Japonesa</button>
          <button className={animeCategory === 'american' ? 'active' : ''} onClick={() => handleAnimeCategoryChange('american')}>Americana</button>
        </div>
        {animeCategory === 'japanese' && <ImageCarousel items={popularAnimeJapanese} onAddToFavorites={onAddToFavorites} onShowDetails={handleShowDetails} />}
        {animeCategory === 'american' && <ImageCarousel items={popularAnimeAmerican} onAddToFavorites={onAddToFavorites} onShowDetails={handleShowDetails} />}
      </div>

      <div>
        <h2 style={{ fontSize: '2em', color: '#789', marginTop: '80px' }}>Últimos Trailers</h2>
        <ImageCarousel items={latestTrailers} onAddToFavorites={onAddToFavorites} onShowDetails={handleShowDetails} onPlayTrailer={handlePlayTrailer} isTrailerSection={true} />
      </div>

      {selectedItem && (
        <div className="modal" onClick={handleCloseDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseDetails}>&times;</span>
            <h2>{selectedItem.title || selectedItem.name}</h2>
            <p>{selectedItem.overview}</p>
          </div>
        </div>
      )}

      {selectedTrailer && (
        <div className="modal" onClick={handleCloseTrailer}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseTrailer}>&times;</span>
            <iframe
              src={`https://www.youtube.com/embed/${selectedTrailer}`}
              frameBorder="0"
              allowFullScreen
              title="Trailer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
