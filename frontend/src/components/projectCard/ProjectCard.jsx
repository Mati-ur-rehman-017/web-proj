import React from "react";
import "./ProjectCard.scss";

function ProjectCard({ card }) {
  return (
    <div className="projectCard">
      <img src={card.img} alt="" />
      <div className="info">
        <img src={card.pp} alt="" />
        <div className="project__details">
          <h2 className="project__cat">{card.cat}</h2>
          <p className="project__uname">{card.username}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
