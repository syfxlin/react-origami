import React from 'react';

export default function Pagination(props) {
  let { pageLinks, currPage } = props;
  currPage--;
  const defaultItem = (index, edge = false) => {
    if (!edge && (index <= 0 || index >= pageLinks.length - 1)) {
      return false;
    }
    return index === currPage ? (
      <li className="page-item" key={index}>
        <span className="page-numbers current">{index + 1}</span>
      </li>
    ) : (
      <li className="page-item" key={index}>
        <a className="page-numbers" href={pageLinks[index]}>
          {index + 1}
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
        {currPage !== 0 && (
          <li className="page-item">
            <a className="prev page-numbers" href={pageLinks[currPage - 1]}>
              <i className="icon icon-back"></i> 上一页
            </a>
          </li>
        )}
        {defaultItem(0, true)}
        {currPage > 3 && (
          <li className="page-item">
            <span className="page-numbers dots">…</span>
          </li>
        )}
        {centerItem}
        {currPage < pageLinks.length - 4 && (
          <li className="page-item">
            <span className="page-numbers dots">…</span>
          </li>
        )}
        {defaultItem(pageLinks.length - 1, true)}
        {currPage !== pageLinks.length && (
          <li className="page-item">
            <a className="next page-numbers" href={pageLinks[currPage + 1]}>
              下一页 <i className="icon icon-forward"></i>
            </a>
          </li>
        )}
      </ul>
    </section>
  );
}
