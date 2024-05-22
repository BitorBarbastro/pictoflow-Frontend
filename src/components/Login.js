import React, { useState } from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

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
  padding: 40px;
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

const Icon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
`;

const GoogleButton = styled(Button)`
  background-color: #fff;
  color: #757575;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  svg {
    margin-right: 10px;
  }
`;

const RegisterLink = styled.a`
  color: #000;
  text-decoration: none;
  margin-top: 20px;
  cursor: pointer;
  text-align: center;
`;

const TermsText = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  text-align: center;
`;

const BoldLink = styled.a`
  font-weight: bold;
  color: #666;
  text-decoration: none;
`;
const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5046/api/users/login', { email, password });
    if (response.status === 200) {
    console.log('Login successful');
      // Almacenar el token en sessionStorage
      sessionStorage.setItem('token', response.data.token);
      navigate('/hero');
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

  


  return (
    <LoginContainer>
      <Title>Inicia Sesión</Title>
      <Subtitle>Accede con tu correo electrónico</Subtitle>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Input
            type={passwordShown ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Icon onClick={togglePasswordVisibility}>
            <IconContext.Provider value={{ size: '20px' }}>
              {passwordShown ? <FiEyeOff /> : <FiEye />}
            </IconContext.Provider>
          </Icon>
        </InputGroup>

        <Button type="submit">Iniciar Sesión</Button>

        <RegisterLink href="/register1">Puedes crear tu cuenta haciendo <strong>Click Aquí </strong> </RegisterLink>
        <GoogleButton type="button">
          <FcGoogle size={20} />
          Continuar con Google
        </GoogleButton>
        <TermsText>
          Al acceder al sitio aceptas nuestros <BoldLink href="/terms">Términos de servicio</BoldLink> y la{' '}
          <BoldLink href="/privacy">Política de privacidad</BoldLink>
        </TermsText>
      </Form>
    </LoginContainer>
  );
};

export default Login;