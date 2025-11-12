import React from 'react';
import './Pages.css';

function Events() {
  const events = [
    {
      title: 'Treasure Hunt',
      date: 'Day 1 - Morning',
      time: '10:00 AM - 12:00 PM',
      description: 'Gaming & Entiretinment',
      category: 'Gaming'
    },
    {
      title: 'Ethnic Day',
      date: 'Day 1 - Afternoon',
      time: '2:00 PM - 4:00 PM',
      description: 'Embrace tradition and celebrate cultural diversity on our Ethnic Day!',
      category: 'Ethnic'
    },
    {
      title: 'Flashmob',
      date: 'Day 1 - Evening',
      time: '4:00 PM - 6:00 PM',
      description: 'Get ready to groove with an energetic flashmob and an electrifying DJ evening!',
      category: 'DJ Evening'
    },
    {
      title: 'Dance, Singing & Fashoin Walk-1',
      date: 'Day 2 - Evening',
      time: '4:00 PM - 6:20 PM',
      description: 'Future of AI and its impact on society',
      category: 'Event'
    },
    {
      title: 'Inaugration & Movie Promotion',
      date: 'Day 2 - Night',
      time: '6:20 PM - 7:00 PM',
      description: 'Students presenting their innovative projects',
      category: 'Event'
    },
    {
      title: 'Dance, Singing & Fashion Walk-2',
      date: 'Day 2 - Night',
      time: '7:00 PM - 8:00 PM',
      description: 'Award ceremony and closing remarks',
      category: 'Event'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Events Schedule</h1>
        <p className="page-subtitle">Explore our exciting lineup of events</p>

        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-category">{event.category}</div>
              <h3 className="event-title">{event.title}</h3>
              <div className="event-details">
                <p className="event-date">📅 {event.date}</p>
                <p className="event-time">🕐 {event.time}</p>
              </div>
              <p className="event-description">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
