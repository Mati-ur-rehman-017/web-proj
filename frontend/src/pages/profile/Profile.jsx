import React, { useState, useEffect } from "react";
import upload from "../../utils/upload";
import "./Profile.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    phone: "",
    desc: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle seller account toggle
  const handleSeller = (e) => {
    setUser((prev) => ({
      ...prev,
      isSeller: e.target.checked,
    }));
  };

  // Handle profile update submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imgUrl = user.img;
    if (file) {
      imgUrl = await upload(file);
    }

    try {
      const updatedUser = {
        ...user,
        img: imgUrl,
      };
      console.log('herr');
      const res = await newRequest.put("/auth/update", updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(res.data)); // Update localStorage with updated data
      alert("Profile updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "An error occurred while updating the profile.");
    }
  };

  return (
    <div className="profile container">
      <form onSubmit={handleSubmit} className="profile__form">
        <div className="left">
          <h1 className="profile__form-title">Edit Your Profile</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter a unique username"
            value={user.username}
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter a new password"
            value={user.password}
            onChange={handleChange}
          />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">City</label>
          <input
            name="country"
            type="text"
            placeholder="Enter your city"
            value={user.country}
            onChange={handleChange}
          />
        </div>
        <div className="right">
          <h1 className="profile__form-title">Seller Information</h1>
          <div className="toggle">
            <label htmlFor="" >Activate Seller Account</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={user.isSeller}
                onChange={handleSeller}
              />
              <span className="slidertog round  "></span>
            </label>
          </div>
          <label htmlFor="" className="phlabel">
            Phone Number
          </label>
          <input
            name="phone"
            type="text"
            placeholder="+91 8734345778"
            value={user.phone}
            onChange={handleChange}
            className="phoneno"
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            cols="30"
            rows="10"
            value={user.desc}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn profile__btn"
          style={{
            display: "block", // Makes it a block element so it can be centered
            margin: "10px auto", // Centers the button horizontally
            padding: "10px 20px", // Adds padding (top-bottom: 10px, left-right: 20px)
            textAlign: "center", // Aligns text in the center
          }}
        >
          Update Profile
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Profile;
