import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const NavbarHome = ({ props }) => {
    return( <nav className='navbar navbar-default'>
<div class="container-fluid navbar-dimensions">
<div class="navbar-header">
<Link class="navbar-brand" to = '/homepage'>
        <img height='40' src = {require('../../../assets/img/logo.png')} />
        </Link>  
    </div>

    <ul class="nav navbar-nav navbar-right">
    <li class="">
        <Link to = '/main/forlawyer'>
        <button class="universalNavBtn">For Lawyers</button>
        </Link>
      </li>
      <li className='active'>
        <Link to = '/main/usersocialreg'>
        <button class="universalNavBtn" >Sign Up</button>
        </Link>
      </li>
    </ul>
</div>
</nav>

    );
}
export default NavbarHome;