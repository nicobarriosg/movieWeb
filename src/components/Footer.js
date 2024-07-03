import React from 'react';
import './Footer.css';
import twitterLogo from './img/twitter.svg';  // Ruta a la imagen de Twitter
import facebookLogo from './img/facebook_2.svg';  // Ruta a la imagen de Facebook
import instagramLogo from './img/instagram.svg';  // Ruta a la imagen de Instagram
import tiktokLogo from './img/tiktok.svg';  // Ruta a la imagen de TikTok
import youtubeLogo from './img/youtube.svg';  // Ruta a la imagen de YouTube

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="#">Sobre nosotros</a>
          <a href="#">Subscripciones</a>
          <a href="#">Noticias</a>
          <a href="#">Contacto</a>
        </div>
        <div className="social-icons">
          <a href="#"><img src={twitterLogo} alt="Twitter" /></a>
          <a href="#"><img src={facebookLogo} alt="Facebook" /></a>
          <a href="#"><img src={instagramLogo} alt="Instagram" /></a>
          <a href="#"><img src={tiktokLogo} alt="TikTok" /></a>
          <a href="#"><img src={youtubeLogo} alt="YouTube" /></a>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} RatingCL. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
