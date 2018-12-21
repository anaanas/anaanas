import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Cart from './Cart';

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

class Header extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="title">
            <h1> OneLine Foods </h1>
            <h3> Geek's Tea </h3>
          </div>
          <Link to="/cart">
            <div className="cart">
              <a id="headerCart" className="cart-btn" href="/">
                Cart
                <span className="cart-size">6</span>
              </a>
            </div>
          </Link>
          <Route path="/cart" component={myCart} />
        </div>
      </Router>
    );
  }
}

export default Header;
