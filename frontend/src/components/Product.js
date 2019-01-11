import React, { Component } from "react";
import Counter from "./Counter";

const AvailabilityLabel = (prop) => {
  let count = prop.count;
  if (count >= 20) {
    return <p className="badge badge-success">available</p>;
  }
  if (count > 0) {
    return <p className="badge badge-warning">{count} left</p>;
  }

  return <p className="badge badge-danger">sold out</p>
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
    if (quantity + quantityInCart > availableQuantity || quantity < 0) {
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
    let category = product.category;
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
        <div className="product_content">
          <div className="product_info d-flex flex-row align-items-start justify-content-start">
            <div>
              <div>
                <div className="product_name"><a>{name}</a></div>
                <div className="product_category">In <a>{category}</a></div>
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="rating_r rating_r_4 home_item_rating"><i></i><i></i><i></i><i></i><i></i></div>
              <div className="product_price text-right">{"$" + Math.floor(price)}<span>{"." + (price * 100 % 100)}</span></div>
              <AvailabilityLabel count={availableQuantity} />
            </div>
          </div>
          <div className="product_buttons">
            <div className="text-right d-flex flex-row align-items-start justify-content-start">
              <button className="text-center d-flex flex-column align-items-center justify-content-center">
                <Counter
                  quantity={this.state.quantity}
                  updateQuantity={this.updateQuantity}
                />
              </button>
              <button
                className="product_button product_cart text-center d-flex flex-column align-items-center justify-content-center"
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
                <div><div>
                  <img src="images/cart.svg" className="svg" alt="" /><div>+</div>
                </div></div>
              </button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Product;
