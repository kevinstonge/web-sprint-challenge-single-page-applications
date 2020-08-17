import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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
  return (
    <Router>
      <header>
        <div>
          <h1>Lambda Eats</h1>
        </div>
        <nav>
          <Link to="/cart" onClick={() => setFormVisible(false)}>
            cart [{order.length}]
          </Link>
        </nav>
      </header>

      <Switch>
        <Route exact path="/">
          <div className="ctaContainer">
            <h2>hungry? click the button below to order pizza!</h2>
            <button className="ctaButton">order pizza!</button>
          </div>
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
