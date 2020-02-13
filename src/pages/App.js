import React, { useContext, useEffect } from 'react';
import './App.less';
import { StoreContext } from '../store/StoreProvider';
import RouteView from '../RouteView';
import Home from './Home';
import Post from './Post';

export default function App() {
  const { actions } = useContext(StoreContext);
  useEffect(() => {
    Promise.all([
      actions.fetchNavMenu(),
      actions.fetchPostCategories(),
      actions.fetchPostTags(),
      actions.fetchPosts()
    ]).then(() => {
      actions.setLoaded('first');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <RouteView
        route={[
          {
            path: '/:postPage?',
            exact: true,
            component: props => <Home {...props} />
          },
          {
            path: '/post/:postId',
            component: props => <Post {...props} />
          }
        ]}
      />
    </div>
  );
}
