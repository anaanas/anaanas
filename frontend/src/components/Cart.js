import React, { Component } from 'react';
import CartItem from './CartItem';

class Cart extends Component {
    render() {
        let cartData = this.props.cartItemList.map(cartItem  => {
            return (<CartItem 
                key = {cartItem.id}
                item = {cartItem}
            />)
        });

        return <div className="cart-all">{cartData}</div>
    }
} 

export default Cart;