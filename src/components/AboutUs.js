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
        Bienvenidos a Rating, un espacio apasionado por el cine y las series que nació de la visión compartida de un grupo diverso de cinéfilos y aficionados a las series. Nuestra historia comenzó hace años, cuando un pequeño equipo de amigos con diferentes gustos y trasfondos se reunió con un objetivo común: crear un lugar donde cada película y serie pudiera encontrar su justo reconocimiento.
        </p>
        <p>
        Desde entonces, hemos crecido y evolucionado, pero nuestra misión sigue siendo la misma: proporcionar a nuestros usuarios una plataforma donde puedan descubrir y evaluar películas y series de manera justa y objetiva. Creemos en la importancia de la crítica constructiva y en compartir nuestras pasiones cinematográficas de manera abierta y accesible.
        </p>
        <p>
        En Rating, valoramos la diversidad de opiniones y perspectivas. Cada revisión, cada calificación y cada recomendación que encuentres aquí es el resultado de un debate honesto y reflexivo entre nuestro equipo y nuestra comunidad de usuarios. Nos esforzamos por ofrecer contenido que sea informativo, entretenido y útil para todos los amantes del cine y las series.        
        </p>
        <p>
          Nuestro compromiso con la calidad y la imparcialidad nos impulsa a mejorar continuamente. Estamos emocionados de compartir nuestra pasión contigo y de seguir creciendo junto a nuestra comunidad. Únete a nosotros en este viaje cinematográfico y descubre nuevas historias que te emocionarán, te inspirarán y te entretendrán.
        </p>
        <p>
          ¡Gracias por ser parte de Rating!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
