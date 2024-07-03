import React from 'react';
import Router from 'route/router';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import 'assets/styles/Header.css';
import 'assets/styles/Footer.css';

function App() {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  )
}

export default App;