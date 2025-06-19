import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Message Sent!\nName: ${formData.name}\nEmail: ${formData.email}`);
    setFormData({ name: '', email: '', message: '' }); // reset form
  };

  return (
    <>
      <Header />

      <div style={backgroundStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h2>Contact Us</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={{ ...inputStyle, resize: 'none' }}
          />
          <button type="submit" style={buttonStyle}>Send Message</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

// ✅ Styles
const backgroundStyle = {
  backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '90vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px 10px',
};

const formStyle = {
  backgroundColor: 'rgba(0,0,0,0.75)',
  color: 'white',
  padding: '30px',
  borderRadius: '10px',
  maxWidth: '500px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  fontSize: '1rem',
};

const buttonStyle = {
  padding: '12px',
  backgroundColor: '#27ae60',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  fontSize: '1rem',
  cursor: 'pointer',
};

export default Contact;
