import React, { useContext } from "react";
import { StoreContext } from "../store/StoreProvider";
import { Link } from "react-router-dom";
import { Post } from "../store/initialStore";

interface Props {
  item: Post;
}

export default function PostListItem(props: Props) {
  const { item } = props;
  const { postTags, postCategories } = useContext(StoreContext).state;
  return (
    <article className="card">
      <div className="card-header post-info">
        <h2 className="card-title">
          <Link
            to={"/post/" + item.id}
            dangerouslySetInnerHTML={{ __html: item.title }}></Link>
        </h2>
        <div className="card-subtitle text-gray">
          <i className="fa fa-calendar"></i>{" "}
          <time>{item.date.substring(0, 10)}</time>{" "}
          <i className="fa fa-paper-plane-o"></i> <span>{item.author}</span>{" "}
          <i className="fa fa-comment"></i>{" "}
          <span>{item.comment_count}条评论</span>{" "}
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
        dangerouslySetInnerHTML={{ __html: item.excerpt }}></div>
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
        <Link className="read-more" to={"/post/" + item.id}>
          阅读全文
        </Link>
      </div>
    </article>
  );
}
