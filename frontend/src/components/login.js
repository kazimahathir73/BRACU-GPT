import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(5),
  padding: theme.spacing(3),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const FormBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Message = styled(Typography)(({ theme, success }) => ({
  marginTop: theme.spacing(2),
  color: success ? theme.palette.success.main : theme.palette.error.main,
}));

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { email, password });
      if (response.data.message === 'Login successful') {
        setMessage('Login successful! Redirecting to chats...');
        setIsSuccess(true);
        localStorage.setItem('user_id', response.data.user_id);
        setTimeout(() => {
          navigate('/chats');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.error === 'No email exist.') {
        setMessage('No email exists. Please signup first.');
        setIsSuccess(false);
      } else {
        setMessage('Invalid password. Please try again.');
        setIsSuccess(false);
      }
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <PageTitle component="h1" variant="h5">
        Login
      </PageTitle>
      <FormBox component="form" onSubmit={handleLogin}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {message && (
          <Message variant="body1" success={isSuccess}>
            {message}
            {!isSuccess && message === 'No email exists. Please signup.' && (
              <Typography variant="body2">
                <Link to="/signup">Click here to signup</Link>
              </Typography>
            )}
          </Message>
        )}
        <SubmitButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Login
        </SubmitButton>
      </FormBox>
    </StyledContainer>
  );
}

export default Login;