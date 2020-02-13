import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../store/StoreProvider';
import PostListItem from './PostListItem';
import Pagination from './Pagination';
import { useParams, useHistory } from 'react-router-dom';

export default function PostList(props) {
  const { state, actions } = useContext(StoreContext);
  const { pageList, postPageCount, postStore } = state;
  const { fetchPosts } = actions;
  const postPage = parseInt(useParams().postPage || 1);
  const history = useHistory();
  const toPage = page => {
    history.push('/' + page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted && !pageList[postPage]) {
      fetchPosts(postPage);
    }
    return () => {
      unmounted = true;
    };
  });
  return (
    <section className="post-list column col-8 col-md-12">
      {pageList[postPage] &&
        pageList[postPage].map(index => (
          <PostListItem item={postStore[index]} key={postStore[index].id} />
        ))}
      <Pagination
        pageCount={postPageCount}
        currPage={postPage}
        toPage={toPage}
      />
    </section>
  );
}
