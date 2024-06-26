import styled, { keyframes } from 'styled-components';
import React, { useState } from 'react';

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 1400px;
  margin: auto;
  box-sizing: border-box;
`;

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
  background: url('/images/settings.svg') no-repeat center center;
  background-size: contain; /* Ajusta esto para que la imagen se ajuste bien dentro del botón */
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #ddd; /* Fondo claro para mejorar el contraste */
  &:hover {
    animation: ${rotateAnimation} 1s ease-in-out;
    background-color: #bbb; /* Cambia el color de fondo al hacer hover para indicar interacción */
  }
`;

const OptionsMenu = styled.div`
  position: absolute;
  bottom: 35px;
  right: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
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


const ImageUploader = ({ images, handleFilesAdded, handleDrop, handleDragOver, handleUpload }) => {
  const [showOptions, setShowOptions] = useState(null);

  const toggleOptions = (index) => {
    setShowOptions(showOptions === index? null : index);
  };

  const handleDelete = (indexToDelete) => {
    // Implementa la lógica para eliminar la foto
    // Por ejemplo, filtra la lista de imágenes para excluir la foto seleccionada
    // Nota: Necesitarás ajustar esta lógica según cómo manejes el estado de las imágenes
  };
  return (
    <Container>
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
            <ImagePreviewButton onClick={() => toggleOptions(index)}>
            </ImagePreviewButton>
            {showOptions === index && (
              <OptionsMenu>
                <Option onClick={() => handleDelete(index)}>Eliminar</Option>
              </OptionsMenu>
            )}
          </ImagePreviewContainer>
        ))}
      </ImagePreview>

      </PreviewContainer>
    </Container>
  );
};

export default ImageUploader;