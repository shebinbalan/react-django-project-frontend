import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={linkContainerStyle}>
        <Link to="/about" style={linkStyle}>About Us</Link>
        <Link to="/contact" style={linkStyle}>Contact Us</Link>
      </div>
      <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
    </footer>
  );
}

// Styles
const footerStyle = {
  backgroundColor: '#222',
  padding: '20px 10px',
  color: 'white',
  textAlign: 'center',
  marginTop: '20px',
};

const linkContainerStyle = {
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '500',
};

export default Footer;
