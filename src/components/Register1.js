
import React, { useState } from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate


const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 25px;
`;

const Input = styled.input`
width: calc(100% - 20px);
height: 40px;
  padding: 10px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
`;



const GoogleText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
`;

const GoogleButton = styled.button`
  background-color: #fff;
  color: #757575;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;

  svg {
    margin-right: 10px;
  }
`;

const TermsText = styled.p`
  font-size: 12px;
  color: #666;
  text-align: center;
`;

const BoldText = styled.span`
  font-weight: bold;
`;
const BoldLink = styled.a`
  font-weight: bold;
  color: #666;
  text-decoration: none;
`;

const NoStyleLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  text-align:center;
`;
const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0px;
`;

const Throbber = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto; // Centra el throbber horizontalmente

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Register1 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [networkError, setNetworkError] = useState(''); // Estado para manejar errores de red
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Correo electrónico no válido. Ejemplo: nombre@dominio.com');
      return;
    } else {
      setEmailError('');
    }

    setLoading(true); // Inicia el estado de carga
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register1`, { Email: email });
      const { token } = response.data;

      sessionStorage.setItem('emailToken', token);

      console.log('Form submitted successfully');
      navigate('/register2');
    } catch (error) {
      console.error('Error submitting form:', error);
      setNetworkError('Error de red. Por favor, inténtalo de nuevo más tarde.'); // Establecer mensaje de error de red
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <RegisterContainer>
      <Title>Crea Tú Cuenta</Title>
      <Subtitle>Regístrate con tú correo electrónico</Subtitle>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </InputGroup>
        <Button type="submit" disabled={loading}>
          {loading ? <Throbber /> : 'Crea Tú Cuenta'}
        </Button>
        {networkError && <p style={{ color: 'red' }}>{networkError}</p>} {/* Mostrar mensaje de error de red */}
        <TermsText>
          Al registrarte aceptas nuestros <BoldLink as={Link} to="/terms"> Términos de servicio</BoldLink> y la{' '}
          <BoldLink as={Link} to="/privacy"> Pol&iacute;tica de privacidad</BoldLink>
        </TermsText>

        <NoStyleLink to="/login">
          Si ya tienes una cuenta inicia sesión haciendo <BoldText>Click Aquí</BoldText>
        </NoStyleLink>
        <GoogleText>O regístrate con Google</GoogleText>
        <GoogleButton type="button">
          <FcGoogle size={20} />
          Continuar con Google
        </GoogleButton>
      </Form>
    </RegisterContainer>
  );
};

export default Register1;
