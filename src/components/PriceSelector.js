import React from 'react';
import styled from 'styled-components';

const PriceContainer = styled.div`
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: white;
  margin-top: auto;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const PriceInput = styled.input`
  font-size: 16px;
  border: none;
  outline: none;
  padding: 5px;
  width: 60px;
  text-align: right;
  color: ${props => props.value ? 'black' : '#ccc'};
  display: inline-block;

  &::placeholder {
    color: #ccc;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const PriceSelector = ({ precioIndividual, setPrecioIndividual, precioGaleria, setPrecioGaleria }) => {
  return (
    <PriceContainer>
      <Label>Ajusta el precio a tus fotografías: </Label>
      <p>
        Precio por fotografía individual: <PriceInput
          type="number"
          step="0.01"
          value={precioIndividual}
          onChange={e => setPrecioIndividual(e.target.value)}
          placeholder="6"
        />€
      </p>
      <p>
        Precio por Galería completa: <PriceInput
          type="number"
          step="0.01"
          value={precioGaleria}
          onChange={e => setPrecioGaleria(e.target.value)}
          placeholder="25"
        />€
      </p>
    </PriceContainer>
  );
};

export default PriceSelector;