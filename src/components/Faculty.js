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
import luanImage from '../assets/luan.jpeg';
import rangelImage from '../assets/rangel.jpeg';
import dayanaImage from '../assets/dayana.jpg';
import rosangelaImage from '../assets/rosangela.png';

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  
  useEffect(() => {
    const loadFaculty = async () => {
      try {
        setLoading(true);
        // Static data for seven professors
        
        const staticFaculty = [
          {
            id: 16,
            nome: 'Adalmirene Melo',
            disciplina: 'Analises Clinicas',
            email: 'roberto.silva@escola.com',
            formacao: 'Licenciatura em Filosofia',
            descricao: 'Professor especializado em filosofia contemporânea.',
            foto: defaultProfileImage
          },
          {
            id: 15,
            nome: 'Aécio Melo',
            disciplina: 'Agroecologia',
            email: 'carla.regina@escola.com',
            formacao: 'Licenciatura em Sociologia',
            descricao: 'Professora com experiência em teoria social.',
            foto: defaultProfileImage
          },
          {
            id: 4,
            nome: 'Ana Kaline Delgado',
            disciplina: 'Português',
            email: 'carlos.ferreira@escola.com',
            formacao: 'Licenciatura em Português',
            descricao: 'Professor especializado em História do Brasil e História Mundial Contemporânea.',
            foto: defaultProfileImage
          },
          {
            id: 14,
            nome: 'André Carlos',
            disciplina: 'Agroecologia',
            email: 'joao.victor@escola.com',
            formacao: 'Licenciatura em Biologia',
            descricao: 'Professor especializado em ecologia e meio ambiente.',
            foto: defaultProfileImage
          },
          {
            id: 8,
            nome: 'Augusto',
            disciplina: 'Matemática',
            email: 'marcos.antonio@escola.com',
            formacao: 'Bacharel em Educação Física e Licenciado em Educação Física',
            descricao: 'Professor especializado em geometria e álgebra.',
            foto: defaultProfileImage
          },
          {
            id: 9,
            nome: 'Cicero',
            disciplina: 'Geografia',
            email: 'francisca.maria@escola.com',
            formacao: 'Licenciatura em Ciências',
            descricao: 'Professora com experiência em ciências naturais e laboratório.',
            foto: defaultProfileImage
          },
          {
            id: 6,
            nome: 'Dayana Medeiros',
            disciplina: 'Matemática',
            email: 'roberto.costa@escola.com',
            formacao: 'Licenciatura em Educação Física',
            descricao: 'Professor especializado em desenvolvimento motor e esportes coletivos.',
            foto: dayanaImage
          },
          {
            id: 18,
            nome: 'Isabel Cristina',
            disciplina: 'História',
            email: 'ricardo.souza@escola.com',
            formacao: 'Licenciatura em Educação Física',
            descricao: 'Professor especializado em esportes coletivos.',
            foto: defaultProfileImage
          },
          {
            id: 13,
            nome: 'Josiel Custodio',
            disciplina: 'Matemática',
            email: 'ana.beatriz@escola.com',
            formacao: 'Licenciatura em Química',
            descricao: 'Professora com experiência em química orgânica.',
            foto: defaultProfileImage
          },
          {
            id: 1,
            nome: 'Luan Soares',
            disciplina: 'Espanhol',
            email: 'maria.silva@escola.com',
            formacao: 'Licenciatura em Espanhol',
            descricao: 'Especialista em Álgebra e Geometria com 10 anos de experiência no ensino fundamental e médio.',
            foto: luanImage
          },
          {
            id: 17,
            nome: 'Maria Janailma',
            disciplina: 'Informática',
            email: 'patricia.santos@escola.com',
            formacao: 'Licenciatura em Letras - Inglês',
            descricao: 'Professora com experiência em ensino de idiomas.',
            foto: defaultProfileImage
          },
          {
            id: 12,
            nome: 'Otaciana Romão',
            disciplina: 'Física',
            email: 'pedro.paulo@escola.com',
            formacao: 'Licenciatura em Física',
            descricao: 'Professor especializado em física experimental.',
            foto: defaultProfileImage
          },
          {
            id: 10,
            nome: 'Rafael Leal',
            disciplina: '',
            email: 'jose.carlos@escola.com',
            formacao: 'Licenciatura em Geografia',
            descricao: 'Professor especializado em geografia humana e cartografia.',
            foto: defaultProfileImage
          },
          {
            id: 2,
            nome: 'Rangel Andrade',
            disciplina: 'Informática',
            email: 'joao.santos@escola.com',
            formacao: 'Licenciatura em Computação e Informática',
            descricao: 'Professor dedicado à literatura brasileira e gramática, com experiência em preparação para vestibular.',
            foto: rangelImage
          },
          {
            id: 11,
            nome: 'Rita Ana',
            disciplina: 'Ciências',
            email: 'maria.helena@escola.com',
            formacao: 'Licenciatura em História',
            descricao: 'Professora com experiência em história do Brasil e mundial.',
            foto: defaultProfileImage
          },
          {
            id: 7,
            nome: 'Rosângela',
            disciplina: 'Inglês',
            email: 'luciana.martins@escola.com',
            formacao: 'Licenciatura em Artes Visuais',
            descricao: 'Professora com experiência em arte-educação e história da arte.',
            foto: rosangelaImage
          },
          {
            id: 3,
            nome: 'Suênia Marques',
            disciplina: 'Português',
            email: 'ana.oliveira@escola.com',
            formacao: 'Licenciatura em Português',
            descricao: 'Especialista em ciências naturais com foco em experimentos práticos e educação ambiental.',
            foto: defaultProfileImage
          },
          {
            id: 5,
            nome: 'Virginia',
            disciplina: 'Português',
            email: 'patricia.lima@escola.com',
            formacao: 'Licenciatura em Português',
            descricao: 'Professora com experiência em cartografia e geografia humana.',
            foto: defaultProfileImage
          },
          {
            id: 19,
            nome: 'João Felix',
            disciplina: 'Matemática',
            email: 'fernanda.costa@escola.com',
            formacao: 'Licenciatura em Artes',
            descricao: 'Professora com experiência em artes plásticas.',
            foto: defaultProfileImage
          },
          {
            id: 20,
            nome: 'Adriana Celi',
            disciplina: 'Biologia',
            email: 'lucas.oliveira@escola.com',
            formacao: 'Licenciatura em Música',
            descricao: 'Professor especializado em teoria musical e instrumentos.',
            foto: defaultProfileImage
          },
          {
            id: 21,
            nome: 'Beneilton',
            disciplina: 'Sociologia',
            email: 'amanda.lima@escola.com',
            formacao: 'Licenciatura em Letras',
            descricao: 'Professora com experiência em literatura e produção textual.',
            foto: defaultProfileImage
          }
        ];
        
        setFaculty(staticFaculty);
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
;

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
                image={professor.foto}
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
                  {professor.disciplina || 'Professor'}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {professor.formacao}
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
