import React from "react";
import "./Head.scss";
import { Link } from "react-router-dom";

export default function Head() {
  return (
    <div className="header container">
      <div>
        <Link to="/" className="header__title">
          bakeHeaven.
        </Link>
        <div className="header__subtitle">trade foods and talents!</div>
      </div>
    </div>
  );
}
