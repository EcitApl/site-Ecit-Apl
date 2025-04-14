import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
} from '@mui/material';
const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

const fetchScheduleData = async () => {
  const subjects = [
    'Matemática',
    'Português',
    'Intervalo',
    'Geografia',
    'Ciências',
    'Física',
    'História',
    'Educação Física',
    'Artes',
    'Inglês',
    'Química',
    'Biologia',
    'Almoço'
  ];
  
  const times = [
    '07:30',
    '08:20',
    '09:10',
    '09:30',
    '10:20',
    '11:10',
    '12:00',
    '13:20',
    '14:10',
    '15:00',
    '15:20',
    '16:10',
    '17:00'
  ];
  
  const classes = ['Turma 8A', 'Turma 9A', 'Turma 9B', 'TURMA 1A', 'TURMA 1B', 'TURMA 1C', 'TURMA 2A', 'TURMA 2B', 'TURMA 3A', 'TURMA 3B'];
  
  const mockData = {};
  
  classes.forEach(className => {
    mockData[className] = {
      'Segunda-feira': [],
      'Terça-feira': [],
      'Quarta-feira': [],
      'Quinta-feira': [],
      'Sexta-feira': []
    };
    days.forEach(day => {
      mockData[className][day] = times.map((time) => {
        // Define fixed breaks
        if (time === '09:10') return { time, subject: 'Intervalo' };
        if (time === '12:00') return { time, subject: 'Almoço' };
        if (time === '15:10') return { time, subject: 'Intervalo' };
        
        // Filter out breaks from random subject selection
        const availableSubjects = subjects.filter(s => s !== 'Intervalo' && s !== 'Almoço');
        return {
          time,
          subject: availableSubjects[Math.floor(Math.random() * availableSubjects.length)]
        };
      });
    });
  });
  
  return mockData;
};

const fetchApiScheduleData = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/disciplinas');
    if (!response.ok) {
      throw new Error('Failed to fetch schedule data');
    }
    const data = await response.json();
    console.log('API Response:', data);
    
    if (!data.results || data.results.length === 0) {
      console.log('No data received from API, falling back to mock data');
      return fetchScheduleData();
    }
    
    const formattedData = {};
    
    data.results.forEach(record => {
      const className = record.turma_nome || 'Turma não especificada';
      const day = record.dia_semana_display || 'Segunda-feira';
      const time = record.hora_inicio || '00:00';
      const subject = record.nome || 'Disciplina não especificada';
      
      if (!formattedData[className]) {
        formattedData[className] = {
          'Segunda-feira': [],
          'Terça-feira': [],
          'Quarta-feira': [],
          'Quinta-feira': [],
          'Sexta-feira': []
        };
      }
      
      formattedData[className][day].push({
        time: time,
        subject: subject
      });
    });
    
    Object.keys(formattedData).forEach(className => {
      Object.keys(formattedData[className]).forEach(day => {
        formattedData[className][day].sort((a, b) => a.time.localeCompare(b.time));
      });
    });
    
    return Object.keys(formattedData).length > 0 ? formattedData : fetchScheduleData();
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    return fetchScheduleData();
  }
};

const Schedule = () => {
  const [selectedClass, setSelectedClass] = useState('Turma não especificada');
  const [selectedDay, setSelectedDay] = useState('Segunda-feira');
  const [scheduleData, setScheduleData] = useState({
    'Turma não especificada': {
      'Segunda-feira': [],
      'Terça-feira': [],
      'Quarta-feira': [],
      'Quinta-feira': [],
      'Sexta-feira': []
    }
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScheduleData = async () => {
      setLoading(true);
      const data = await fetchApiScheduleData();
      if (data && Object.keys(data).length > 0) {
        // Extract all unique time slots across all classes and days
        const allTimeSlots = new Set();
        Object.values(data).forEach(classDays => {
          Object.values(classDays).forEach(daySchedule => {
            daySchedule.forEach(period => {
              allTimeSlots.add(period.time);
            });
          });
        });

        // Convert to array and sort
        const sortedTimeSlots = Array.from(allTimeSlots).sort();
        setTimeSlots(sortedTimeSlots);
        setScheduleData(data);
        setSelectedClass(Object.keys(data)[0]);
      }
      setLoading(false);
    };

    loadScheduleData();
  }, []);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const findSubjectAtTime = (day, timeSlot) => {
    const daySchedule = scheduleData[selectedClass][day];
    const period = daySchedule.find(p => p.time === timeSlot);
    return period ? period.subject : '';
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: 4,
        boxShadow: 1
      }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold'
            }}
          >
            Horários de Aula
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}
          >
            Consulte os horários das aulas para cada turma. Os intervalos e horários de almoço estão destacados para melhor visualização.
          </Typography>
        </Box>

        <Box sx={{ 
          minWidth: 120, 
          mb: 4,
          display: 'flex', 
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          maxWidth: { sm: '600px' },
          mx: 'auto'
        }}>
          <FormControl fullWidth size="small">
            <InputLabel>Turma</InputLabel>
            <Select 
              value={selectedClass} 
              label="Turma" 
              onChange={handleClassChange}
              sx={{ 
                bgcolor: 'background.paper',
                '& .MuiSelect-select': {
                  fontWeight: 'medium'
                }
              }}
            >
              {Object.keys(scheduleData).map((className) => (
                <MenuItem key={className} value={className}>
                  {className}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Dia</InputLabel>
            <Select 
              value={selectedDay} 
              label="Dia" 
              onChange={handleDayChange}
              sx={{ 
                bgcolor: 'background.paper',
                '& .MuiSelect-select': {
                  fontWeight: 'medium'
                }
              }}
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TableContainer 
          component={Paper} 
          sx={{ 
            maxHeight: 'calc(100vh - 300px)',
            minHeight: 400,
            maxWidth: 800,
            mx: 'auto',
            boxShadow: 2,
            borderRadius: 1,
            overflow: 'auto',
            '& .MuiTableCell-root': {
              py: 1.5,
              px: 2,
              borderBottom: '1px solid',
              borderColor: 'divider'
            },
            '& .break-row': {
              bgcolor: 'grey.50',
              '& .MuiTableCell-root': {
                color: 'primary.main',
                fontWeight: 'medium'
              }
            },
            '& .lunch-row': {
              bgcolor: 'primary.50',
              '& .MuiTableCell-root': {
                color: 'primary.dark',
                fontWeight: 'medium'
              }
            }
          }}
        >
          <Table stickyHeader size="small" aria-label="horário escolar">
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    width: '30%',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText'
                  }}
                >
                  Horário
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText'
                  }}
                >
                  Disciplina
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timeSlots.map((timeSlot) => {
                const subject = findSubjectAtTime(selectedDay, timeSlot);
                const isBreak = subject === 'Intervalo';
                const isLunch = subject === 'Almoço';
                return (
                  <TableRow 
                    key={timeSlot}
                    className={isBreak ? 'break-row' : isLunch ? 'lunch-row' : ''}
                    sx={{
                      '&:hover': {
                        bgcolor: 'action.hover',
                      }
                    }}
                  >
                    <TableCell 
                      component="th" 
                      scope="row" 
                      sx={{ 
                        fontWeight: 'medium',
                        borderLeft: '4px solid',
                        borderLeftColor: isBreak ? 'primary.light' : isLunch ? 'primary.main' : 'transparent'
                      }}
                    >
                      {timeSlot}
                    </TableCell>
                    <TableCell>{subject}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Schedule;
