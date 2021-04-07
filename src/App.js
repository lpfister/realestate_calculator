import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BuyCaluculatorForm from './BuyCaluculatorForm';


export default function App() {
  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Swiss Online Realestate Investment Calculator
        </Typography>
        <Copyright />
      </Box>
      <Box>
       <BuyCaluculatorForm />
    </Box>
    </Container>
    
   
  );
}


