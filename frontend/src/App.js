import React, { Component } from 'react';
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import QuickView from "./components/QuickView";
import "./scss/style.scss";

const allProducts = [
  {
    _id: 1,
    name: 'Hand-Made Boba Milk Tea',
    image: 'https://storage.googleapis.com/example-product-images/1-min.JPG',
    price: 5.95,
    availableQuantity: 100,
  },
  {
    _id: 2,
    name: 'Wanglai Fruit Tea',
    image: 'https://storage.googleapis.com/example-product-images/11-min.JPG',
    price: 5.55,
    availableQuantity: 10,
  },
  {
    _id: 3,
    name: 'Senyong Milk Tea',
    image: 'https://storage.googleapis.com/example-product-images/16-min.JPG',
    price: 6.35,
    availableQuantity: 0,
  },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quickViewProduct: {},
      modalActive: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  // Fetch Initial Set of Products from external API
  getProducts() {
    allProducts.forEach((e) => {
      e.quantityInCart = 0;
    })
    this.setState({
      products: allProducts
    });
  }

  componentWillMount() {
    this.getProducts();
  }

  // Search by Keyword
  handleSearch(event) {
    this.setState({ term: event.target.value });
  }
  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({ term: "" });
  }
  // Filter by Category
  handleCategory(event) {
    this.setState({ category: event.target.value });
    console.log(this.state.category);
  }
  // Add to Cart
  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    let cartIdx = -1;
    if (this.checkProduct(productID)) {
      cartIdx = cartItem.findIndex(x => x.id === productID);
      cartItem[cartIdx].quantity =
        Number(cartItem[cartIdx].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartIdx = cartItem.length;
      cartItem.push(selectedProducts);
    }

    // Update 'quantityInCart' to help validation.
    let products = this.state.products;
    let prodIdx = products.findIndex(x => x._id === productID);
    products[prodIdx].quantityInCart = cartItem[cartIdx].quantity;

    this.setState({
      products: products,
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function () {
        this.setState({
          cartBounce: false,
        });
      }.bind(this),
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }
  handleRemoveProduct(id) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id === id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }
  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function (item) {
      return item.id === productID;
    });
  }
  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].quantity;
    }
    this.setState({
      totalItems: total
    });
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    });
  }

  // Open Modal
  openModal(product) {
    this.setState({
      quickViewProduct: product,
      modalActive: true
    });
  }
  // Close Modal
  closeModal() {
    this.setState({
      modalActive: false
    });
  }

  render() {
    return (
      <div className="container">
        <Header
          cartBounce={this.state.cartBounce}
          total={this.state.totalAmount}
          totalItems={this.state.totalItems}
          cartItems={this.state.cart}
          removeProduct={this.handleRemoveProduct}
          handleSearch={this.handleSearch}
          handleMobileSearch={this.handleMobileSearch}
          handleCategory={this.handleCategory}
          categoryTerm={this.state.category}
          productQuantity={this.state.moq}
        />
        <Products
          productsList={this.state.products}
          searchTerm={this.state.term}
          addToCart={this.handleAddToCart}
          openModal={this.openModal}
        />
        <Footer />
        <QuickView
          product={this.state.quickViewProduct}
          openModal={this.state.modalActive}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}

export default App;
