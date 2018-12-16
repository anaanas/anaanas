import React, { Component } from 'react';
import Product from './Product';
import NoResults from './NoResults';
import TransitionGroup from "react-transition-group/TransitionGroup";


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
            image={product.image}
          />
        );
      });
    // Empty and Loading States
    let view;
    if (productsData.length <= 0) {
      view = <NoResults />;
    } else {
      // TODO
      view = <NoResults />;
    }
    return <div className="products-wrapper">{view}</div>;
  }
}

export default Products;
