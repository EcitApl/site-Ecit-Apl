import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import GroupsIcon from '@mui/icons-material/Groups';
import PublicIcon from '@mui/icons-material/Public';

function Mission() {
  const objectives = [
    {
      title: 'Excelência Acadêmica',
      description: 'Proporcionar uma educação de alta qualidade que prepare os alunos para o sucesso acadêmico e profissional.',
      icon: <SchoolIcon color="primary" />
    },
    {
      title: 'Desenvolvimento Integral',
      description: 'Formar cidadãos completos, desenvolvendo aspectos intelectuais, sociais, emocionais e éticos.',
      icon: <GroupsIcon color="primary" />
    },
    {
      title: 'Inovação e Tecnologia',
      description: 'Integrar tecnologias e métodos inovadores de ensino para enriquecer a experiência de aprendizagem.',
      icon: <EmojiObjectsIcon color="primary" />
    },
    {
      title: 'Consciência Global',
      description: 'Desenvolver uma visão ampla do mundo e a capacidade de atuar como cidadãos globais responsáveis.',
      icon: <PublicIcon color="primary" />
    }
  ];

  const commitments = [
    'Oferecer um ambiente de aprendizagem estimulante e acolhedor',
    'Promover o pensamento crítico e a criatividade',
    'Valorizar a diversidade e a inclusão',
    'Incentivar a participação ativa na comunidade',
    'Preparar os alunos para os desafios do século XXI'
  ];

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Nossa Missão
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Visão Geral
          </Typography>
          <Typography variant="body1" paragraph>
            A ECIT Alfredo Pessoa de Lima tem como missão formar cidadãos críticos e preparados para os desafios 
            do século XXI, através de uma educação integral e inovadora. Buscamos desenvolver não apenas o 
            conhecimento acadêmico, mas também habilidades sociais, emocionais e práticas essenciais para o 
            sucesso na vida pessoal e profissional.
          </Typography>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          Nossos Objetivos
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {objectives.map((objective, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {objective.icon}
                  <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>
                    {objective.title}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {objective.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Nossos Compromissos
          </Typography>
          <List>
            {commitments.map((commitment, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={commitment} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}

export default Mission;
