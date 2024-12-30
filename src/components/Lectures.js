import React, { useState, useEffect } from 'react';
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
import { fetchLectures } from '../services/api';

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const loadLectures = async () => {
      try {
        setLoading(true);
        const data = await fetchLectures();
        console.log('Lectures data:', data); // Debug log
        if (data && Array.isArray(data.results)) {
          setLectures(data.results);
        } else if (Array.isArray(data)) {
          setLectures(data);
        } else {
          setLectures([]);
        }
        setError(null);
      } catch (err) {
        setError('Não foi possível carregar as palestras. Por favor, tente novamente mais tarde.');
        console.error('Error loading lectures:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLectures();
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

  if (lectures.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">Nenhuma palestra encontrada.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Palestras
      </Typography>

      <Grid container spacing={4}>
        {lectures.map((lecture) => (
          <Grid item key={lecture.id} xs={12} sm={6} md={4}>
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
              {lecture.imagem && (
                <CardMedia
                  component="img"
                  height="200"
                  image={lecture.imagem}
                  alt={lecture.titulo || lecture.nome}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {lecture.titulo || lecture.nome}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Palestrante: {lecture.palestrante || lecture.speaker}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Data: {formatDate(lecture.data || lecture.date)}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Horário: {lecture.hora_inicio ? 
                    new Date(`2000-01-01T${lecture.hora_inicio}`).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    }) : lecture.horario || 'Horário não definido'}
                  {lecture.hora_fim && ` - ${new Date(`2000-01-01T${lecture.hora_fim}`).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}`}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Local: {lecture.local || lecture.location || 'Local não definido'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {lecture.descricao || lecture.description}
                </Typography>
              </CardContent>
              {(lecture.vagas_disponiveis !== undefined || lecture.vagas !== undefined) && (
                <Box sx={{ px: 2, pb: 1 }}>
                  <Typography variant="subtitle2" color={(lecture.vagas_disponiveis || lecture.vagas) > 0 ? 'success.main' : 'error.main'}>
                    {(lecture.vagas_disponiveis || lecture.vagas) > 0 
                      ? `Vagas disponíveis: ${lecture.vagas_disponiveis || lecture.vagas}`
                      : 'Vagas esgotadas'}
                  </Typography>
                </Box>
              )}
              <CardActions>
                <Button
                  size="small"
                  disabled={(lecture.vagas_disponiveis || lecture.vagas) === 0}
                  sx={{ ml: 1, mb: 1 }}
                >
                  {(lecture.vagas_disponiveis || lecture.vagas) > 0 ? 'Inscrever-se' : 'Lista de Espera'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Lectures;
