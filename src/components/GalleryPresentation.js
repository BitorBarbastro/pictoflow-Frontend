import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MainPhotoContainer = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 90%;
  max-width: 1000px;
  text-align: center;
`;

const MainPhotoImage = styled.img`
  width: 100%;
  height: auto;
  transition: transform 0.5s ease-in-out;
  transform-origin: center center;
`;

const MainPhotoTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0;
  position: relative;
`;

const MainPhotoTitle = styled.p`
  font-size: 20px;
  color: #333;
`;

const FavoriteButton = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 36px;
  color: ${props => (props.isFavorite ? 'gold' : 'gray')};
  margin-left: 12px;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
  overflow-x: hidden;
  width: 90%;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ThumbnailContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 120px;
  text-align: center;
  cursor: pointer;
  flex: 0 0 auto;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
`;

const ThumbnailTitle = styled.p`
  margin: 6px 0;
  font-size: 14px;
  color: #333;
`;

const CommentContainer = styled.div`
  margin-top: 20px;
  width: 90%;
  max-width: 1000px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const CommentButton = styled.button`
  padding: 10px 20px;
  margin-left: 12px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 4px;
  background-color: black;
  &:hover {
    background-color: #0056b3;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #333;
  &:hover {
    color: #000;
  }
`;
const CenteredDiv = styled.div`
  display: flex;
  justify-content: center; /* Centrado horizontalmente */
  align-items: center; /* Centrado verticalmente */
  height: 100%; /* Asegúrate de que el contenedor tenga altura para centrar verticalmente */
`;
const GalleryPresentation = () => {
  const { galleryId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState('');
  const [zoom, setZoom] = useState(1);
  const userId = sessionStorage.getItem('userId');
  const thumbnailsContainerRef = useRef(null);
  const mainPhotoRef = useRef(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Gallery/${galleryId}/watermarkedPhotos`);
        setPhotos(response.data);
        if (response.data.length > 0) {
          setSelectedPhoto(response.data[0]);
          setIsFavorite(response.data[0].isFavorite);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [galleryId]);

  const handleThumbnailClick = (photo) => {
    setSelectedPhoto(photo);
    setIsFavorite(photo.isFavorite);
  };

  const handleFavoriteClick = async () => {
    if (!selectedPhoto) return;

    try {
      const updatedFavoriteStatus = !isFavorite;
      await axios.put(`${process.env.REACT_APP_API_URL}/api/Gallery/${galleryId}/photos/${selectedPhoto.id}/favorite`, {
        isFavorite: updatedFavoriteStatus,
        userId: userId
      });
      setIsFavorite(updatedFavoriteStatus);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!selectedPhoto || !comment) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/Gallery/${galleryId}/photos/${selectedPhoto.id}/comments`, {
        comment: comment,
        userId: userId
      });
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const scrollThumbnails = (direction) => {
    const container = thumbnailsContainerRef.current;
    const scrollAmount = direction === 'left' ? -200 : 200;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    if (direction === 'right' && container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === 'left' && container.scrollLeft === 0) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = mainPhotoRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    mainPhotoRef.current.style.transformOrigin = `${x}% ${y}%`;
    mainPhotoRef.current.style.transform = `scale(${zoom})`;
  };

  const handleMouseEnter = () => {
    setZoom(2.5); // Ajusta el nivel de zoom
  };

  const handleMouseLeave = () => {
    setZoom(1);
    mainPhotoRef.current.style.transform = `scale(1)`;
  };

  return (
    <GalleryContainer>
      {selectedPhoto && (
        <>
          <MainPhotoContainer>
            <MainPhotoImage
              ref={mainPhotoRef}
              src={`${process.env.REACT_APP_API_URL}${selectedPhoto.watermarkedImageUrl}`}
              alt={selectedPhoto.title}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <MainPhotoTitleContainer>
              <MainPhotoTitle>{selectedPhoto.title}</MainPhotoTitle>
              <FavoriteButton isFavorite={isFavorite} onClick={handleFavoriteClick}>
                ★
              </FavoriteButton>
            </MainPhotoTitleContainer>
          </MainPhotoContainer>
          <CommentContainer>
            <CommentInput
              placeholder="Añadir un comentario..."
              value={comment}
              onChange={handleCommentChange}
            />
            <CommentButton onClick={handleCommentSubmit}>Publicar Comentario</CommentButton>
          </CommentContainer>
        </>
      )}
      <CenteredDiv>
        <ArrowButton onClick={() => scrollThumbnails('left')}>◀</ArrowButton>
        <ThumbnailsContainer ref={thumbnailsContainerRef} id="thumbnails-container">
          {photos.map(photo => (
            <ThumbnailContainer key={photo.id} onClick={() => handleThumbnailClick(photo)}>
              <ThumbnailImage src={`${process.env.REACT_APP_API_URL}${photo.watermarkedImageUrl}`} alt={photo.title} />
              <ThumbnailTitle>{photo.title}</ThumbnailTitle>
            </ThumbnailContainer>
          ))}
        </ThumbnailsContainer>
        <ArrowButton onClick={() => scrollThumbnails('right')}>▶</ArrowButton>
      </CenteredDiv>
    </GalleryContainer>
  );
};

export default GalleryPresentation;
