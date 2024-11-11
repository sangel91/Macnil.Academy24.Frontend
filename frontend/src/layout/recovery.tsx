import { Container, Grid, Paper, TextField } from '@mui/material';
import logo from '../academy_macnil_logo.png';
import './recovery.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function RecoveryContent() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Funzione che invia la richiesta al backend
    const codePage = async () => {
        try {
          // Costruisci l'URL con l'email come query parameter
          const url = `http://localhost:8090/api/v1/request?email=${encodeURIComponent(email)}`;
      
          // Invia la richiesta POST
          const response = await fetch(url, {
            method: 'POST',  // POST per mantenere la semantica corretta, ma i parametri sono passati nell'URL
            headers: {
              'Content-Type': 'application/json',  // Header per inviare JSON
            },
          });
      
          const responseText = await response.text();  // Risultato come stringa
      
          if (response.ok) {
            // Se il codice di recupero è stato inviato, naviga alla CodePage passando l'email
            navigate('/codepage', { state: { email } });
          } else {
            setError(responseText || 'An error occurred. Please try again later.');
          }
        } catch (err) {
          console.error('Errore nella richiesta:', err);
          setError('An error occurred. Please try again later.');
        }
        
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={3} lg={6}>
                    <img src={logo} className="academy-logo" alt="Academy Logo" />
                    <Paper sx={{ p: 3, flexDirection: 'column', width: 552 }}>
                        <h3>Continue with Email</h3>
                        <TextField
                            value={email}
                            label="Email address"
                            type="email"
                            fullWidth sx={{ mb: 1 }}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <p>
                            By continuing, you agree that we create an account for you
                            (unless already created), and accept our
                            <a href=""> Terms and Conditions </a>
                            and
                            <a href=""> Privacy Policy </a>.
                        </p>
                        <Grid item xs={3}>
                            <button className="btn btn-primary my-3 w-100" type="submit" onClick={codePage}>
                                CONTINUE
                            </button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default RecoveryContent;