import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register1 from './components/Register1';
import Register2 from './components/Register2';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/hero';
import CreateGallery from './components/CreateGallery';
import AddImages from './components/AddImages';
import GalleryPresentation from './components/GalleryPresentation';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import UserProfile from './components/UserProfile';
import WatermarkUpload from './components/WatermarkUpload';
import styled from 'styled-components';
import './App.css';

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
          <Route exact path="/" element={!!sessionStorage.getItem('token') ? (<Navigate to="/hero" />) : (<Navigate to="/login" />)} />
          <Route path="/login" element={<PublicRoute element={Login} />} />
          <Route path="/register1" element={<Register1 />} />
          <Route path="/register2" element={<Register2 />} />
          <Route path="/createGallery" element={<CreateGallery />} />
          <Route path="/hero" element={<PrivateRoute element={Hero} />} />
          <Route path="/perfil" element={<PrivateRoute element={UserProfile} />} />
          <Route path="/watermarks" element={<PrivateRoute element={WatermarkUpload} />} />
          <Route path="/addImages/:galleryId" element={<PrivateRoute element={AddImages} />} />
          <Route path="/presentacion/:galleryId" element={<PrivateRoute element={GalleryPresentation} />} /> 
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