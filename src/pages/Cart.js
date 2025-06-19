import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../App.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('access');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!token) {
          alert("User not logged in");
          return;
        }

        const response = await fetch('http://localhost:8000/cart/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart.");
        }

        const data = await response.json();

        const formatted = data.map(item => ({
          ...item,
          quantity: item.quantity || 1,
          isGift: item.isGift || false,
          productname: item.product?.productname || "Unnamed",
          image: item.product?.image,
          price: item.product?.price,
          category: item.product?.category,
        }));

        setCartItems(formatted);
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  const handleQuantityChange = (id, increment = true) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + (increment ? 1 : -1)),
            }
          : item
      )
    );
  };

  const handleDelete = async id => {
    try {
      const response = await fetch(`http://localhost:8000/cart/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
      } else {
        console.error("Failed to delete item");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const getTotalPrice = () =>
    cartItems
      .reduce((sum, item) => sum + parseFloat(item.price || 0) * item.quantity, 0)
      .toFixed(2);

  const imageStyle = {
    width: '120px',
    height: 'auto',
    borderRadius: '8px',
    marginRight: '20px',
  };

  return (
    <>
      <Header />
      <div className="cart-page">
        <h2 className="cart-title">🛍️ Shopping Cart</h2>

        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(item => (
              <div className="cart-item card-shadow" key={item.id}>
                {item.image && (
                  <img
                    src={`http://127.0.0.1:8000${item.image}`}
                    alt={item.productname}
                    style={imageStyle}
                  />
                )}
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.productname}</h3>
                  <p className="cart-item-meta">Category: {item.category}</p>
                  <p className="cart-item-meta">In stock</p>
                  <div className="cart-item-price">
                    ₹{item.price} × {item.quantity} = ₹
                    {(item.price * item.quantity).toFixed(2)}
                  </div>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, false)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, true)}
                    >
                      +
                    </button>
                  </div>

                  <div className="gift-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={item.isGift}
                        onChange={e => {
                          const updated = cartItems.map(it =>
                            it.id === item.id
                              ? { ...it, isGift: e.target.checked }
                              : it
                          );
                          setCartItems(updated);
                        }}
                      />{' '}
                      This will be a gift
                    </label>
                  </div>

                  <div className="cart-actions">
                    <button onClick={() => handleDelete(item.id)}>❌ Delete</button>
                    <button>💾 Save for later</button>
                    <button>📊 Compare</button>
                    <button>🔗 Share</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <div className="summary-line">
                <span>
                  Subtotal ({cartItems.length} item{cartItems.length > 1 ? 's' : ''}):
                </span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="free-delivery">
                ✅ Your order is eligible for <strong>FREE Delivery</strong>.
              </div>
              <div className="gift-option">
                <label>
                  <input type="checkbox" /> This order contains a gift
                </label>
              </div>
              <button className="checkout-btn">Proceed to Buy</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
