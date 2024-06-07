import React from 'react';
import styled from 'styled-components';
import { FaPencilAlt } from 'react-icons/fa';

const PriceContainer = styled.div`
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  margin-top: auto;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  align-items: left;
  margin-bottom: 10px;
`;

const PriceInput = styled.input`
  font-size: 16px;
  margin-left: 10px;
  border: 2px solid transparent;
  outline: none;
  padding: 5px;
  text-align: center;
  color: ${props => props.value ? 'black' : '#ccc'};
  background-color: ${props => props.value ? 'white' : '#f0f0f0'};
  transition: border-color 0.3s, background-color 0.3s;
  width: 80px; // Limita el ancho del input
  -moz-appearance: textfield; // Oculta las opciones para subir y bajar el valor en Firefox
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none; // Oculta las opciones para subir y bajar el valor en Chrome y Safari
    margin: 0;
  }
  &::placeholder {
    color: #ccc;
  }
  &:focus {
    border-color: #007BFF;
    background-color: white;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  position: relative;
`;

const EditIcon = styled(FaPencilAlt)`
  margin-left: 10px;
  color: black;
  cursor: pointer;
  flex-shrink: 0; // Evita que el ícono se reduzca
`;

const CurrencySymbol = styled.span`
  margin-left: 5px;
  font-size: 16px;
  color: black;
`;

const PriceSelector = ({ precioIndividual, setPrecioIndividual, precioGaleria, setPrecioGaleria }) => {
  // Agregar console.log para depurar los valores recibidos
  console.log('Precio Individual:', precioIndividual);
  console.log('Precio Galería:', precioGaleria);

  return (
    <PriceContainer>
      <Label>
        Ajusta el precio a tus fotografías individuales:
        <InputContainer>
          <PriceInput
            id="precioIndividual"
            type="number"
            step="0.01"
            value={precioIndividual}
            onChange={e => setPrecioIndividual(e.target.value)}
            placeholder="6"
          />
          <CurrencySymbol>€</CurrencySymbol>
          <label htmlFor="precioIndividual">
            <EditIcon />
          </label>
        </InputContainer>
      </Label>
      <Label>
        Ajusta el precio por la galería completa:
        <InputContainer>
          <PriceInput
            id="precioGaleria"
            type="number"
            step="0.01"
            value={precioGaleria}
            onChange={e => setPrecioGaleria(e.target.value)}
            placeholder="25"
          />
          <CurrencySymbol>€</CurrencySymbol>
          <label htmlFor="precioGaleria">
            <EditIcon />
          </label>
        </InputContainer>
      </Label>
    </PriceContainer>
  );
};

export default PriceSelector;
