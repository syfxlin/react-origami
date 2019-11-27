import React, { useContext } from 'react';
import { StoreContext } from '../store/StoreProvider';
import PostListItem from './PostListItem';
import Pagination from './Pagination';

export default function PostList(props) {
  const { state, actions } = useContext(StoreContext);
  const { postList, postPage, postPageCount } = state;
  const { setPostPage, fetchPostList } = actions;
  const toPage = page => {
    setPostPage(page);
    fetchPostList(page);
  };
  return (
    <section className="post-list column col-8 col-md-12">
      {postList.map(item => (
        <PostListItem item={item} key={item.id} />
      ))}
      <Pagination
        pageCount={postPageCount}
        currPage={postPage}
        toPage={toPage}
      />
    </section>
  );
}
