import { useNavigate, useLocation, useParams } from 'react-router-dom';  // Import useParams
import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import LockIcon from '@mui/icons-material/Lock';
import NavBar from 'scenes/homePage/Navbar';

const OTPVerification = () => {
  const navigate = useNavigate();
  const params = useParams();  // Use useParams to get URL parameters
  const [formData, setFormData] = useState({
    email: params.email || '',  // Use email from URL params
    enteredOTP: '',
  });
  const [verificationMessage, setVerificationMessage] = useState('');

  // Function to handle changes in form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle OTP verification submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the server to confirm OTP
      const response = await axios.post(`http://localhost:3001/auth/confirm-otp/${formData.email}`, formData);

      if (response.status === 200) {
        setVerificationMessage('OTP verified successfully.');

        // Redirect to login page after successful OTP verification
        navigate('/login');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setVerificationMessage('Invalid or expired OTP. Please try again.');
    }
  };

  return (
    <Grid>
      <NavBar />

    {/* Main content of OTP verification */}
    <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={0} style={{ padding: '20px' }}>
        <Grid container justifyContent="center" alignItems="center" direction="column" spacing={1}>
              <Grid item>
                <LockIcon fontSize="medium" style={{ backgroundColor: '#1976D2', color: '#fff', padding: '10px', borderRadius: '50%' }} />
              </Grid>
              <Grid item>
                <Typography variant="h5" textAlign="center" fontWeight="700" color="#1976d2">
                    OTP Verification
                </Typography>
              </Grid>
            </Grid>

          {/* Instructional message for OTP sent to email */}
          <Typography>OTP has been sent to your email. Please check your mail.</Typography>

          {/* Display verification message if any */}
          {verificationMessage && <Typography color="success">{verificationMessage}</Typography>}

          {/* Form for OTP entry and submission */}
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="OTP" name="enteredOTP" onChange={handleChange} margin="normal" required />
            {/* Use the correct field name here */}
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
              Verify OTP
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
    </Grid>
  );
};

export default OTPVerification;
