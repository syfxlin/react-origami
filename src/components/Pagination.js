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
        <a className="page-numbers btn btn-link" onClick={() => toPage(index)}>
          {index}
        </a>
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
            <a
              className="prev page-numbers btn btn-link"
              onClick={() => toPage(currPage - 1)}
            >
              <i className="icon icon-back"></i> 上一页
            </a>
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
        {defaultItem(pageCount, true)}
        {currPage !== pageCount && (
          <li className="page-item">
            <a
              className="next page-numbers btn btn-link"
              onClick={() => toPage(currPage + 1)}
            >
              下一页 <i className="icon icon-forward"></i>
            </a>
          </li>
        )}
      </ul>
    </section>
  );
}
