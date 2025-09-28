// Enhanced LandingPage.jsx with Modern Design
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Mouse tracking for parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 25,
        y: (e.clientY - window.innerHeight / 2) / 25
      });
    };

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe elements
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="landing-page">
      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          overflow-x: hidden;
          position: relative;
        }

        /* Animated Background */
        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          opacity: 0.1;
          animation: float 20s infinite linear;
        }

        .shape:nth-child(1) {
          left: 10%;
          animation-delay: 0s;
          animation-duration: 20s;
        }

        .shape:nth-child(2) {
          left: 20%;
          animation-delay: 2s;
          animation-duration: 25s;
        }

        .shape:nth-child(3) {
          left: 35%;
          animation-delay: 4s;
          animation-duration: 18s;
        }

        .shape:nth-child(4) {
          left: 50%;
          animation-delay: 6s;
          animation-duration: 22s;
        }

        .shape:nth-child(5) {
          left: 70%;
          animation-delay: 8s;
          animation-duration: 28s;
        }

        .shape:nth-child(6) {
          left: 85%;
          animation-delay: 10s;
          animation-duration: 24s;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.1;
          }
          90% {
            opacity: 0.1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          z-index: 1;
        }

        .hero-container {
          max-width: 1200px;
          text-align: center;
          position: relative;
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 800;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #ffffff 0%, #6366f1 50%, #06b6d4 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease-in-out infinite;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #cbd5e1;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.8;
        }

        .highlight {
          color: #6366f1;
          font-weight: 600;
          position: relative;
        }

        .highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #06b6d4);
          opacity: 0.6;
        }

        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
          position: relative;
          overflow: hidden;
        }

        .cta-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .cta-primary:hover::before {
          left: 100%;
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.6);
        }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: transparent;
          color: #cbd5e1;
          border: 2px solid rgba(99, 102, 241, 0.3);
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .cta-secondary:hover {
          background: rgba(99, 102, 241, 0.1);
          border-color: #6366f1;
          transform: translateY(-2px);
          color: white;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
          cursor: pointer;
        }

        .scroll-mouse {
          width: 24px;
          height: 40px;
          border: 2px solid rgba(99, 102, 241, 0.5);
          border-radius: 24px;
          display: flex;
          justify-content: center;
        }

        .scroll-wheel {
          width: 4px;
          height: 8px;
          background: #6366f1;
          border-radius: 2px;
          margin-top: 8px;
          animation: wheel 2s infinite;
        }

        @keyframes wheel {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-10px) translateX(-50%);
          }
          60% {
            transform: translateY(-5px) translateX(-50%);
          }
        }

        /* Features Section */
        .features-section {
          padding: 6rem 2rem;
          position: relative;
          z-index: 1;
          background: rgba(30, 41, 59, 0.3);
          backdrop-filter: blur(10px);
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          font-size: 1.125rem;
          color: #cbd5e1;
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .feature-card {
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(99, 102, 241, 0.5);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: block;
          animation: float-icon 3s ease-in-out infinite;
        }

        .feature-card:nth-child(2) .feature-icon {
          animation-delay: 1s;
        }

        .feature-card:nth-child(3) .feature-icon {
          animation-delay: 2s;
        }

        @keyframes float-icon {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
        }

        .feature-description {
          color: #cbd5e1;
          line-height: 1.7;
        }

        /* Stats Section */
        .stats-section {
          padding: 4rem 2rem;
          background: rgba(99, 102, 241, 0.05);
          position: relative;
          z-index: 1;
        }

        .stats-container {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .stat-item {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 2rem 1rem;
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
          border-color: rgba(99, 102, 241, 0.5);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #cbd5e1;
          font-size: 1rem;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
            max-width: 300px;
            margin: 0 auto 3rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .stat-item {
            padding: 1.5rem 1rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .stats-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Animated Background */}
      <div className="bg-animation">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="shape"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                background: `linear-gradient(45deg, rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1}), rgba(6, 182, 212, ${Math.random() * 0.3 + 0.1}))`,
                borderRadius: '50%',
                transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-container">
          <motion.h1 className="hero-title" variants={itemVariants}>
            IoT Analyser
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Transform your IoT ecosystem with{' '}
            <span className="highlight">real-time monitoring</span>,{' '}
            <span className="highlight">intelligent anomaly detection</span>, and{' '}
            <span className="highlight">actionable analytics</span>
          </motion.p>
          
          <motion.div className="cta-buttons" variants={itemVariants}>
            <Link to="/register" className="cta-primary">
              Launch Dashboard
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/login" className="cta-secondary">
              Sign In
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
        
        <div className="scroll-indicator" onClick={() => {
          document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
        }}>
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section" id="features" data-animate>
        <div className="features-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Powerful Capabilities</h2>
            <p className="section-subtitle">
              Everything you need to harness the full potential of your IoT infrastructure
            </p>
          </motion.div>
          
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="feature-icon">⚡</span>
              <h3 className="feature-title">Lightning-Fast Connectivity</h3>
              <p className="feature-description">
                Experience seamless real-time data streaming with our optimized WebSocket infrastructure. 
                Monitor thousands of devices simultaneously without breaking a sweat.
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="feature-icon">🛡️</span>
              <h3 className="feature-title">Smart Anomaly Detection</h3>
              <p className="feature-description">
                Stay ahead of issues with intelligent pattern recognition that identifies anomalies instantly. 
                Get alerts before problems impact your operations.
              </p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="feature-icon">📈</span>
              <h3 className="feature-title">Comprehensive Analytics</h3>
              <p className="feature-description">
                Turn raw data into strategic insights with interactive visualizations and detailed reports. 
                Make data-driven decisions with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section
      <section className="stats-section" data-animate>
        <div className="stats-container">
          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </motion.div>
          
          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="stat-number">10K+</div>
            <div className="stat-label">Devices Monitored</div>
          </motion.div>
          
          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="stat-number">1M+</div>
            <div className="stat-label">Data Points/Day</div>
          </motion.div>
          
          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="stat-number">&lt;1ms</div>
            <div className="stat-label">Response Time</div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default LandingPage;