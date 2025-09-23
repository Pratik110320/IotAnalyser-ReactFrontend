// src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: "📡",
      title: "Real-time Connectivity",
      description: "Connect and monitor your IoT devices in real-time with our robust WebSocket-based data pipeline.",
      gradient: "gradient-blue-purple"
    },
    {
      icon: "🎯",
      title: "Live Anomaly Detection",
      description: "Our intelligent algorithms analyze incoming data streams to detect and alert you to anomalies as they happen.",
      gradient: "gradient-purple-pink"
    },
    {
      icon: "📊",
      title: "Powerful Analytics",
      description: "Visualize trends, track performance, and gain actionable insights with our comprehensive analytics dashboard.",
      gradient: "gradient-pink-red"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "10M+", label: "Data Points Processed" },
    { number: "500ms", label: "Average Response Time" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="landing-container">
      {/* Animated Background Elements */}
      <div className="background-elements">
        {/* Floating Orbs */}
        <div 
          className="floating-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="floating-orb orb-2"
          style={{
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`
          }}
        />
        
        {/* Grid Pattern */}
        <div className="grid-pattern" />
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {/* Floating Badge */}
          <div className="floating-badge">
            <span className="status-indicator"></span>
            Now with AI-powered insights
          </div>
          
          {/* Main Title */}
          <h1 className="main-title">
            IoT Analyser
          </h1>
          
          {/* Subtitle */}
          <p className="subtitle">
            Unlock the power of your IoT data with
            <span className="highlight-1"> real-time insights</span>, 
            <span className="highlight-2"> anomaly detection</span>, and 
            <span className="highlight-3"> powerful analytics</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="cta-buttons">
            <RouterLink to="/login" state={{ message: "Please log in to view the features of the app." }}>
              <button className="primary-btn">
                <span>Start Dashboard</span>
                <div className="btn-glow"></div>
              </button>
            </RouterLink>
            
            <button className="secondary-btn">
              Watch Demo
            </button>
          </div>
          
          {/* Stats Row */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          {/* Section Header */}
          <div className="section-header">
            <h2 className="section-title">
              Powerful Features
            </h2>
            <p className="section-subtitle">
              Everything you need to transform your IoT data into actionable insights
            </p>
          </div>

          {/* Feature Cards */}
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card ${feature.gradient}`}
                style={{
                  transform: `translateY(${scrollY * 0.05 * (index + 1)}px)`
                }}
              >
                {/* Gradient Border Effect */}
                <div className="card-glow"></div>
                
                {/* Content */}
                <div className="card-content">
                  <div className="card-icon">{feature.icon}</div>
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-description">{feature.description}</p>
                </div>
                
                {/* Floating Particles */}
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-card">
            {/* Animated Border */}
            <div className="cta-border"></div>
            
            <div className="cta-content">
              <h2 className="cta-title">
                Ready to Transform Your IoT Data?
              </h2>
              <p className="cta-description">
                Join thousands of organizations already using IoT Analyser to unlock the full potential of their connected devices.
              </p>
              
              <button className="cta-button">
                <span>Get Started Free</span>
                <div className="cta-button-glow"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2024 IoT Analyser. Built with ❤️ for the IoT community.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;