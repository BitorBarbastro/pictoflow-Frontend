import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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
  position: relative; 
  display: flex;
  flex-direction: column; 
  align-items: center;
  height: 250px;
  margin: 10px; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  width: calc(50% - 20px); 
  background-color: #fff; 
  padding: 16px; 
  box-sizing: border-box; 
  border: 1px solid #ddd; 
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
  transition: transform, box-shadow ; 

  &:hover {
    transform: ${({ mouseX, mouseY }) => `scale(1.05) rotateX(${mouseY}deg) rotateY(${mouseX}deg)`}; 
    box-shadow: ${({ mouseX, mouseY }) => `${-mouseX}px ${-mouseY}px 20px rgba(0, 0, 0, 0.3)`}; 
  }
`;

const GalleryInfo = styled.div`
  margin-top: 10px; 
  text-align: center; 
`;

const GalleryTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 8px; 
  text-align: center; 
`;

const EditLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  margin-top: 8px; 
  text-align: center; 
  
  &:hover {
    text-decoration: underline; 
  }
`;
const AdminGalleries = () => {
    const [galleries, setGalleries] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Configurar solo las galerías de ejemplo
        const exampleGalleries = [
            {
                id: 1,
                title: 'Galería de Ejemplo 1',
                images: [{ url: 'https://via.placeholder.com/100' }]
            },
            {
                id: 2,
                title: 'Galería de Ejemplo 2',
                images: [{ url: '/images/cuack.jpg' }]
            },
            {
                id: 3,
                title: 'Galería de Ejemplo 2',
                images: [{ url: '/images/cuack.jpg' }]
            },

            {
                id: 4,
                title: 'Galería de Ejemplo 1',
                images: [{ url: '/images/cuack.jpg' }]
            },
            {
                id: 5,
                title: 'Galería de Ejemplo 2',
                images: [{ url: 'https://via.placeholder.com/100' }]
            },
            {
                id: 6,
                title: 'Galería de Ejemplo 1',
                images: [{ url: 'https://via.placeholder.com/100' }]
            },

        ];
        setGalleries(exampleGalleries);
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
                        src={gallery.images[0]?.url || '/images/cuack.jpg'}
                        alt={gallery.title}
                        onMouseMove={handleMouseMove}
                        mouseX={mousePosition.x}
                        mouseY={mousePosition.y}
                    />
                    <GalleryInfo>
                        <EditLink to={`/editGallery/${gallery.id}`}>   
                        <GalleryTitle>{gallery.title}
                        </GalleryTitle>
                        </EditLink>
                    </GalleryInfo>
                    <OptionsButton />

                </GalleryItem>
            ))}
        </GalleryList>
    );
};

export default AdminGalleries;
