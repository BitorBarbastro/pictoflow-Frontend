
import React, { useState } from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import ToggleSlider from './ToggleSlider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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

const LoginLink = styled.a`
  color: #000;
  text-decoration: none;
  margin-bottom: 20px;
  cursor: pointer;
  text-align: center;
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

const BoldLink = styled.a`
  font-weight: bold;
  color: #666;
  text-decoration: none;
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
  padding: 20px;
`;


const Register1 = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5046/api/users/register1', { email });
      const { token } = response.data;
      console.log('Form submitted successfully');
      navigate(`/register2?token=${token}`);
    } catch (error) {
      console.error('Error submitting form:', error);
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
        </InputGroup>
        <Button type="submit">Crea Tú Cuenta</Button>
        <LoginLink href="/">
          Si ya tienes una cuenta inicia sesión haciendo <strong>Click Aquí</strong>
        </LoginLink>
        <GoogleText>O regístrate con Google</GoogleText>
        <GoogleButton type="button">
          <FcGoogle size={20} />
          Continuar con Google
        </GoogleButton>
        <TermsText>
          Al registrarte aceptas nuestros <BoldLink href="/terms">Términos de servicio</BoldLink> y la{' '}
          <BoldLink href="/privacy">Política de privacidad</BoldLink>
        </TermsText>
      </Form>
    </RegisterContainer>
  );
};

export default Register1;