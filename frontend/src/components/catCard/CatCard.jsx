import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  return (
    <div >
      <div className="category__card">
        <img src={card.img} alt="" />
        <div className="category__details">
          <p className="category__desc">{card.desc}</p>
          <p className="category__title">{card.title}</p>
        </div>
      </div>
    </div>
  );
}
export default CatCard;
