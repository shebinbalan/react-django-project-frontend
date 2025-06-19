import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(storedWishlist);
  }, []);

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // Move to cart and remove from wishlist
  const moveToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.find(item => item.id === product.id)) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Moved to cart!');
    } else {
      alert('Item already in cart!');
    }
    removeFromWishlist(product.id);
  };

  return (
    <>
      <Header />
      <div style={pageStyle}>
        <h2>💖 Your Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item, index) => (
            <div key={index} style={itemStyle}>
              <img
                src={`http://127.0.0.1:8000${item.image}`}
                alt={item.productname}
                style={imageStyle}
              />
              <div style={{ flex: 1 }}>
                <h3>{item.productname}</h3>
                <p>{item.category}</p>
                <p>${item.price}</p>

                <button style={btnStyleRemove} onClick={() => removeFromWishlist(item.id)}>
                  Remove
                </button>

                <button style={btnStyleMove} onClick={() => moveToCart(item)}>
                  Move to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
}

// Basic styling
const pageStyle = { padding: '30px' };
const itemStyle = {
  display: 'flex',
  gap: '20px',
  marginBottom: '20px',
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};
const imageStyle = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '6px',
};

const btnStyleRemove = {
  marginRight: '10px',
  padding: '8px 12px',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const btnStyleMove = {
  padding: '8px 12px',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Wishlist;
