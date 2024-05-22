import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register1 from './components/Register1';
import Register2 from './components/Register2';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/hero';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import './App.css';

function App() {
  const location = useLocation();
  const excludedPaths = ['/login', '/register1', '/register2'];

  return (
    <div>
      {!excludedPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route exact path="/" element={!!sessionStorage.getItem('token') ? (<Navigate to="/hero" />) : (<Navigate to="/login" />)} />
        <Route path="/login" element={<PublicRoute element={Login} />} />
        <Route path="/register1" element={<Register1 />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/hero" element={<PrivateRoute element={Hero} />} />
      </Routes>
      {!excludedPaths.includes(location.pathname) && <Footer />}
    </div>
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
