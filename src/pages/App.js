import React, { useContext, useEffect } from 'react';
import './App.less';
import { StoreContext } from '../store/StoreProvider';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

export default function App() {
  const { actions } = useContext(StoreContext);
  useEffect(() => {
    Promise.all([
      actions.fetchNavMenu(),
      actions.fetchPostCategories(),
      actions.fetchPostTags(),
      actions.fetchPostList()
    ]).then(() => {
      actions.setLoaded('first');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
