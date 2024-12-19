import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import CatCard from "../../components/catCard/CatCard";
import { cards } from "../../data";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";

function Home() {
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
            <SwiperSlide key={card.id}>
              <CatCard key={card.id} card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
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
      {/* <div className="features">
        <div className="container">
          <div className="item">
            <h1>A whole world of freelance talent at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Protected payments, every time
            </div>
            <p>
              Always know what youll pay upfront. Your payment isnt released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              24/7 support
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
        </div>
      </div> */}

      {/* <div className="explore">
        <div className="container">
          <h1>Explore the marketplace</h1>
          <div className="items">
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Graphics & Design</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                alt=""
              />
              <div className="line"></div>

              <span>Digital Marketing</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Writing & Translation</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Video & Animation</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Music & Audio</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Programming & Tech</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Business</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Lifestyle</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Data</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Photography</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              liverr <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Connect to freelancers with proven business experience
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src="./img/check.png" alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            <button>Explore Liverr Business</button>
          </div>
          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </div>
        </div>
      </div> */}
      {/* <Slide slidesToShow={4} arrowsScroll={4}> */}
      {/* {projects.map((card) => (
        <ProjectCard key={card.id} card={card} />
      ))} */}
      {/* </Slide> */}
    </div>
  );
}

export default Home;
