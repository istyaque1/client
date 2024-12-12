import React from 'react';
import logo from "../assets/short.svg"

const Navbar = () => {
  return (
    <div className='navbar'>
       <div className="img">
       <img src={logo} alt="" />
       </div>
       <div className="title">
        <h3>Short Url</h3>
       </div>
    </div>
  )
}

export default Navbar