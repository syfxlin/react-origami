import React from 'react';

export default function Search(props) {
  return (
    <aside className="sidebar-widget widget_search">
      <form
        method="get"
        id="searchform"
        className="input-group"
        action="http://origami.ixk.me/"
      >
        <label htmlFor="s" className="input-group-addon">
          搜索
        </label>
        <input
          type="text"
          className="form-input"
          name="s"
          id="s"
          placeholder="搜索"
        />
        <input
          type="submit"
          className="btn btn-primary input-group-btn"
          name="submit"
          id="searchsubmit"
          value="搜索"
        />
      </form>
    </aside>
  );
}
