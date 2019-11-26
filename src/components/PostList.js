import React, { useContext } from 'react';
import { StoreContext } from '../store/StoreProvider';
import PostListItem from './PostListItem';
import Pagination from './Pagination';

export default function PostList(props) {
  const {
    postList,
    postTags,
    postCategories,
    postPage,
    postPageLinks
  } = useContext(StoreContext).state;
  return (
    <section className="post-list column col-8 col-md-12">
      {postList.map(item => (
        <PostListItem
          item={item}
          postTags={postTags}
          postCategories={postCategories}
          key={item.id}
        />
      ))}
      <Pagination pageLinks={postPageLinks} currPage={postPage} />
    </section>
  );
}
