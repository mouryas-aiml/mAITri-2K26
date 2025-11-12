import React from 'react';
import { Link } from 'react-router-dom';
import Timeline from '../components/Timeline';
import './Home.css';

function Home() {

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className="home-background">
        {/* Background Logo */}
        <div className="background-logo">
          <img src="/logo512.png" alt="Background" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="home-content">
        <div className="hero-layout">
          {/* Logo - Left Side */}
          <div className="home-logo-container">
            <div className="home-logo">
              <img src="/logo192.png" alt="mAITri Logo" />
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="home-text-content">
            <div className="home-title-section">
              <h1 className="home-main-title">mAITri</h1>
              <div className="home-year">2K26</div>
              <p className="home-tagline">Bold, Mysterious, Unforgettable</p>
            </div>
            <div className="Date">14 & 15 November</div>
          </div>
        </div>
      </div>

      {/* About College Section */}
      <section className="about-college-section">
        <h3 className="about-college-headline">About College</h3>
        <div className="about-college-container">
          <div className="college-image">
            <img src="/college.jpg" alt="Dr. Ambedkar Institute of Technology" />
          </div>
          <div className="college-content">
            <h2 className="section-heading">Dr. Ambedkar Institute of Technology</h2>
            <p className="college-description">
              Dr. Ambedkar Institute of Technology (Dr. AIT) is a premier engineering institution 
              located in Bangalore, Karnataka. Established in 1980, the institute is affiliated 
              with Visvesvaraya Technological University (VTU) and approved by AICTE. Dr. AIT is 
              committed to providing quality technical education and fostering innovation, research, 
              and entrepreneurship among students. With state-of-the-art infrastructure, experienced 
              faculty, and a vibrant campus life, Dr. AIT has been nurturing engineering talent for 
              over four decades.
            </p>
          </div>
        </div>
      </section>

      {/* About mAITri Section */}
      <section className="about-maitri-section">
        <div className="about-maitri-container">
          <h2 className="section-heading">mAITri 2K26</h2>
          <p className="maitri-description">
           mAITri 2k26 is the Freshers' Welcome Fest for the 2026 batch of Engineering students, 
           celebrated at Dr. Ambedkar Institute of Technology (Dr.AIT), Bengaluru.
           Building on the legacy of its previous editions, mAITri 2k26 promises an exciting blend 
           of events from fashion shows, dance performances, and musical acts to sports competitions. 
           The fest also features distinctive attractions like treasure hunts and e-sports tournaments,
           showcasing the creativity, talent, and vibrant spirit of the student community at Dr. AIT
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline />

      {/* CTA Buttons Section */}
      <section className="cta-buttons-section">
        <div className="home-cta-section">
          <Link to="/register" className="home-cta-button home-cta-primary">
            <span>Register Now</span>
          </Link>
          <Link to="/events" className="home-cta-button home-cta-secondary">
            <span>Explore Events</span>
          </Link>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors-section">
        <div className="sponsors-container">
          <h2 className="section-heading">Our Sponsors</h2>
          <div className="sponsors-marquee">
            <div className="sponsors-track">
              <div className="sponsor-logo">
                <img src="/sponsors/college.jpg" alt="Sponsor 1" />
              </div>
              <div className="sponsor-logo">
                <img src="/sponsors/college.jpg" alt="Sponsor 2" />
              </div>
              <div className="sponsor-logo">
                <img src="/sponsors/sponsor3.png" alt="Sponsor 3" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;