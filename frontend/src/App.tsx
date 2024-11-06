// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
// import { DashboardContent } from "./layout/Dashboard";
// import LoginPage from './layout/Login';
// import { useState } from "react";
// // import HomePage from './layout/Home';
// function App() {

//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   const loginDone = () => {
//     console.log("Successfully logged in.");
//     setIsAuthenticated(true);
//   };
//   const logoutDone = () => {
//     console.log("Successfully logged out.");
//     setIsAuthenticated(false);
//   };

//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           {/* <Route path="/*" element={<DashboardContent />} /> */}
//           <Route path="/" element={<LoginPage />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './layout/Login'; 
import Home from './layout/Home'; 

const App: React.FC = () => {
  // Stato per gestire l'autenticazione
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Funzione di callback per gestire il login
  const loginDone = () => {
    console.log('Successfully logged in.');
    setIsAuthenticated(true);
  };

  // Funzione di callback per gestire il logout
  const logoutDone = () => {
    console.log('Successfully logged out.');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Se l'utente non è autenticato, mostra la pagina di login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login onLogin={loginDone} /> // Passa la funzione loginDone come prop
            )
          }
        />
        {/* Mostra la home page solo se l'utente è autenticato */}
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;

