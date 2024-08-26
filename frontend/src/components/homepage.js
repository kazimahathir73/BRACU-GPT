import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="container">
      <h1>Welcome to the BRACU Chatbot</h1>
      <p>Please login or signup to start chatting.</p>
      <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
    </div>
  );
}

export default Homepage;


