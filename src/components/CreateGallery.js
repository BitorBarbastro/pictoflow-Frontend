import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WatermarkSelector from './WatermarkSelector';
import PriceSelector from './PriceSelector';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaPencilAlt } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TitleInput = styled.input`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  border: 2px solid transparent;
  outline: none;
  padding: 5px;
  text-align: center;
  color: ${props => props.value ? 'black' : '#ccc'};
  background-color: ${props => props.value ? 'white' : '#f0f0f0'};
  transition: border-color 0.3s, background-color 0.3s;
  cursor: pointer;

  &::placeholder {
    color: #ccc;
  }
  &:focus {
    border-color: #007BFF;
    background-color: white;
  }
`;

const DescriptionInput = styled.input`
  font-size: 16px;
  margin-bottom: 20px;
  border: 2px solid transparent;
  outline: none;
  padding: 5px;
  text-align: center;
  color: ${props => props.value ? 'black' : '#ccc'};
  background-color: ${props => props.value ? 'white' : '#f0f0f0'};
  transition: border-color 0.3s, background-color 0.3s;
  cursor: pointer;

  &::placeholder {
    color: #ccc;
  }
  &:focus {
    border-color: #007BFF;
    background-color: white;
  }
`;

const TextSeparator = styled.p`
  font-size: 16px;
  color: #888;
  margin-bottom: 20px;
  text-align: center;
  cursor: default;
`;

const WatermarkSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 20px;
`;

const WatermarkColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  flex: 1;
  padding: 0 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 4px;
  background-color: black;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  position: relative;
  width: 100%; // Asegúrate de que el contenedor ocupe todo el ancho disponible
`;


const EditIcon = styled(FaPencilAlt)`
margin-bottom: 15px;  
margin-left: 10px;
  color: black;
  cursor: pointer;
  flex-shrink: 0; // Evita que el ícono se reduzca
`;

const CreateGallery = () => {
  const [selectedWatermark, setSelectedWatermark] = useState(0);
  const [titulo, setTitulo] = useState('Nombre de la Galería');
  const [descripcion, setDescripcion] = useState('Descripción de la galería');
  const [precioIndividual, setPrecioIndividual] = useState('6');
  const [precioGaleria, setPrecioGaleria] = useState('25');
  const [watermarkStyle, setWatermarkStyle] = useState('SinMarca');
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken);
        if (decodedToken && decodedToken.nameid) {
          setUserId(decodedToken.nameid);
        } else {
          console.log('User ID not found in token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        sessionStorage.removeItem('token');
      }
    }
  }, [token]);

  const addTwoWeeks = () => {
    const today = new Date();
    const twoWeeksLater = new Date(today.setDate(today.getDate() + 14));
    return twoWeeksLater.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  };

  const handleSubmit = async () => {
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload/createGallery`,  {
        PhotographerId: userId, // Asegúrate de que las propiedades coincidan exactamente
        Name: titulo,
        Description: descripcion,
        ExpirationDate: addTwoWeeks(),
        WatermarkStyle: watermarkStyle,
        WatermarkId: selectedWatermark,
        IndividualPrice: parseFloat(precioIndividual),
        TotalPrice: parseFloat(precioGaleria)
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Galería creada exitosamente:', response.data);
      if (response.data && response.data.id) {
        navigate(`/editGallery/${response.data.id}`);
      } else {
        console.error('Error al crear la galería: Respuesta inesperada del servidor', response.data);
      }
    } catch (error) {
      console.error('Error al crear la galería:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container>
      <InputContainer>
        <TitleInput
          id="titulo"
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Nombre de la Galería"
          required
        />
        <label htmlFor="titulo">
          <EditIcon />
        </label>
      </InputContainer>
      <InputContainer>
        <DescriptionInput
          id="descripcion"
          type="text"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder="Descripción de la galería"
        />
        <label htmlFor="descripcion">
          <EditIcon />
        </label>
      </InputContainer>
      <TextSeparator>Selecciona una marca de agua:</TextSeparator>
      <WatermarkSection>
        <WatermarkColumn>
          <WatermarkSelector
          
            selectedWatermark={selectedWatermark}
            setSelectedWatermark={setSelectedWatermark}
            setWatermarkStyle={setWatermarkStyle}
          />
        </WatermarkColumn>
        <WatermarkColumn>
        <PriceSelector
            precioIndividual={precioIndividual}
            setPrecioIndividual={setPrecioIndividual}
            precioGaleria={precioGaleria}
            setPrecioGaleria={setPrecioGaleria}
          />

        </WatermarkColumn>
      </WatermarkSection>
      <Button onClick={handleSubmit}>Crear Galería</Button>
    </Container>
  );
};
export default CreateGallery;





