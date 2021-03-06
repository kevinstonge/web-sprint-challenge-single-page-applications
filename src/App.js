import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
} from "react-router-dom";
import Cta from "./Cta";
import Form from "./Form";
import "./App.scss";

const App = () => {
  const [formVisible, setFormVisible] = useState(false); //modal form with state true/false for visibility
  const [order, setOrder] = useState([]); //ordered items added to array
  const [orderPlaced, setOrderPlaced] = useState({
    orderPlaced: false,
    orderDetails: {},
  });
  const addToOrder = (item) => {
    setOrder([...order, item]); //add item to order
  };
  const placeOrder = () => {
    console.log(order);
    axios
      .post("https://reqres.in/api/users", order)
      .then((r) => {
        console.log("order placed successfully");
        setOrderPlaced({ orderPlaced: true, orderDetails: r.data });
        setOrder([]);
      })
      .catch((e) => console.log(e)); //send order to server
  };
  useEffect(() => {
    if (window.location.pathname === "/pizza") {
      setFormVisible(true);
    }
  }, []);
  return (
    <Router>
      <header>
        <div>
          <NavLink to="/">
            <h1>Lambda Eats</h1>
          </NavLink>
        </div>
        <nav>
          <NavLink
            to="/pizza"
            onClick={() => setFormVisible(true)}
            data-cy="pizzaRouteButton"
          >
            /pizza
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setFormVisible(false)}
            data-cy="cartButton"
          >
            cart [{order.length === 0 ? "empty" : order.length}]
          </NavLink>
        </nav>
      </header>
      {formVisible ? (
        <Form
          setFormVisible={setFormVisible}
          addToOrder={addToOrder}
          order={order}
        />
      ) : null}
      {orderPlaced.orderPlaced ? <Redirect to="/success" /> : null}
      {order.length > 0 ? <Redirect to="/cart" /> : null}
      <Switch>
        <Route exact path="/">
          <Cta setFormVisible={setFormVisible} />
        </Route>
        <Route path="/pizza">
          <Cta setFormVisible={setFormVisible} />
        </Route>
        <Route path="/success">
          <h3>Thank you for your order!</h3>
          <p>{JSON.stringify(orderPlaced.orderDetails)}</p>
        </Route>
        <Route path="/cart">
          {order.length > 0 ? (
            <>
              <h2 className="cartHeading">
                Review your order, {order[0].name}
              </h2>
              <ol>
                {order.map((item, index) => {
                  let toppings = Object.keys(item).map((k) =>
                    k.includes("tp_") && item[k] === true ? k.substr(3) : null
                  );
                  let instructions =
                    item.specialInstructions.length > 0
                      ? ` (special instructions: ${item.specialInstructions})`
                      : null;
                  const toppingsString =
                    toppings.filter(Boolean).length > 0
                      ? `with ${toppings.filter(Boolean).join(", ")}`
                      : "no toppings";
                  return (
                    <li key={`item-${index}`} className="orderItem">
                      one {item.size} pizza {toppingsString}
                      {instructions}.
                    </li>
                  );
                })}
              </ol>
              <button
                className="addItemButton"
                onClick={() => setFormVisible(true)}
              >
                add something else to this order
              </button>
              <button className="placeOrderButton" onClick={() => placeOrder()}>
                place order now!
              </button>
            </>
          ) : (
            <>
              <h2 className="cartHeading">You have no items in your cart</h2>
              <button
                className="addItemButton"
                onClick={() => setFormVisible(true)}
              >
                add something!
              </button>
            </>
          )}
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
