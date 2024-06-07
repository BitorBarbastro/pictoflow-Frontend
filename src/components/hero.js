import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';

const HeroSection = styled.section`
  width: 80%;
  height: 60vh;
  position: relative;
  overflow: hidden;
  margin: 40px auto; /* Añade margen superior e inferior */
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
  transition: opacity 0.5s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
`;

const images = [
  { src: '/images/sandia.png', title: 'PictoFlow', subtitle: 'Empieza a Crear Galerías hoy mismo Crea y Comparte en Minutos' },
  { src: '/images/gema.jpg', title: 'Revoluciona la Forma de Hacer Clientes', subtitle: 'Contacta, Muestra y Vende' },
  { src: '/images/gotas.jpg', title: 'Comparte Tu Trabajo', subtitle: 'De forma segura y rápida' },
  { src: '/images/cuack.jpg', title: 'Expande Tus Límites', subtitle: 'Tú Eliges Hasta Dónde Llegar' },
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.nameid) {
        } else {
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        sessionStorage.removeItem('token');
      }
    }
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HeroSection>
      {images.map((image, index) => (
        <HeroImage
          key={index}
          src={image.src}
          alt="Hero"
          style={{ opacity: index === currentImage ? 1 : 0 }}
        />
      ))}

      <HeroContent>
        <HeroTitle>{images[currentImage].title}</HeroTitle>
        <HeroSubtitle>{images[currentImage].subtitle}</HeroSubtitle>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;