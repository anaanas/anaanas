import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {

  handleToggleMenu(e) {
    e.preventDefault();
    this.props.handleToggleMenu();
  }
  handleSubmit(e) {
    e.preventDefault();
  }

  // headerSection is the header when viewing from a laptop.
  // todo(ivdone) : cleanup 
  headerSection() {
    return <header className="header">
      <div className="header_overlay"></div>
      <div className="header_content d-flex flex-row align-items-center justify-content-start">
        <div className="logo">
          <Link to="/">
            <div className="d-flex flex-row align-items-center justify-content-start">
              <div><img src="images/logo_1.png" alt="" /></div>
              <div>anaanas</div>
            </div>
          </Link>
        </div>
        <div className="hamburger"
          onClick={this.handleToggleMenu.bind(this)}>
          <i className="fa fa-bars" aria-hidden="true" />
        </div>
        <nav className="main_nav">
          <ul className="d-flex flex-row align-items-start justify-content-start">
            <li className="active"><a href="#">Women</a></li>
            <li><a href="#">Men</a></li>
            <li><a href="#">Kids</a></li>
            <li><a href="#">Home Deco</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        <div className="header_right d-flex flex-row align-items-center justify-content-start ml-auto">
          <div className="header_search">
            <form action="#" id="header_search_form">
              <input type="search"
                ref="searchBox"
                className="search_input"
                placeholder="Search Item"
                required="required"
                onChange={this.props.handleSearch} />
              <button className="header_search_button"
                type="submit"
                onClick={this.handleSubmit.bind(this)}>
                <img src="images/search.png" alt="" />
              </button>
            </form>
          </div>
          <div className="cart">
            <Link to="/cart">
              <div>
                <img className="cart-image" src="images/cart.svg" alt="https://www.flaticon.com/authors/freepik" />
                <div>{this.props.totalInCart}</div>
              </div>
            </Link>
          </div>
          <div className="header_phone d-flex flex-row align-items-center justify-content-start">
            <div><div><img src="images/phone.svg" alt="https://www.flaticon.com/authors/freepik" /></div></div>
            <div>+1 912-252-7350</div>
          </div>
        </div>
      </div>
    </header>
  }

  render() {
    return (
      <div className="super_container">
        {this.headerSection.bind(this)()}
      </div>
    );
  }
}

export default Header;
