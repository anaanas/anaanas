import React, { Component } from "react";
import Counter from "./Counter";

const availabilityLabel = count => {
  if (count >= 20) {
    return <p className="badge badge-success">available</p>;
  }
  if (count > 0) {
    return <p className="badge badge-warning">{count} left</p>;
  }

  return <p className="badge badge-danger">sold out</p>;
};

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdded: false,
      quantity: 1
    };
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  addToCart(image, name, price, id, quantity) {
    this.props.addToCart({
      image: image,
      name: name,
      price: price,
      id: id,
      quantity: quantity
    });

    this.setState(
      {
        isAdded: true,
        quantity: 1
      },
      function () {
        setTimeout(() => {
          this.setState({
            isAdded: false,
          });
        }, 3500);
      }
    );
  }
  quickView(image, name, price, id) {
    this.props.openModal({
      image: image,
      name: name,
      price: price,
      id: id
    });
  }

  updateQuantity(quantity) {
    let quantityInCart = this.props.product.quantityInCart;
    let availableQuantity = this.props.product.availableQuantity;
    // Don't update if input quantity is not available.
    if (quantity + quantityInCart > Number(availableQuantity) || quantity < 0) {
      return;
    }

    this.setState({
      quantity: quantity
    })
  }

  getButtonState() {

    let quantityInCart = this.props.product.quantityInCart;
    let availableQuantity = this.props.product.availableQuantity;


    if (this.state.isAdded) {
      return {
        className: "button-added",
        display: "✔ ADDED",
        disabled: this.state.quantity + quantityInCart > availableQuantity
      };
    }

    if (this.state.quantity + quantityInCart > availableQuantity) {
      return {
        className: "button-disabled",
        display: "SOLD OUT",
        disabled: true
      };
    }

    return { className: "", display: "ADD TO CART", disabled: false };
  }

  render() {
    let product = this.props.product;
    let image = product.image;
    let name = product.name;
    let price = product.price;
    let id = product._id;
    let availableQuantity = product.availableQuantity;

    let buttonState = this.getButtonState();
    return (
      <div className="product">
        <div className="product-image">
          <img
            src={image}
            alt={name}
            onClick={this.quickView.bind(
              this,
              image,
              name,
              price,
              id,
              this.state.quantity
            )}
          />
        </div>
        <h4 className="product-name">{name}</h4>
        <p className="product-price">{price}</p>
        <Counter
          quantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
        />
        {availabilityLabel(availableQuantity)}
        <div className="product-action">
          <button
            className={buttonState.className}
            type="button"
            onClick={this.addToCart.bind(
              this,
              image,
              name,
              price,
              id,
              this.state.quantity,
            )}
            disabled={buttonState.disabled}>
            {buttonState.display}
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
