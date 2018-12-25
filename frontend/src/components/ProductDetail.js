import React, { Component } from 'react';

const ProductDetail = ({ match }) => {
  const item = this.props.curProduct;
  return (
    <div>
      <div>
        <h2>{match.params.name}}</h2>
        <h3>Best Tea in the world</h3>
      </div>
      <div className="product-detail-data">
        <img src={item.src} />
        <p>{item.description}</p>
      </div>
      <div className="product-options">
        <form>
          <label>
            Size
            <select>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
          <br />
          <label>
            Temperature
            <select>
              <option value="cold">Cold</option>
              <option value="warm">Warm</option>
              <option value="hot">Hot</option>
            </select>
          </label>
          <br />
          <label>
            Toppings
            <select>
              <option value="boba">Boba</option>
            </select>
          </label>
          <br />
          <input type="submit" name="AddCart" value="Add to Cart" />
          <input type="submit" name="Checkout" value="Proceed to Cart" />
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
