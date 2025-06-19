import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

function About() {
  return (
    <>
      <Header />

      <div style={heroStyle}>
        <h1 style={heroTextStyle}>Welcome to Our Store</h1>
      </div>

      <div style={contentStyle}>
        <h2>About Us</h2>
        <p>Welcome to My Product Store! We offer the best products at the best prices.</p>
        <p>Our mission is to provide excellent shopping experiences.</p>
      </div>

      <Footer />
    </>
  );
}

// ✅ Styles
const heroStyle = {
  backgroundImage: "url('https://images.unsplash.com/photo-1607083201422-cdb3b4d8ff59?auto=format&fit=crop&w=1350&q=80')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const heroTextStyle = {
  color: 'white',
  fontSize: '3rem',
  textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
};

const contentStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  padding: '40px',
  margin: '30px auto',
  borderRadius: '10px',
  maxWidth: '700px',
  textAlign: 'center',
};

export default About;
