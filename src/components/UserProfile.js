import React, { useState } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 4px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;

  &:hover::before {
    content: 'Click Aquí para cambiar la foto de perfil';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
  }
`;

const ProfileImage = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Field = styled.div`
  margin-bottom: 20px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;


const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  display: block;
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin: 20px auto 0;

  &:hover {
    background-color: #333;
  }
`;



const WatermarkInputLabel = styled.label`
  display: block;
  padding: 8px 16px;
  background-color: black;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px auto 0;
  width: fit-content;
`;

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    description: '',
    urls: ['', '', '']
  });

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    console.log('Archivo subido:', e.target.files[0]);
    // Aquí deberías manejar la subida del archivo al servidor
  };

  const handleWatermarkChange = (e) => {
    console.log('Marca de agua subida:', e.target.files[0]);
    // Aquí deberías manejar la subida de la marca de agua al servidor
  };

  return (
    <Container>
      <Field>
        <p>
          <strong>Estos son los datos a los que los clientes tendrán acceso al visitar tu perfil.</strong>
          <br />
          <em>Rellénalo con datos útiles y atractivos.</em>
        </p>
        <br />
        <ProfileImageContainer>
          <ProfileImage src="path_to_profile_image.jpg" alt="Profile" />
          <HiddenInput type="file" onChange={handleFileChange} />
        </ProfileImageContainer>
      </Field>
      <Field>
        <Label>Nombre</Label>
        <Input type="text" placeholder="Ingresa tu nombre" value={profile.name} onChange={handleInputChange} name="name" />
      </Field>
      <Field>
        <Label>Email</Label>
        <Input type="email" placeholder="Ingresa tu email" value={profile.email} readOnly />
        <Button>Confirmar/Cambiar</Button>
      </Field>
      <Field>
        <Label>Descripción</Label>
        <TextArea placeholder="Escribe una breve descripción sobre ti" value={profile.description} onChange={handleInputChange} name="description" />
      </Field>
      <Field>
        <Label>Marca de agua</Label>
        <em>Al crear una galeria podrás seleccionarla</em>

        <WatermarkInputLabel htmlFor="watermark">Subir marca de agua</WatermarkInputLabel>
        <HiddenInput id="watermark" type="file" onChange={handleWatermarkChange} />
      </Field>
      <p>
        <strong>Aquí puedes dejar enlaces a tus redes sociales, página web y demás contenido de interés.</strong>
      </p>
      {profile.urls.map((url, index) => (
        <Field key={index}>
          <Label>Enlace {index + 1}</Label>
          <Input type="text" value={url} onChange={(e) => {
            let newUrls = [...profile.urls];
            newUrls[index] = e.target.value;
            setProfile({ ...profile, urls: newUrls });
          }} />
        </Field>
      ))}
      <Button>Guardar Cambios</Button>
    </Container>
  );
};

export default UserProfile;


