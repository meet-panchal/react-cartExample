import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faMinusCircle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

const QantityChecker = props => {
  return (
    <div className="table-responsive">
      <table className="table table-info">
        <thead>
          <tr className="center">
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
                  <small className="mt-0">{foodItem.description}</small>
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
                    color={foodItem.quantity === 0 ? "gray" : "black"}
                  />
                  <FontAwesomeIcon
                    className="ml-3"
                    icon={faTimes}
                    onClick={() => props.reset(foodItem)}
                    color={foodItem.quantity > 0 ? "red" : "black"}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QantityChecker;
