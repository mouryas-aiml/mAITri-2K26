import React from 'react';
import './Pages.css';

function Guest() {
  const speakers = [
    {
      name: 'Guest Speaker 1',
      title: 'Chief AI Officer',
      company: 'Tech Corp',
      topic: 'Future of Artificial Intelligence',
      image: '👨‍💼'
    },
    {
      name: 'Guest Speaker 2',
      title: 'Senior ML Engineer',
      company: 'Innovation Labs',
      topic: 'Machine Learning in Production',
      image: '👩‍💼'
    },
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Guest Speakers</h1>
        <p className="page-subtitle">Meet our distinguished guests and industry leaders</p>

        <div className="speakers-grid">
          {speakers.map((speaker, index) => (
            <div key={index} className="speaker-card">
              <div className="speaker-avatar">{speaker.image}</div>
              <h3 className="speaker-name">{speaker.name}</h3>
              <p className="speaker-title">{speaker.title}</p>
              <p className="speaker-company">{speaker.company}</p>
              <div className="speaker-divider"></div>
              <p className="speaker-topic">
                <strong>Topic:</strong> {speaker.topic}
              </p>
            </div>
          ))}
        </div>

        <div className="guest-note">
          <p>📢 More Guests will be announced soon. Stay tuned!</p>
        </div>
      </div>
    </div>
  );
}

export default Guest;
