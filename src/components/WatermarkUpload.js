import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import WatermarkGallery from './WatermarkGallery';
import {jwtDecode} from 'jwt-decode'; // Corrección aquí

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px 5px;
  margin: 15px auto;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 95%;
  padding: 10px;
  margin: 15px auto;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const WatermarkUpload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  // Obtener el token del sessionStorage y decodificarlo
  const token = sessionStorage.getItem('token');
  let photographerId = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    photographerId = decodedToken.nameid; // Usar nameid para obtener el ID del usuario
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Por favor, selecciona un archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('photographerId', photographerId);
    formData.append('name', name);

    try {
      await axios.post('http://localhost:5046/api/upload/uploadWatermark', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Archivo subido correctamente');
      window.location.reload(); // Considerar actualizar el estado en lugar de recargar
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Error al subir el archivo.');
    }
  };

  return (
    <Container>
      <UploadContainer>
        <Title>Subir Marca de Agua</Title>
        <form onSubmit={handleSubmit}>
          <Input type="file" onChange={handleFileChange} accept="image/*" />
          <Input type="text" value={name} onChange={handleNameChange} placeholder="Nombre de la Marca de Agua" />
          <Button type="submit">Subir Marca de Agua</Button>
        </form>
      </UploadContainer>
      {photographerId && <WatermarkGallery photographerId={photographerId} />}
    </Container>
  );
};

export default WatermarkUpload;
