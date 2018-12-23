import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Products from './components/Products';
import Cart from './components/Cart';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NoResults from './components/NoResults';

const allProducts = [
  {
    _id: 1,
    name: 'Hand-Made Boba Milk Tea',
    src: 'https://storage.googleapis.com/example-product-images/1-min.JPG',
    price: 5.95,
    count: 100,
  },
  {
    _id: 2,
    name: 'Wanglai Fruit Tea',
    src: 'https://storage.googleapis.com/example-product-images/11-min.JPG',
    price: 5.55,
    count: 10,
  },
  {
    _id: 3,
    name: 'Senyong Milk Tea',
    src: 'https://storage.googleapis.com/example-product-images/16-min.JPG',
    price: 6.35,
    count: 0,
  },
];

const allCartItems = [
  {
    _id: 1,
    name: 'Black tea',
    src: 'https://storage.googleapis.com/example-product-images/1-min.JPG',
    price: 5.95,
    count: 1,
    size: 'regular',
    temp: 'HOT',
    topping: 'none',
  },
  {
    _id: 2,
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
          <Switch>
            <Route path="/" exact component={myProducts} />
            <Route path="/cart" component={myCart} />
            <Route component={NoResults} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
