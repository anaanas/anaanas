import React from 'react';
import ProductRow from './ProductRow';

class OrderRow extends React.Component {
  render() {
    const id = this.props.order._id;
    const customerName = this.props.order.customerName;
    const cell = this.props.order.cell;
    const address = this.props.order.address;
    const status = this.props.order.status;
    const createdAt = this.props.order.createdAt;
    const amountToPay = this.props.order.amountToPay;

    const productRows = this.props.order.products.map(product =>
      <ProductRow
        product={product}
        key={product._id} />
    );

    return (
      <table>
        <tr>
          <th>order id</th>
          <th>status</th>
          <th>customer name</th>
          <th>cellphone</th>
          <th>address</th>
          <th>amountToPay</th>
          <th>createdAt</th>
        </tr>
        <tr>
          <td>{id}</td>
          <td>{status}</td>
          <td>{customerName}</td>
          <td>{cell}</td>
          <td>{address}</td>
          <td>{amountToPay}</td>
          <td>{createdAt}</td>
        </tr>

        <tr>
          <th/>
          <th>product id</th>
          <th>product name</th>
          <th>count</th>
          <th>ice</th>
          <th>sweetness</th>
        </tr>
        {productRows}
      </table>
    );
  }
}

export default OrderRow;
