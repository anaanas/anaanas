import React, { Component } from "react";
import Product from "./Product";
import LoadingProducts from "../loaders/Products";
import NoResults from "../empty-states/NoResults";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Products extends Component {
  constructor() {
    super();
  }
  render() {
    let productsData;
    let term = this.props.searchTerm;

    function searchingFor(term) {
      return function (x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
      };
    }
    
    productsData = this.props.productsList
      .filter(searchingFor(term))
      .map((product, i) => {
        return (
          <CSSTransition
            key={i}
            classNames="products"
            timeout={{ enter: 500, exit: 300 }}
          >
            <Product
              key={product._id}
              product={product}
              addToCart={this.props.addToCart}
              openModal={this.props.openModal}
            />
          </CSSTransition>
        );
      });

    // Empty and Loading States
    let view;
    if (productsData.length <= 0 && !term) {
      view = <LoadingProducts />;
    } else if (productsData.length <= 0 && term) {
      view = <NoResults />;
    } else {
      view = (
        <TransitionGroup className="products">
          {productsData}
        </TransitionGroup>
      );
    }
    return <div className="products-wrapper">{view}</div>;
  }
}

export default Products;
