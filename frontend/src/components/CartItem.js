import React, { Component } from 'react';

class CartItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const item = this.props.item;
    return (
      <div className="single-cart-item">
        <h3>{item.name}</h3>
        <img src={item.src} />
        <p>
          Size: {item.size}; Temperature: {item.temp}; Topping: {item.topping}
        </p>
        <p>{item.price}</p>
        <p>{item.count}</p>
        <span onClick={() => alert('Are u sure to remove?')}><p>remove</p></span>
      </div>
    );
  }
}

export default CartItem;
