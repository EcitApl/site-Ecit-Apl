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

// Sample lecture data
const sampleLectures = [
  {
    id: 1,
    titulo: "Tecnologias Educacionais Modernas",
    palestrante: "Dra. Maria Silva",
    data: "2025-04-15",
    hora_inicio: "14:00",
    hora_fim: "16:00",
    local: "Auditório Principal",
    descricao: "Uma exploração das mais recentes tecnologias e métodos pedagógicos que estão revolucionando a educação. Discutiremos ferramentas digitais, aprendizado híbrido e personalização do ensino.",
    imagem: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    vagas_disponiveis: 50
  },
  {
    id: 2,
    titulo: "Inclusão na Educação: Desafios e Soluções",
    palestrante: "Prof. João Santos",
    data: "2025-04-20",
    hora_inicio: "09:00",
    hora_fim: "11:30",
    local: "Sala de Conferências",
    descricao: "Palestra focada em estratégias práticas para promover a inclusão em sala de aula, abordando diferentes necessidades de aprendizagem e adaptações curriculares.",
    imagem: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
    vagas_disponiveis: 35
  },
  {
    id: 3,
    titulo: "Avaliação por Competências",
    palestrante: "Me. Ana Oliveira",
    data: "2025-05-10",
    hora_inicio: "15:00",
    hora_fim: "17:00",
    local: "Auditório 2",
    descricao: "Como implementar um sistema de avaliação baseado em competências, alinhado com as diretrizes da BNCC e as demandas do século XXI.",
    imagem: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
    vagas_disponiveis: 40
  },
  {
    id: 4,
    titulo: "Saúde Mental na Escola",
    palestrante: "Dr. Carlos Mendes",
    data: "2025-05-25",
    hora_inicio: "13:30",
    hora_fim: "15:30",
    local: "Auditório Principal",
    descricao: "Discussão sobre o papel da escola na promoção da saúde mental dos alunos, identificação de sinais de alerta e estratégias de apoio.",
    imagem: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
    vagas_disponiveis: 60
  }
];

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
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
    // Simulating API call with sample data
    const loadLectures = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLectures(sampleLectures);
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
        Palestras e Eventos Educacionais
      </Typography>
      
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Participe de nossas palestras e mantenha-se atualizado com as últimas tendências em educação
      </Typography>

      <Grid container spacing={4}>
        {lectures.map((lecture) => (
          <Grid item key={lecture.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
            >
              {lecture.imagem && (
                <CardMedia
                  component="img"
                  height="200"
                  image={lecture.imagem}
                  alt={lecture.titulo}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {lecture.titulo}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {lecture.palestrante}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Data:</strong> {formatDate(lecture.data)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Horário:</strong> {lecture.hora_inicio} - {lecture.hora_fim}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Local:</strong> {lecture.local}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {lecture.descricao}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                <Typography variant="subtitle2" color={lecture.vagas_disponiveis > 0 ? 'success.main' : 'error.main'} gutterBottom>
                  {lecture.vagas_disponiveis > 0 
                    ? `${lecture.vagas_disponiveis} vagas disponíveis`
                    : 'Vagas esgotadas'}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={lecture.vagas_disponiveis === 0}
                >
                  {lecture.vagas_disponiveis > 0 ? 'Inscrever-se' : 'Lista de Espera'}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Lectures;