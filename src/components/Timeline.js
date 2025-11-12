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
        // Logo moves along the timeline as user scrolls
        if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
          // Calculate how far through the timeline we've scrolled
          const scrolledIntoView = Math.max(0, windowCenter - timelineTop);
          const scrollProgress = scrolledIntoView / timelineHeight;
          
          // Clamp between 0 and timeline height
          const newPosition = Math.max(0, Math.min(scrollProgress * timelineHeight, timelineHeight - 150));
          setLogoPosition(newPosition);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const day1Events = [
    { id: '01', time: '3:00 PM', title: 'Opening Ceremony', description: 'Welcome & Introduction' },
    { id: '02', time: '3:30 PM', title: 'Keynote Session', description: 'AI & Innovation' },
    { id: '03', time: '4:30 PM', title: 'Workshop Session 1', description: 'Hands-on Learning' },
    { id: '04', time: '5:30 PM', title: 'Networking Break', description: 'Connect & Collaborate' },
    { id: '05', time: '6:00 PM', title: 'Panel Discussion', description: 'Future of AI' }
  ];

  const day2Events = [
    { id: '06', time: '3:00 PM', title: 'Technical Talks', description: 'Expert Insights' },
    { id: '07', time: '4:00 PM', title: 'Workshop Session 2', description: 'Advanced Topics' },
    { id: '08', time: '5:00 PM', title: 'Project Showcase', description: 'Student Innovations' },
    { id: '09', time: '5:45 PM', title: 'Awards Ceremony', description: 'Recognition & Prizes' },
    { id: '10', time: '6:15 PM', title: 'Closing Ceremony', description: 'Thank You & Farewell' }
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

      {/* Day 1 */}
      <div className="timeline-day">
        <h3 className="day-title">Day 1 - November 14, 2025</h3>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {day1Events.map((event, index) => (
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

      {/* Day 2 */}
      <div className="timeline-day">
        <h3 className="day-title">Day 2 - November 15, 2025</h3>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {day2Events.map((event, index) => (
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
