import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access'); // check if user is logged in

  const handleLogout = async () => {
    const refresh = localStorage.getItem('refresh');
    try {
      await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify({ refresh }),
      });
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>My Product Store</div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/products" style={styles.link}>Products</Link>
         <Link to="/cart" style={styles.link}>Cart</Link>
        {isLoggedIn && (
          <>
            <Link to="/wishlist" style={styles.link}>Wishlist</Link>
            
            <span onClick={handleLogout} style={{ ...styles.link, cursor: 'pointer' }}>
              Logout
            </span>
          </>
        )}

        {!isLoggedIn && (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#222',
    padding: '10px 20px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default Header;
