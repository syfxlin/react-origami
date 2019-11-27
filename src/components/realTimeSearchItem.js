import React from 'react';

export default function realTimeSearchItem(props) {
  const { item } = props;
  return (
    <article class="card" id="post-1039">
      <div class="card-header post-info">
        <h2 class="card-title">
          <a href={item.link}>{item.name}</a>
        </h2>
        <div class="card-subtitle text-gray">
          <time>{item.date.substring(0, 10)}</time>
        </div>
      </div>
      <div
        class="card-body"
        dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
      ></div>
      <div class="card-footer">
        <div class="post-tags"></div>
        <a class="read-more" href={item.link}>
          阅读更多
        </a>
      </div>
    </article>
  );
}
