import React, { Component } from "react";
import QantityChecker from "../components/QantityChecker";
import parentMenu from "../data";
import "./DisplayTable.css";
import CartTotal from "../components/CartTotal";
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
        {this.incart().length > 0 ? (
          <CartTotal
            data={this.incart()}
            increment={this.increment}
            decrement={this.decrement}
          />
        ) : null}
      </div>
    );
  }
}

export default DisplayTable;
