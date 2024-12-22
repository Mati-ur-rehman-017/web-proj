import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cart.scss";
import newRequest from "../../utils/newRequest";

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
  const handleSubmit = async () => {
    try {
      const buyer = JSON.parse(localStorage.getItem("currentUser"));
      console.log(buyer._id);
      // Map cart items to the required order format
      const orders = cartItems.map((item) => ({
        itemName: item.itemName,
        quantity: item.quantity,
        sellerId: item.userId, 
        buyerId: buyer._id,
        payment_intent: "pi_example123", 
        img:item.img,
        price:item.price,
      }));
      console.log("hr");
      
      // Make an API call to submit the orders
      const response = await newRequest.post("/orders", { orders });

  
      // Clear cart upon successful submission
      setCartItems([]);
      localStorage.setItem("cart", JSON.stringify([]));
  
      alert("Cart submitted successfully!");
    } catch (error) {
      console.error("Error submitting cart:", error);
      alert("There was an error submitting your cart.");
    }
  };
  

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="orders container">
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
                    <img className="image" src={item.img} alt={item.itemName} />
                  </div>
                </td>
                <td>{item.itemName}</td>
                <td>$ {item.price * item.quantity}</td>
                <td>{item.quantity}</td>
                <td>
                  <div className="actions">
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2"></td>
              <td><strong>Total</strong></td>
              <td><strong>$ {calculateTotal()}</strong></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <div className="submit-button-container">
          <button className="submit-button" onClick={handleSubmit}>
            Submit Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
