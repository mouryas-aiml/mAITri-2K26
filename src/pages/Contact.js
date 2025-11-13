import React from 'react';
import './Pages.css';

function Contact() {

  // Team members - replace placeholder images and contact links with real data
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Shylaja KR',
      designation: 'Student Welfare Officer',
      phone: '+919900138703',
      photo: 'organising.jpg'
    },
    {
      id: 2,
      name: 'Dr. N Chetan',
      designation: 'Student Welfare Coordinator',
      phone: '+919845242205',
      photo: 'organising.jpg'
    },
    {
      id: 3,
      name: 'Dr. Kesthara V',
      designation: 'Student Welfare Coordinator',
      phone: '+919900162313',
      photo: 'organising.jpg'
    }
  ];
  const teamHeads = [
    {
      id: 2,
      name: 'Sinchana Kini',
      role: 'Event President',
      phone: '+919019672633',
      insta: 'https://instagram.com/sinchanakini',
      linkedin: 'https://www.linkedin.com/in/sinchana-s-kini-7911b7266'
    },
    {
      id: 3,
      name: 'Mourya Gowda',
      role: 'Technical Head',
      phone: '+917795009361',
      insta: 'https://instagram.com/_mourya__gowda_',
      linkedin: 'https://linkedin.com/in/mourya-s'
    },
    {
      id: 5,
      name: 'Vachan US',
      role: 'Volunteer Head',
      phone: '+919886323678',
      insta: 'https://instagram.com/vachan_18',
      linkedin: 'https://linkedin.com/in/vachan-u-s-0a5aa8128'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">Get in touch with us for any queries</p>

        {/* Organizing Committee section - single image with details below */}
        <div className="team-section">
          <h3>Organising Committee</h3>
          
          {/* Single organizing committee image */}
          <div className="organising-image-container">
            <div className="organising-image-card">
              <img
                src="organising.jpg"
                alt="Organising Committee"
                className="organising-committee-image"
              />
            </div>
          </div>

          {/* Individual member details below the image */}
          <div className="organising-details-container">
            {teamMembers.map((member) => (
              <div key={member.id} className="organising-detail-card">
                <h4 className="organising-member-name">{member.name}</h4>
                <p className="organising-member-designation">{member.designation}</p>
                <p className="organising-member-contact">📞 {member.phone}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Heads section - modern cards */}
        <div className="team-section">
          <h3>Students Organising Committee</h3>
          
          {/* Team cards with working social links */}
          <div className="students-committee-container">
            {teamHeads.map((member) => (
              <div key={member.id} className="student-member-card">
                <div className="student-member-info">
                  <h4 className="student-member-name">{member.name}</h4>
                  <p className="student-member-role">{member.role}</p>
                  <p className="student-member-phone">📞 {member.phone}</p>
                </div>
                <div className="student-social-links">
                  <a href={member.insta} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="social-icon">
                      <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
                    </svg>
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                    <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" className="social-icon">
                      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                    </svg>
                  </a>
                  <a href={`tel:${member.phone}`} className="social-link phone">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="social-icon">
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3l49.4-40.4c13.7-11.1 18.4-30 11.6-46.3l-40-96z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-container">
          {/* Left side - Google Maps */}
          <div className="map-section">
            <h3>Location</h3>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.127733341496!2d77.50345577481947!3d12.963677315052458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e9c40000001%3A0x2d368cebf691c5fb!2sDr.%20Ambedkar%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1762964402097!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '10px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dr. Ambedkar Institute of Technology Location"
              ></iframe>
            </div>
          </div>

          {/* Right side - Reach Out section */}
          <div className="reach-out-section">
            <h3>Reach Out</h3>
            <div className="reach-out-details">
              <div className="reach-out-item">
                <h4>Email</h4>
                <p>maitri@drait.edu.in</p>
              </div>
              <div className="reach-out-item">
                <h4>Phone</h4>
                <p>+917795009361 / +91 9380265537</p>
              </div>
              <div className="reach-out-item">
                <h4>Address</h4>
                <p><strong>Dr. Ambedkar Institute of Technology</strong><br/>Near Jnana Bharathi Campus, Bengaluru, Karnataka 560056</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
