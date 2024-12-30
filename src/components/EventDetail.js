import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { fetchEventById } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        const data = await fetchEventById(id);
        setEvent(data);
        setError(null);
      } catch (err) {
        setError('Não foi possível carregar os detalhes do evento. Por favor, tente novamente mais tarde.');
        console.error('Error loading event:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

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
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => navigate('/events')}>
            Voltar para Eventos
          </Button>
        </Box>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">Evento não encontrado.</Alert>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => navigate('/events')}>
            Voltar para Eventos
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        {event.imagem && (
          <CardMedia
            component="img"
            height="300"
            image={event.imagem}
            alt={event.titulo}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {event.titulo}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Data: {new Date(event.data).toLocaleDateString('pt-BR')}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Horário: {event.horario}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Local: {event.local}
          </Typography>
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            {event.descricao}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => navigate('/events')} sx={{ mr: 2 }}>
          Voltar para Eventos
        </Button>
      </Box>
    </Container>
  );
};

export default EventDetail;
