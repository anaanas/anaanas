import React from 'react';
import SearchBar from './SearchBar';
import OrderTable from './OrderTable';

class FilterableOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      completedOrderOnly: false
    };
    
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

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          completedOrderOnly={this.state.completedOrderOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onCompletedOrderChange={this.handleCompletedOrderChange}
        />
        <OrderTable
          orders={this.props.orders}
          filterText={this.state.filterText}
          completedOrderOnly={this.state.completedOrderOnly}
        />
      </div>
    );
  }
}

export default FilterableOrderTable;
