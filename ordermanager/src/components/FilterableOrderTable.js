import React from 'react';
import SearchBar from './SearchBar';
import OrderTable from './OrderTable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class FilterableOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
      date: new Date(),
      filterText: '',
      completedOrderOnly: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleCompletedOrderChange = this.handleCompletedOrderChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleCompletedOrderChange(completedOrderOnly) {
    this.setState({
      completedOrderOnly: completedOrderOnly
    })
  }

  handleDatePickerChange(date) {
    this.setState({
      date: date
    });
  }

  handleClick() {
    // TODO: change it to production URL
    fetch('http://localhost:8010/anaanas-dev/us-central1/getOrders')
    .then(response => {
      return response.json();
    })
    .then(orders => {
      this.setState({
        orders: orders
      });
      console.log(JSON.stringify(orders));
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div>
        <DatePicker
          placeholderText="Click to select a date"
          selected={this.state.date}
          onChange={this.handleDatePickerChange}
        />
        <br/>
        <button type="button" onClick={this.handleClick}>Get orders</button>
        <br/>
        <br/>
        <SearchBar
          filterText={this.state.filterText}
          completedOrderOnly={this.state.completedOrderOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onCompletedOrderChange={this.handleCompletedOrderChange}
        />
        <OrderTable
          orders={this.state.orders}
          filterText={this.state.filterText}
          completedOrderOnly={this.state.completedOrderOnly}
        />
      </div>
    );
  }
}

export default FilterableOrderTable;
