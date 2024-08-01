import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Carousel1 } from "./layouts/NavbarAndFooter/HomePage/components/Carousel1";
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/NavbarAndFooter/HomePage/HomePage';
import { SearchProductsPage } from './layouts/SearchProductsPage/SearchProductsPage';
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { ProductCheckoutPage } from './layouts/ProductCheckoutPage/ProductCheckoutPage';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { oktaConfig } from './lib/oktaConfig';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/ProductCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='d-flex flex-column min-vh-100'>

      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler} >



        <Navbar />

        <div className='flex-grow-1'>

          <Switch>

            <Route path='/' exact>
              <Redirect to='/home' />
            </Route>

            <Route path='/home'>
              <HomePage />
            </Route>

            <Route path='/reviewlist/:productId'>
              <ReviewListPage />
            </Route>

            <Route path='/search'>
              <SearchProductsPage />
            </Route>
            <Route path='/checkout/:productId'>
              <ProductCheckoutPage />
            </Route>

            <Route path='/login' render={() => <LoginWidget config={oktaConfig} />
            }
            />
            <Route path='/login/callback' component={LoginCallback} />
            <SecureRoute path='/shelf'><ShelfPage /></SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
}


