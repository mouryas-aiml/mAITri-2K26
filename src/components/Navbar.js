import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onMenuToggle }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Left Side - College Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-link">
          <img src="/College Logo.svg" alt="College Logo" className="navbar-college-logo" />
        </Link>
      </div>

      {/* Center - Main Logo */}
      <div className="navbar-center">
        <Link to="/" className="navbar-main-logo-link">
          <img src="/logo192.png" alt="mAITri Logo" className="navbar-main-logo" />
        </Link>
      </div>

      {/* Right Side - Hamburger Menu */}
      <div className="navbar-right">
        <button className="navbar-hamburger" onClick={onMenuToggle}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
