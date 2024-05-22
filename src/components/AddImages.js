import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageUploader from './ImageUploader';

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
      window.location.reload(); // Recargar la página después de subir los archivos
    } catch (error) {
      console.error('Error al subir las imágenes:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Añadir Imágenes a la Galería {galleryId}</h2>
      <ImageUploader
        images={images}
        handleFilesAdded={handleFilesAdded}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
      />
      <button onClick={handleUpload}>Subir Imágenes</button>
    </div>
  );
};

export default AddImages;
