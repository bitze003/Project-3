import React, { Component } from 'react';
import Header from '../Header/Header';

  const App = ({ children }) => (
    <>
      <Header />
  
      <main>
        {children}
      </main>
  
      {/* <Footer /> */}
    </>
  );

export default App;
