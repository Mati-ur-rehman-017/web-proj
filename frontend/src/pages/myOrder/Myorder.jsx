import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Myorder.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
 

const Myorder = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch orders
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders/my`, {
        params: {
          userId: currentUser?._id,
        },
      }).then((res) => {
        console.log(res.data);
        return res.data;
      }),
    staleTime: 0,
  });

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await newRequest.delete(`/orders/${orderId}`);
        alert("Order deleted successfully.");
        window.location.reload();
      } catch (err) {
        console.error("Failed to delete the order:", err);
        alert("An error occurred while deleting the order.");
      }
    }
  };

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = data ? data.slice(startIndex, endIndex) : [];
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

  return (
    <div className="orders container">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="orders__container">
          <div className="title-bar">
            <h1 className="title">Orders for me</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <div className="image_cont">
                      <img className="image" src={order.img} alt="" />
                    </div>
                  </td>
                  <td>{order.itemName}</td>
                  <td>$ {order.price}</td>
                  <td>
                    <div className="image_cont">
                      <img
                        className="message"
                        src="./img/others/chat.png"
                        alt=""
                        onClick={() => handleContact(order)}
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(order._id)}
                    >
                      Finish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </div>
      )}
    </div>
  );
};

export default Myorder;
