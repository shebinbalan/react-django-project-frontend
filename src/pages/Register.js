import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/users/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Registration failed: " + JSON.stringify(errorData));
        return;
      }

      alert('Registered successfully!');
      navigate('/login');
    } catch (error) {
      alert("Network or server error: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div style={backgroundStyle}>
        <div style={cardStyle}>
          <h2 style={{ marginBottom: '20px' }}>Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={formGroupStyle}>
              <label>Name</label>
              <input type="text" {...register('name', { required: 'Name is required' })} style={inputStyle} />
              {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
            </div>

            <div style={formGroupStyle}>
              <label>Email</label>
              <input type="email" {...register('email', { required: 'Email is required' })} style={inputStyle} />
              {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
            </div>

            <div style={formGroupStyle}>
              <label>Password</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Min 6 characters' }
                })}
                style={inputStyle}
              />
              {errors.password && <span style={errorStyle}>{errors.password.message}</span>}
            </div>

            <button type="submit" style={buttonStyle}>Register</button>

            <p style={{ marginTop: '15px' }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Styles
const backgroundStyle = {
  minHeight: '100vh',
  backgroundImage: "url('https://images.unsplash.com/photo-1545235617-9465d2a1b1c4?auto=format&fit=crop&w=1470&q=80')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const cardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  width: '100%',
  maxWidth: '400px',
};

const formGroupStyle = {
  marginBottom: '15px',
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 'bold',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '5px',
};

const errorStyle = {
  color: 'red',
  fontSize: '0.9em',
  marginTop: '4px',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#2980b9',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

export default Register;
