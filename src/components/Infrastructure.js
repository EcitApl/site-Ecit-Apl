import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import ScienceIcon from '@mui/icons-material/Science';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

function Infrastructure() {
  const facilities = [
    {
      title: 'Salas de Aula',
      description: 'Nossas salas de aula são equipadas com:',
      details: [
        'Ar condicionado para maior conforto',
        'Projetores multimídia',
        'Quadros brancos de alta qualidade',
        'Carteiras ergonômicas',
        'Iluminação LED adequada'
      ],
      icon: <MeetingRoomIcon sx={{ fontSize: 40 }} color="primary" />
    },
    {
      title: 'Laboratório de Informática',
      description: 'Espaço tecnológico com:',
      details: [
        'Computadores modernos',
        'Internet de alta velocidade',
        'Software educacional atualizado',
        'Impressora 3D',
        'Suporte técnico especializado'
      ],
      icon: <ComputerIcon sx={{ fontSize: 40 }} color="primary" />
    },
    {
      title: 'Laboratórios de Ciências',
      description: 'Equipados para aulas práticas com:',
      details: [
        'Microscópios',
        'Equipamentos de química',
        'Material para experimentos',
        'Bancadas especializadas',
        'Equipamentos de segurança'
      ],
      icon: <ScienceIcon sx={{ fontSize: 40 }} color="primary" />
    },
    {
      title: 'Biblioteca',
      description: 'Ambiente de estudo completo com:',
      details: [
        'Acervo diversificado',
        'Espaços para estudo individual',
        'Salas para estudo em grupo',
        'Computadores para pesquisa',
        'Sistema de empréstimo digital'
      ],
      icon: <LocalLibraryIcon sx={{ fontSize: 40 }} color="primary" />
    },
    {
      title: 'Área Esportiva',
      description: 'Estrutura para práticas esportivas:',
      details: [
        'Quadra poliesportiva coberta',
        'Vestiários',
        'Equipamentos esportivos',
        'Área para atividades ao ar livre',
        'Bebedouros'
      ],
      icon: <SportsBasketballIcon sx={{ fontSize: 40 }} color="primary" />
    },
    {
      title: 'Refeitório',
      description: 'Espaço para alimentação com:',
      details: [
        'Cozinha industrial equipada',
        'Mesas e cadeiras confortáveis',
        'Cardápio nutritivo e variado',
        'Ambiente climatizado',
        'Bebedouros com água filtrada'
      ],
      icon: <RestaurantIcon sx={{ fontSize: 40 }} color="primary" />
    }
  ];

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Nossa Infraestrutura
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Instalações Modernas
          </Typography>
          <Typography variant="body1" paragraph>
            A ECIT Alfredo Pessoa de Lima oferece uma infraestrutura completa e moderna, projetada para 
            proporcionar o melhor ambiente de aprendizagem possível. Nossas instalações são mantidas com 
            alto padrão de qualidade e constantemente atualizadas para atender às necessidades educacionais 
            dos nossos alunos.
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {facilities.map((facility, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {facility.icon}
                    <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>
                      {facility.title}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {facility.description}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {facility.details.map((detail, idx) => (
                      <Typography component="li" key={idx} variant="body2" sx={{ mb: 0.5 }}>
                        {detail}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Compromisso com a Qualidade
          </Typography>
          <Typography variant="body1" paragraph>
            Nossa infraestrutura é constantemente mantida e atualizada para garantir o melhor ambiente 
            de aprendizagem. Investimos em equipamentos modernos e espaços adequados para proporcionar 
            uma experiência educacional completa e de qualidade.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Infrastructure;
