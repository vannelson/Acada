import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem('auth'));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to={isLoggedIn ? "/projects" : "/login"} />} />

        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Navigate to="/projects" />
            )
          }
        />

        <Route
          path="/projects"
          element={isLoggedIn ? <ProjectList /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
