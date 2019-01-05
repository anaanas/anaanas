import React, { Component } from 'react';
import CartItem from './CartItem';
import EmptyCart from "../empty-states/EmptyCart";

let TableHeader = (props) =>
    (<div className="cart_bar">
        <ul className="cart_bar_list cart_item_list d-flex flex-row align-items-center justify-content-end">
            <li className="mr-auto">Product</li>
            <li>Size</li>
            <li>Price</li>
            <li>Quantity</li>
            <li>Total</li>
        </ul>
    </div>)

let CartItems = (props) => {
    let cartItems = props.cartItems.map((product, i) => {
        return <CartItem
            key={i}
            index={i}
            item={product}
            handleUpdateCart={props.handleUpdateCart}
        />;
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
                                <div className="cart_button cart_button_clear trans_200"><a href="#">clear cart</a></div>
                                <div id="paypal-button-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
class Cart extends Component {
    componentDidMount() {
        if (this.props.cartItems.length == 0) {
            return
        }
        window.paypal.Button.render({

            // Set your environment

            env: 'sandbox', // sandbox | production

            // Specify the style of the button

            style: {
                label: 'paypal',
                size: 'medium',    // small | medium | large | responsive
                shape: 'rect',     // pill | rect
                color: 'blue',     // gold | blue | silver | black
                tagline: false
            },

            // PayPal Client IDs - replace with your own
            // Create a PayPal app: https://developer.paypal.com/developer/applications/create

            client: {
                sandbox: 'Ac69fC1jh87EiTZ7i0cjWWufbpuinenleHagWCqMmeVfDBtzT1naUJr_zPMD2btfEvfZ0N1iHA3yJ9xd',
                production: '<insert production client id>'
            },

            // Set up a payment
            payment: function (data, actions) {
                return actions.payment.create({
                    transactions: [{
                        amount: {
                            total: '30.11',
                            currency: 'USD',
                            details: {
                                subtotal: '30.00',
                                tax: '0.07',
                                shipping: '0.03',
                                handling_fee: '1.00',
                                shipping_discount: '-1.00',
                                insurance: '0.01'
                            }
                        },
                        description: 'The payment transaction description.',
                        custom: '90048630024435',
                        //invoice_number: '12345', Insert a unique invoice number
                        payment_options: {
                            allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
                        },
                        soft_descriptor: 'ECHI5786786',
                        item_list: {
                            items: [
                                {
                                    name: 'hat',
                                    description: 'Brown hat.',
                                    quantity: '5',
                                    price: '3',
                                    tax: '0.01',
                                    sku: '1',
                                    currency: 'USD'
                                },
                                {
                                    name: 'handbag',
                                    description: 'Black handbag.',
                                    quantity: '1',
                                    price: '15',
                                    tax: '0.02',
                                    sku: 'product34',
                                    currency: 'USD'
                                }],
                            shipping_address: {
                                recipient_name: 'Brian Robinson',
                                line1: '4th Floor',
                                line2: 'Unit #34',
                                city: 'San Jose',
                                country_code: 'US',
                                postal_code: '95131',
                                phone: '011862212345678',
                                state: 'CA'
                            }
                        }
                    }],
                    note_to_payer: 'Contact us for any questions on your order.'
                });
            },
            onAuthorize: function (data, actions) {
                return actions.payment.execute().then(function () {
                    window.alert('Payment Complete!');
                });
            }

        }, '#paypal-button-container');
    }

    render() {

        return (
            <div>
                <div className="cart_home">
                    <div className="cart_home_container d-flex flex-column align-items-center justify-content-end">
                        <div className="cart_home_content text-center">
                            <div className="cart_home_title">Shopping Cart</div>
                            <div className="cart_breadcrumbs d-flex flex-column align-items-center justify-content-center">
                                <ul className="d-flex flex-row align-items-start justify-content-start text-center">
                                    <li><a href="#">Home</a></li>
                                    <li>Your Cart</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                { this.props.cartItems.length > 0 ? <CartSection
                    cartItems={this.props.cartItems}
                    handleUpdateCart={this.props.handleUpdateCart}
                    totalAmount={this.props.totalAmount}
                /> : <EmptyCart />}
                
            </div>
        );
    }
}

export default Cart;