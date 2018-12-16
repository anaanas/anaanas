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
        <div className="product-image">
          <img src={image} alt={this.props.name} />
        </div>
        <h4 className="product-name">{this.props.name}</h4>
        <p className="product-price">{this.props.price}</p>
      </div>
    );
  }
}

export default Product;
