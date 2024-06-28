import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Carousel1 } from "./layouts/NavbarAndFooter/HomePage/components/Carousel1";
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/NavbarAndFooter/HomePage/HomePage';
import { SearchProductsPage } from './layouts/SearchProductsPage/SearchProductsPage';

export const App = () => {
  return (
    <div>
      <Navbar />
       {/* <HomePage />  */}
      <SearchProductsPage/>
      <Footer />
    </div>
  );
}


