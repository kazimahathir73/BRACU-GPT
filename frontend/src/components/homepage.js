import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const Container = styled(Box)({
  display: 'flex',
  height: '100vh',
  backgroundColor: '#293089',
  color: '#fff',
  position: 'relative',
});

const LogoContainer = styled(Box)({
  position: 'absolute',
  top: '50px',
  left: '30px',
  display: 'flex',
  alignItems: 'center',
});

const CustomTypography = styled(Typography)({
  fontFamily: '"Apple Color Emoji"', 
  fontSize: '18px',
  fontWeight: 'bold',
});

const LeftSection = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10rem',
  position: 'relative',
});

const RightSection = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#000000',
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  gap: '20px',
});

const StyledButton = styled(Button)({
  width: '150px',
  fontSize: '16px',
  backgroundColor:'#2756ba',
});

const Logo = styled('img')({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  position: 'absolute',
  top: '30px',
  right: '30px',
});

const Line = styled('div')({
  width: '86%',
  height: '0.1px',
  backgroundColor: '#fff',
  boxShadow: '0 5px 6px rgba(0, 0, 0, 1)',
  position: 'absolute',
  top: '80px',
  right: '130px',
});

const Circle = styled('div')({
  width: '14px',
  height: '14px',
  backgroundColor: '#fff',
  borderRadius: '50%',
  position: 'absolute',
  top: '58px',
  left: '160px',
});

const AnimatedText = ({ text, initialDelay = 0, fontSize, fontFamily }) => {
  return (
    <div>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: initialDelay + index * 0.045, duration: 0.01 }}
          style={{ fontSize, fontFamily }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};


function Homepage() {
  return (
    <Container>
      <LeftSection>
        <Logo src={'/images/bracu_logo.png'} alt="Logo" />
        <Line />
        <Circle />
        <LogoContainer>
          <CustomTypography variant="h6">BRACU Helper</CustomTypography>
        </LogoContainer>
        <div style={{ position: 'absolute', top: '300px', left: '50px' }}>
          <AnimatedText
            text="We connect you to BRACU"
            initialDelay={0}
            fontSize="50px"
            fontFamily='"Segoe UI Emoji"'
          />
        </div>
        <div style={{ position: 'absolute', top: '370px', left: '50px' }}>
          <AnimatedText 
            text="Your Personalized Assistant for BRAC University Queries and Information" 
            initialDelay={1}
            fontSize="24px"
            fontFamily='"Segoe UI Symbol"'
          />
        </div>
      </LeftSection>
      <RightSection>
        <Box>
          <Typography variant="h4" color="white" gutterBottom>
            Get started
          </Typography>
          <ButtonContainer>
            <StyledButton variant="contained" color="primary" component={Link} to="/login">
              Log in
            </StyledButton>
            <StyledButton variant="contained" color="primary" component={Link} to="/signup">
              Sign up
            </StyledButton>
          </ButtonContainer>
        </Box>
      </RightSection>
    </Container>
  );
}

export default Homepage;