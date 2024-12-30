import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import CloseIcon from '@mui/icons-material/Close';
import { fetchFaculty } from '../services/api';
import defaultProfileImage from '../assets/default-profile.png';

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  useEffect(() => {
    const loadFaculty = async () => {
      try {
        setLoading(true);
        const data = await fetchFaculty();
        console.log('Faculty data:', data);
        
        let processedData;
        if (data && Array.isArray(data.results)) {
          processedData = data.results;
        } else if (Array.isArray(data)) {
          processedData = data;
        } else {
          processedData = [];
        }
        
        processedData = processedData.map(professor => ({
          ...professor,
          displayImage: professor.foto || defaultProfileImage
        }));
        
        setFaculty(processedData);
        setError(null);
      } catch (err) {
        setError('Não foi possível carregar os dados dos professores. Por favor, tente novamente mais tarde.');
        console.error('Error loading faculty:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFaculty();
  }, []);

  const handleOpenDialog = (professor) => {
    setSelectedProfessor(professor);
  };

  const handleCloseDialog = () => {
    setSelectedProfessor(null);
  };

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

  if (faculty.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">Nenhum professor encontrado.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Nossos Professores
      </Typography>

      <Grid container spacing={4}>
        {faculty.map((professor) => (
          <Grid item key={professor.id} xs={12} sm={6} md={4}>
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
              <CardMedia
                component="img"
                height="300"
                image={professor.displayImage}
                alt={professor.nome}
                sx={{ 
                  objectFit: 'cover',
                  backgroundColor: 'grey.100'
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {professor.nome}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {professor.cargo || professor.titulo || 'Professor'}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {professor.formacao_academica || 'Formação não informada'}
                </Typography>
                {professor.disciplinas && professor.disciplinas.length > 0 && (
                  <Box sx={{ mt: 1, mb: 2 }}>
                    {professor.disciplinas.map((disciplina, index) => (
                      <Chip
                        key={index}
                        label={disciplina}
                        size="small"
                        icon={<SchoolIcon />}
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                )}
                <Typography variant="body2" color="text.secondary" sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  mb: 2
                }}>
                  {professor.biografia || professor.descricao}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {professor.email && (
                    <IconButton
                      color="primary"
                      href={`mailto:${professor.email}`}
                      aria-label="enviar email"
                    >
                      <EmailIcon />
                    </IconButton>
                  )}
                  <Button
                    size="small"
                    onClick={() => handleOpenDialog(professor)}
                  >
                    Ver Mais
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={Boolean(selectedProfessor)}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedProfessor && (
          <>
            <DialogTitle sx={{ m: 0, p: 2 }}>
              {selectedProfessor.nome}
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={selectedProfessor.displayImage}
                  alt={selectedProfessor.nome}
                  sx={{ objectFit: 'cover', borderRadius: 1 }}
                />
                <Typography variant="h6" gutterBottom>
                  {selectedProfessor.cargo || selectedProfessor.titulo || 'Professor'}
                </Typography>
                {selectedProfessor.formacao && (
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Formação: {selectedProfessor.formacao}
                  </Typography>
                )}
                {selectedProfessor.disciplinas && selectedProfessor.disciplinas.length > 0 && (
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Disciplinas:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedProfessor.disciplinas.map((disciplina, index) => (
                        <Chip
                          key={index}
                          label={disciplina}
                          icon={<SchoolIcon />}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                <Typography variant="body1">
                  {selectedProfessor.biografia || selectedProfessor.descricao}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              {selectedProfessor.email && (
                <Button
                  startIcon={<EmailIcon />}
                  href={`mailto:${selectedProfessor.email}`}
                >
                  Contatar
                </Button>
              )}
              <Button onClick={handleCloseDialog}>Fechar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Faculty;
