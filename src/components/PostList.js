import React, { useContext } from 'react';
import { StoreContext } from '../store/StoreProvider';
import PostListItem from './PostListItem';
import Pagination from './Pagination';

export default function PostList(props) {
  const { state, actions } = useContext(StoreContext);
  const { pageList, postPage, postPageCount, postStore } = state;
  const { setPostPage, fetchPosts } = actions;
  const toPageIndex = page => {
    if (pageList[page]) {
      setPostPage(page);
    } else {
      fetchPosts(page).then(() => {
        setPostPage(page);
      });
    }
  };
  return (
    <section className="post-list column col-8 col-md-12">
      {pageList[postPage] &&
        pageList[postPage].map(index => (
          <PostListItem item={postStore[index]} key={postStore[index].id} />
        ))}
      <Pagination
        pageCount={postPageCount}
        currPage={postPage}
        toPage={toPageIndex}
      />
    </section>
  );
}
