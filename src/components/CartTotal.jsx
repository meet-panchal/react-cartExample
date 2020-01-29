import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import "../components/CartTotal.css";

const CartTotal = props => {
  let grandTotal = 0;
  props.data.forEach(item => {
    grandTotal += item.quantity * item.price;
  });
  return (
    <div className="table-responsive">
      <table className="table table-hover table-primary">
        <thead>
          <tr className="center">
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(checkedItem => (
            <tr key={checkedItem.id}>
              <th scope="row">{checkedItem.name}</th>
              <td className="center">${checkedItem.price}</td>
              <td className="center">
                <FontAwesomeIcon
                  className="mr-3"
                  icon={faMinusCircle}
                  onClick={() => props.decrement(checkedItem)}
                />
                {checkedItem.quantity}

                <FontAwesomeIcon
                  className="ml-3"
                  icon={faPlusCircle}
                  onClick={() => props.increment(checkedItem)}
                />
              </td>
              <td className="center">
                ${checkedItem.price * checkedItem.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {grandTotal > 0 ? <h1>Grand Total : {grandTotal}</h1> : null}
    </div>
  );
};

export default CartTotal;
