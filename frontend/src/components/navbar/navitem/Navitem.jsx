import "./Navitem.scss";
import React from "react";
import { motion } from "framer-motion";
import { perspective } from "./anim";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../../utils/newRequest";

export default function Navitem() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navitems">
      <motion.div
        custom={2}
        variants={perspective}
        initial="initial"
        animate="enter"
        exit="exit"
        className="navitemsbody"
      >
        
        {/* <Link className="link" to="/gigs">
          <a>Explore</a>
        </Link> */}
        {currentUser ? (
          <div className="nav__user">
            <div className="signedin__user">
              <p>{currentUser?.username}</p>
              <img src={currentUser.img || "/img/noAvatar.png"} alt="" />
            </div>
            <div className="signedin__user-options">
              {currentUser.isSeller && (
                <>
                  <Link className="link" to="/add">
                    <a>Add New Item</a>
                  </Link>
                </>
              )}
              <Link className="link" to="/cart">
                    <a>Cart</a>
                  </Link>
              <Link className="link" to="/profile">
                Profile
              </Link>
              <Link className="link" to="/orders">
                Orders
              </Link>
              <Link className="link" to="/messages">
                Messages
              </Link>
              <Link className="link" onClick={handleLogout}>
                Logout
              </Link>

            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="link">
              Sign in
            </Link>
            <Link className="link" to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
        <Link className="link" to="/">
          <a>Home</a>
        </Link>
      </motion.div>
      {/* {links.map((link, i) => {
          const { title, href } = link;
          return (
            <div key={`b_${i}`}>
              <motion.div
                href={href}
                // key={`b_${i}`}
                className="linkContainer"
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <a href={href}>{title}</a>
              </motion.div>
            </div>
          );
        })} */}
      {/* {links.map((link, i) => {
          const { title, href } = link;
          return (
            <div key={`b_${i}`}>
              <motion.div
                href={href}
                // key={`b_${i}`}
                className="linkContainer"
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <a href={href}>{title}</a>
              </motion.div>
            </div>
          );
        })} */}
      <div className="linkContainer">
        {/* <a href="/">Projects</a> */}
        {/* {!currentUser?.isSeller && <a>Become Seller</a>} */}
        {/* {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        <a>Gigs</a>
                      </Link>
                      <Link className="link" to="/add">
                        <a>Add New Gig</a>
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
    
          )} */}
      </div>
    </div>
  );
}
