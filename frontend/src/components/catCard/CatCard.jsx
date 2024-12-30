import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    console.log(item);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.itemName} has been added to your cart!`);
  };

  const handleContact = () => {
    // Navigate to the owner's profile or initiate a conversation
    navigate(`/profile/${card.userId}`);
  };

  return (
    <div>
      <div className="category__card">
        <img src={card.img} alt="" />
        <div className="category__details">
          <p className="category__title">{card.itemName}</p>
          <p className="category__desc">{card.description}</p>
          <p className="category__title">Price: Rs.{card.price}</p>
          <p className="category__owner">
            Owner:
            <span className="owner-link" onClick={handleContact}>
              {card.userName}
            </span>
          </p>
          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(card)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CatCard;
