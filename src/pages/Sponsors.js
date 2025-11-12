import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function Sponsors() {
  const sponsorTiers = [
    {
      tier: 'Platinum Sponsors',
      color: '#E5E4E2',
      sponsors: ['Sponsor Name 1', 'Sponsor Name 2']
    },
    {
      tier: 'Gold Sponsors',
      color: '#FFD700',
      sponsors: ['Sponsor Name 3', 'Sponsor Name 4', 'Sponsor Name 5']
    },
    {
      tier: 'Silver Sponsors',
      color: '#C0C0C0',
      sponsors: ['Sponsor Name 6', 'Sponsor Name 7', 'Sponsor Name 8']
    },
    {
      tier: 'Community Partners',
      color: '#8B7355',
      sponsors: ['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4']
    }
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Our Sponsors</h1>
        <p className="page-subtitle">Thank you to our amazing sponsors and partners</p>

        <div className="sponsors-section">
          {sponsorTiers.map((tier, index) => (
            <div key={index} className="sponsor-tier">
              <h2 className="tier-title" style={{ color: tier.color }}>
                {tier.tier}
              </h2>
              <div className="sponsors-grid-tier">
                {tier.sponsors.map((sponsor, idx) => (
                  <div key={idx} className="sponsor-card">
                    <div className="sponsor-logo">
                      <span className="sponsor-placeholder">LOGO</span>
                    </div>
                    <p className="sponsor-name">{sponsor}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="become-sponsor">
          <h3>Interested in Sponsoring?</h3>
          <p>Join us in supporting innovation and technology education</p>
          <Link to="/contact" className="sponsor-cta">Get in Touch</Link>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
