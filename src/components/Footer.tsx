import React, { useContext, useEffect } from "react";
import { StoreContext } from "../store/StoreProvider";

export default function Footer() {
  const { footerText } = useContext(StoreContext).state;
  useEffect(() => {
    const scrollE = () => {
      let el = document.getElementById("scroll-top");
      if (!el) return;
      if (window.scrollY > 50) {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
      }
    };
    scrollE();
    window.addEventListener("scroll", scrollE);
  }, []);
  return (
    <footer className="ori-footer">
      <section
        id="scroll-top"
        className="btn btn-action"
        style={{ opacity: "1" }}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }>
        <i className="icon icon-arrow-up"></i>
      </section>
      <div className="ori-container columns right">
        <section className="ori-copyright col-4">
          <span
            dangerouslySetInnerHTML={{
              __html: footerText,
            }}></span>
          <br />
          <span id="origami-theme-info">
            Theme - <a href="https://blog.ixk.me/theme-origami.html">Origami</a>
            By <a href="https://www.ixk.me">Otstar Lin</a>
          </span>
        </section>
      </div>
    </footer>
  );
}
