import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Products from "./components/Products";

const allProducts = [
  {
    id: 1,
    name: 'Hand-Made Boba Milk Tea',
    img: 'https://res.cloudinary.com/sivadass/image/upload/v1494699523/icons/bare-tree.png',
    price: 5.95,
  },
  {
    id: 2,
    name: 'Wanglai Fruit Tea',
    img: 'https://res.cloudinary.com/sivadass/image/upload/v1494699523/icons/bare-tree.png',
    price: 5.55,
  },
  {
    id: 3,
    name: 'Senyong Milk Tea',
    img: 'https://res.cloudinary.com/sivadass/image/upload/v1494699523/icons/bare-tree.png',
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
