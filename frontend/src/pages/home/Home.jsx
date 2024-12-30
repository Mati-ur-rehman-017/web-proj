import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import CatCard from "../../components/catCard/CatCard";
import { cards } from "../../data";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import newRequest from "../../utils/newRequest";

function Home() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("Fetching items...");
        const res = await newRequest.get("/item");
        console.log("Items fetched:", res.data);
        setItems(res.data);
        setFilteredItems(res.data); // Initially show all items
      } catch (err) {
        console.log("Error fetching items:", err);
      }
    };

    fetchItems();
  }, []);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = items.filter((item) => item.category === category);
    setFilteredItems(filtered);
  };

  return (
    <div className="home container">
      <Featured />
      {/* <TrustedBy /> */}

      <h1>Trade treasures & talents! </h1>
      <div className="item-oval-container">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`item-oval ${
              selectedCard === card.id ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedCard(card.id);
              handleCategoryClick(card.title);
            }}
          >
            {card.title}
          </div>
        ))}
      </div>
      <section className="items container">
        <h1>Items in {selectedCategory || "All Categories"}</h1>
        <div className="item_container">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              // <div key={item.id} className="item">

              //   <img src={item.img} alt={item.title} />
              //   <h3>{item.title}</h3>
              //   <p>{item.desc}</p>
              //   {/* Add to Cart Button */}
              // <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
              //   Add to Cart
              // </button>
              // </div>
              <CatCard key={item.id} card={item} />
            ))
          ) : (
            <p>No items found in this category.</p>
          )}
        </div>
      </section>

      <section className="work container">
        <h1>Things You Can Do</h1>

        <div className="work__container">
          <div className="work__item work__item-1 work__item-image">
            <div className="work__item-info">
              <h2>Learn to Bake with Expert-Led Courses</h2>
              <p className="work__item-2-descitem">
                Take part in hands-on baking courses and learn from experienced
                chefs. Master the art of creating everything from artisan breads
                to mouthwatering pastries.
              </p>
            </div>
            <img src="./img/feat/feat4.jpg" alt="Baking Course" />
          </div>
          <div className="work__item work__item-2 work__item-image">
            <div className="work__item-info">
              <h2>Collaborate with Baking Experts</h2>
              <p className="work__item-2-descitem">
                Connect with seasoned bakers and culinary experts to collaborate
                on new recipes or refine your baking skills. Get feedback and
                tips from the pros.
              </p>
            </div>
            <img src="./img/feat/feat1.jpg" alt="Collaborate with Experts" />
          </div>
          <div className="work__item work__item-3 work__item-image">
            <div className="work__item-info">
              <h2>Buy and Sell Delicious Homemade Goods</h2>
              <p className="work__item-2-descitem">
                Browse a marketplace of freshly baked goods made by local
                students and bakers. Support small businesses by purchasing
                unique homemade treats like cookies, cakes, and breads.
              </p>
            </div>
            <img src="./img/feat/feat2.jpg" alt="Buy Homemade Goods" />
          </div>
          <div className="work__item work__item-4 work__item-image">
            <div className="work__item-info">
              <h2>Start Your Own Bakery Business</h2>
              <p className="work__item-2-descitem">
                Have a passion for baking? Start your own bakery venture and
                sell your delicious treats to the community. From cupcakes to
                cookies, turn your baking hobby into a profitable business.
              </p>
            </div>
            <img src="./img/feat/feat3.jpg" alt="Start a Bakery Business" />
          </div>
          <div className="work__item work__item-5 work__item-image">
            <div className="work__item-info">
              <h2>Find Freelance Baking Services</h2>
              <p className="work__item-2-descitem">
                Whether you need a custom cake for an event or want to hire
                someone to bake for a special occasion, find talented freelance
                bakers to help you create something special.
              </p>
            </div>
            <img src="./img/feat/feat5.jpg" alt="Freelance Baking Services" />
          </div>
        </div>
      </section>

      {/* <section className="newsletter container">
        <div className="subs">
          <h1>
            Don&apos;t miss our newsletters,
            <br /> subscribe?
          </h1>
          <div className="subsmail">
            <input
              className="subs__mail"
              type="text"
              placeholder="enter email..."
            />
            <button className="btn subs__btn">subscribe</button>
          </div>
        </div>
      </section>
       */}
    </div>
  );
}

export default Home;
