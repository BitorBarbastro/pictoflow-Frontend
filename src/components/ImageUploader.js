import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DropzoneContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: default;
  margin-top: 10px;
  width: 75%;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 8px 16px;
  background-color: black;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

const ImagePreviewButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ImageUploader = ({ images, handleFilesAdded, handleDrop, handleDragOver, handleUpload }) => {
  return (
    <>
      <DropzoneContainer onDrop={handleDrop} onDragOver={handleDragOver}>
        <FileInputLabel htmlFor="file-input">
          Click Aquí
        </FileInputLabel>
        <FileInput
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={e => handleFilesAdded(Array.from(e.target.files))}
        />
        <p>O arrastra y suelta tus imágenes aquí</p>
      </DropzoneContainer>
      <PreviewContainer>
        <h3>Previsualización de imágenes subidas:</h3>
        <ImagePreview>
          {images.slice(0, 8).map((file, index) => (
            <ImagePreviewContainer key={index}>
              <PreviewImage
                src={URL.createObjectURL(file)}
                alt={`Imagen ${index + 1}`}
              />
              <ImagePreviewButton onClick={() => handleUpload(file)}>Subir</ImagePreviewButton>
            </ImagePreviewContainer>
          ))}
        </ImagePreview>
      </PreviewContainer>
    </>
  );
};

export default ImageUploader;
