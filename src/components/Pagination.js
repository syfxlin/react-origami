/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default function Pagination(props) {
  let { pageCount, currPage, toPage } = props;
  const defaultItem = (index, edge = false) => {
    if (!edge && (index <= 1 || index >= pageCount)) {
      return false;
    }
    return index === currPage ? (
      <li className="page-item" key={index}>
        <span className="page-numbers current">{index}</span>
      </li>
    ) : (
      <li className="page-item" key={index}>
        <button
          className="page-numbers btn btn-link"
          onClick={() => toPage(index)}
        >
          {index}
        </button>
      </li>
    );
  };
  const centerItem = [];
  for (let i = currPage - 2; i <= currPage + 2; i++) {
    centerItem.push(defaultItem(i));
  }
  return (
    <section className="post-pagination">
      <ul className="pagination">
        {currPage !== 1 && (
          <li className="page-item">
            <button
              className="prev page-numbers btn btn-link"
              onClick={() => toPage(currPage - 1)}
            >
              <i className="icon icon-back"></i> 上一页
            </button>
          </li>
        )}
        {defaultItem(1, true)}
        {currPage > 4 && (
          <li className="page-item">
            <span className="page-numbers dots">…</span>
          </li>
        )}
        {centerItem}
        {currPage < pageCount - 3 && (
          <li className="page-item">
            <span className="page-numbers dots">…</span>
          </li>
        )}
        {defaultItem(pageCount, pageCount !== 1)}
        {currPage !== pageCount && (
          <li className="page-item">
            <button
              className="next page-numbers btn btn-link"
              onClick={() => toPage(currPage + 1)}
            >
              下一页 <i className="icon icon-forward"></i>
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
