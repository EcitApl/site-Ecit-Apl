import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import juninaImg from '../assets/junina.jpg';

const eventsData = [
  {
    id: 1,
    titulo: 'Feira de Ciências',
    data: '2025-03-15',
    hora_inicio: '09:00',
    hora_fim: '17:00',
    local: 'Ginásio da Escola',
    descricao: 'Venha participar da nossa feira de ciências anual! Alunos apresentarão projetos inovadores em diversas áreas do conhecimento.',
    imagem: 'https://source.unsplash.com/800x600/?science,fair'
  },
  {
    id: 2,
    titulo: 'Festa Junina',
    data: '2025-06-20',
    hora_inicio: '18:00',
    hora_fim: '22:00',
    local: 'Pátio da Escola',
    descricao: 'Nossa tradicional festa junina com comidas típicas, música, dança e muita diversão para toda a família!',
    imagem: juninaImg
  },
  {
    id: 3,
    titulo: 'Olimpíada de Informática',
    data: '2025-04-15',
    hora_inicio: '14:00',
    hora_fim: '17:00',
    local: 'Salas de Aula',
    descricao: 'Competição matemática para estimular o raciocínio lógico e premiar os melhores alunos.',
    imagem: 'https://source.unsplash.com/800x600/?mathematics,education'
  }
];

const Events = () => {
  const navigate = useNavigate();

  // Helper function to format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString + 'T00:00:00');
      if (isNaN(date.getTime())) {
        const parts = dateString.split('-');
        if (parts.length === 3) {
          return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return 'Data inválida';
      }
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Data inválida';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Eventos da Escola
      </Typography>

      <Grid container spacing={4}>
        {eventsData.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              {event.imagem && (
                <CardMedia
                  component="img"
                  height="200"
                  image={event.imagem}
                  alt={event.titulo}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {event.titulo}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Data: {formatDate(event.data)}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Horário: {event.hora_inicio ? 
                    new Date(`2000-01-01T${event.hora_inicio}`).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    }) : 'Horário não definido'}
                  {event.hora_fim && ` - ${new Date(`2000-01-01T${event.hora_fim}`).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}`}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Local: {event.local || 'Local não definido'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {event.descricao}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  onClick={() => navigate(`/events/${event.id}`)}
                  sx={{ ml: 1, mb: 1 }}
                >
                  Saiba Mais
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Events;
