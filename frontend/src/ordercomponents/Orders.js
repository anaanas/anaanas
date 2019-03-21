import React, { Component } from "react";
import Product from "./Product";

class Orders extends Component {
  render() {
    // State is lifted to high level, i.e. App.js
    let orders = this.props.orders
      .map(order => {
        return (
          <Order
            key={order.id}
            price={product.price}
            name={product.name}
            image={product.src}
          />
        );
      });
    // Empty and Loading States
    return <div className="orders">{orders}</div>;
  }
}

export default Orders;
