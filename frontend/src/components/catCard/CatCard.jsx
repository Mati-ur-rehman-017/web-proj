import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {

  const handleAddToCart = (item) => {
    // Fetch the current cart from local storage
    console.log(item);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
  
    if (existingItem) {
      // If the item exists, increase its quantity
      existingItem.quantity += 1;
    } else {
      // If the item does not exist, add it with a quantity of 1
      cart.push({ ...item, quantity: 1 });
    }
  
    // Save the updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    console.log(`${item.itemName} added to cart`);
  };
  return (
    <div >
      <div className="category__card">
        <img src={card.img} alt="" />
        <div className="category__details">
        <p className="category__title">{card.itemName}</p>
          <p className="category__desc">{card.description}</p>
        <p className="category__title">Price:{card.price}</p>
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(card)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default CatCard;
