import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import Cta from "./Cta";
import Form from "./Form";
import "./App.scss";

const App = () => {
  const [formVisible, setFormVisible] = useState(false); //modal form with state true/false for visibility
  const [order, setOrder] = useState([]); //ordered items added to array
  const addToOrder = (item) => {
    setOrder([...order, item]); //add item to order
  };
  const placeOrder = () => {
    console.log(order);
    axios
      .post("https://reqres.in/api/users", order)
      .then((r) => console.log(r))
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
            to="/cart"
            onClick={() => setFormVisible(false)}
            data-cy="cartButton"
          >
            cart [{order.length}]
          </NavLink>
        </nav>
      </header>
      {formVisible ? (
        <Form setFormVisible={setFormVisible} addToOrder={addToOrder} />
      ) : null}
      <Switch>
        <Route exact path="/">
          <Cta setFormVisible={setFormVisible} />
        </Route>
        <Route path="/pizza">
          <Cta setFormVisible={setFormVisible} />
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
                  const toppingsString =
                    toppings.filter(Boolean).length > 0
                      ? `with ${toppings.filter(Boolean).join(", ")}`
                      : "no toppings";
                  return (
                    <li key={`item-${index}`} className="orderItem">
                      {item.size} pizza {toppingsString}
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
                feed me now!
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
