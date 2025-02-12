import React from "react";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register";
import Sell from "./components/sell/sell";
import BuyCards from "./components/Buy/buy";
import Bid from "./components/Buy/bid"
import UserItem from "./components/userItems";
import Allproducts from "./components/Admin Panel/products";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buy" element={<BuyCards />} />
          <Route path="/bid/:id" element={<Bid />} />
          <Route path="/UserItem" element={<UserItem />} />
          <Route path="/admin" element={<Allproducts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
