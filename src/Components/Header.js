import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        <img
          className="ImageNavbrsixecontrol"
          src="/images/Component1.png"
          alt=""
        />
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="https://asherdn.com/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/">Blogs</NavLink>
        </li>
        <li>
          <NavLink to="https://asherdn.com/#about">About</NavLink>
        </li>
        <li>
          <NavLink to="https://asherdn.com/#services">Services</NavLink>
        </li>
        <li>
          <NavLink to="https://asherdn.com/#portfolio">Portfolio</NavLink>
        </li>
        <li>
          <NavLink to="https://asherdn.com/#team">Team</NavLink>
        </li>
        <li>
          <NavLink to="https://asherdn.com/#contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};
