import React, { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment(e) {
    e.preventDefault();
    this.props.updateQuantity(this.props.quantity + 1);
  }

  decrement(e) {
    e.preventDefault();
    this.props.updateQuantity(this.props.quantity - 1);
  }

  feed(e) {
    e.preventDefault();
    this.props.updateQuantity(Number(this.quantity.value));
  }

  resetQuantity() {
    this.props.updateQuantity(1);
  }
  
  render() {
    return (
      <div className="stepper-input">
        <a href="#" className="decrement" onClick={this.decrement}>
          –
        </a>
        <input
          ref={(c) => this.quantity = c}
          type="number"
          className="quantity"
          value={this.props.quantity}
          onChange={this.feed.bind(this)}
        />
        <a href="#" className="increment" onClick={this.increment}>
          +
        </a>
      </div>
    );
  }
}

Counter.propTypes = {
  value: PropTypes.number
};

export default Counter;
