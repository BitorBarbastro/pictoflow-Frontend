import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WatermarkOptions from './WatermarkOptions';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%;
`;

const WatermarkPreviewContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
`;

const WatermarkSelector = ({ selectedWatermark, setSelectedWatermark, setWatermarkStyle }) => {
  const [watermarks, setWatermarks] = useState([]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const token = sessionStorage.getItem('token');
  const photographerId = token ? jwtDecode(token).nameid : null;

  useEffect(() => {
    const fetchWatermarks = async () => {
      try {
        const response = await axios.get(`http://localhost:5046/api/upload/watermarks/${photographerId}`);
        const fetchedWatermarks = response.data;

        // Añadir la marca de agua predeterminada con ID 0
        const defaultWatermark = { id: 0, name: 'Marca de agua predeterminada' };
        setWatermarks([defaultWatermark, ...fetchedWatermarks]);
      } catch (error) {
        console.error('Error al obtener las marcas de agua:', error);

        // Añadir la marca de agua predeterminada con ID 0 incluso si hay un error
        const defaultWatermark = { id: 0, name: 'Marca de agua predeterminada' };
        setWatermarks([defaultWatermark]);
      }
    };

    if (photographerId) {
      fetchWatermarks();
    } else {
      // Añadir la marca de agua predeterminada con ID 0 si no hay photographerId
      const defaultWatermark = { id: 0, name: 'Marca de agua predeterminada' };
      setWatermarks([defaultWatermark]);
    }
  }, [photographerId]);

  const handleImageUpload = async () => {
    if (imageFile && selectedWatermark) {
      const formData = new FormData();
      formData.append('imageFile', imageFile);
      formData.append('watermarkId', selectedWatermark);
      formData.append('photographerId', photographerId);
      formData.append('imageName', imageFile.name);

      try {
        const response = await axios.post(`http://localhost:5046/api/upload/uploadImageWithWatermark`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setGeneratedImageUrl(response.data.ImageUrl);
      } catch (error) {
        console.error('Error al subir la imagen y aplicar la marca de agua:', error);
      }
    }
  };

  return (
    <>
      <WatermarkOptions setWatermarkStyle={setWatermarkStyle} />
      <Label>
        Selecciona tu marca de agua:
        <Select
          value={selectedWatermark}
          onChange={e => setSelectedWatermark(e.target.value)}
        >
          <option value="">Sin marca de agua</option>
          {watermarks.map(watermark => (
            <option key={watermark.id} value={watermark.id}>
              {watermark.name}
            </option>
          ))}
        </Select>
      </Label>
     
      <WatermarkPreviewContainer>
        {generatedImageUrl && (
          <PreviewImage
            src={generatedImageUrl}
            alt={`Marca de agua ${selectedWatermark}`}
          />
        )}
      </WatermarkPreviewContainer>
    </>
  );
};

export default WatermarkSelector;
