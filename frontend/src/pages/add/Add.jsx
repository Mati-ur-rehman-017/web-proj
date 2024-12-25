import React, { useState, useEffect } from "react";
import "./Add.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload";
const Add = () => {
  const [itemName, setItemName] = useState("");
  const [img, setImg] = useState(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState([]); // State for the list of items
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define number of items per page

  const options = [
    "Cakes",
    "Buns",
    "Cupcakes",
    "Cookies",
    "Pastries",
    "Bread",
    "Brownies",
    "Special Items",
  ]; // Options for category selection

  const navigate = useNavigate();

  // Fetch the list of items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser || !currentUser._id) {
          console.log("No user found in localStorage");
          return;
        }

        const res = await newRequest.get(`/item/user/${currentUser._id}`);
        setItems(res.data);
      } catch (err) {
        console.log("Error fetching items:", err);
      }
    };

    fetchItems();
  }, []);

  // Handle file upload (called when the form is submitted)
  const handleUpload = async () => {
    if (!img) {
      console.log("No image selected");
      return null;
    }

    setUploading(true);
    try {
      const imageUrl = await upload(img); // Assuming you have an upload function
      setUploading(false);
      return imageUrl;
    } catch (err) {
      console.log("Error uploading image:", err);
      setUploading(false);
      return null;
    }
  };

  // Handle form submission for adding a new item
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const imageUrl = await handleUpload();

    if (!imageUrl) {
      console.log("Image upload failed or no image selected");
      return;
    }

    const newItem = {
      itemName,
      userId: currentUser._id,
      img: imageUrl,
      price,
      description,
      category,
      userName: currentUser.username,
    };

    try {
      await newRequest.post("/item", newItem);
      setItems([...items, newItem]);
      navigate("/"); // Navigate after successful post
    } catch (err) {
      console.log("Error posting item:", err);
    }
  };

  // Handle item deletion
  const handleDelete = async (itemId) => {
    try {
      await newRequest.delete(`/item/${itemId}`);
      setItems(items.filter((item) => item._id !== itemId));
    } catch (err) {
      console.log("Error deleting item:", err);
    }
  };

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="add container">
      <section className="add__container">
        <h1 className="add__container-title">Items</h1>

        {/* Display the existing items in a table format */}
        <div className="existing-items">
          {items.length === 0 ? (
            <p>No items available.</p>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img src={item.img} alt={item.itemName} width="50" />
                      </td>
                      <td>{item.itemName}</td>
                      <td>${item.price}</td>
                      <td>{item.category}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="pagination">
                <button
                  className="pagination-button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        {/* Add new item form */}
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
              <label htmlFor="img">Item Image</label>
              <input
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
              />
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
