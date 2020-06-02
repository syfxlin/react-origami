import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../store/StoreProvider';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

export default function Post() {
  const { pageType } = useContext(StoreContext).state;
  const { setPageType } = useContext(StoreContext).actions;
  useEffect(() => {
    if (pageType !== 'post') {
      setPageType('post');
    }
  }, []);
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
