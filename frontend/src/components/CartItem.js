import React, { Component } from 'react';
import { CSSTransition } from "react-transition-group";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.handlePlusOne = this.handlePlusOne.bind(this)
    this.handleMinusOne = this.handleMinusOne.bind(this)
  }
  handlePlusOne(e) {
    e.preventDefault();
    console.log(this.props);

    let idx = this.props.index;
    let item = this.props.item;
    this.props.handleUpdateCart(idx, item.quantity + 1);
  }

  handleMinusOne(e) {
    e.preventDefault();
    let idx = this.props.index;
    let item = this.props.item;
    this.props.handleUpdateCart(idx, item.quantity - 1);
  }

  render() {
    const item = this.props.item;
    return (
      <li className="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-lg-end justify-content-start">
        <div className="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start mr-auto">
          <div><div className="product_number">{item.id}</div></div>
          <div><div className="product_image"><img src={item.image} alt="" /></div></div>
          <div className="product_name_container">
            <div className="product_name"><a>{item.name}</a></div>
            <div className="product_text">Second line for additional info</div>
          </div>
        </div>
        <div className="product_size product_text"><span>Size: </span>L</div>
        <div className="product_price product_text"><span>Price: </span>${item.price}</div>
        <div className="product_quantity_container">
          <div className="product_quantity ml-lg-auto mr-lg-auto text-center">
            <span className="product_text product_num">{item.quantity}</span>
            <div
              className="qty_sub qty_button trans_200 text-center"
              onClick={this.handleMinusOne}>
              <span>-</span>
            </div>
            <div className="qty_add qty_button trans_200 text-center"
              onClick={this.handlePlusOne}>
              <span>+</span>
            </div>
          </div>
        </div>
        <div className="product_total product_text"><span>Total: </span>${(item.quantity * item.price).toFixed(2)}</div>
      </li>
    );
  }
}

export default CartItem;
