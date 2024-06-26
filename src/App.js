import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import List from './components/Listing.js';
import Details from './components/Details';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated ? <List /> : <Login onLogin={handleLogin} />} />
          <Route path="/list" element={isAuthenticated ? <List /> : <Login onLogin={handleLogin} />} />
          <Route path="/details/:id" element={isAuthenticated ? <Details /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
