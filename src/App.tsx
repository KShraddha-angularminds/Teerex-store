import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavbarStore from "./components/Navbar/NavbarStore";
import ShowProducts from "./components/ShowProducts/ShowProducts";
import CartComponent from "./components/Cart/CartComponent";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";

function App() {
  const [cartCount, setCartCount] = useState(
    JSON.parse(localStorage.getItem("cartProducts")!)?.length || 0
  );
  return (
    <div className="App">
      <Router>
        <NavbarStore cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={<ShowProducts setCartCount={setCartCount} />}
          />
          <Route
            path="/cart"
            element={<CartComponent setCartCount={setCartCount} />}
          />
          <Route
            path="/place-order"
            element={<PlaceOrder setCartCount={setCartCount} />}
          />
        </Routes>
      </Router>
      {/* <ShowProducts /> */}
    </div>
  );
}

export default App;
