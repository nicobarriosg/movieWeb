import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Movies.css'; // Importa los estilos adicionales para el botón de favoritos
import { peliculas } from './components/Links/peliculas'; // Importa la lista de películas seleccionadas

const ImageCarousel = ({ items, onAddToFavorites, onShowDetails }) => {
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

  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} infiniteLoop useKeyboardArrows showIndicators={false} showStatus={false} centerMode centerSlidePercentage={20}>
        {items.map((item) => (
          <div key={item.id} className="carousel-item">
            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} onClick={() => handleShowDetails(item)} />
            <div className="overlay">
              <span
                className={`favorite-button ${favorites.includes(item.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(item)}
              >
                &#10084; {/* Corazón Unicode */}
              </span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const Movies = ({ onAddToFavorites }) => {
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [currentlyAiringSeries, setCurrentlyAiringSeries] = useState([]);
  const [chileanMovies, setChileanMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Estado para almacenar el elemento seleccionado

  const API_KEY = '80e89e656f3520c549cf1e304130baec';

  useEffect(() => {
    const fetchTopRatedSeries = async () => {
      try {
        // Obtener las series mejor ranqueadas con puntuación superior al 50%
        const topRatedSeriesRequests = [
          fetchTopRatedSeriesByCompany(154651, 5), // ID de Chilevisión en TMDB
          fetchTopRatedSeriesByNetwork(646, 5),    // ID de TVN en TMDB
          fetchTopRatedSeriesByCompany(75686, 5)   // ID de Mega en TMDB
        ];

        const topRatedSeriesResponses = await Promise.all(topRatedSeriesRequests);
        const topRatedSeries = topRatedSeriesResponses.flat(); // Convertir el array de arrays en un solo array
        setTopRatedSeries(topRatedSeries);
      } catch (error) {
        console.error('Error fetching top rated series:', error);
      }
    };

    const fetchCurrentlyAiringSeries = async () => {
      try {
        // Obtener las series actualmente en emisión producidas por Chilevisión, TVN y Mega
        const currentlyAiringSeriesRequests = [
          fetchCurrentlyAiringSeriesByCompany(154651), // ID de Chilevisión en TMDB
          fetchCurrentlyAiringSeriesByNetwork(646),    // ID de TVN en TMDB
          fetchCurrentlyAiringSeriesByCompany(75686)   // ID de Mega en TMDB
        ];

        const currentlyAiringSeriesResponses = await Promise.all(currentlyAiringSeriesRequests);
        const currentlyAiringSeries = currentlyAiringSeriesResponses.flat(); // Convertir el array de arrays en un solo array
        setCurrentlyAiringSeries(currentlyAiringSeries);
      } catch (error) {
        console.error('Error fetching currently airing series:', error);
      }
    };

    const fetchChileanMovies = async () => {
      try {
        // Obtener películas producidas en Chile
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&region=CL&language=es-CL&query=chile`);
        const chileanMovies = response.data.results.slice(0, 20);
        setChileanMovies(chileanMovies);
      } catch (error) {
        console.error('Error fetching Chilean movies:', error);
      }
    };

    fetchTopRatedSeries();
    fetchCurrentlyAiringSeries();
    fetchChileanMovies();
  }, [API_KEY]);

  const fetchTopRatedSeriesByCompany = async (company, minVote) => {
    try {
      // Obtener las series producidas por la compañía específica con puntuación superior al 50%
      const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_companies=${company}&vote_average.gte=${minVote}`);
      return response.data.results.slice(0, 20); // Obtener las 20 primeras series
    } catch (error) {
      console.error(`Error fetching top rated series from company ${company}:`, error);
      return [];
    }
  };

  const fetchTopRatedSeriesByNetwork = async (network, minVote) => {
    try {
      // Obtener las series asociadas al canal de TV específico con puntuación superior al 50%
      const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=${network}&vote_average.gte=${minVote}`);
      return response.data.results.slice(0, 20); // Obtener las 20 primeras series
    } catch (error) {
      console.error(`Error fetching top rated series from network ${network}:`, error);
      return [];
    }
  };

  const fetchCurrentlyAiringSeriesByCompany = async (company) => {
    try {
      // Obtener las series producidas por la compañía específica que están actualmente en emisión
      const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_companies=${company}&air_date.gte=${getCurrentDate()}&sort_by=popularity.desc`);
      return response.data.results.slice(0, 20); // Obtener las 20 primeras series
    } catch (error) {
      console.error(`Error fetching currently airing series from company ${company}:`, error);
      return [];
    }
  };

  const fetchCurrentlyAiringSeriesByNetwork = async (network) => {
    try {
      // Obtener las series asociadas al canal de TV específico que están actualmente en emisión
      const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=${network}&air_date.gte=${getCurrentDate()}&sort_by=popularity.desc`);
      return response.data.results.slice(0, 20); // Obtener las 20 primeras series
    } catch (error) {
      console.error(`Error fetching currently airing series from network ${network}:`, error);
      return [];
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const handleShowDetails = (item) => {
    setSelectedItem(item); // Establecer el elemento seleccionado
  };

  const handleCloseDetails = () => {
    setSelectedItem(null); // Limpiar el elemento seleccionado al cerrar los detalles
  };

  useEffect(() => {
    // Filtrar las películas seleccionadas
    const fetchSelectedMovies = async () => {
      try {
        const selectedMoviesPromises = peliculas.map(async (link) => {
          const id = link.match(/\/movie\/(\d+)/)[1];
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
          return response.data;
        });

        const selectedMovies = await Promise.all(selectedMoviesPromises);
        setFilteredMovies(selectedMovies);
      } catch (error) {
        console.error('Error fetching selected movies:', error);
      }
    };

    fetchSelectedMovies();
  }, [API_KEY]);

  return (
    <div>
      <div>
        <h2 style={{ fontSize: '1.2em', color: '#789', marginTop: '80px' }}>Series Populares</h2>
        <ImageCarousel items={topRatedSeries} onAddToFavorites={onAddToFavorites} onShowDetails={handleShowDetails} />
      </div>

      <div>
        <h2 style={{ fontSize: '1.2em', color: '#789', marginTop: '80px' }}>Series en Emisión</h2>
        <ImageCarousel items={currentlyAiringSeries} onAddToFavorites={onAddToFavorites} onShowDetails={handleShowDetails} />
      </div>

      <div>
        <h2 style={{ fontSize: '1.2em', color: '#789', marginTop: '80px' }}>Películas</h2>
        <ImageCarousel items={filteredMovies} onAddToFavorites={onAddToFavorites} onShowDetails={handleShowDetails} />
      </div>

      {selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseDetails}>&times;</span>
            <h2>{selectedItem.title || selectedItem.name}</h2>
            <p>{selectedItem.overview}</p>
            <p>Puntaje: {selectedItem.vote_average}</p>
            <p>Actores: {selectedItem.credits.cast.map(actor => actor.name).join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
