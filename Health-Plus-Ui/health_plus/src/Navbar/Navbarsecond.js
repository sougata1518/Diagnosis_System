import React from 'react'
import { NavLink } from "react-router-dom";
import './Navbarsec.css'

const Navbarsecond = () => {
  return (
    <div>
      <ul class="nav  second-nav ">
    <li class="nav-item">
      <NavLink exact to="/lab-tests" className="nav-link" aria-current="page">Lab Tests</NavLink>
    </li>
    <li class="nav-item">
    <NavLink exact to="/find-a-doctor" className="nav-link" aria-current="page">Find a Doctor</NavLink>
    </li>
    <li class="nav-item">
    <NavLink exact to="/consult-us" className="nav-link" aria-current="page">Consult Us</NavLink>
    </li>
    <li class="nav-item">
    <NavLink exact to="/product" className="nav-link" aria-current="page">Product</NavLink>
    </li>
  </ul>
    </div>
  )
}

export default Navbarsecond