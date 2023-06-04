import React from 'react'
import './index.css'
import logo from '../../../image/logo.png';
import { BsBell } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa"
const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
        <span><h3>Alpha Property Management System</h3></span>
      </div>
      <div className="user-info">
        <span className="notification-icon">
          <BsBell />
        </span>
          <span className="username">Irfan</span>
          <span className='userIcon'><FaRegUserCircle /></span>

      </div>
    </nav>
  )
}

export default Navigation;
