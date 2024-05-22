import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SliderWrapper = styled.div`
  width: fit-content;
  margin: 20px auto;
`;

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 20px;
  padding: 10px;
  width: 400px;
`;

const Option = styled.button`
  flex: 1;
  text-align: center;
  padding: 10px;
  margin: 0 2px;
  cursor: pointer;
  color: ${props => props.$isActive ? 'white' : 'black'};
  background-color: ${props => props.$isActive ? 'black' : 'transparent'};
  box-shadow: 0 2px 6px 0 rgba(66,66,66, 0.2 )${props => props.$isActive ? '' : 'inset'};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s, color 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  font-size: 12px;
  &:hover,
  &:focus {
    background-color: ${props => props.$isActive ? 'rgb(33,33,33)' : 'rgb(222,222,222)'};
  }
`;

const WatermarkOptions = ({ setWatermarkStyle }) => {
  const [selectedOption, setSelectedOption] = useState('SinMarca');

  const handleOptionClick = (option) => {
    console.log('Botón pulsado:', option);
    setSelectedOption(option);
    setWatermarkStyle(option);
  };

  return (
    <SliderWrapper>
      <SliderContainer>
        <Option
          type="button"
          $isActive={selectedOption === 'SinMarca'}
          onClick={() => handleOptionClick('SinMarca')}
          aria-pressed={selectedOption === 'SinMarca'}
        >
          Sin Marca
        </Option>
        <Option
          type="button"
          $isActive={selectedOption === 'InferiorDerecha'}
          onClick={() => handleOptionClick('InferiorDerecha')}
          aria-pressed={selectedOption === 'InferiorDerecha'}
        >
          Inferior Derecha
        </Option>
        <Option
          type="button"
          $isActive={selectedOption === 'Ampliada'}
          onClick={() => handleOptionClick('Ampliada')}
          aria-pressed={selectedOption === 'Ampliada'}
        >
          Ampliada
        </Option>
      </SliderContainer>
    </SliderWrapper>
  );
};

WatermarkOptions.propTypes = {
  setWatermarkStyle: PropTypes.func.isRequired,
};

export default React.memo(WatermarkOptions);