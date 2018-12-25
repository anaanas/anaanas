import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const availabilityLabel = count => {
  if (count >= 20) {
    return <p className="badge badge-success">available</p>;
  }
  if (count > 0) {
    return <p className="badge badge-warning">{count} left</p>;
  }

  return <p className="badge badge-danger">sold out</p>;
};

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let product = this.props.product;
    let image = product.src;
    return (
      <div className="product">
        <Link to="/product">
          <h3 className="product-name">{product.name}</h3>{' '}
        </Link>
        <img src={image} />
        <p>
          <b>Price</b> $ {product.price} | {availabilityLabel(product.count)}{' '}
        </p>
        <select>
          <option key="1">1</option>
          <option key="2">2</option>
          <option key="3">3</option>
          <option key="4">4</option>
          <option key="5">5</option>
          <option key="6">6</option>
          <option key="7">7</option>
          <option key="8">8</option>
          <option key="9">9</option>
          <option key="10">10</option>
        </select>
        <button className="btn-add-to-cart"> Add to cart </button>
      </div>
    );
  }
}

export default Product;
