import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
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

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  padding: 10px 10px 10px 10px;
`;

const Icon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
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

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0px;
  position: relative; /* Añadido para posicionar el logo */
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 400;  
  position: absolute; /* Posiciona el logo de forma absoluta */
  top: 20px; /* Ajusta la distancia desde la parte superior */
  left: 20px; /* Ajusta la distancia desde la parte izquierda */
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

const Register2 = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setLoading(true); // Inicia el estado de carga
  
    try {
      const token = sessionStorage.getItem('emailToken');
  
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register2`, {
        Password: password,
        ConfirmPassword: confirmPassword,
        Token: token,
      });
      if (response.status === 200) {
        sessionStorage.setItem('token', response.data.token);
        window.location.href = '/hero';
      }
    } catch (error) {
      console.error('Error submitting form:', error.response.data);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('emailToken');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/register2`, {
        params: { token },
      });
      setEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <RegisterContainer>
      <Logo to="/hero">PicToFlow</Logo>
      <Title>Termina de Configurar Tú Cuenta</Title>
      <Subtitle>Completa el Registro</Subtitle>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input type="email" placeholder="email@domain.com" value={email} readOnly />
        </InputGroup>
        <InputGroup>
          <Input type={passwordShown ? 'text' : 'password'} placeholder="Introduce tu contraseña" value={password} onChange={handlePasswordChange} />
          <Icon onClick={togglePasswordVisibility}>
            <IconContext.Provider value={{ size: '20px' }}>
              {passwordShown ? <FiEyeOff /> : <FiEye />}
            </IconContext.Provider>
          </Icon>
        </InputGroup>
        <InputGroup>
          <Input type={confirmPasswordShown ? 'text' : 'password'} placeholder="Confirma tu contraseña" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          <Icon onClick={toggleConfirmPasswordVisibility}>
            <IconContext.Provider value={{ size: '20px' }}>
              {confirmPasswordShown ? <FiEyeOff /> : <FiEye />}
            </IconContext.Provider>
          </Icon>
        </InputGroup>
        <Button type="submit" disabled={loading}>
          {loading ? <Throbber /> : 'Crea Tú Cuenta'}
        </Button>
      </Form>
    </RegisterContainer>
  );
};

export default Register2;
