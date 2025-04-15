import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Events from './components/Events';
import EventDetail from './components/EventDetail';
import Lectures from './components/Lectures';
import Schedule from './components/Schedule';
import Faculty from './components/Faculty';
import Contact from './components/Contact';
import Methodology from './components/Methodology';
import Mission from './components/Mission';
import Infrastructure from './components/Infrastructure';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main style={{ 
        padding: '20px',
        flex: '1 0 auto'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
        </Routes>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
