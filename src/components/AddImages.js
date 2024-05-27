import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageUploader from './ImageUploader';
import styled from 'styled-components';

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;


const UploadButton = styled.button`
  display: inline-block;
  padding: 14px 24px; 
  font-size: 18px; 
  background-color: black;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  border: none;
  transition: background-color 0.3s ease; 

  &:hover {
    background-color: #222;
  }
`;
const AddImages = () => {
  const { galleryId } = useParams();
  const [images, setImages] = useState([]);

  const handleFilesAdded = (files) => {
    setImages(prevImages => [...prevImages, ...files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFilesAdded(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    images.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post(`http://localhost:5046/api/Gallery/addImages/${galleryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log('Imágenes subidas exitosamente:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error al subir las imágenes:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <Title>Añadir Imágenes a la Galería {galleryId}</Title>
      <ImageUploader
        images={images}
        handleFilesAdded={handleFilesAdded}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
      />
      <ButtonWrapper>
        <UploadButton onClick={handleUpload}>Subir Imágenes</UploadButton>
      </ButtonWrapper>
    </div>
  );
};

export default AddImages;