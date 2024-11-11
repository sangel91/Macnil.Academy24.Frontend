
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CodePage from './layout/CodePage';
import Login from './layout/Login';
import Home from './layout/Home';
import News from './layout/News'; 
import { RecoveryContent } from './layout/recovery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const loginDone = () => {
    console.log('Successfully logged in.');
    setIsAuthenticated(true);
  };

  const logoutDone = () => {
    console.log('Successfully logged out.');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotta per News */}
        <Route path="/news" element={<News />} />

        {/* Rotta per Dashboard (potresti volerla mantenere o rimuovere a seconda delle tue necessità) */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* Rotta per la Home, che è quella che vuoi mostrare dopo il login */}
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home onLogout={logoutDone} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Rotta per il login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={loginDone} />
            )
          }
        />

      {/* Rotta per il forgot-password */}
      <Route path="/forgot-password" element={<RecoveryContent />} />
      
 {/* Rotta per il codice*/}
 <Route
          path="/codepage" element={<CodePage />}
        />

        {/* Rotta per il login*/}
 <Route
          path="/Login" element={<Login onLogin={function (): void {
            throw new Error('Function not implemented.');
          } } />}
        />
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;

