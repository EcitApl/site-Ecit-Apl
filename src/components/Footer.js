import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a237e',
        color: 'white',
        py: 4,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Localização
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1, mt: 0.5 }} />
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                R. Luiz Ferreira de Melo<br />
                Centro<br />
                Solânea - PB
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Link 
                href="tel:(83) 3531-3908" 
                color="inherit" 
                underline="hover"
                sx={{ '&:hover': { color: 'secondary.light' } }}
              >
                (83) 3531-3908
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Link 
                href="mailto:contato@ecitapl.com.br" 
                color="inherit" 
                underline="hover"
                sx={{ '&:hover': { color: 'secondary.light' } }}
              >
                contato@ecitapl.com.br
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Horário de Funcionamento
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ mr: 1 }} />
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                Segunda a Sexta<br />
                7:30h às 17h
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
        
        <Typography 
          variant="body2" 
          align="center" 
          sx={{ 
            opacity: 0.8,
            fontSize: '0.875rem'
          }}
        >
          {new Date().getFullYear()} Rangel Andrade. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
