import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cart.scss";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from local storage on component mount
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  // Save updated cart back to local storage
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase item quantity
  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  // Decrease item quantity
  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove items with quantity 0
    setCartItems(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  // Handle submit button click
  const handleSubmit = () => {
    alert("Cart submitted successfully!");
    // Clear cart after submission
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <div className="orders container">
      {(
        <div className="orders__container">
          <div className="title-bar">
            <h1 className="title">Cart</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="image_cont">
                      <img className="image" src={item.img} alt="" />
                    </div>
                  </td>
                  <td>{item.itemName}</td>
                  <td>$ {item.price * item.quantity}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <div className="actions">
                      <button onClick={() => increaseQuantity(item.id)}>
                        +
                      </button>
                      <button onClick={() => decreaseQuantity(item.id)}>
                        -
                      </button>
                      <button onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="submit-button-container">
            <button className="submit-button" onClick={handleSubmit}>
              Submit Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
