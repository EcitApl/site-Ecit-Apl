import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Contact = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        pt: 4,
        pb: 8
      }}
    >
    <Container maxWidth="lg" sx={{ backgroundColor: '#1a237e', color: 'white', py: 4, borderRadius: 2, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 4, color: 'white' }}>
        Contato
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', backgroundColor: '#283593', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                Informações de Contato
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 2, color: '#90caf9' }} />
                <Typography color="white">
                  R. Luiz Ferreira de Melo<br />
                  Centro<br />
                  Solânea - PB
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, color: '#90caf9' }} />
                <Typography color="white">
                  (83) 3531-3908
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: '#90caf9' }} />
                <Typography color="white">
                  contato@ecitapl.com.br
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ mr: 2, color: '#90caf9' }} />
                <Typography color="white">
                  Segunda a Sexta: 7:30h às 17h
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', backgroundColor: '#283593' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Nossa Localização
            </Typography>
            <Box sx={{ width: '100%', height: { xs: '250px', sm: '300px' }, position: 'relative' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0501754573844!2d-38.561102!3d-6.888463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7af1d0aa6ad3c8d%3A0x1f8c62403b9d9c1!2sR.%20Luiz%20Ferreira%20de%20Melo%20-%20Centro%2C%20Sol%C3%A2nea%20-%20PB%2C%2058225-000!5e0!3m2!1spt-BR!2sbr!4v1703031900000!5m2!1spt-BR!2sbr"
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};

export default Contact;
