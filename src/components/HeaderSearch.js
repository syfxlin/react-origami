import React from 'react';

export default function HeaderSearch(props) {
  return (
    <section className="ori-search">
      <div className="ori-container navbar">
        <section className="navbar-section">
          <div>
            <i className="fa fa-search"></i>
          </div>
        </section>
        <section className="navbar-center">
          <div className="has-icon-right">
            <input
              id="ori-search-input"
              className="form-input"
              type="text"
              placeholder="快来寻找你要的文章ヾ(≧▽≦*)o..."
            />
            <i className="form-icon loading ori-search-loading"></i>
          </div>
        </section>
        <section className="navbar-section">
          <div id="ori-h-search-close">
            <i className="fa fa-close"></i>
          </div>
        </section>
      </div>
      <div className="ori-search-mask grid-md">
        <section
          className="col-8 col-md-12 post-list"
          id="search-list"
        ></section>
      </div>
    </section>
  );
}
