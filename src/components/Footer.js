import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, Link as RouterLink } from 'react-router-dom';



const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const FooterBase = ({ isExpanded, className, children, onMouseEnter, onMouseLeave }) => (
  <footer className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    {children}
  </footer>
);

const body = document.body;
body.style.transition = 'height 0.3s ease'; // Añade una transición suave al tamaño del body

const FooterContainer = styled(FooterBase)`
  background-color: #f8f9fa;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  transition: height 0.3s ease, opacity 0.3s ease; 
  height: ${({ isExpanded }) => (isExpanded ? '200px' : '60px')};
  overflow: hidden;
  position: fixed; 
  bottom: 0;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 400;
  margin-left: 20px;
  cursor: pointer;
`;

const LinksBase = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);

const LinksContainer = styled(LinksBase)`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  animation: ${({ isExpanded }) => (isExpanded ? fadeIn : fadeOut)} 0.1s ease-in-out;
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
`;

const LinkTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Link = styled(RouterLink)`
  color: black;
  text-decoration: none;
  margin-bottom: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsExpanded(true);
  const handleMouseLeave = () => setIsExpanded(false);

  const handleLogoClick = () => navigate('/hero');

  useEffect(() => {
    const footerHeight = isExpanded ? 200 : 60; 
    const bodyHeight = body.scrollHeight + footerHeight - 60; 

    if (isExpanded) {
      body.style.height = `${bodyHeight}px`;
      setTimeout(() => {
        window.scrollTo({
          top: body.scrollHeight + (footerHeight - 60),
          behavior: 'smooth'
        });
      }, 300); // Aumenta el delay para asegurar que el scroll se realice después de la expansión
    } else {
      body.style.height = `${body.scrollHeight - (200 - 60)}px`; 
      setTimeout(() => {
        window.scrollTo({
          top: body.scrollHeight - footerHeight + 60,
          behavior: 'smooth' 
        });
      }, 300); // Aumenta el delay para asegurar que el scroll se realice después de la expansión
    }
  }, [isExpanded]);

  return (
    <FooterContainer
      isExpanded={isExpanded}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Logo onClick={handleLogoClick}>PicToFlow</Logo>
      <LinksContainer isExpanded={isExpanded}>
        <LinkColumn>
          <LinkTitle>Acceso Rápido</LinkTitle>
          <Link to="/perfil">Perfil</Link>
          <Link to="/adminGalleries">Administrar Galerias</Link>
          <Link to="/login">Cerrar Sesión</Link>
        </LinkColumn>
        <LinkColumn>
          <LinkTitle>Topic</LinkTitle>
          <Link to="/page1">Page</Link>
          <Link to="/page2">Page</Link>
          <Link to="/page3">Page</Link>
        </LinkColumn>
        <LinkColumn>
          <LinkTitle>Topic</LinkTitle>
          <Link to="/page4">Page</Link>
          <Link to="/page5">Page</Link>
          <Link to="/page6">Page</Link>
        </LinkColumn>
      </LinksContainer>
    </FooterContainer>
  );
};


export default Footer;
