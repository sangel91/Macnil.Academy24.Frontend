import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface User {
  email: string;
  password: string;
  isAdmin: boolean;
}

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se l'utente è già loggato
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      if (user.isAdmin) {
        navigate("/users"); // Se l'utente è un admin, naviga alla pagina /users
      } else {
        navigate("/home"); // Altrimenti, naviga alla pagina /home
      }
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //// prod con api da BE Carmela
      //const response = await fetch("http://localhost:8090/api/auth/login");

      // da test
      const response = await fetch("/utenti.json");
      const users: User[] = await response.json();

      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        // Salva l'utente e lo stato isAdmin in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        onLogin(); // Funzione che puoi usare per gestire lo stato globale di login

        if (user.isAdmin) {
          navigate("/home"); // Naviga alla pagina /users se l'utente è un admin
        } else {
          navigate("/home"); // Naviga alla pagina home per utenti non-admin
        }
      } else {
        setError("Invalid email or password");
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

            <button className="forgot-pass my-2 btn" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;



