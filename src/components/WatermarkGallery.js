import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 6px 8px rgba(25, 50, 47, 0.08), 0px 3px 4px rgba(18, 71, 52, 0.02), 0px 1px 16px rgba(18, 71, 52, 0.03);
  margin: 20px;
`;

const ImageContainer = styled.div`
  width: calc(25% - 10px);
  position: relative;
  border-radius: 8px;
  box-shadow: inset 0px 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; 
`;

const WatermarkImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const OptionsMenu = styled.div`
  position: absolute;
  right: 40px;
  bottom: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
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

const Option = styled.button`
  background: none;
  border: none;
  color: black;
  padding: 5px 10px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const WatermarkName = styled.div`
  text-align: center;
  color: #333; // Color del texto
  padding: 5px 0; // Espaciado para el texto
  font-size: 14px; // Tamaño del texto
`;

const WatermarkGallery = ({ photographerId }) => {
  const [watermarks, setWatermarks] = useState([]);
  const [showOptions, setShowOptions] = useState(null);

  useEffect(() => {
    const fetchWatermarks = async () => {
      try {
        const response = await axios.get(`http://localhost:5046/api/Upload/upload/${photographerId}/watermarks`);
        setWatermarks(response.data);
      } catch (error) {
        console.error('Error fetching watermarks:', error);
      }
    };

    fetchWatermarks();
  }, [photographerId]);

  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`http://localhost:5046/api/Upload/${photographerId}/deleteWatermarks/${fileName}`);
      setWatermarks(watermarks.filter(w => w.fileName !== fileName));
    } catch (error) {
      console.error('Error deleting watermark:', error);
    }
  };

  const handleRename = async (fileName) => {
    const newName = prompt("Enter new name for the watermark:", fileName);
    if (newName && newName !== fileName) {
      try {
        await axios.put(`http://localhost:5046/api/Upload/${photographerId}/renameWatermark/${fileName}`, { newName });
        // Actualizar el estado o refrescar la lista de marcas de agua
        setWatermarks(watermarks.map(w => (w.fileName === fileName ? { ...w, name: newName } : w)));
      } catch (error) {
        console.error('Error renaming watermark:', error);
      }
    }
  };

  const toggleOptions = (index) => {
    setShowOptions(showOptions === index ? null : index);
  };

  return (
    <GalleryContainer>
      {watermarks.map((watermark, index) => (
        <ImageContainer key={index}>
          <WatermarkImage src={`http://localhost:5046/uploads/photographer_${photographerId}/watermarks/${watermark.fileName}`} alt={watermark.name} />
          <OptionsButton onClick={() => toggleOptions(index)} />
          <WatermarkName>{watermark.name}</WatermarkName>
          {showOptions === index && (
            <OptionsMenu>
              <Option onClick={() => handleRename(watermark.fileName)}>Renombrar</Option>
              <Option onClick={() => handleDelete(watermark.fileName)}>Borrar</Option>
            </OptionsMenu>
          )}
        </ImageContainer>
      ))}
    </GalleryContainer>
  );
};

export default WatermarkGallery;
