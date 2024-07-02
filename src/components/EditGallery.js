import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ImageUploader from './ImageUploader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const GalleryImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
`;

const GalleryImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
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
margin-right:15px;
  &:hover {
    background-color: #222;
  }
`;

const ViewGalleryButton = styled.button`
  display: inline-block;
  padding: 14px 24px; 
  font-size: 18px; 
  background-color: #007BFF;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  border: none;
  transition: background-color 0.3s ease; 
margin-left:15px;
  &:hover {
    background-color: #0056b3;
  }
`;

const EditGallery = () => {
    const { galleryId } = useParams();
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGalleryImages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Gallery/${galleryId}/highres`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching gallery images:', error);
            }
        };

        fetchGalleryImages();
    }, [galleryId]);

    const handleFilesAdded = (files) => {
        setNewImages(prevImages => [...prevImages, ...files]);
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
        newImages.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/Gallery/addImages/${galleryId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            console.log('Imágenes subidas exitosamente:', response.data);

            // Ajuste basado en la estructura de response.data
            const imagesData = response.data.images || [];

            // Filtrar solo las propiedades necesarias de las imágenes
            const filteredImages = imagesData.map(image => ({
                highresImageUrl: image.highresImageUrl,
                title: image.title
            }));

            // Actualizar el estado de las imágenes sin duplicar
            setImages(prevImages => {
                const existingUrls = prevImages.map(img => img.highresImageUrl);
                const newUniqueImages = filteredImages.filter(img => !existingUrls.includes(img.highresImageUrl));
                return [...newUniqueImages, ...prevImages];
            });

            setNewImages([]);
        } catch (error) {
            console.error('Error al subir las imágenes:', error.response ? error.response.data : error.message);
        }
    };

    const handleViewGallery = () => {
        navigate(`/presentation/${galleryId}`);
    };

    return (
        <Container>
            <Title>Editar Galería {galleryId}</Title>
            <GalleryImages>
                {images.map((image, index) => (
                    <ImageWrapper key={index}>
                        <GalleryImage src={`${process.env.REACT_APP_API_URL}${image.highresImageUrl}`} alt={`Imagen ${image.title}`} />
                    </ImageWrapper>
                ))}
            </GalleryImages>
            <ImageUploader
                images={newImages}
                handleFilesAdded={handleFilesAdded}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
            />
            <ButtonWrapper>
                <UploadButton onClick={handleUpload}>Subir Imágenes</UploadButton>
                <ViewGalleryButton onClick={handleViewGallery}>Ver Galería</ViewGalleryButton>
            </ButtonWrapper>
        </Container>
    );
};

export default EditGallery;
