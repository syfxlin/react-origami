import React, { useContext } from 'react';
import RouteView from '../RouteView';
import PostList from './PostList';
import PostContainer from './PostContainer';
import Hero3 from './Hero3';
import Sidebar from './Sidebar';
import { StoreContext } from '../store/StoreProvider';

export default function Main(props) {
  const { heroType, loaded } = useContext(StoreContext).state;
  return (
    <div id="main-content">
      {heroType === 3 && <Hero3 />}
      <main className="ori-container columns grid-md">
        {loaded.first ? (
          <RouteView
            route={[
              {
                path: '/',
                component: props => <PostList {...props} />
              },
              {
                path: '/post/:postId',
                component: props => <PostContainer {...props} />
              }
            ]}
          />
        ) : (
          <div className="loading"></div>
        )}
        {loaded.first ? <Sidebar /> : <div className="loading"></div>}
      </main>
    </div>
  );
}
