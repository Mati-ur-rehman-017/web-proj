import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
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
        {/* <hr /> */}
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
