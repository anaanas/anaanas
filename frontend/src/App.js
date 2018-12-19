import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Products from './components/Products';
import Cart from './components/Cart';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const allProducts = [
  {
    id: 1,
    name: 'Hand-Made Boba Milk Tea',
    src: 'https://storage.googleapis.com/example-product-images/1-min.JPG',
    price: 5.95,
  },
  {
    id: 2,
    name: 'Wanglai Fruit Tea',
    src: 'https://storage.googleapis.com/example-product-images/11-min.JPG',
    price: 5.55,
  },
  {
    id: 3,
    name: 'Senyong Milk Tea',
    src: 'https://storage.googleapis.com/example-product-images/16-min.JPG',
    price: 6.35,
  },
];

const allCartItems = [
  {
    id: 1,
    name: 'Black tea',
    src: 'https://storage.googleapis.com/example-product-images/1-min.JPG',
    price: 5.95,
    count: 1,
    size: 'regular',
    temp: 'HOT',
    topping: 'none',
  },
  {
    id: 2,
    name: 'Green tea',
    src: 'https://storage.googleapis.com/example-product-images/16-min.JPG',
    price: 5.95,
    count: 1,
    size: 'regular',
    temp: 'HOT',
    topping: 'none',
  },
];

const myCart = props => {
  return <Cart cartItemList={allCartItems} {...props} />;
};

const myProducts = props => {
  return <Products productList={allProducts} {...props} />;
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />  
          <Route path="/" exact component={myProducts} />
        </div>
      </Router>
    );
  }
}

export default App;
