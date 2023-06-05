import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/authantication/AuthForm';
import HomePage from './components/homePage/HomePage';
import 'bootstrap/dist/css/bootstrap.css';
// import MyForm from "./MyForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
