import React, { Component } from 'react';
import CartItem from './CartItem';
import EmptyCart from "../empty-states/EmptyCart";



let TableHeader = (props) =>
    (<div className="cart_bar">
        <ul className="cart_bar_list item_list d-flex flex-row align-items-center justify-content-end">
            <li className="mr-auto">Product</li>
            <li>Size</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Total</li>
        </ul>
    </div>)

let CartItems = (props) => {
    let cartItems = props.cartItems.map((product, i) => {
        return <CartItem key={i} index={i} item={product} handleUpdateCart={props.handleUpdateCart} />;
    });

    return <div className="cart_items">
        <ul className="cart_items_list">
            {cartItems}
        </ul>
    </div>
}
let CartSection = (props) => {
    return <div className="cart_section">
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="cart_container">
                        <TableHeader />
                        <CartItems
                            cartItems={props.cartItems}
                            handleUpdateCart={props.handleUpdateCart}
                        />
                        <div className="cart_buttons d-flex flex-row align-items-start justify-content-start">
                            <div className="cart_buttons_inner ml-sm-auto d-flex flex-row align-items-start justify-content-start flex-wrap">
                                <div className="button button_clear trans_200"><a href="categories.html">clear cart</a></div>
                                <div className="button button_continue trans_200"><a href="categories.html">continue shopping</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row cart_extra_row">
                <div className="col-lg-6">
                    <div className="cart_extra cart_extra_1">
                        <div className="cart_extra_content cart_extra_coupon">
                            <div className="cart_extra_title">Coupon code</div>
                            <div className="coupon_form_container">
                                <form action="#" id="coupon_form" className="coupon_form">
                                    <input type="text" className="coupon_input" required="required" />
                                    <button className="coupon_button">apply</button>
                                </form>
                            </div>
                            <div className="coupon_text">Phasellus sit amet nunc eros. Sed nec congue tellus. Aenean nulla nisl, volutpat blandit lorem ut.</div>
                            <div className="shipping">
                                <div className="cart_extra_title">Shipping Method</div>
                                <ul>
                                    <li className="shipping_option d-flex flex-row align-items-center justify-content-start">
                                        <label className="radio_container">
                                            <input type="radio" id="radio_1" name="shipping_radio" className="shipping_radio" />
                                            <span className="radio_mark"></span>
                                            <span className="radio_text">Next day delivery</span>
                                        </label>
                                        <div className="shipping_price ml-auto">$4.99</div>
                                    </li>
                                    <li className="shipping_option d-flex flex-row align-items-center justify-content-start">
                                        <label className="radio_container">
                                            <input type="radio" id="radio_2" name="shipping_radio" className="shipping_radio" />
                                            <span className="radio_mark"></span>
                                            <span className="radio_text">Standard delivery</span>
                                        </label>
                                        <div className="shipping_price ml-auto">$1.99</div>
                                    </li>
                                    <li className="shipping_option d-flex flex-row align-items-center justify-content-start">
                                        <label className="radio_container">
                                            <input type="radio" id="radio_3" name="shipping_radio" className="shipping_radio" defaultChecked />
                                            <span className="radio_mark"></span>
                                            <span className="radio_text">Personal Pickup</span>
                                        </label>
                                        <div className="shipping_price ml-auto">Free</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 cart_extra_col">
                    <div className="cart_extra cart_extra_2">
                        <div className="cart_extra_content cart_extra_total">
                            <div className="cart_extra_title">Cart Total</div>
                            <ul className="cart_extra_total_list">
                                <li className="d-flex flex-row align-items-center justify-content-start">
                                    <div className="cart_extra_total_title">Subtotal</div>
                                    <div className="cart_extra_total_value ml-auto">$29.90</div>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-start">
                                    <div className="cart_extra_total_title">Shipping</div>
                                    <div className="cart_extra_total_value ml-auto">Free</div>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-start">
                                    <div className="cart_extra_total_title">Total</div>
                                    <div className="cart_extra_total_value ml-auto">$29.90</div>
                                </li>
                            </ul>
                            <div className="checkout_button trans_200"><a href="checkout.html">proceed to checkout</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
class Cart extends Component {
    render() {

        if (this.props.cartItems.length <= 0) {
            return <EmptyCart />;
        } else {
            return (
                <div>
                    <div className="home">
                        <div className="home_container d-flex flex-column align-items-center justify-content-end">
                            <div className="home_content text-center">
                                <div className="home_title">Shopping Cart</div>
                                <div className="breadcrumbs d-flex flex-column align-items-center justify-content-center">
                                    <ul className="d-flex flex-row align-items-start justify-content-start text-center">
                                        <li><a href="#">Home</a></li>
                                        <li>Your Cart</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CartSection cartItems={this.props.cartItems} handleUpdateCart={this.props.handleUpdateCart} />
                </div>
            );
        }
    }
}

export default Cart;