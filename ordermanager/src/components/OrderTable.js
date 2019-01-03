import React from 'react';
import OrderRow from './OrderRow';



class OrderTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const completedOrderOnly = this.props.completedOrderOnly;

    // const rows = [];

    const filterFn = function (order) {
      if (completedOrderOnly && order.status !== 'completed') {
        return false;
      }
      if (order.customerName.indexOf(filterText) === -1 && order.cell.indexOf(filterText) === -1 && order.address.indexOf(filterText) === -1) {
        return false;
      }
      return true
    }

    const rows = this.props.orders.filter(filterFn)
      .map(order =>
        <OrderRow
          order={order}
          key={order._id} />
      )

    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default OrderTable;
