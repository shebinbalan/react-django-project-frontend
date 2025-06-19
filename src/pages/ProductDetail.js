import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/products/read/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error('Error fetching product:', err);
        setError('Failed to load product.');
      });
  }, [id]);

  const addToCart = () => {
    const token = localStorage.getItem('access');

    if (!token) {
      alert('Please log in to add items to the cart.');
      navigate('/login');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('✅ Product added to cart!');
  };

  if (error) return <p style={styles.error}>{error}</p>;
  if (!product) return <p style={styles.loading}>Loading product #{id}...</p>;

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.card}>
          {product.image && (
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.productname}
              style={styles.image}
            />
          )}
          <div style={styles.details}>
            <h2 style={styles.title}>{product.productname}</h2>
            <p style={styles.category}><strong>Category:</strong> {product.category}</p>
            <p style={styles.price}><strong>Price:</strong> ${product.price}</p>
            <p style={styles.description}>{product.description}</p>
            <button style={styles.button} onClick={addToCart}>🛒 Add to Cart</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
  },
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
    padding: '1.5rem',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    flex: '1 1 40%',
  },
  details: {
    flex: '1 1 50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
  },
  category: {
    fontSize: '1rem',
    color: '#666',
  },
  price: {
    fontSize: '1.25rem',
    color: '#007b5e',
  },
  description: {
    fontSize: '1rem',
    color: '#444',
  },
  button: {
    marginTop: '1rem',
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    textAlign: 'center',
    marginTop: '3rem',
    color: 'red',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    marginTop: '3rem',
    color: '#555',
    fontSize: '1.2rem',
  },
};

export default ProductDetail;
