import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <div className="title">
            <h1> OneLine Foods </h1>
            <h3> Geek's Tea </h3>
          </div>
        </Link>
        <Link to="/cart">
          <div className="cart">
            Cart
            <span className="cart-size">6</span>
          </div>
        </Link>
      </div>
    );
  }
}

export default Header;
