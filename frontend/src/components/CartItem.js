import React, { Component } from 'react';
import { CSSTransition } from "react-transition-group";

class CartItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;
    return (
      <CSSTransition
        key={item.id}
        classNames="fadeIn"
        timeout={{ enter: 500, exit: 300 }}
      >
        <li className="cart-item" key={item.name}>
          <img className="product-image" src={item.image} />
          <div className="product-info">
            <p className="product-name">{item.name}</p>
            <p className="product-price">{item.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {item.quantity} x {" "}
            </p>
            <p className="amount">{item.quantity * item.price}</p>
          </div>
          <a
            className="item-remove"
            href="#"
            onClick={this.props.removeProduct.bind(item.id)}
          >
            ×
            </a>
        </li>
      </CSSTransition>
    );
  }
}

export default CartItem;
