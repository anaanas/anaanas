import React, { Component } from 'react';
import './App.css';
import FilterableOrderTable from './components/FilterableOrderTable'

const allOrders = [
  {
    _id: 123,
    products: [
      {
        productId: 1,
        name: 'boba tea',
        count: 2,
        option: {
          temperature: '50%ice',
          sweetness: 'regular',
          size: 'regular',
          topping: 'pearls',
        },
      },
      {
        productId: 2,
        name: 'black sugar milk tea',
        count: 3,
        option: {
          temperature: '50%ice',
          sweetness: '50%sweet',
          size: 'regular',
          topping: 'alo',
        }
      },
    ],
    customerName: 'zzz',
    cell: "1234444444",
    address: "Amazon Day 1",
    status: "completed",
    createdAt: "date1",
    modifiedAt: "date1",
    amountToPay: 15.5,
  },
  {
    _id: 234,
    products: [
      {
        productId: 1,
        name: 'boba tea',
        count: 1,
        option: {
          temperature: 'hot',
          sweetness: '50%sweet',
          size: 'large',
          topping: 'pearls',
        },
      },
      {
        productId: 3,
        name: 'sen yong milk tea',
        count: 1,
        option: {
          temperature: '50%ice',
          sweetness: '25%sweet',
          size: 'regular',
          topping: 'alo',
        }
      },
    ],
    customerName: 'ymq',
    cell: "1235555555",
    address: "MS Day 2",
    status: "pending",
    createdAt: "date2",
    modifiedAt: "date2",
    amountToPay: 9.95,
  },
  {
    _id: 345,
    products: [
      {
        productId: 2,
        name: 'black sugar milk tea',
        count: 4,
        option: {
          temperature: '50%ice',
          sweetness: '25%sweet',
          size: 'large',
          topping: 'mini pearls',
        },
      },
      {
        productId: 3,
        name: 'sen yong milk tea',
        count: 1,
        option: {
          temperature: 'hot',
          sweetness: 'regular',
          size: 'regular',
          topping: 'alo',
        }
      },
    ],
    customerName: 'fzy',
    cell: "1236666666",
    address: "Day 3",
    status: "pending",
    createdAt: "date3",
    modifiedAt: "date3",
    amountToPay: 20,
  },
  {
    _id: 456,
    products: [
      {
        productId: 2,
        name: 'black sugar milk tea',
        count: 10,
        option: {
          temperature: '50%ice',
          sweetness: 'regular',
          size: 'large',
          topping: 'pearls',
        },
      },
    ],
    customerName: 'ymq',
    cell: "1235555555",
    address: "Apple",
    status: "completed",
    createdAt: "date4",
    modifiedAt: "date4",
    amountToPay: 25,
  },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <FilterableOrderTable
          orders={allOrders}
        />
      </div>
    );
  }
}

export default App;
