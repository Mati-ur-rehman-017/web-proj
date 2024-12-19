import React, { useState, useEffect } from "react";
import "./Add.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload";

const Add = () => {
  const [itemName, setItemName] = useState("");
  const [userId, setUserId] = useState(""); // Add userId here
  const [img, setImg] = useState(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);

  const options = ["Cakes", "Buns", "Cupcakes", "Cookies", "Pastries", "Bread", "Brownies", "Special Items"]; // Options for category selection

  const navigate = useNavigate();

  // Handle file upload (called when the form is submitted)
  const handleUpload = async () => {
    console.log("here");
    if (!img) {
      console.log("No image selected");
      return null; // If no image is selected, return null
    }

    setUploading(true);
    try {
      // Assuming you have an upload function in utils
      const imageUrl = await upload(img); // Upload the image and get the URL
      setUploading(false);
      return imageUrl;
    } catch (err) {
      console.log("Error uploading image:", err);
      setUploading(false);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Upload image and get the image URL
    const imageUrl = await handleUpload();

    if (!imageUrl) {
      console.log("Image upload failed or no image selected");
      return; // Prevent form submission if image upload fails
    }

    // Prepare item data to be sent to the server
    const newItem = {
      itemName,
      userId: currentUser._id, // Make sure you have userId set
      img: imageUrl, // Set the uploaded image URL
      price,
      description,
      category,
    };

    // Direct POST request to add the item
    try {
      await newRequest.post("/item", newItem);
      navigate("/"); // Navigate to the items list page after successful post
    } catch (err) {
      console.log("Error posting item:", err);
    }
  };

  return (
    <div className="add container">
      <section className="add__container">
        <h1 className="add__container-title">Add New Item</h1>
        <div className="add__container-sections">
          <div className="info">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={itemName}
              placeholder="Name"
              onChange={(e) => setItemName(e.target.value)}
            />

            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a category
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="img">Item Image</label>
                <input
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
              {uploading && <p>Uploading...</p>}
            </div>

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={description}
              placeholder="Describe your item"
              rows="5"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="details">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <button className="create__btn btn" onClick={handleSubmit}>
          Add Item
        </button>
      </section>
    </div>
  );
};

export default Add;
