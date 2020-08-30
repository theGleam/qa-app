import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Header extends Component {

  render() {
    return (
      <header id="header">
        <Link to="/" id="logo">
          <h2>Questions App</h2>
        </Link>
      </header>
    );
  }
};

export default Header;
