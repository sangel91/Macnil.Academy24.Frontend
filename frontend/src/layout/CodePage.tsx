import { Container, Grid, Paper, TextField, Button } from '@mui/material';
import logo from '../academy_macnil_logo.png';
import './CodePage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export function CodePage() {
  const location = useLocation();
  const email = location.state?.email;  // Ottieni l'email passata da RecoveryContent
  const navigate = useNavigate();
  const [code, setCode] = useState<string>('');  // Codice inserito dall'utente
  const [error, setError] = useState<string>(''); // Messaggio di errore
  const [loading, setLoading] = useState<boolean>(false);  // Stato di caricamento

  // Funzione per verificare il codice
  const verifyCode = async () => {
    setLoading(true);  // Imposta il loading
    setError('');  // Resetta l'errore

    if (!code) {
      setError('Please enter the recovery code.');
      setLoading(false);
      return;
    }

    try {
      // URL per la verifica del codice
      const url = `http://localhost:8090/api/v1/login-with-recovery-code?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`;

      // Effettua la richiesta POST
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseText = await response.text();  // Leggi la risposta come stringa

      if (response.ok) {
        // Se la risposta è positiva, reindirizza alla pagina di login
        navigate('/Login');  // Reindirizza alla pagina di login
      } else {
        // Se la risposta è negativa, mostra un messaggio di errore
        setError(responseText || 'Invalid or expired recovery code');
      }
    } catch (err) {
      console.error('Errore nella richiesta:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);  // Termina il loading
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={3} lg={6}>
          <img src={logo} className="academy-logo" alt="Academy Logo" />
          <Paper sx={{ p: 3, flexDirection: 'column', width: 552 }}>
            <h3>Enter Recovery Code</h3>
            <TextField
              value={code}
              label="Recovery Code"
              type="text"
              fullWidth
              sx={{ mb: 1 }}
              onChange={(e) => setCode(e.target.value)} // Aggiorna il codice inserito
              required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostra errore se presente */}
            <p>
              By continuing, you agree that we verify the code sent to your email and proceed with your request.
            </p>
            <Grid item xs={3}>
              <Button
                className="btn btn-primary my-3 w-100"
                type="submit"
                onClick={verifyCode}
                disabled={loading}
                fullWidth
              >
                {loading ? 'Verifying...' : 'VERIFY CODE'}
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CodePage;
