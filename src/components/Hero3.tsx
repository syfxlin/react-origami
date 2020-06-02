import React, { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";

export default function Hero3() {
  const { heroBackground } = useContext(StoreContext).state;
  return (
    <section className="layout3-container ori-container">
      <div className="layout3-images">
        {heroBackground.map((bg, index) => (
          <div
            data-index={index}
            key={index}
            className="lazy loaded"
            style={{ backgroundImage: "url(" + bg + ")" }}></div>
        ))}
      </div>
      <div className="layout3-title">
        <h1>青空之蓝</h1>
        <h2>站在时光一端，回忆过往记忆。</h2>
        <a href="https://ixk.me">Otstar's Space</a>
      </div>
    </section>
  );
}
