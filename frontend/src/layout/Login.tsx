// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface LoginProps {
//   onLogin: () => void;
// }

// // Una funzione tradizionale per definire il componente
// function Login({ onLogin }: LoginProps) {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('./utenti.json', {
//         // method: 'POST',
//         // headers: { 'Content-Type': 'application/json' },
//         // body: JSON.stringify({ email, password }),
//         // credentials: 'include',
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
        
//       });

//       if (response.ok) {
//         onLogin(); // Chiama la funzione onLogin passata come prop
//         navigate('/home'); // Reindirizza alla home page
//       } else {
//         setError('Invalid email or password');
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="login-page">
//       <h2>Login</h2>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <button
//         onClick={() => navigate('/forgot-password')}
//         className="forgot-password"
//       >
//         Forgot Password?
//       </button>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

// Definizione del tipo per gli utenti
interface User {
  email: string;
  password: string;
}

// Props per il componente Login
interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Leggi il file utenti.json dalla cartella public
      const response = await fetch('/utenti.json');
      const users: User[] = await response.json();

      // Cerca l'utente che ha la stessa email e password
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        onLogin(); 
        navigate('/home'); // Reindirizza alla home page
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page">
        <img src="./macnil_logo.png" alt="ciao" />
      <h2 className='test'>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button
        onClick={() => navigate('/forgot-password')}
        className="forgot-password"
      >
        Forgot Password?
      </button>
    </div>
  );
};

export default Login;
