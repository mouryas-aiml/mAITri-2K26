import React from 'react';
import './Footer.css';

function Footer() {
  // Team members data - Update with actual LinkedIn URLs
  const teamMembers = [
    { name: 'Mourya S Gowda', linkedin: 'https://www.linkedin.com/in/mourya-s' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-text">
          Copyright © mAITri 2K26 | Built with ❤️ By{' '}
          <a
            href="https://www.linkedin.com/company/gfg-campus-body-dr-ait/"
            target="_blank"
            rel="noopener noreferrer"
            className="club-link"
          >
            GeeksforGeeks Campus Body - Dr.AIT Club
          </a>
          {' '}|{' '}
          {teamMembers.map((member, index) => (
            <span key={index}>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="team-link"
                title={`Connect with ${member.name} on LinkedIn`}
              >
                {member.name}
              </a>
              {index < teamMembers.length - 1 && ', '}
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
