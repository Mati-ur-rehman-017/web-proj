import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      console.log("ghhh");
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register container">
      <form onSubmit={handleSubmit} className="register__form">
        <div className="left">
          <h1 className="register__form-title">Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="enter a unique username"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="enter an email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            placeholder="enter password"
            onChange={handleChange}
          />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="enter country"
            onChange={handleChange}
          />
        </div>
        <div className="right">
          <h1 className="register__form-title">I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slidertog round"></span>
            </label>
          </div>
          <label htmlFor="" className="phlabel">
            Phone Number
          </label>
          <input
            name="phone"
            type="text"
            placeholder="+91 8734345778"
            onChange={handleChange}
            className="phoneno"
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn register__btn">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
