import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store/StoreProvider';
import HeaderMenu from './HeaderMenu';
import HeaderSearch from './HeaderSearch';
import './Header.less';

export default function Header(props) {
  const { loaded, navMenu, themeBackground, themeIndex, pageType } = useContext(
    StoreContext
  ).state;
  const [showSearch, setShowSearch] = useState(false);
  const [showLogo, setShowLogo] = useState(pageType !== 'home');
  useEffect(() => {
    if (pageType === 'home') {
      let scrollE;
      if (!document.body.classList.contains('layout1')) {
        scrollE = function() {
          if (window.scrollY >= 10) {
            // header.classList.add('active');
            setShowLogo(true);
          } else {
            // header.classList.remove('active');
            setShowLogo(false);
          }
        };
        scrollE();
        window.addEventListener('scroll', scrollE);
      } else {
        // let target =
        //   document.getElementsByClassName('carousel')[0].clientHeight -
        //   document.getElementsByClassName('ori-header')[0].clientHeight;
        // let scrollE = function() {
        //   if (window.scrollY >= target) {
        //     document.body.classList.add('not-car');
        //   } else {
        //     document.body.classList.remove('not-car');
        //   }
        // };
        // scrollE();
        // window.addEventListener('scroll', scrollE);
      }
      return () => window.removeEventListener('scroll', scrollE);
    }
  }, []);
  return (
    <>
      <header className="p-fixed ori-header">
        <div id="read-progress" className="progress"></div>
        <div className="ori-container navbar">
          <section className="navbar-section">
            {showLogo ? (
              <Link to="/" id="ori-logo">
                <img
                  src="https://blog.ixk.me/wp-content/uploads/2018/05/blog-44.png"
                  alt="Site Logo"
                />
              </Link>
            ) : (
              <Link to="/" id="ori-title">
                青空之蓝
              </Link>
            )}
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
