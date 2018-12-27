import React, { Component } from 'react';
import CartItem from './CartItem';
import { TransitionGroup } from "react-transition-group";
import EmptyCart from "../empty-states/EmptyCart";

class Cart extends Component {
    render() {
        let cartItems = this.props.cartItems.map((product, i) => {
            return <CartItem id={i} item={product} removeProduct={this.props.removeProduct} />;
        });

        if (cartItems.length <= 0) {
            return <EmptyCart />;
        } else {
            return (
                <TransitionGroup>
                    {cartItems}
                </TransitionGroup>
            );
        }
    }
}

export default Cart;