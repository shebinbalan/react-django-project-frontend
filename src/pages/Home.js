import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import '../App.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const url =
      category === 'all'
        ? 'http://127.0.0.1:8000/products/'
        : `http://127.0.0.1:8000/products/?category=${category}`;

    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log('Error fetching products:', err));
  }, [category]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      const newWishlist = [...wishlist, product];
      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      alert('Added to wishlist!');
    } else {
      alert('Already in wishlist!');
    }
  };

  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);

  const addToCart = async (product) => {
    const token = localStorage.getItem('access');
    if (!token) {
      alert('Please login to add items to your cart.');
      return;
    }

    try {
      await axios.post(
        'http://127.0.0.1:8000/cart/',
        {
          product_id: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Added "${product.productname}" to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error);
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
      } else {
        alert('Failed to add to cart.');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="hero">
        <h1>Welcome to Our Store</h1>
      </div>

      <div className="filter-section">
        <label htmlFor="categorySelect">Filter by Category:</label>
        <select
          id="categorySelect"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="category-select"
        >
          <option value="all">All</option>
          <option value="home">Home Appliances</option>
          <option value="gadgets">Gadgets</option>
        </select>
      </div>

      <div className="product-list-section">
        <h2>Product List</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
             <button
              onClick={() => addToWishlist(product)}
              className={`wishlist-btn ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
              title={isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
            >
              ♥
            </button>

              <h3>
                <Link to={`/product/${product.id}`}>{product.productname}</Link>
              </h3>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p>{product.description}</p>

              {product.image && (
                <img
                  src={`http://127.0.0.1:8000${product.image}`}
                  alt="Product"
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.jpg'; // Default fallback image
                  }}
                />
              )}

              <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
