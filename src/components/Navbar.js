import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavbarStyles = styled.nav`
  color: #f8f8f8;
  padding: 2rem;
  position: absolute;

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 3em;
    text-transform: uppercase;
  }

  a {
    position: relative;
    padding: 12px 20px;
    font-size: 24px;
    letter-spacing: 5px;
    text-decoration: none;
    z-index: 1;
    color: #f8f8f8;
    transition: color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #f8f8f8;
      transform-origin: center center;
      transform: scaleY(0);
      transition: background-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    &.active {
      color: peru;
      &:after {
        background-color: peru;
      }
    }
    &.active:after,
    &:hover:after {
      transform: scaleY(1);
    }
  }
`;

const Navbar = () => {
  return (
    <NavbarStyles>
      <ul>
        <li>
          <NavLink activeClassName="active" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/box">
            Box
          </NavLink>
        </li>
      </ul>
    </NavbarStyles>
  );
};

export default Navbar;
