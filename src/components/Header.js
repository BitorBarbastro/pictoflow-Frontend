import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 400;  
  margin: 0;
  cursor: pointer;

  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  color: ${props => props.$secondary ? 'black' : 'white'};
  border-radius: 4px;
  background-color: ${props => props.$secondary ? '#ccc' : 'black'};
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${props => props.$secondary ? '#b3b3b3' : '#333'};
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    margin-left: 0;
    margin-bottom: 10px;
    width: 100%;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 12vw;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  z-index: 1;
  right: 0;
  ${Dropdown}:hover & {
    display: block;
  }

  p {
    margin: 0;
    padding: 12px 16px;
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;
    &:hover {
      background-color: #e0e0e0;
      color: #333;
    }
  }
`;

const ProfileIcon = styled(FaUserCircle)`
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-left: 10px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const Header = () => {
  const checkLoginStatus = () => {
    const token = sessionStorage.getItem('token');
    return !!token;
  };

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/hero');
  };

  const handleCrearGaleriaClick = () => {
    navigate('/createGallery');
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleRegisterClick = () => {
    navigate('/register1');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleWatermarksClick = () => {
    navigate('/watermarks');
  };

  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>PictoFlow</Logo>
      <ButtonContainer>
        {checkLoginStatus() ? (
          <>
            <Button onClick={handleCrearGaleriaClick}>Crear Galería</Button>
            <Dropdown>
              <ProfileIcon />
              <DropdownContent>
                <p>Perfil</p>
                <p>Gestionar Planes</p>
                <p onClick={handleWatermarksClick}>Marcas de agua</p>
                <p onClick={handleSignOut}>Cerrar Sesión</p>
              </DropdownContent>
            </Dropdown>
          </>
        ) : (
          <>
            <Button onClick={handleRegisterClick}>Regístrate</Button>
            <Button $secondary onClick={handleLoginClick}>Inicia Sesión</Button>
          </>
        )}
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
