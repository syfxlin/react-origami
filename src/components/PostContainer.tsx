import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StoreContext } from "../store/StoreProvider";
import { Post } from "../store/initialStore";

const loadJS = (url: string) => {
  return new Promise(resolve => {
    const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute("src", url);
    recaptchaScript.defer = true;
    recaptchaScript.onload = () => {
      resolve();
    };
    document.body.appendChild(recaptchaScript);
  }).catch(console.error);
};

export default function PostContainer() {
  const { postId } = useParams();
  const store = useContext(StoreContext);
  const { postCategories, postTags } = store.state;
  const { getPost } = store.actions;
  const [postItem, setPostItem] = useState<Post>();
  useEffect(() => {
    let unmounted = false;
    if (!unmounted && postId) {
      getPost(postId).then(post => {
        setPostItem(post);
      });
    }
    return () => {
      unmounted = true;
    };
  });
  useEffect(() => {
    loadJS("http://origami.ixk.me/wp-content/themes/Origami/js/prism.js").then(
      () => {
        window.Prism.plugins.autoloader.languages_path =
          "http://origami.ixk.me/wp-content/themes/Origami/js/prism-components/";
      }
    );
  }, []);
  useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [postItem]);
  return (
    <section className="s-container column col-8 col-md-12">
      {/* <ul className="breadcrumb ">
        <li className="breadcrumb-item">
          <a>首页</a>
        </li>
        <li className="breadcrumb-item">
          <a>折腾记录</a>
        </li>
        <li className="breadcrumb-item">
          <a>为Vuex添加同步Action</a>
        </li>
      </ul> */}
      {postItem && (
        <>
          <div className="s-info post-info">
            <h2
              className="card-title"
              dangerouslySetInnerHTML={{ __html: postItem.title }}></h2>
            <div className="card-subtitle text-gray">
              <time>{postItem.date.substring(0, 10)}</time> •{" "}
              <span>{postItem.author}</span> •{" "}
              <span>{postItem.comment_count}条评论</span> •
              <ul>
                {postItem.categories.map(
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
          <article
            className="s-content"
            dangerouslySetInnerHTML={{ __html: postItem.content }}></article>
          <div id="content-copyright">
            <span
              style={{
                fontWeight: "bold",
                textShadow: "0 1px 0 #ddd",
                fontSize: "12px"
              }}>
              声明:
            </span>
            <span style={{ fontSize: "12px" }}>
              本文采用
              <a
                rel="nofollow"
                href="http://creativecommons.org/licenses/by-nc-sa/3.0/"
                title="署名-非商业性使用-相同方式共享">
                BY-NC-SA
              </a>
              协议进行授权，如无注明均为原创，转载请注明转自
              <a href="https://blog.ixk.me">青空之蓝</a>
              <br />
              本文地址:
              <a rel="bookmark" title={postItem.title} href={postItem.link}>
                {postItem.title}
              </a>
            </span>
          </div>
          <div className="s-tags">
            <div className="post-tags">
              {postItem.tags.map(
                tag =>
                  postTags[tag] && (
                    <a href={postTags[tag].link} key={postTags[tag].name}>
                      {postTags[tag].name}
                    </a>
                  )
              )}
            </div>
          </div>
          <div className="s-nav">
            <section className="post-pagination">
              <ul className="pagination">
                {/* TODO: 文章需要读取到没有为止 */}
                {postItem.prev_id && (
                  <li className="page-item">
                    <Link className="prev" to={"/post/" + postItem.prev_id}>
                      <i className="icon icon-back"></i> 上一篇
                    </Link>
                  </li>
                )}
                {postItem.next_id && (
                  <li className="page-item">
                    <Link className="next" to={"/post/" + postItem.next_id}>
                      下一篇 <i className="icon icon-forward"></i>
                    </Link>
                  </li>
                )}
              </ul>
            </section>
          </div>
        </>
      )}
    </section>
  );
}
