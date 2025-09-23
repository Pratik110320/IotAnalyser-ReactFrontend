import React, { useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './LandingPage.css';


export default function LandingPage() {
useEffect(() => {
// Smooth scroll on indicator click
const indicator = document.querySelector('.scroll-indicator');
const statsSection = document.querySelector('.stats-section');
if (indicator && statsSection) {
indicator.addEventListener('click', () => {
statsSection.scrollIntoView({ behavior: 'smooth' });
});
}


// Intersection observer for scroll animations
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px',
};


const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.style.animationPlayState = 'running';
}
});
}, observerOptions);


document.querySelectorAll('.feature-card, .stat-item, .section-header').forEach((el) => {
el.style.animationPlayState = 'paused';
observer.observe(el);
});


// Ripple effect for buttons
const buttons = document.querySelectorAll('button');
const clickHandler = function (e) {
const ripple = document.createElement('span');
const rect = this.getBoundingClientRect();
const size = Math.max(rect.width, rect.height);
const x = e.clientX - rect.left - size / 2;
const y = e.clientY - rect.top - size / 2;


ripple.style.width = ripple.style.height = size + 'px';
ripple.style.left = x + 'px';
ripple.style.top = y + 'px';
ripple.classList.add('ripple');


this.appendChild(ripple);


setTimeout(() => ripple.remove(), 600);
};


buttons.forEach((b) => b.addEventListener('click', clickHandler));


return () => {
if (indicator && statsSection) indicator.removeEventListener('click', () => {});
buttons.forEach((b) => b.removeEventListener('click', clickHandler));
observer.disconnect();
};
}, []);


// generate particles positions (same as original inline styles)
const particles = [10,20,30,40,50,60,70,80,90];
return (
<div className="landing-container">
<NavBar />


{/* Animated Particles */}
<div className="particles">
{particles.map((left, i) => (
<div
key={i}
className="particle"
style={{ left: `${left}%`, animationDelay: `${i * 2}s` }}
/>
))}
</div>


{/* Hero Section */}
<section className="hero-section">
<div className="hero-content">
<h1 className="main-title">IoT Analyser</h1>


<p className="subtitle">
Transform your IoT ecosystem with
<span className="highlight"> real-time monitoring</span>,
<span className="highlight"> intelligent anomaly detection</span>, and
<span className="highlight"> actionable analytics</span>
</p>


<div className="cta-container">
<button className="primary-btn">Launch Dashboard →</button>

</div>
</div>


<div className="scroll-indicator">
<div className="scroll-mouse">
<div className="scroll-wheel" />
</div>
</div>
</section>


{/* Features Section */}
<section className="features-section">
<div className="features-container">
<div className="section-header">
<h2 className="section-title">Powerful Capabilities</h2>
<p className="section-subtitle">Everything you need to harness the full potential of your IoT infrastructure</p>
</div>


<div className="features-grid">
<div className="feature-card">
<div className="card-icon">⚡</div>
<h3 className="card-title">Lightning-Fast Connectivity</h3>
<p className="card-description">
Experience seamless real-time data streaming with our optimized WebSocket infrastructure. Monitor thousands of devices simultaneously without breaking a sweat.
</p>
</div>


<div className="feature-card">
<div className="card-icon">🛡️</div>
<h3 className="card-title">Smart Anomaly Detection</h3>
<p className="card-description">
Stay ahead of issues with intelligent pattern recognition that identifies anomalies instantly. Get alerts before problems impact your operations.
</p>
</div>


<div className="feature-card">
<div className="card-icon">📈</div>
<h3 className="card-title">Comprehensive Analytics</h3>
<p className="card-description">
Turn raw data into strategic insights with interactive visualizations and detailed reports. Make data-driven decisions with confidence.
</p>
</div>
</div>
</div>
</section>


<Footer />
</div>
);
}