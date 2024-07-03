import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Carousel1 } from "./layouts/NavbarAndFooter/HomePage/components/Carousel1";
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/NavbarAndFooter/HomePage/HomePage';
import { SearchProductsPage } from './layouts/SearchProductsPage/SearchProductsPage';
import { Redirect, Route, Switch } from "react-router-dom";
import { ProductCheckoutPage } from './layouts/ProductCheckoutPage/ProductCheckoutPage';

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>

      <Navbar />

      <div className='flex-grow-1'>

        <Switch>

          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>

          <Route path='/home'>
            <HomePage />
          </Route>

          <Route path='/search'>
            <SearchProductsPage />
          </Route>
          <Route path='/checkout/:productId'>
            <ProductCheckoutPage />
          </Route>

        </Switch>
      </div>
      <Footer />
    </div>
  );
}


