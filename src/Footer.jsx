import React from 'react';
import { Box, Typography } from '@mui/material';
import CoffeeIcon from '@mui/icons-material/Coffee';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Figtree, sans-serif',
  },
});

const Footer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component='footer'
        sx={{
          borderTop: '2px dashed #323434',
          backgroundColor: '#252a2b',
          padding: '16px 24px',
          textAlign: 'center',
        }}
      >
        <Typography variant='body2' sx={{ color: '#06dbc7' }}>
          © {new Date().getFullYear()} bAd
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: '#06dbc7',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          Made with tears <CoffeeIcon /> using Material-UI.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
