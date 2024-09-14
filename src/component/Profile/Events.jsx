import React, { useEffect, useState } from 'react'
import EventCard from './EventCard'
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from your backend
    axios.get('/api/events')
      .then(response => {
        setEvents(response.data); // Assuming response.data is an array of events
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {events.map((event) => (
        <EventCard key={event.id} eventData={event} />
      ))}
    </div>
  );
};

export default Events;

