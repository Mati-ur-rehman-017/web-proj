import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  // Fetch orders
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`,{
        params: {
          userId: currentUser?._id, // Pass the user ID as a query parameter
        },
      }).then((res) => {
        console.log(res.data);
        return res.data;
      }),
    staleTime: 0, // Disable cache reuse; always fetch fresh data
  });

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await newRequest.delete(`/orders/${orderId}`);
        alert("Order deleted successfully.");
        // Refresh the page after deletion
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

  return (
    <div className="orders container">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="orders__container">
          <div className="title-bar">
            <h1 className="title">Orders</h1>
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
              {data.map((order) => (
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
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
