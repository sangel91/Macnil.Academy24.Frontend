

// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./layout/Login";
// import Home from "./layout/Home";
// import News from "./layout/News";
// import Users from "./layout/Users";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";

// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [isAdmin, setIsAdmin] = useState<boolean>(false);

//   // Funzione per il login completato
//   const loginDone = () => {
//     console.log("Successfully logged in.");
//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     setIsAuthenticated(true);
//     setIsAdmin(user.isAdmin); // Imposta se l'utente è admin
//   };

//   // Funzione per il logout
//   const logoutDone = () => {
//     console.log("Successfully logged out.");
//     localStorage.removeItem("user"); // Rimuove l'utente dal localStorage
//     setIsAuthenticated(false);
//     setIsAdmin(false);
//   };

//   // Effettua il controllo dell'autenticazione e se l'utente è admin al primo render
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setIsAuthenticated(true);
//       setIsAdmin(parsedUser.isAdmin);  // Imposta se l'utente è admin
//     }
//   }, []);

  
//   useEffect(() => {
//     if (isAdmin === true) {
     
//       <Navigate to="/users" replace />
//     } else {
//       <Navigate to="/" replace />
//     }
//   }, [isAuthenticated, isAdmin]);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Rotta per News */}
//         <Route path="/news" element={<News />} />

//         {/* rotta home (dopo login) */}
//         <Route
//           path="/home"
//           element={
//             isAuthenticated ? (
//               <Home onLogout={logoutDone} />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />

//         {/* Rotta per Users (solo per Admin) */}
//         <Route
//           path="/users"
//           element={
//             isAuthenticated && isAdmin ? (
//               <Users />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />

//         {/* Rotta per il login */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/home" replace />
//             ) : (
//               <Login onLogin={loginDone} />
//             )
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

//////////////////////// allineamento al backend

//import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./layout/Login";
// import Home from "./layout/Home";
// import News from "./layout/News";
// import Users from "./layout/Users";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";

// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [role, setRole] = useState<string>("");

//   // Funzione per il login completato
//   const loginDone = () => {
//     console.log("Successfully logged in.");
//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     setIsAuthenticated(true);
//     setRole(user.role); // Imposta il ruolo dell'utente
//   };

//   // Funzione per il logout
//   const logoutDone = () => {
//     console.log("Successfully logged out.");
//     localStorage.removeItem("user"); // Rimuove l'utente dal localStorage
//     setIsAuthenticated(false);
//     setRole(""); // Reset del ruolo
//   };

//   // Effettua il controllo dell'autenticazione e del ruolo dell'utente al primo render
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setIsAuthenticated(true);
//       setRole(parsedUser.role); // Imposta il ruolo dell'utente
//     }
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Rotta per News */}
//         <Route path="/news" element={<News />} />

//         {/* Rotta home (dopo login) */}
//         <Route
//           path="/home"
//           element={
//             isAuthenticated ? (
//               <Home onLogout={logoutDone} />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />

//         {/* Rotta per Users (solo per Admin) */}
//         <Route
//           path="/users"
//           element={
//             isAuthenticated && role === "ADMIN" ? (  // Controllo del ruolo
//               <Users />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />

//         {/* Rotta per il login */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/home" replace />
//             ) : (
//               <Login onLogin={loginDone} />
//             )
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;



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
        {/* Rotta per News */}
        <Route path="/news" element={<News />} />

        {/* Rotta home (dopo login) */}
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

        {/* Rotta per Users (solo per Admin) */}
        <Route
          path="/users"
          element={
            isAuthenticated && role === "ADMIN" ? (  // Controllo del ruolo
              <Users />
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










