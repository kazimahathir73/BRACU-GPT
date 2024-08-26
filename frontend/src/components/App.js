import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './homepage';
import Login from './login';
import Signup from './signup';
import Chats from './chats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </Router>
  );
}

export default App;
