import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMsg = result.detail || result.non_field_errors?.[0] || "Login failed";
        alert("Login failed: " + errorMsg);
        return;
      }

      localStorage.setItem('access', result.access); // ✅ token stored
      localStorage.setItem('refresh', result.refresh);
      localStorage.setItem('user', JSON.stringify(result.user));

      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div style={backgroundStyle}>
        <div style={cardStyle}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  minLength: { value: 6, message: 'Min length is 6' }
                })}
                style={inputStyle}
              />
              {errors.password && <span style={errorStyle}>{errors.password.message}</span>}
            </div>

            <button type="submit" style={buttonStyle}>Login</button>
            <p style={{ marginTop: '15px' }}>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

const backgroundStyle = {
  minHeight: '100vh',
  backgroundImage: "url('https://images.unsplash.com/photo-1581090700227-1e8a6c039f55?auto=format&fit=crop&w=1470&q=80')",
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
  backgroundColor: '#27ae60',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

export default Login;
