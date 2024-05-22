import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const PhotoContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  text-align: center;
`;

const PhotoImage = styled.img`
  width: 100%;
  height: auto;
`;

const PhotoTitle = styled.p`
  margin: 8px 0;
  font-size: 16px;
  color: #333;
`;

const GalleryPresentation = () => {
  const { galleryId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`http://localhost:5046/api/Gallery/${galleryId}/watermarkedPhotos`);
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [galleryId]);

  return (
    <GalleryContainer>
      {photos.map(photo => (
        <PhotoContainer key={photo.id}>
          <PhotoImage src={`http://localhost:5046${photo.watermarkedImageUrl}`} alt={photo.title} />
          <PhotoTitle>{photo.title}</PhotoTitle>
        </PhotoContainer>
      ))}
    </GalleryContainer>
  );
};

export default GalleryPresentation;
