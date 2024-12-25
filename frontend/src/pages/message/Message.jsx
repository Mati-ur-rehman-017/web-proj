import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const createConversation = useMutation({
    mutationFn: () => {
      return newRequest.post(`/conversations`, {
        to: id,
      }); // Adjust payload for conversation creation
    },
    onSuccess: () => {
      console.log("Conversation created successfully.");
    },
  });

  useEffect(() => {
    const checkAndCreateConversation = async () => {
      try {
        const res = await newRequest.get(`/conversations/single/${id}`);
        if (!res.data) {

          createConversation.mutate();
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // If conversation does not exist, create it
          createConversation.mutate();
        } else {
          console.error("Error checking conversation:", err);
        }
      }
    };

    checkAndCreateConversation();
  }, [id, createConversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const messagePayload = {
      conversationId: id,
      desc: e.target[0].value,
      userId:currentUser._id,
    };
  
    console.log("Attempting to send message with payload:", messagePayload);
  
    try {
      // Make a direct POST request to your backend
      const response = await newRequest.post(`/messages`, messagePayload);
      console.log("Message successfully sent:", response.data);
  
      // Clear the input field after a successful POST
      e.target[0].value = "";
  
      // Optionally, trigger a re-fetch of messages (if needed)
      queryClient.invalidateQueries(["messages"]);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="message container">
      <div className="msg__container">
        <span>
          <Link to="/messages" className="breadcrumbs">
            Messages
          </Link>
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="msgs">
            {data.map((m) => (
              <div
                className={
                  m.userId._id === currentUser._id ? "owner item" : "item"
                }
                key={m._id}
              >
                <img
                  src={m.userId.img || "/assets/person/noAvatar.png"}
                  alt=""
                />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <form className="write__msg" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button className="btn send__btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
