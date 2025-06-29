import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { isLoggedIn } from '../../LocalStorage'

const Privateroute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/user-login"} />
}

export default Privateroute