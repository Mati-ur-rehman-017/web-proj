import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.scss";
import Navitem from "./navitem/Navitem";
import React from "react";

const menu = {
  open: {
    height: "450px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    height: "0px",
    transition: {
      duration: 0.75,
      delay: 0.1,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="navig">
      <motion.div
        className="navig__hdmenu"
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
        onClick={() => {
          toggleMenu();
        }}
      >
        <AnimatePresence>{isActive && <Navitem />}</AnimatePresence>
      </motion.div>
      <div
        className="navig__menu"
        onClick={() => {
          toggleMenu();
        }}
      >
        <div className="navig__logo">Foodies</div>
        <div className="navig__list">{isActive ? "close" : "menu"}</div>
      </div>

      {/* <div className="navbar">
        <div className="navbar__item">agora</div>
        <div className="navbar__item">acc</div>
        <div className="navbar__item">menu</div>
      </div> */}
    </div>
  );
}
