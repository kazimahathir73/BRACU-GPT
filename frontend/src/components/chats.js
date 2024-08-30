import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Typography, Paper, IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path d="M2 21L23 12 2 3v7l15 2-15 2z" />
  </svg>
);

function Chats() {
  const [chats, setChats] = useState([]);
  const [question, setQuestion] = useState('');
  const userId = localStorage.getItem('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8000/api/chats/${userId}/`)
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
      axios.post('http://localhost:8000/api/chat/', { user_id: userId, chat_question: question })
        .then(response => {
          setChats([...chats, response.data]);
          setQuestion('');
        })
        .catch(error => {
          console.error('There was an error sending the message!', error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <Box sx={{ height: '97vh', display: 'flex', flexDirection: 'column' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: 2,
          maxWidth: 750,
          mx: 'auto', 
          mt: 4 
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Chat
        </Typography>

        <Box 
          sx={{ 
            position: 'absolute', 
            top: 20, 
            right: 20, 
            zIndex: 10 
          }}
        >
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleLogout}
            sx={{
              '&:hover': {
                backgroundColor: '#2058cf',
                color: 'white'
              },
            }}
          >
            logout
          </Button>
        </Box>
        
      </Box>

      <Box               // total chat box (user and bot)
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto',
          maxWidth: 750,
          mx: 'auto', 
          mt: 4 
        }}>
        
        <Box              // user part box 
          sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end'}}>
          {chats.map((chat, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'top',
                maxWidth: '60%',
                justifyContent: 'flex-end'
              }}
            >
              <Paper 
                sx={{ 
                  p: 1, 
                  my: 1, 
                  backgroundColor: "#efefef",
                  color: 'black',
                  maxWidth: '100%',
                }}
              >
                <Typography align="right">
                  {chat.chat_question}
                </Typography>
              </Paper>
              <Box sx={{ ml: 2 }}>
                <img 
                  src="/images/user_logo.jpg" 
                  alt="User Logo" 
                  style={{ 
                    height: '30px', 
                    width: '30px', 
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} 
                />
              </Box>
            </Box>
          ))}
        </Box>

        <Box            // bot part box 
          sx={{ mb: 2, display: 'flex', justifyContent: 'left' }}>
          {chats.map((chat, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex',
                alignItems: 'top',
                maxWidth: '60%',
              }}
            >
              <Box sx={{ mr: 2 }}>
                <img 
                  src="/images/bracu_logo.png"
                  alt="Bot Logo" 
                  style={{
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }} 
                />
              </Box>
              <Paper 
                sx={{ 
                  p: 2,
                  my: 1,
                  backgroundColor: '#245be2',
                  color: 'white',
                  alignSelf: 'flex-start',
                  maxWidth: '100%',
                }}
              >
                <Typography align="left">
                  {chat.chat_response}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>

      <Box          // text input box 
        component="form" onSubmit={handleSend}
        sx={{ 
          display: 'flex', 
          padding: 2, 
          maxWidth: 2000,
          justifyContent: 'center',
          }}>
        <TextField 
          fullWidth
          variant="outlined"
          placeholder="Ask a question..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          required 
          sx={{ 
            width: '50%',
            '& .MuiOutlinedInput-root': {
              padding: '20px 20px', 
            }
          }}
          InputProps={{
            sx: { 
              height: '50px'
            }
          }}
        />

        <IconButton 
          type="submit"
          color="primary"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Chats;