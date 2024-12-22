import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();



  return (
    <div className="hero">
      <div className="hero__container container">
        {/* <div className="hero__top"> */}
        <h1 className="hero__title"> Where passion meets purpose! Empowering women through the art of baking,{" "} 
          <span className="hero__title-sub">bakeHeaven </span> 
          is your go-to for delicious treats with a cause! </h1>
      </div>
    </div>
  );
}

export default Featured;
