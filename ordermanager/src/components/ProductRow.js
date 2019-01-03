import React from 'react';

class ProductRow extends React.Component {
  render() {
    const id = this.props.product.productId;
    const name = this.props.product.name;
    const count = this.props.product.count;
    const temperature = this.props.product.option.temperature;
    const sweetness = this.props.product.option.sweetness;

    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{count}</td>
        <td>{temperature}</td>
        <td>{sweetness}</td>
      </tr>
    );
  }
}

export default ProductRow;
