import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import CatCard from "../../components/catCard/CatCard";
import { cards } from "../../data";
import  { useState, useEffect } from "react";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import newRequest from "../../utils/newRequest";

function Home() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
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
      <TrustedBy />

      <section className="slider">
        <h1>Trade treasures & talents! from books to bytes </h1>
        <Swiper
          slidesPerView={5}
          spaceBetween={200}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination]}
          className="mySwiper"
        >
           {cards.map((card) => (
            <SwiperSlide key={card.id} onClick={() => handleCategoryClick(card.title)}>
              <CatCard key={card.id} card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="items container">
  <h1>Items in {selectedCategory || "All Categories"}</h1>
  <div className="items__container">
    {filteredItems.length > 0 ? (
      filteredItems.map((item) => (
        <div key={item.id} className="item">
          <img src={item.img} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
          {/* Add to Cart Button */}
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
            Add to Cart
          </button>
        </div>
      ))
    ) : (
      <p>No items found in this category.</p>
    )}
  </div>
</section>

      <section className="work container">
        <h1>Things that you can do</h1>

        <div className="work__container">
          <div className="work__item work__item-1 work__item-image">
            <div className="work__item-info">
              <h2>Exchange Knowledge, Rent or Sell books or notes</h2>
              <p className="work__item-2-descitem">
                Connect with peers to share study materials, class notes, Save
                money by renting or earn cash by selling course materials.
              </p>
            </div>

            <img src="./img/feat/feat4.jpg" alt="" />
          </div>
          <div className="work__item work__item-2 work__item-image">
            <div className="work__item-info">
              <h2>
                Rent Out High-Tech Lenses and Gear, rent your photography
                skills.
              </h2>
              <p className="work__item-2-descitem">
                Students can rent out photography equipment such as cameras,
                lenses, and accessories to fellow students interested in
                photography projects. They can also offer their photography
                services for events or projects within the college.
              </p>
            </div>
            <img src="./img/feat/feat1.jpg" alt="" />
          </div>
          <div className="work__item work__item-3 work__item-image">
            <div className="work__item-info">
              <h2>Turn Your Skills into Campus Currency</h2>
              <p className="work__item-2-descitem">
                Enable students to offer their skills and services for hire,
                such as tutoring, graphic design, web development, content
                writing, or video editing. Earn extra income while helping
                others within the college community.
              </p>
            </div>
            <img src="./img/feat/feat2.jpg" alt="" />
          </div>
          <div className="work__item work__item-4 work__item-image">
            <div className="work__item-info">
              <h2>find your next business partner</h2>
              <p className="work__item-2-descitem">
                Connect with like-minded students to collaborate on
                entrepreneurial ventures, startup ideas, or creative projects.
                Explore partnership opportunities and turn ideas into reality.
              </p>
            </div>
            <img src="./img/feat/feat3.jpg" alt="" />
          </div>
          <div className="work__item work__item-5 work__item-image">
            <div className="work__item-info">
              <h2>A whole world of freelance talent at your fingertips</h2>
              <p className="work__item-2-descitem">
                Access a diverse pool of freelance talent within the college
                community for various tasks and projects. From academic
                assistance to creative endeavors, find skilled individuals to
                get the job done.
              </p>
            </div>
            <img src="./img/feat/feat5.jpg" alt="" />
          </div>
        </div>
      </section>

      <section className="newsletter container">
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
      
    </div>
  );
}

export default Home;
