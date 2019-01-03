import React, { Component } from 'react';

class Menu extends Component {
    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        let menuClass = this.props.showMenu ? "menu active" : "menu";

        return <div className={menuClass}>
            <div className="menu_search">
                <form action="#" id="menu_search_form" className="menu_search_form">
                    <input type="search"
                        ref="searchBox"
                        className="search_input"
                        placeholder="Search Item"
                        required="required"
                        onChange={this.props.handleSearch.bind(this)} />
                    <button className="menu_search_button"
                        type="submit"
                        onClick={this.handleSubmit.bind(this)}>
                        <img src="images/search.png" alt="" />
                    </button>
                </form>
            </div>
            <div className="menu_nav">
                <ul>
                    <li><a href="#">Women</a></li>
                    <li><a href="#">Men</a></li>
                    <li><a href="#">Kids</a></li>
                    <li><a href="#">Home Deco</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
            <div className="menu_contact">
                <div className="menu_phone d-flex flex-row align-items-center justify-content-start">
                    <div><div><img src="images/phone.svg" alt="https://www.flaticon.com/authors/freepik" /></div></div>
                    <div>+1 912-252-7350</div>
                </div>
                <div className="menu_social">
                    <ul className="menu_social_list d-flex flex-row align-items-start justify-content-start">
                        <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-youtube-play" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    }
}

export default Menu;