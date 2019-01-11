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
          <div
            key={product._id}
            className="col-xl-4 col-md-6"
          >
            <Product
              product={product}
              addToCart={this.props.addToCart}
              openModal={this.props.openModal}
            />
          </div>
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
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section_title text-center">Popular on Little Closet</div>
            </div>
          </div>
          <div className="row page_nav_row">
            <div className="col">
              <div className="page_nav">
                <ul className="d-flex flex-row align-items-start justify-content-center">
                  <li className="active"><a href="category.html">Women</a></li>
                  <li><a href="category.html">Men</a></li>
                  <li><a href="category.html">Kids</a></li>
                  <li><a href="category.html">Home Deco</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row products_row">
            {productsData}
          </div>
          <div className="row load_more_row">
            <div className="col">
              <div className="button load_more ml-auto mr-auto"><a href="#">load more</a></div>
            </div>
          </div>
        </div>

      );
    }
    return <div className="products">{view}</div>;
  }
}

export default Products;
