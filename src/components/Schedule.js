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
    'História',
    'Geografia',
    'Ciências'
  ];
  
  const times = [
    '07:30',
    '08:20',
    '09:10',
    '10:20',
    '11:10'
  ];
  
  const classes = ['Turma A', 'Turma B', 'Turma C'];
  
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
      mockData[className][day] = times.map(time => ({
        time,
        subject: subjects[Math.floor(Math.random() * subjects.length)]
      }));
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
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Horários de Aula
      </Typography>

      <Box sx={{ minWidth: 120, mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Turma</InputLabel>
          <Select value={selectedClass} label="Turma" onChange={handleClassChange}>
            {Object.keys(scheduleData).map((className) => (
              <MenuItem key={className} value={className}>
                {className}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small" aria-label="horário escolar">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', width: '15%', bgcolor: 'primary.main', color: 'white' }}>Horário</TableCell>
              {days.map((day) => (
                <TableCell key={day} sx={{ fontWeight: 'bold', width: '17%', bgcolor: 'primary.main', color: 'white' }}>
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((timeSlot) => (
              <TableRow key={timeSlot} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                <TableCell sx={{ fontSize: '0.875rem' }}>{timeSlot}</TableCell>
                {days.map((day) => (
                  <TableCell key={day} sx={{ fontSize: '0.875rem' }}>
                    {findSubjectAtTime(day, timeSlot)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Schedule;
