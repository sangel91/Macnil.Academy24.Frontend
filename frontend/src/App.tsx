import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./layout/Login";
import Home from "./layout/Home";
import News from "./layout/News";
import Users from "./layout/Users";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  // Funzione per il login completato
  const loginDone = () => {
    console.log("Successfully logged in.");
    const token = localStorage.getItem("token"); // Recupera il token dal localStorage
    const userRole = localStorage.getItem("role"); // Recupera il ruolo dal localStorage
    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole); // Imposta il ruolo dell'utente
    }
  };

  // Funzione per il logout
  const logoutDone = () => {
    console.log("Successfully logged out.");
    localStorage.removeItem("token"); // Rimuove il token dal localStorage
    localStorage.removeItem("role");  // Rimuove il ruolo dal localStorage
    setIsAuthenticated(false);
    setRole(""); // Reset del ruolo
  };

  // Effettua il controllo dell'autenticazione e del ruolo dell'utente al primo render
  useEffect(() => {
    const token = localStorage.getItem("token"); // Controlla se esiste il token
    const userRole = localStorage.getItem("role"); // Recupera il ruolo
    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole); // Imposta il ruolo dell'utente
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
         {/* <Route
          path="/news"
          element={<News onLogout={logoutDone} />} // Passiamo onLogout qui
          />  */}

          {/* Rotta per News */}
<Route
          path="/news"
          element={
            isAuthenticated ? (
              <News onLogout={logoutDone} /> // Passiamo onLogout qui
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Rotta home (dopo login) */}
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home onLogout={logoutDone} /> // Passiamo onLogout qui
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Rotta per Users (solo per Admin) */}
        <Route
          path="/users"
          element={
            isAuthenticated && role === "ADMIN" ? (  // Controllo del ruolo
              <Users onLogout={logoutDone} /> // Passiamo onLogout qui
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;






