import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return (
        <>
            <nav className='nav'>
                <span>Navigation</span>
                {/* <br /> */}
                <NavLink className={(e) => { return e.isActive ? 'navlink nav-active' : 'navlink' }} to='/'>
                    Weather
                    <i className="fa-solid fa-cloud-sun"></i>
                </NavLink>
            </nav>
        </>
    )
}

export default Navbar;