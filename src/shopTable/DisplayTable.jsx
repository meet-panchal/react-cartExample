import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import parentMenu from "../data";
import "./DisplayTable.css";

const QantityChecker = props => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map(category =>
          category.map(foodItem => (
            <tr key={foodItem.id}>
              <th scope="row">
                <p>{foodItem.name}</p>
                <p>{foodItem.description}</p>
              </th>
              <td className="center">${foodItem.price}</td>
              <td className="center">{foodItem.quantity}</td>
              <td className="center">
                <FontAwesomeIcon
                  className="mr-3"
                  icon={faPlusCircle}
                  onClick={() => props.increment(foodItem)}
                />
                <FontAwesomeIcon
                  className="mx-3"
                  icon={faMinusCircle}
                  onClick={() => props.decrement(foodItem)}
                />
                <FontAwesomeIcon
                  className="ml-3"
                  icon={faTimes}
                  onClick={() => props.reset(foodItem)}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

const CartTotal = props => {
  let grandTotal = 0;
  props.data.forEach(item => {
    grandTotal += item.quantity * item.price;
  });
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(checkedItem => (
            <tr>
              <th scope="row">{checkedItem.name}</th>
              <td className="center">${checkedItem.price}</td>
              <td className="center">{checkedItem.quantity}</td>
              <td className="center">
                ${checkedItem.price * checkedItem.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Grand Total : {grandTotal}</h1>
    </div>
  );
};

export class DisplayTable extends Component {
  state = {
    menu: parentMenu.menu.map(category =>
      category.items.map(foodItem => ({ ...foodItem, quantity: 0 }))
    )
  };

  increment = clickedItem => {
    const updateState = () => {
      let updatedState = this.state.menu.slice();
      updatedState.forEach(ele =>
        ele.forEach(innerEle => {
          if (innerEle.id === clickedItem.id) {
            innerEle.quantity += 1;
          }
        })
      );
      return updatedState;
    };
    this.setState({
      menu: updateState()
    });
    console.log(
      `${clickedItem.name} costs ${clickedItem.price} and for ${
        clickedItem.quantity
      } it costs ${clickedItem.quantity * clickedItem.price}`
    );
  };

  decrement = clickedItem => {
    const updateState = () => {
      let updatedState = this.state.menu.slice();
      updatedState.forEach(ele =>
        ele.forEach(innerEle => {
          if (innerEle.id === clickedItem.id && innerEle.quantity > 0) {
            innerEle.quantity -= 1;
          }
        })
      );
      return updatedState;
    };
    this.setState({
      menu: updateState()
    });
  };

  reset = clickedItem => {
    const updateState = () => {
      let updatedState = this.state.menu.slice();
      updatedState.forEach(ele =>
        ele.forEach(innerEle => {
          if (innerEle.id === clickedItem.id) {
            innerEle.quantity = 0;
          }
        })
      );
      return updatedState;
    };
    this.setState({
      menu: updateState()
    });
  };

  incart = _ => {
    let itemsInCart = [];
    let updatedState = this.state.menu.slice();
    updatedState.forEach(ele =>
      ele.forEach(innerEle => {
        if (innerEle.quantity > 0) {
          itemsInCart.push(innerEle);
        }
      })
    );
    return itemsInCart;
  };

  render() {
    return (
      <div>
        <QantityChecker
          data={this.state.menu}
          increment={this.increment}
          decrement={this.decrement}
          reset={this.reset}
        />
        <CartTotal data={this.incart()} />
      </div>
    );
  }
}

export default DisplayTable;
