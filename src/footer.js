import React from "react";
import "./footer.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer class="footer-distributed">
      <div class="footer-left">
        <h3>
          Cine<span>MinT</span>
        </h3>

        <p class="footer-links">
          <a href="#">Home </a> · <a href="#"> Blog </a> ·{" "}
          <a href="#"> Pricing</a> · <a href="#">About </a> ·{" "}
          <a href="#"> Faq </a> · <a href="#"> Contact</a>
        </p>

        <p class="footer-company-name">CineMinT © 2022</p>
      </div>

      <div class="footer-right">
        <p>Contact Us</p>

        <form action="#" method="post">
          <input type="text" name="email" placeholder="Email" />
          <textarea name="message" placeholder="Message"></textarea>
          <button>Send</button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;
