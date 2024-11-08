import { Container, Grid, Paper, TextField} from '@mui/material';
import logo from '../academy_macnil_logo.png';
import './recovery.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


export function RecoveryContent() {
        
        const navigate = useNavigate();
        const [email, setEmail] = useState<string>('');
        const [error, setError] = useState<string>('');
        
        const codePage = async () => {
          try {
            const response = await axios.post('http://localhost:8090/api/v1/forgot-password?', { email });
      
            if (response.data.exists) {
              navigate('/code-page');  
            } else {
              setError('Email not found. Please check and try again.');
            }
          } 
          catch (err) {
            setError('An error occurred. Please try again later.');
          }
        };

    return (
        <Container sx={{ mt:4, mb: 4 }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={3} lg={6}>
                    <img src={logo} className="academy-logo" alt="Academy Logo" />
                    <Paper sx={{ p: 3, flexDirection: 'column', width:552}}>
                        <h3>Continue with Email</h3>
                        <TextField  value={email} label="Email address"  type="email"   fullWidth sx={{ mb: 1 }} onChange={(e) => setEmail(e.target.value)}required/>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <p>
                            By continuing, you agree that we create an account for you 
                            (unless already created), and accept our 
                            <a href="" > Terms and Conditions </a> 
                            and 
                            <a href=""> Privacy Policy </a>.
                        </p>
                        <Grid item xs={3}>
                        <button className='btn btn-primary my-3 w-100' type="submit" onClick={codePage}>CONTINUE</button>
                            {/* <Button className='btn btn-primary my-3 w-100' type="submit" onClick={codePage}> 
                                CONTINUE
                            </Button> */}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}