import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <section className="container footer_container">
      <div className="footer__logo">agora</div>

      <div className="footer__socials">
        <a href="http://">
          <div className="footer__social-img">
            <img src="../../../../img/socials/instagram.png" alt="" />
          </div>
        </a>

        <a href="http://">
          <div className="footer__social-img">
            <img src="../../../../img/socials/social.png" alt="" />
          </div>
        </a>
        <a href="http://">
          <div className="footer__social-img">
            <img src="../../../../img/socials/twitter.png" alt="" />
          </div>
        </a>
      </div>

      <div className="footer__bottom">
        <div className="footer__terms">
          <a href="http://">terms of service</a>
        </div>
        <div className="footer__copy">
          <p>© 2024 agora. all rights reserved.</p>
        </div>
        <div className="footer__privacy">
          <a href="http://">privacy policy</a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
