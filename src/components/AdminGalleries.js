import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const GalleryList = styled.div`
  display: flex;
  flex-wrap: wrap; 
  justify-content: center; 
  border: none; 
  border-radius: 8px; 
  padding: 20px; 
  width: 80%; 
  margin: 20px auto 160px; 
  box-shadow:  2px -4px 8px 0px rgba(0, 0, 0, 0.4);
`;

const GalleryItem = styled.div`
  position: relative; /* Añadir posición relativa para permitir la posición absoluta del botón */
  display: flex;
  flex-direction: column; 
  align-items: center;
  height: 250px;
  margin: 10px; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Cambiar la sombra para que sea externa */
  width: calc(50% - 20px); 
  background-color: #fff; 
  padding: 16px; /* Aumentar el padding para más espacio interno */
  box-sizing: border-box; 
  border: 1px solid #ddd; /* Añadir un borde */
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(180deg);
  }
`;

const OptionsButton = styled.button`
  position: absolute;
  right: 10px;
  bottom: 5px;
  background: url('/images/settings.svg') no-repeat center center;
  background-size: cover;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    animation: ${rotateAnimation} 1s ease-in-out;
  }
`;

const GalleryImage = styled.img`
  width: auto;
  height: 60%;
  object-fit: cover;
  border-radius: 8px; 
  transition: transform 0.1s ease, box-shadow 0.3s ease; /* Añadir transición para suavizar el efecto */

  &:hover {
    transform: ${({ mouseX, mouseY }) => `scale(1.05) rotateX(${mouseY}deg) rotateY(${mouseX}deg)`}; /* Escalar e inclinar la imagen */
    box-shadow: ${({ mouseX, mouseY }) => `${-mouseX}px ${-mouseY}px 20px rgba(0, 0, 0, 0.3)`}; /* Sombra dinámica invertida */
  }
`;

const GalleryInfo = styled.div`
  margin-top: 10px; 
  text-align: center; 
`;

const GalleryTitle = styled.h3`
  font-size: 1.2em; /* Aumentar el tamaño de la fuente */
  margin-bottom: 8px; /* Añadir margen inferior */
  text-align: center; /* Centrar el texto */
`;

const EditLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  margin-top: 8px; /* Aumentar el margen superior */
  text-align: center; /* Centrar el enlace */
  
  &:hover {
    text-decoration: underline; /* Subrayar el enlace al pasar el ratón */
  }
`;

const AdminGalleries = () => {
  const [galleries, setGalleries] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchGalleries = async () => {
      const token = sessionStorage.getItem('token');
      let photographerId = null;

      if (token) {
        const decodedToken = jwtDecode(token);
        photographerId = decodedToken.nameid;
      }

      if (photographerId) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Gallery/photographer/${photographerId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setGalleries(response.data);
        } catch (error) {
          console.error('Error fetching galleries:', error);
        }
      }
    };

    fetchGalleries();
  }, []);

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { clientWidth, clientHeight } = target;

    const mouseX = (offsetX / clientWidth) * 20 - 10; // Rango de -10 a 10
    const mouseY = (offsetY / clientHeight) * 20 - 10; // Rango de -10 a 10

    setMousePosition({ x: mouseX, y: mouseY });
  };

  return (
    <GalleryList>
      {galleries.map((gallery) => (
        <GalleryItem key={gallery.id}>
          <GalleryImage
            src={gallery.firstImage || '/images/cuack.jpg'}
            alt={gallery.name}
            onMouseMove={handleMouseMove}
            mouseX={mousePosition.x}
            mouseY={mousePosition.y}
          />
          <GalleryInfo>
            <EditLink to={`/editGallery/${gallery.id}`}>   
              <GalleryTitle>{gallery.name}</GalleryTitle>
            </EditLink>
          </GalleryInfo>
          <OptionsButton />
        </GalleryItem>
      ))}
    </GalleryList>
  );
};

export default AdminGalleries;
