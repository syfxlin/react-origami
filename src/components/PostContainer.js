import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../store/StoreProvider';

const loadJS = url => {
  return new Promise(resolve => {
    const recaptchaScript = document.createElement('script');
    recaptchaScript.setAttribute('src', url);
    recaptchaScript.defer = true;
    recaptchaScript.onload = () => {
      resolve();
    };
    document.body.appendChild(recaptchaScript);
  }).catch(console.error);
};

export default function PostContainer(props) {
  const { postId } = props.match.params;
  const { postList, postCategories, postTags } = useContext(StoreContext).state;
  const postIndex = postList.findIndex(item => item.id === parseInt(postId));
  // TODO: 未找到的时候从api中读取
  const postItem = postList[postIndex];
  useEffect(() => {
    loadJS('http://origami.test/wp-content/themes/Origami/js/prism.js').then(
      () => {
        window.Prism.plugins.autoloader.languages_path =
          'http://origami.test/wp-content/themes/Origami/js/prism-components/';
      }
    );
  }, []);
  useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, [postIndex]);
  return (
    <section className="s-post-container column col-8 col-md-12">
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
      <div className="s-post-info post-info">
        <h2
          className="card-title"
          dangerouslySetInnerHTML={{ __html: postItem.title.rendered }}
        ></h2>
        <div className="card-subtitle text-gray">
          <time>{postItem.date.substring(0, 10)}</time> •{' '}
          <span>{postItem.author}</span> •{' '}
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
        className="s-post-content"
        dangerouslySetInnerHTML={{ __html: postItem.content.rendered }}
      ></article>
      <div id="content-copyright">
        <span
          style={{
            fontWeight: 'bold',
            textShadow: '0 1px 0 #ddd',
            fontSize: '12px'
          }}
        >
          声明:
        </span>
        <span style={{ fontSize: '12px' }}>
          本文采用
          <a
            rel="nofollow"
            href="http://creativecommons.org/licenses/by-nc-sa/3.0/"
            title="署名-非商业性使用-相同方式共享"
          >
            BY-NC-SA
          </a>
          协议进行授权，如无注明均为原创，转载请注明转自
          <a href="https://blog.ixk.me">青空之蓝</a>
          <br />
          本文地址:
          <a
            rel="bookmark"
            title="为Vuex添加同步Action"
            href="https://blog.ixk.me/add-sync-action-for-vuex.html"
          >
            为Vuex添加同步Action
          </a>
        </span>
      </div>
      <div className="s-post-tags">
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
      <div className="s-post-nav">
        <section className="post-pagination">
          <ul className="pagination">
            {/* TODO: 文章需要读取到没有为止 */}
            {postIndex !== 0 && (
              <li className="page-item">
                <Link
                  className="prev"
                  to={'/post/' + postList[postIndex - 1].id}
                >
                  <i className="icon icon-back"></i> 上一篇
                </Link>
              </li>
            )}
            {postIndex !== postList.length - 1 && (
              <li className="page-item">
                <Link
                  className="next"
                  to={'/post/' + postList[postIndex + 1].id}
                >
                  下一篇 <i className="icon icon-forward"></i>
                </Link>
              </li>
            )}
          </ul>
        </section>
      </div>
    </section>
  );
}
