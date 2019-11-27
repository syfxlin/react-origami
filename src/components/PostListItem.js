import React, { useContext } from 'react';
import { StoreContext } from '../store/StoreProvider';

export default function PostListItem(props) {
  const { item } = props;
  const { postTags, postCategories } = useContext(StoreContext).state;
  return (
    <article className="card">
      <div className="card-header post-info">
        <h2 className="card-title">
          <a
            href={item.link}
            dangerouslySetInnerHTML={{ __html: item.title.rendered }}
          ></a>
        </h2>
        <div className="card-subtitle text-gray">
          <i className="fa fa-calendar"></i>{' '}
          <time>{item.date.substring(0, 10)}</time>{' '}
          <i className="fa fa-paper-plane-o"></i> <span>{item.author}</span>{' '}
          <i className="fa fa-comment"></i>{' '}
          <span>{item.comment_count}条评论</span>{' '}
          <i className="fa fa-bookmark"></i>
          <ul>
            {item.categories.map(
              cat =>
                postCategories[cat] && (
                  <li key={postCategories[cat].name}>
                    <a href={postCategories[cat].link}>
                      {postCategories[cat].name}
                    </a>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
      <div
        className="card-body"
        dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
      ></div>
      <div className="card-footer">
        <div className="post-tags">
          {item.tags.map(
            tag =>
              postTags[tag] && (
                <a href={postTags[tag].link} key={postTags[tag].name}>
                  {postTags[tag].name}
                </a>
              )
          )}
        </div>
        <a href={item.link} className="read-more">
          阅读全文
        </a>
      </div>
    </article>
  );
}
