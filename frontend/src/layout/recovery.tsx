import { Container, Grid, Paper, TextField, Button} from '@mui/material';
import logo from '../academy_macnil_logo.png';
import './recovery.css';
import { useNavigate } from 'react-router-dom';
import { DashboardContent } from './Dashboard';

export function RecoveryContent() {

        const navigate = useNavigate();
        const codePage = () => {
            
            navigate({});
        };

    return (
        <Container sx={{ mt:4, mb: 4 }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={3} lg={6}>
                    <img src={logo} className="academy-logo" alt="Academy Logo" />
                    <Paper sx={{ p: 3, flexDirection: 'column', width:552}}>
                        <h3>Continue with Email</h3>
                        <TextField  label="Email address"  type="email"   fullWidth sx={{ mb: 1 }}/>
                        <p>
                            By continuing, you agree that we create an account for you 
                            (unless already created), and accept our 
                            <a href="" > Terms and Conditions </a> 
                            and 
                            <a href=""> Privacy Policy </a>.
                        </p>
                        <Grid item xs={3}>
                            <Button onClick={codePage}> 
                                CONTINUE
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
