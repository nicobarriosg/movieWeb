import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movies from './Movies';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Favorites from './components/Favorites'; // Importa el componente de favoritos
import Register from './components/Register'; // Importa el componente de registro
import Login from './components/Login'; // Importa el componente de inicio de sesión
import AboutUs from './components/AboutUs'; // Importa el componente AboutUs
import './App.css';

const API_KEY = '80e89e656f3520c549cf1e304130baec';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [currentView, setCurrentView] = useState('home'); // Estado para la vista actual
  const [bannerImage, setBannerImage] = useState('');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerId, setBannerId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para almacenar el término de búsqueda

  const handleAddToFavorites = (item) => {
    if (!favorites.some(favorite => favorite.id === item.id)) {
      setFavorites([...favorites, item]);
    }
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
      setSearchResults(response.data.results);
      setCurrentView('search');
      setSearchQuery(query); // Establece el término de búsqueda
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    const fetchPopularMovieBanner = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        const movies = response.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        console.log(randomMovie); // Verifica los datos de randomMovie en la consola
        setBannerImage(`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`);
        setBannerTitle(randomMovie.title); // Establece el título de la película
        setBannerId(randomMovie.id); // Establece el ID de la película
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovieBanner(); // Fetch en el render inicial

    const interval = setInterval(() => {
      fetchPopularMovieBanner();
    }, 10000); // Fetch cada 10 segundos

    return () => clearInterval(interval); // Limpieza al desmontar
  }, []);

  return (
    <div className="App">
      <Navbar onNavigate={handleNavigate} onSearch={handleSearch} />
      {currentView === 'home' && (
        <>
          <div className="banner">
            <img src={bannerImage} alt="Banner" />
            <div className="side-content">
              <p>{bannerTitle}</p>
              <a href={`https://www.themoviedb.org/movie/${bannerId}`} target="_blank" rel="noopener noreferrer">
              </a>
            </div>
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
      {currentView === 'about' && <AboutUs />}
      {currentView === 'search' && (
        <>
          <div className="result-search">
            <h2>Resultados de: {searchQuery}</h2>
          </div>
          <div className="search-results">
            {searchResults.map(result => (
              <div key={result.id} className="search-result-item">
                <a href={`https://www.themoviedb.org/movie/${result.id}`} target="_blank" rel="noopener noreferrer">
                  <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt={result.title} />
                  <h3>{result.title}</h3>
                </a>
              </div>
            ))}
          </div>
        </>
      )}
      {currentView === 'profile' && <div>Mi perfil</div>}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
