import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const NavbarLawyer = ({ props }) => {
    return( <nav className='navbar navbar-default'>
<div class="container-fluid navbar-dimensions">
<div class="navbar-header">
<Link class="navbar-brand" to = '/homepage'>
        <img height='40' src = {require('../../../assets/img/logo.png')} />
        </Link>  
    </div>

    <ul class="nav navbar-nav navbar-right">
    <li>  <Link to = '/main/userpackages'>
       
        <button class="universalNavBtn"> Pricing Plans</button>
        </Link></li>
    <li class="">  
        <Link to = '/main/register'>
        <button class="universalNavBtn">I NEED A LAWYER</button>
        </Link>
      </li>
      <li className='active'>
        <Link to = '/main/register'>
        <button class="universalNavBtn" >I'M INTERESTED</button>
        </Link>
      </li>
    </ul>
</div>
</nav>

    );
}
export default NavbarLawyer;