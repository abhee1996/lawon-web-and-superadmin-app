import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// USER DATA OBJECTS;

class NavbarLogin extends Component { 
    
        render() {

return (  
<nav className='navbar navbar-default'>
<div class="container-fluid navbar-dimensions">
        <div onClick={this.props.onLogo}class="navbar-header">
                <Link class="navbar-brand" to = '/homepage'>
                        <img height='30' src = {require('../../../assets/img/logo.png')} />
                </Link>  
        </div>
    


  





    



 
</div>
</nav>

    );
}
}

export default NavbarLogin
