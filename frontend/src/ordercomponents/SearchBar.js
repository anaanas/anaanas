import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleCompletedOrderChange = this.handleCompletedOrderChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleCompletedOrderChange(e) {
    this.props.onCompletedOrderChange(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.completedOrderOnly}
            onChange={this.handleCompletedOrderChange}
          />
          Only show completed orders
        </p>
      </form>
    );
  }
}

export default SearchBar;
