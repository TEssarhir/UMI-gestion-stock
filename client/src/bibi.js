import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './css/bibi.css'; // We'll create this CSS file next

const Bibi = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const messageRef = useRef(null);
  
  const heartfeltMessages = [
    "Hey hbiba, I've missed you so much...",
    "I know I made mistakes, and I'm truly sorry",
    "Every day without you feels incomplete",
    "You are the most amazing person I've ever met",
    "Your smile lights up my entire world",
    "I promise you will be proud of me",
    "You deserve everything in this world",
    "I'm hoping for a chance to make things right",
    "No one understands me like you do",
    "Can we work on this together?",
    "I can't wait to see you again",
    "I love you, now and always my precious princess ❤️",
  ];
  
  // Check if dark mode is active when component mounts
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    // Show initial message after a delay
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Create falling hearts animation
    if (showHearts) {
      const interval = setInterval(() => {
        createHeart();
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [showHearts]);
  
  // Handle dark mode toggle
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
  };
  
  // Create a floating heart element
  const createHeart = () => {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    
    // Random position and size
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = Math.random() * 10 + 20 + 'px';
    
    heart.innerHTML = '❤️';
    document.body.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
      heart.remove();
    }, 5000);
  };
  
  // Go to next message
  const nextMessage = () => {
    if (currentMessageIndex < heartfeltMessages.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
      
      // Trigger heart animation at certain message indexes
      if (currentMessageIndex === 3 || currentMessageIndex === 9 || currentMessageIndex === heartfeltMessages.length - 2) {
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 3000);
      }
      
      // Add animation class
      if (messageRef.current) {
        messageRef.current.classList.add('message-change');
        setTimeout(() => {
          messageRef.current.classList.remove('message-change');
        }, 500);
      }
    }
  };
  
  return (
    <div className={`page-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="background-container"></div>
      <header className="bibi-header">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-text">For Bibi<span className="accent-dot">.</span></span>
          </div>
          
          <div className="nav-actions">
            <button onClick={toggleDarkMode} className="theme-toggle" aria-label="Toggle Dark Mode">
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
            <Link to="/login" className="back-button">Logout</Link>
          </div>
        </div>
      </header>

      <div className="bibi-container">
        <div className="message-card">
          <div className="polaroid">
            <div className="polaroid-content">
              <div className="heart-decoration top-left"></div>
              <div className="heart-decoration top-right"></div>
              
              {showMessage ? (
                <div className="message-content">
                  <h2 className="message-title">Dear Bibi</h2>
                  <p ref={messageRef} className="message-text">
                    {heartfeltMessages[currentMessageIndex]}
                  </p>
                  
                  <div className="message-controls">
                    {currentMessageIndex < heartfeltMessages.length - 1 ? (
                      <button className="next-button" onClick={nextMessage}>
                        <span>Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    ) : (
                      <div className="final-message">
                        <div className="heart-animation">❤️</div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="loading-message">
                  <div className="pulsating-heart">❤️</div>
                </div>
              )}
              
              <div className="heart-decoration bottom-left"></div>
              <div className="heart-decoration bottom-right"></div>
            </div>
            <div className="polaroid-caption">
              To the one who means everything to me
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bibi;