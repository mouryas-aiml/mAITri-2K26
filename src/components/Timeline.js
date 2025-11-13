import React, { useEffect, useRef, useState } from 'react';
import './Timeline.css';

function Timeline() {
  const [logoPosition, setLogoPosition] = useState(0);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const timelineTop = rect.top;
        const timelineHeight = rect.height;
        const windowHeight = window.innerHeight;
        const windowCenter = windowHeight / 2;

        // Calculate logo position based on scroll
        if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
          const scrolledIntoView = Math.max(0, windowCenter - timelineTop);
          const scrollProgress = scrolledIntoView / timelineHeight;
          const newPosition = Math.max(0, Math.min(scrollProgress * timelineHeight, timelineHeight - 150));
          setLogoPosition(newPosition);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Merged all events into a single array for one-day display
  const dayEvents = [
    { id: '01', time: '04:30 PM to 05:30 PM', title: 'Kickstart the Celebration!', description: 'Musical Band - Vishnu, Solo Dance - Disha, Duo Dance - Dhanush' },
    { id: '02', time: '05:00 PM – 05:30 PM', title: 'Rhythmic Harmony', description: 'Group Dance - Pragathi, Duo Performance - Dhanush (second set)' },
    { id: '03', time: '05:30 PM – 05:45 PM', title: 'The Ceremonial Spark', description: 'Hands-on Learning' },
    { id: '04', time: '05:45 PM – 06:15 PM', title: 'Evening Elegance', description: 'Solo Dance - Keerthana, Live Act - Smooth Operators' },
    { id: '05', time: '06:15 PM – 06:45 PM', title: 'Grace & Groove', description: 'Solo Dance - Jessi, Group Dance - Keerthana (group)' },
    { id: '06', time: '06:45 PM – 07:15 PM', title: 'Twin Sparks', description: 'Solo Dance - Garvi, Duo Dance - Nishitha' },
    { id: '07', time: '07:15 PM – 07:45 PM', title: 'Musical Breeze', description: 'Musical Band - Dhanya, Solo Performance - Sasniri Naik' },
    { id: '08', time: '07:45 PM – 08:15 PM', title: 'Creative Showcase', description: 'Thematic Group - ,Dance-Info Aura, Dance Club Performance - Chethan' },
    { id: '09', time: '08:15 PM – 08:45 PM', title: 'Glam & Giggles', description: 'Stand-up Act - Anith, Fashion Walk - Team IRA' },
    { id: '10', time: '08:45 PM – 09:15 PM', title: 'Grand Finale', description: 'Dance Club Rajah, Ganesh Kashyap – Closing Act' }
  ];

  return (
    <div className="timeline-section" ref={timelineRef}>
      <h2 className="timeline-heading">TIMELINE</h2>
      
      {/* Animated Logo */}
      <div 
        className="timeline-logo" 
        style={{ 
          transform: `translateY(${logoPosition}px)`,
          transition: 'transform 0.1s linear'
        }}
      >
        <img src="/logo192.png" alt="mAITri Logo" />
      </div>

      {/* Single merged day (all events) */}
      <div className="timeline-day">
        <h3 className="day-title">Event Schedule</h3>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {dayEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="timeline-content">
                <div className="event-number">{event.id}</div>
                <div className="event-details">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-time">{event.time}</p>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timeline;