// API base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Fetch all events
export const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/eventos/`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Fetch a single event by ID
export const fetchEventById = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/eventos/${eventId}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch event details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

// Create a new event
export const createEvent = async (eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/eventos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Update an existing event
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/eventos/${eventId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) {
      throw new Error('Failed to update event');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Delete an event
export const deleteEvent = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/eventos/${eventId}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Fetch all lectures
export const fetchLectures = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/palestras/`);
    if (!response.ok) {
      throw new Error('Failed to fetch lectures');
    }
    const data = await response.json();
    console.log('API Response:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error fetching lectures:', error);
    throw error;
  }
};

// Fetch a single lecture by ID
export const fetchLectureById = async (lectureId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/palestras/${lectureId}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch lecture details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching lecture details:', error);
    throw error;
  }
};

// Fetch all faculty members
export const fetchFaculty = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/professores/`);
    if (!response.ok) {
      throw new Error('Failed to fetch faculty data');
    }
    const data = await response.json();
    console.log('API Response:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error fetching faculty data:', error);
    throw error;
  }
};

// Fetch a single faculty member by ID
export const fetchFacultyMemberById = async (facultyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/professores/${facultyId}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch faculty member details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching faculty member details:', error);
    throw error;
  }
};
