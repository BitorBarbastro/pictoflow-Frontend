import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Register1 from './components/Register1';
import Register2 from './components/Register2';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import CreateGallery from './components/CreateGallery';
import GalleryPresentation from './components/GalleryPresentation';
import UserProfile from './components/UserProfile';
import WatermarkUpload from './components/WatermarkUpload';
import AdminGalleries from './components/AdminGalleries';
import EditGallery from './components/EditGallery'; // Importa el nuevo componente
import styled from 'styled-components';
import './App.css'; 
import ImageUploader from './components/ImageUploader';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

function App() {
  const location = useLocation();
  const excludedPaths = ['/login', '/register1', '/register2'];

  return (
    <AppContainer>
      {!excludedPaths.includes(location.pathname) && <Header />}
      <Content>
        <Routes>
          <Route exact path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register1" element={<Register1 />} />
          <Route path="/register2" element={<Register2 />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/createGallery" element={<PrivateRoute element={CreateGallery} />} />
          <Route path="/perfil" element={<PrivateRoute element={UserProfile} />} />
          <Route path="/watermarks" element={<PrivateRoute element={WatermarkUpload} />} />
          <Route path="/addImages/:galleryId" element={<PrivateRoute element={ImageUploader} />} />
          <Route path="/presentation/:galleryId" element={<PrivateRoute element={GalleryPresentation} />} />
          <Route path="/adminGalleries" element={<PrivateRoute element={AdminGalleries} />} />
          <Route path="/editGallery/:galleryId" element={<PrivateRoute element={EditGallery} />} />
        </Routes>
      </Content>
      {!excludedPaths.includes(location.pathname) && <Footer />}
    </AppContainer>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
