// components/_Layout.tsx
import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import store from '@/redux-saga/store';

const Layout: React.FC<any> = ({ children }: any) => {
  return (
    <Provider store={store}>
      <div className="flex flex-col w-full h-screen bg-white">
        <Header />
        <div className=" flex flex-row">
          <Sidebar />
          <main className="min-h-screen w-screen bg-gray-100 flex items-center justify-center">
            {/* Your main content goes here */}
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </Provider>
  );
};

export default Layout;
