import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // React Router v6 hook

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup/', { email, password });
      alert(response.data.message);
      if (response.data.message === 'Signup successful') {
        localStorage.setItem('user_id', response.data.user_id);
        navigate('/login');  // Redirect to login page after successful signup
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;