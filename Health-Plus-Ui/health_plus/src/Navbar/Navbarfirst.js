import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import './Navbar.css'
import logo from '../Navbar/Img/logo.jpeg'
import search from '../Navbar/Img/search.png'
import { isLoggedIn } from '../LocalStorage';

const Navbarfirst = ({ data }) => {

    const [login,setLogin] = useState(false)

    useEffect(()=>{
        let data = localStorage.getItem("data");
        if(data != null){
            setLogin(true)
        }
    },[login])

    return (
        <div className="navbar">
            <div className="logo">
                <NavLink exact to="/">
                    <img src={logo} alt="Logo" className='main-logo' />
                </NavLink>
            </div>

            <ul>
                <li>
                    <NavLink exact to="/" className="link">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/product" className="link">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/privateRoute/order" className="link">Order</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className="link">Contact</NavLink>
                </li>
            </ul>
            <div className='search-parent'>
                <div className="search-box">
                    <input type="text" placeholder="Search..." />
                    <img src={search} alt='search-icon' />

                </div>
                <div className='search-result'>
                    <h3>this is a search result</h3>
                </div>
            </div>
            <div>
                <NavLink to="/privateRoute/cart" className="cart-trolley--link">
                    <FaShoppingCart className="cart-trolley" />
                    <span className='cart-total--item'> {data}  </span>
                </NavLink>
            </div>

            {
                login ? (
                    <NavLink to='/account' className="account">
                        <FaUser />
                    </NavLink>
                )
                :
                (
                    <NavLink to='/user-login' className="account">
                        <p className='login-user'>Login</p>
                    </NavLink>
                )
            }
        </div>
    )
}

export default Navbarfirst