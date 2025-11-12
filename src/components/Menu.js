import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu({ isOpen, setIsOpen }) {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Overlay - Split Screen */}
      <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
        {/* Left Side - Logo Animation */}
        <div className="menu-left-section">
          <div className="menu-logo-animation">
            <img src="/logo192.png" alt="mAITri Logo" />
          </div>
          <div className="menu-tagline">
            <span>Bold, Mysterious, Unforgettable</span>
          </div>
        </div>

        {/* Right Side - Menu Items */}
        <div className="menu-right-section">
          {/* Close Button */}
          <button className="close-button" onClick={toggleMenu}>
            ✕
          </button>

          {/* Menu Navigation */}
          <nav className="menu-nav">
            <Link to="/" className="menu-item" onClick={closeMenu}>HOME</Link>
            <Link to="/events" className="menu-item" onClick={closeMenu}>EVENTS</Link>
            <Link to="/guest" className="menu-item" onClick={closeMenu}>GUEST</Link>
            <Link to="/contact" className="menu-item" onClick={closeMenu}>CONTACT US</Link>
            <Link to="/register" className="menu-item" onClick={closeMenu}>REGISTER</Link>
            <Link to="/login" className="menu-item" onClick={closeMenu}>LOGIN</Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Menu;
export { Menu };
