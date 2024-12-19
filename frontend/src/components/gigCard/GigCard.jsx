import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gig__card">
        <img src={item.cover} alt="" />
        <div className="gig__detail">
          <div className="gig__info">
            {isLoading ? (
              "loading"
            ) : error ? (
              "Something went wrong!"
            ) : (
              <div className="gig__user">
                <img src={data.img || "/img/noavatar.jpg"} alt="" />
                <span>{data.username}</span>
              </div>
            )}
            <p className="gig__desc">{item.shortDesc}</p>
            <div className="gig__star">
              <img src="./img/star.png" alt="" />
              <span>
                {!isNaN(item.totalStars / item.starNumber) &&
                  Math.round(item.totalStars / item.starNumber)}
              </span>
            </div>
          </div>
          <div className="gig__price">
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
