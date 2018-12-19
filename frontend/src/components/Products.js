import React, { Component } from 'react';
import Product from './Product';
import NoResults from './NoResults';

class Products extends Component {
  render() {
    // State is lifted to high level, i.e. App.js
    let productsData = this.props.productList
      .map(product => {
        return (
          <Product
            key = {product.id}
            price={product.price}
            name={product.name}
            image={product.src}
          />
        );
      });
    // Empty and Loading States
    return <div className="products-all">{productsData}</div>;
  }
}

export default Products;
