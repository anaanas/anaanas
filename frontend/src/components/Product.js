import React, { Component } from 'react';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let image = this.props.image;
    return (
      <div className="product">
        <h3 className="product-name">{this.props.name}</h3>
        <img src={image}/>
        <p><b>Price</b> {this.props.price} | available </p>
      </div>
    );
  }
}

export default Product;
