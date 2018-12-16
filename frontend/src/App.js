import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Products from "./components/Products";

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: allProducts
    }
  }
  render() {
    return (
      <div className="App">
        <Products
            productList = {this.state.products}
        />
      </div>
    );
  }
}

export default App;
