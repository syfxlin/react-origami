import React, { useContext, useState } from 'react';
import { StoreContext } from '../store/StoreProvider';
import HeaderMenu from './HeaderMenu';
import HeaderSearch from './HeaderSearch';

export default function Header(props) {
  const { loaded, navMenu, themeBackground, themeIndex } = useContext(
    StoreContext
  ).state;
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <header className="p-fixed ori-header">
        <div id="read-progress" className="progress"></div>
        <div className="ori-container navbar">
          <section className="navbar-section">
            <a href="https://blog.ixk.me" id="ori-logo">
              <img
                src="https://blog.ixk.me/wp-content/uploads/2018/05/blog-44.png"
                alt="Site Logo"
              />
            </a>
            <a
              href="https://blog.ixk.me"
              className="btn btn-link"
              id="ori-title"
            >
              青空之蓝
            </a>
          </section>
          <section className="navbar-section">
            {loaded.first && <HeaderMenu menu={navMenu} />}
            <div id="ori-h-search" onClick={() => setShowSearch(true)}>
              <i className="fa fa-search"></i>
            </div>
            <div id="ori-h-m-btn">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </section>
        </div>
        <HeaderSearch show={showSearch} setHide={() => setShowSearch(false)} />
      </header>
      <section className="ori-background">
        {themeBackground[themeIndex].background.map((bg, index) => (
          <div
            data-index={index}
            style={{ backgroundImage: 'url(' + bg + ')' }}
            key={index}
          ></div>
        ))}
      </section>
    </>
  );
}
