import React from "react";
import logo from "../assests/logo.png";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo"></img>
      <div className="header-options">
        <div>Rent</div>
        <div>Buy</div>
        <div>Sell</div>
        <div>Manage property</div>
        <div>Resource property</div>
      </div>
      <div className="header-login">
        <div>Login</div>
        <div>Sign Up</div>
      </div>
    </div>
  );
}

export default Header;
