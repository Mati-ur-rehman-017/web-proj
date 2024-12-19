import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="hero">
      <div className="hero__container container">
        {/* <div className="hero__top"> */}
        <h1 className="hero__title">
          here students trade treasures and talents! from books to bytes,{" "}
          <span className="hero__title-sub">Agora&apos;s</span> your spot for
          smart swapping!
        </h1>
        <div className="hero__search">
          <div className="hero__searchInput">
            <input
              type="text"
              placeholder='Try "camera"'
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="hero__search-btn" onClick={handleSubmit}>
            <img src="./img/others/srch.png" alt="" />
          </div>
        </div>
        {/* </div> */}
        {/* <div className="hero__bottom">

          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Featured;
