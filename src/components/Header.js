import React from 'react';
import {NavLink} from 'react-router-dom';

 const Header = () => {
    return (
      <header>
        <h1>Expense App</h1>
        <NavLink to="/" exact activeClassName="isActive">Home</NavLink>
        <NavLink to="/Create" activeClassName="isActive">Create</NavLink>
        <NavLink to="/Help" activeClassName="isActive">Help</NavLink>
      </header>
    );
  };

  export default Header;