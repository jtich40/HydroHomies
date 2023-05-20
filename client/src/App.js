import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Subscribe from './pages/Subscribe';
import Bundles from './pages/Bundles';
import Products from './pages/Products';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './App.css';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// set up request middleware to attach token to every request as authorization headers
const authLink = setContext((_, { headers }) => {
  // get the token from local storage
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
//  create the Apollo Client instance
const client = new ApolloClient({
  // set up our client to execute the authLink middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/subscribe" element={<Subscribe />} />
          <Route exact path="/bundles" element={<Bundles />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}