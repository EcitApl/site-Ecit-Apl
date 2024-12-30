import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  Button,
  Paper,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import logo from './APL.png';

const cards = [
  {
    title: 'Nossa Missão',
    description: 'Formar cidadãos críticos e preparados para os desafios do século XXI, através de uma educação integral e inovadora.',
    icon: <SchoolIcon sx={{ fontSize: 80, color: 'primary.main' }} />,
    link: '/mission'
  },
  {
    title: 'Metodologia',
    description: 'Utilizamos métodos modernos de ensino, combinando tecnologia e práticas pedagógicas comprovadas para um aprendizado efetivo.',
    icon: <AutoStoriesIcon sx={{ fontSize: 80, color: 'primary.main' }} />,
    link: '/methodology'
  },
  {
    title: 'Infraestrutura',
    description: 'Salas de aula modernas, laboratórios equipados e espaços de convivência projetados para proporcionar a melhor experiência de aprendizado.',
    icon: <AccountBalanceIcon sx={{ fontSize: 80, color: 'primary.main' }} />,
    link: '/infrastructure'
  },
];

const advertisements = [
  {
    title: "Matrículas Abertas 2025",
    description: "Garanta já sua vaga para o próximo ano letivo!",
    backgroundColor: "#2196f3",
    color: "white"
  },
  {
    title: "Aprovações em Universidades",
    description: "90% dos nossos alunos aprovados em universidades públicas!",
    backgroundColor: "#4caf50",
    color: "white"
  },
  {
    title: "Escola Integral",
    description: "Educação de qualidade em período integral",
    backgroundColor: "#f44336",
    color: "white"
  }
];

function Home() {
  const navigate = useNavigate();

  return (
    <Container sx={{ px: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: { xs: 2, sm: -2 },
          mb: { xs: 2, sm: 2 }
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="APL Logo"
          sx={{
            width: 'auto',
            height: { xs: '100px', sm: '150px' },
            maxWidth: '90%'
          }}
        />
      </Box>
      <Box sx={{
        width: '100%',
        height: { xs: '250px', sm: '200px' },
        backgroundImage: 'url(/images/header.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        textShadow: 'none',
        borderRadius: '8px',
        p: 2
      }}>
        <Typography 
          variant="h2" 
          component="h1" 
          align="center" 
          sx={{ 
            fontWeight: 'bold',
            mb: 1,
            fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' }
          }}
        >
          Bem-vindo!
        </Typography>
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          sx={{ 
            fontWeight: 'bold',
            mb: 1,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
          }}
        >
          ECIT Alfredo Pessoa de Lima
        </Typography>
        <Typography 
          variant="h5" 
          align="center" 
          sx={{ 
            color: 'text.secondary',
            mb: 0,
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
          }}
        >
          Educação de qualidade para um futuro brilhante
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Carousel
          animation="slide"
          interval={4000}
          indicators={true}
          navButtonsAlwaysVisible={false}
          navButtonsAlwaysInvisible={false}
          sx={{
            '& .MuiPaper-root': {
              p: { xs: 2, sm: 4 }
            }
          }}
        >
          {advertisements.map((item, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                textAlign: 'center',
                backgroundColor: item.backgroundColor,
                color: item.color,
                borderRadius: 2,
              }}
            >
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                }}
              >
                {item.title}
              </Typography>
              <Typography 
                variant="h6"
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
                }}
              >
                {item.description}
              </Typography>
            </Paper>
          ))}
        </Carousel>
      </Box>

      <Grid 
        container 
        spacing={{ xs: 2, sm: 3 }} 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          mb: 4
        }}
      >
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: { xs: 2, sm: 3 }
              }}
            >
              <CardContent sx={{ width: '100%' }}>
                <Box sx={{ mb: 2 }}>
                  {React.cloneElement(card.icon, {
                    sx: { 
                      fontSize: { xs: 60, sm: 80 },
                      color: 'primary.main'
                    }
                  })}
                </Box>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                  }}
                >
                  {card.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: 'auto', pb: 2 }}>
                <Button 
                  size="large" 
                  onClick={() => navigate(card.link)}
                  endIcon={<ArrowForwardIcon />}
                >
                  Saiba mais
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
