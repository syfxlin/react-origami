import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../store/StoreProvider';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

export default function Home() {
  const { pageType } = useContext(StoreContext).state;
  const { setPageType } = useContext(StoreContext).actions;
  useEffect(() => {
    if (pageType !== 'home') {
      setPageType('home');
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
