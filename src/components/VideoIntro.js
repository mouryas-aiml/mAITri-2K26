import React, { useState, useEffect, useRef } from 'react';
import './VideoIntro.css';

function VideoIntro({ onVideoEnd }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Reset and load the video when component mounts
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Reset video to beginning
      video.currentTime = 0;
      
      // Load the video
      video.load();
      
      // Attempt to play after loading
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Autoplay prevented:', error);
          // If autoplay is blocked, show a play button or skip to content
        });
      }
    }
  }, []);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    // Wait a moment before calling the callback
    setTimeout(() => {
      onVideoEnd();
    }, 300);
  };

  const handleSkip = () => {
    setIsPlaying(false);
    onVideoEnd();
  };

  if (!isPlaying) {
    return null;
  }

  return (
    <div className="video-intro-container">
      <video
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      >
        <source src="/maitri.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Skip Button */}
      <button className="skip-button" onClick={handleSkip}>
        Skip Intro →
      </button>
    </div>
  );
}

export default VideoIntro;
