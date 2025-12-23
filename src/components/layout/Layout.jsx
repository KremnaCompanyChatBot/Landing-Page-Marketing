import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, footerVariant = 'detailed' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer variant={footerVariant} />
    </div>
  );
};

export default Layout;