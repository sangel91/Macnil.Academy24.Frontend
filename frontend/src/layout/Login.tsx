
/////////////////// ALLINEAMENTO AL BACKEND (carmela) versione da usare //////////////

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface User {
  email: string;
  password: string;
  token: string;
  role: "USER" | "ADMIN";
}

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Effettua il controllo se l'utente è già loggato
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const storedRole = localStorage.getItem("role");
      if (storedRole === "ADMIN") {
        navigate("/users"); // Se l'utente è admin, naviga alla pagina /users
      } else if (storedRole === "USER") {
        navigate("/home"); // Altrimenti, naviga alla pagina /home
      }
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8090/api/auth/login", {
      //const response = await fetch("./utenti.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_email: email, user_password: password }), // Modificato i nomi delle proprietà
      });

      if (response.ok) {
        const data: User = await response.json();

        // Salva il token e il ruolo nel localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        onLogin(); // Aggiorna lo stato di autenticazione globale

        // Navigazione in base al ruolo
        if (data.role === "ADMIN") {
          navigate("/users"); // Naviga alla pagina admin se l'utente è admin
        } else {
          navigate("/home"); // Altrimenti, naviga alla pagina home
        }
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <img src="./macnil_logo.png" alt="macnil logo" />
            <h1 className="mb-5 mt-3">Login into Macnil Academy</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center my-4">
          <div className="col-12 col-md-6">
            <h3 className="test">Login</h3>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
              <div>
                <input
                  className="my-2 w-100"
                  placeholder="Enter email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Enter Password"
                  className="inputPassword mb-3 w-100"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary my-3 w-100" type="submit">
                Login
              </button>
            </form>

            <button
              className="forgot-pass my-2 btn"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

///////////////// test con json locale ////////////////

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// interface User {
//   email: string;
//   password: string;
//   token: string;
//   role: "USER" | "ADMIN";
// }

// interface LoginProps {
//   onLogin: () => void;
// }

// const Login: React.FC<LoginProps> = ({ onLogin }) => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const navigate = useNavigate();

//   // Effettua il controllo se l'utente è già loggato
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const storedRole = localStorage.getItem("role");
//       if (storedRole === "ADMIN") {
//         navigate("/users"); // Se l'utente è admin, naviga alla pagina /users
//       } else if (storedRole === "USER") {
//         navigate("/home"); // Altrimenti, naviga alla pagina /home
//       }
//     }
//   }, [navigate]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       // Carica il file utenti.json
//       const response = await fetch("/utenti.json");
//       if (!response.ok) {
//         throw new Error("Failed to load users data");
//       }

//       const users: User[] = await response.json();

//       // Trova l'utente che corrisponde all'email e alla password
//       const user = users.find((user) => user.email === email && user.password === password);

//       if (user) {
//         // Salva il token e il ruolo nel localStorage
//         localStorage.setItem("token", user.token);
//         localStorage.setItem("role", user.role);

//         onLogin(); // Aggiorna lo stato di autenticazione globale

//         // Navigazione in base al ruolo
//         if (user.role === "ADMIN") {
//           navigate("/users"); // Naviga alla pagina admin se l'utente è admin
//         } else {
//           navigate("/home"); // Altrimenti, naviga alla pagina home
//         }
//       } else {
//         setError("Invalid email or password.");
//       }
//     } catch (error) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-12 col-md-6">
//             <img src="./macnil_logo.png" alt="macnil logo" />
//             <h1 className="mb-5 mt-3">Login into Macnil Academy</h1>
//           </div>
//         </div>
//       </div>

//       <div className="container">
//         <div className="row justify-content-center my-4">
//           <div className="col-12 col-md-6">
//             <h3 className="test">Login</h3>
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={handleLogin}>
//               <div>
//                 <input
//                   className="my-2 w-100"
//                   placeholder="Enter email"
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <input
//                   placeholder="Enter Password"
//                   className="inputPassword mb-3 w-100"
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <button className="btn btn-primary my-3 w-100" type="submit">
//                 Login
//               </button>
//             </form>

//             <button
//               className="forgot-pass my-2 btn"
//               onClick={() => navigate("/forgot-password")}
//             >
//               Forgot Password?
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
