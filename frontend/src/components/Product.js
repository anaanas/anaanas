import React, { Component } from 'react';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let product = this.props.product
    let image = product.src;
    return (
      <div className="product">
        <h3 className="product-name">{product.name}</h3>
        <img src={image}/>
        <p><b>Price</b> $ {product.price} | available </p>
        <select>
          <option key='1'>1</option>
          <option key='2'>2</option>
          <option key='3'>3</option>
          <option key='4'>4</option>
          <option key='5'>5</option>
          <option key='6'>6</option>
          <option key='7'>7</option>
          <option key='8'>8</option>
          <option key='9'>9</option>
          <option key='10'>10</option>
        </select>
        <button className = "btn-add-to-cart" > Add to cart </button>
      </div>
    );
  }
}

export default Product;
