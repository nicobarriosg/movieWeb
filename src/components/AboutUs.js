// src/components/AboutUs.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutUs.css';

const API_KEY = '80e89e656f3520c549cf1e304130baec';

const AboutUs = () => {
  const [bannerImage, setBannerImage] = useState('');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerId, setBannerId] = useState('');

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
    }, 10000); // Fetch cada 5 minutos

    return () => clearInterval(interval); // Limpieza al desmontar
  }, []);

  return (
    <div className="about-us-container">
      <div className="banner">
        <img src={bannerImage} alt="Banner" />
        <div className="side-content">
          <p>{bannerTitle}</p>
          <a href={`https://www.themoviedb.org/movie/${bannerId}`} target="_blank" rel="noopener noreferrer">
          </a>
        </div>

      </div>
      <div className="about-us-content">
        <h1>Sobre Nosotros</h1>
        <p>
          Nuestra tienda de LEGO fue fundada en el año XXXX con el objetivo de traer la alegría y la creatividad de los sets de LEGO a todos nuestros clientes. Desde entonces, hemos crecido hasta convertirnos en uno de los distribuidores de LEGO más grandes de la región, ofreciendo una amplia variedad de productos para todas las edades y gustos.
        </p>
        <p>
          Nos enorgullece ofrecer no solo los últimos lanzamientos de LEGO, sino también sets exclusivos y de edición limitada. Nuestra misión es inspirar la creatividad y el aprendizaje a través del juego, brindando a nuestros clientes una experiencia de compra única y satisfactoria.
        </p>
        <p>
          Gracias por ser parte de nuestra historia. Esperamos seguir construyendo recuerdos y aventuras juntos.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
