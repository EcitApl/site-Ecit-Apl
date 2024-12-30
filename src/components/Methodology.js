import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BiotechIcon from '@mui/icons-material/Biotech';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const methodologies = [
  {
    title: 'Aprendizagem Ativa',
    icon: <GroupsIcon fontSize="large" color="primary" />,
    description: 'Os alunos são protagonistas do seu próprio aprendizado, participando ativamente de discussões, projetos e atividades práticas.',
    benefits: [
      'Maior engajamento dos alunos',
      'Desenvolvimento do pensamento crítico',
      'Melhor retenção do conhecimento',
      'Habilidades de trabalho em equipe'
    ]
  },
  {
    title: 'Ensino Híbrido',
    icon: <AutoStoriesIcon fontSize="large" color="primary" />,
    description: 'Combinação de aulas presenciais com recursos digitais e atividades online, proporcionando uma experiência de aprendizado mais completa.',
    benefits: [
      'Flexibilidade no aprendizado',
      'Uso de recursos tecnológicos',
      'Personalização do ensino',
      'Desenvolvimento da autonomia'
    ]
  },
  {
    title: 'Aprendizagem Baseada em Projetos',
    icon: <BiotechIcon fontSize="large" color="primary" />,
    description: 'Os alunos desenvolvem projetos práticos que integram diferentes disciplinas e aplicam os conhecimentos em situações reais.',
    benefits: [
      'Integração entre disciplinas',
      'Aplicação prática do conhecimento',
      'Desenvolvimento de habilidades de pesquisa',
      'Estímulo à criatividade'
    ]
  },
  {
    title: 'Gamificação',
    icon: <SportsEsportsIcon fontSize="large" color="primary" />,
    description: 'Utilização de elementos de jogos no processo de aprendizagem, tornando as aulas mais dinâmicas e envolventes.',
    benefits: [
      'Maior motivação dos alunos',
      'Aprendizado divertido e engajador',
      'Desenvolvimento do pensamento estratégico',
      'Feedback instantâneo'
    ]
  }
];

const pillars = [
  {
    title: 'Desenvolvimento Cognitivo',
    icon: <PsychologyIcon fontSize="large" color="primary" />,
    description: 'Estimulamos o desenvolvimento das capacidades intelectuais através de atividades desafiadoras e pensamento crítico.'
  },
  {
    title: 'Desenvolvimento Socioemocional',
    icon: <EmojiObjectsIcon fontSize="large" color="primary" />,
    description: 'Trabalhamos as habilidades sociais e emocionais, preparando os alunos para os desafios da vida.'
  },
  {
    title: 'Excelência Acadêmica',
    icon: <SchoolIcon fontSize="large" color="primary" />,
    description: 'Mantemos altos padrões de qualidade no ensino, com professores qualificados e recursos pedagógicos modernos.'
  }
];

function Methodology() {
  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Nossa Metodologia de Ensino
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" align="center" paragraph>
          Uma abordagem moderna e eficaz para o aprendizado
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Pilares Metodológicos */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Pilares Metodológicos
          </Typography>
          <Grid container spacing={3}>
            {pillars.map((pillar, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={3} sx={{ height: '100%', p: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    {pillar.icon}
                    <Typography variant="h6" sx={{ my: 2 }}>
                      {pillar.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {pillar.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Metodologias Ativas */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Metodologias Ativas
          </Typography>
          <Grid container spacing={3}>
            {methodologies.map((method, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {method.icon}
                      <Typography variant="h6" sx={{ ml: 2 }}>
                        {method.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      {method.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Benefícios:
                    </Typography>
                    <List dense>
                      {method.benefits.map((benefit, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={benefit} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Methodology;
