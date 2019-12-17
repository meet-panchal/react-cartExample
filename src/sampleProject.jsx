// const { Component } = React;
import React, { Component } from "react";

// Empty bazar store is initialized on first import.
const { register, poke } = bazar;

const colors = [
  { name: "Yellow", hex: "#FDFF8D", text: "black", price: 15 },
  { name: "Wine", hex: "#4D1310", text: "white", price: 58 },
  { name: "Punch", hex: "#EF5678", text: "black", price: 93 },
  { name: "Blue", hex: "#4342B6", text: "white", price: 7 },
  { name: "Green", hex: "#3CAF49", text: "black", price: 5 },
  { name: "Peach", hex: "#F99484", text: "black", price: 52 },
  { name: "Olive", hex: "#95BE67", text: "black", price: 60 },
  { name: "Rose", hex: "#DF3034", text: "white", price: 10 },
  { name: "Mint", hex: "#97ECC2", text: "black", price: 39 },
  { name: "Lilac", hex: "#B560CA", text: "white", price: 74 },
  { name: "Oil", hex: "#0D0702", text: "white", price: 53 },
  { name: "Teal", hex: "#4DA8AB", text: "white", price: 56 },
  { name: "Slate", hex: "#757A86", text: "white", price: 44 },
  { name: "Blush", hex: "#FEC4E4", text: "black", price: 81 },
  { name: "Sky", hex: "#67C3D8", text: "white", price: 39 },
  { name: "Wood", hex: "#413323", text: "white", price: 43 },
  { name: "Iris", hex: "#9865C2", text: "white", price: 56 },
  { name: "Smoke", hex: "#5A525E", text: "black", price: 2 },
  { name: "Azure", hex: "#2920A2", text: "white", price: 33 },
  { name: "Basil", hex: "#356132", text: "white", price: 43 }
];

const Item = props => {
  const { name, price, hex, text } = props.color;

  const buy = () =>
    poke("App", {
      name,
      type: "increment"
    });

  return (
    <div className="brick">
      <div className="content">
        <div className="color" style={{ color: text }}>
          <div className="palette" style={{ background: hex }} />
          <h1>{name}</h1>
        </div>
        <div className="action">
          <p>$ {price}</p>
          <button className="buyButton" onClick={() => buy()}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

const Shop = props => {
  const items = () => {
    return props.colors.map((color, index) => {
      return <Item color={color} key={index} />;
    });
  };

  return <div className="wall">{items()}</div>;
};

const Cart = props => {
  let total = 0;
  const purchases = props.items.map((item, index) => {
    const { name, hex, price, quantity } = item;
    const currentImport = quantity * price;
    total += currentImport;
    return (
      <li key={index}>
        <span className="cartColor" style={{ background: hex }}>
          {name}
        </span>
        <span className="cartColorQty"> x{item.quantity}</span>
        <button onClick={() => poke("App", { name, type: "increment" })}>
          ➕
        </button>
        <button onClick={() => poke("App", { name, type: "decrement" })}>
          ➖
        </button>
        <span className="cartColorImport"> ${currentImport}</span>
        <button onClick={() => poke("App", { name, type: "remove" })}>🗑</button>
      </li>
    );
  });

  return (
    <div className="Cart">
      <ul>{purchases.length === 0 ? "empty (:" : purchases}</ul>
      <div className="cartTotal">$ {total}</div>
    </div>
  );
};

const Navbar = props => (
  <div className="navBar">
    <ul>
      <li onClick={() => props.changeView("shop")}>
        <span role="img" aria-label="shop">
          🏪{" "}
        </span>
        <span>Shop</span>
      </li>
      <li onClick={() => props.changeView("cart")}>
        <span role="img" aria-label="shop">
          🛒{" "}
        </span>
        <span>Cart </span>
        <span className="cartQuantity">{props.quantity}</span>
      </li>
    </ul>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: colors.map(e => ({
        ...e,
        quantity: 0
      }))
    };

    register({
      id: "App",
      sync: () => this.state,
      onPoke: arg => {
        const { name, type } = arg;
        console.log("poked", name);
        const { colors } = this.state;
        this.setState({
          colors: colors.map(e => {
            const { quantity } = e;
            return e.name === name
              ? {
                  ...e,
                  quantity: (() => {
                    if (type === "increment") return quantity + 1;
                    else if (type === "remove") return 0;
                    return quantity - 1;
                  })()
                }
              : e;
          })
        });
      }
    });

    this.changeView = this.changeView.bind(this);
  }

  changeView = where => this.setState({ view: where });

  render() {
    const { view = "shop", colors } = this.state;

    const quantity = colors.map(e => e.quantity).reduce((a, b) => a + b);

    const inCart = colors.filter(e => e.quantity > 0);

    return (
      <div className="App">
        <Navbar changeView={this.changeView} quantity={quantity} />
        {view === "shop" ? <Shop colors={colors} /> : <Cart items={inCart} />}
      </div>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById("root"));
