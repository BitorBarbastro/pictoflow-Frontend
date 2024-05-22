import React from 'react';
import styled from 'styled-components';

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
  width: 300px;
`;

const Option = styled.button`
  flex: 1;
  text-align: center;
  padding: 10px 20px;
  margin: 0 2px 0;
  cursor: pointer;
  color: ${props => props.$isActive ? 'white' : 'black'};
  background-color: ${props => props.$isActive ? 'black' : 'transparent'};
  box-shadow: 0 2px 6px 0 rgba(33,33,33, 0.2 )${props => props.$isActive ? '' : 'inset'};

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
  &:hover,
  &:focus {
    background-color: ${props => props.$isActive ? 'rgb(33,33,33)' : 'rgb(222,222,222)'};
  }
`


const ToggleSlider = ({ isPhotographer, setIsPhotographer }) => {
  return (
    <SliderWrapper>
      <SliderContainer>
        <Option type="button" $isActive={isPhotographer} onClick={() => setIsPhotographer(true)}>
          Soy Fotógrafo
        </Option>
        <Option type="button" $isActive={!isPhotographer} onClick={() => setIsPhotographer(false)}>
          Soy Cliente
        </Option>
      </SliderContainer>
    </SliderWrapper>
  );
};

export default ToggleSlider;
