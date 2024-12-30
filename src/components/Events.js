import React, { useState, useEffect } from 'react';
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
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { fetchEvents } from '../services/api';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format date
  const formatDate = (dateString) => {
    try {
      // Add time to ensure proper parsing
      const date = new Date(dateString + 'T00:00:00');
      if (isNaN(date.getTime())) {
        // If invalid date, try parsing directly
        const parts = dateString.split('-');
        if (parts.length === 3) {
          // If format is YYYY-MM-DD
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

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents();
        console.log('Received events data:', data); // Debug log
        setEvents(data.results || []);
        setError(null);
      } catch (err) {
        setError('Não foi possível carregar os eventos. Por favor, tente novamente mais tarde.');
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (events.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">Nenhum evento encontrado.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Eventos da Escola
      </Typography>

      <Grid container spacing={4}>
        {events.map((event) => {
          console.log('Event date:', event.data); // Debug log for each event's date
          return (
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
          );
        })}
      </Grid>
    </Container>
  );
};

export default Events;
