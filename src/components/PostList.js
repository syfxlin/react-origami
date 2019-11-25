import React, { useContext } from 'react';
import PostListItem from './PostListItem';
import { StoreContext } from '../store/StoreProvider';

export default function PostList(props) {
  const { postList, postTags, postCategories } = useContext(StoreContext).state;
  return (
    <main className="ori-container columns grid-md">
      <section className="post-list column col-8 col-md-12">
        {postList.map(item => (
          <PostListItem
            item={item}
            postTags={postTags}
            postCategories={postCategories}
            key={item.id}
          />
        ))}
      </section>
      <aside className="column ori-sidebar col-4 col-md-12"></aside>
    </main>
  );
}
