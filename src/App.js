import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import VideoIntro from './components/VideoIntro';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Footer from './components/Footer';
import SpaceBackground from './components/SpaceBackground';
import AnimatedBackground from './components/AnimatedBackground';
import Home from './pages/Home';
import Events from './pages/Events';
import Guest from './pages/Guest';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Volunteer from './pages/Volunteer';
import Student from './pages/Student';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the intro in this session
    const introSeen = sessionStorage.getItem('introSeen');
    if (introSeen === 'true') {
      setShowIntro(false);
      setHasSeenIntro(true);
    }
  }, []);

  const handleVideoEnd = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    // Mark intro as seen in session storage (only for this session)
    sessionStorage.setItem('introSeen', 'true');
  };

  return (
    <>
      {showIntro && !hasSeenIntro && <VideoIntro onVideoEnd={handleVideoEnd} />}
      
      <Router>
        <div className="App">
          <SpaceBackground />
          <AnimatedBackground />
          <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
          <Menu isOpen={menuOpen} setIsOpen={setMenuOpen} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/student" element={<Student />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
