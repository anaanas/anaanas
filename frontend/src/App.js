import React, { Component } from 'react';
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Menu from "./components/Menu";
import FilterableOrderTable from './ordercomponents/FilterableOrderTable';
import Login from './ordercomponents/Login';
// TODO: figure out a way to do it with BrowerRounter
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const allProducts = [
  {
    _id: 1,
    name: 'Hand-Made Boba Milk Tea',
    image: 'https://storage.googleapis.com/example-product-images/1-min.JPG',
    category: "milk tea",
    price: 5.95,
    availableQuantity: 100,
  },
  {
    _id: 2,
    name: 'Wanglai Fruit Tea',
    image: 'https://storage.googleapis.com/example-product-images/11-min.JPG',
    category: "fruit tea",
    price: 5.55,
    availableQuantity: 10,
  },
  {
    _id: 3,
    name: 'Senyong Milk Tea',
    image: 'https://storage.googleapis.com/example-product-images/16-min.JPG',
    category: "milk tea",
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
      showMenu: false,
      quickViewProduct: {},
      modalActive: false
    };
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.handleUpdateCart = this.handleUpdateCart.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.Home = this.Home.bind(this);
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

  // Show Side menu
  handleToggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
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
    products[prodIdx].quantityInCart = Number(cartItem[cartIdx].quantity);

    this.setState({
      products: products,
      cart: cartItem,
    });

    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }

  handleUpdateCart(index, quantity) {
    let cart = this.state.cart;
    if (quantity === 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
    this.setState({
      cart: cart
    });
    console.log(this.state.cart);
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
      totalAmount: total.toFixed(2)
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

  Home() {
    return <Products
      productsList={this.state.products}
      searchTerm={this.state.term}
      addToCart={this.handleAddToCart}
      openModal={this.openModal}
    />
  }

  Cart() {
    return <Cart
      handleUpdateCart={this.handleUpdateCart}
      cartItems={this.state.cart}
      totalAmount={this.state.totalAmount}
    />
  }

  FilteredOrderTable() {
    return <FilterableOrderTable orders={this.state.orders} />;
  }

  render() {
    let containerClass = this.state.showMenu ? "super_container active" : "super_container";
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={this.Home.bind(this)} />
            <Route exact path="/login" component={Login} />
            <Route path="/ordertable" component={this.FilteredOrderTable.bind(this)} />
            <Route path="/cart" component={this.Cart.bind(this)} />
          </Switch>
          <Menu
            showMenu={this.state.showMenu}
            handleSearch={this.handleSearch}
          />
          <div className={containerClass} onClick={this.state.showMenu ? this.handleToggleMenu : undefined}>
            <Header
              totalInCart={this.state.totalItems}
              cartItems={this.state.cart}
              handleSearch={this.handleSearch}
              handleToggleMenu={this.handleToggleMenu}
              handleCategory={this.handleCategory}
              categoryTerm={this.state.category}
              productQuantity={this.state.moq}
            />
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
