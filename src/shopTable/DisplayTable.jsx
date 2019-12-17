import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import parentMenu from "../data";
import "./DisplayTable.css";

export class DisplayTable extends Component {
  /* 
  state = {
    foodItems: data,
    currentItem: {},
    quantity: 0
  };

  increaseCounter = (item, index, foodTypeIndex) => {
    this.setState({
      currentItem: { ...item, quantity: this.state.quantity },
      quantity: this.state.quantity + 1
    });
  };
  decreaseCounter = item => {
    this.setState({
      currentItem: {
        quantity: item.quantity - 1,
        ...item
      }
    });
  };

  render() {
    let showData = this.state.foodItems.menu.map((foodType, foodTypeIndex) =>
      foodType.items.map((item, index) => {
        item.quantity = 0;
        return (
          <tr key={item.id}>
            <td>
              <div>
                <p>{item.name}</p>
                <p>{item.description}</p>
              </div>
            </td>
            <td>{item.price}</td>
            <td>
              <FontAwesomeIcon
                icon={faPlusCircle}
                onClick={() => this.increaseCounter(item, index, foodTypeIndex)}
              />
              <span className="px-4">
                {!this.state.currentItem.quantity
                  ? 0
                  : this.state.currentItem.quantity}
              </span>
              <FontAwesomeIcon
                icon={faMinusCircle}
                onClick={() => this.decreaseCounter(item)}
              />
            </td>
          </tr>
        );
      })
    );
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>{showData}</tbody>
        </table>
      </div>
    );
  }
  








 */
}

export default DisplayTable;
