import React, { useContext } from 'react';
import PostList from './PostList';
import Hero3 from './Hero3';
import { StoreContext } from '../store/StoreProvider';

export default function Main(props) {
  const { heroType, loaded } = useContext(StoreContext).state;
  return (
    <div id="main-content">
      {heroType === 3 && <Hero3 />}
      {loaded.first ? <PostList /> : <div className="loading"></div>}
    </div>
  );
}
