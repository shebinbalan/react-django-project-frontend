import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const url =
        category === 'all'
          ? 'http://127.0.0.1:8000/products/'
          : `http://127.0.0.1:8000/products/?category=${category}`;
      try {
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      <Header />

      <div style={heroStyle}>
        <h1 style={{ color: 'white', textShadow: '2px 2px 5px black' }}>All Products</h1>
      </div>

      <div style={filterStyle}>
        <label style={{ marginRight: '10px' }}>Filter by Category:</label>
        <select onChange={(e) => setCategory(e.target.value)} value={category} style={selectStyle}>
          <option value="all">All</option>
          <option value="home">Home Appliances</option>
          <option value="gadgets">Gadgets</option>
        </select>
      </div>

      <div style={gridStyle}>
        {products.map(product => (
          <div key={product.id} style={cardStyle}>
            {product.image && (
              <img
                src={`http://127.0.0.1:8000${product.image}`}
                alt={product.productname}
                style={imageStyle}
              />
            )}
            <h3><Link to={`/product/${product.id}`} style={{ color: '#2c3e50' }}>{product.productname}</Link></h3>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p>{product.description}</p>
            <Link to={`/product/${product.id}`}>
              <button style={buttonStyle}>View Details</button>
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

// ----------------- STYLES ------------------
const heroStyle = {
  backgroundImage: "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1350&q=80')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const filterStyle = {
  padding: '20px',
  textAlign: 'center',
};

const selectStyle = {
  padding: '8px 12px',
  borderRadius: '5px',
  fontSize: '16px',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
  padding: '20px',
};

const cardStyle = {
  backgroundColor: '#f8f8f8',
  borderRadius: '10px',
  padding: '15px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  textAlign: 'center',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '10px',
  marginBottom: '10px',
};

const buttonStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

export default Products;
