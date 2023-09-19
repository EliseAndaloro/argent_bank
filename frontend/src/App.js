import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import SignIn from "./pages/sign-in/SignIn";
import Transactions from "./pages/transactions/Transactions";
import User from "./pages/user/User";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/profile" element={<User />} />
        <Route path="/transactions" element={<Transactions />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
