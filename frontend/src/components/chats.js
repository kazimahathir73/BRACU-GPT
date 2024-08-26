import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chats() {
  const [chats, setChats] = useState([]);
  const [question, setQuestion] = useState('');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      axios.get(`/api/chats/${userId}/`)
        .then(response => {
          setChats(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the chats!', error);
        });
    }
  }, [userId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (userId) {
      axios.post(`/api/chats/${userId}/`, { chat_question: question })
        .then(response => {
          setChats([...chats, response.data]);
          setQuestion('');
        })
        .catch(error => {
          console.error('There was an error sending the message!', error);
        });
    }
  };

  return (
    <div className="container">
      <h2>Chat</h2>
      <div className="chat-window">
        {chats.map((chat, index) => (
          <div key={index}>
            <p><strong>Q:</strong> {chat.chat_question}</p>
            <p><strong>A:</strong> {chat.chat_response}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input 
          type="text" 
          placeholder="Ask a question..." 
          value={question} 
          onChange={e => setQuestion(e.target.value)} 
          required 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chats;