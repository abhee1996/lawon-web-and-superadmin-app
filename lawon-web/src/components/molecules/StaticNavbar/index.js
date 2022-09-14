import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

class StaticNavbar extends Component {
    state = {  }
    render() { 
        return ( <nav className='navbar navbar-default'>
        <div class="container-fluid navbar-dimensions">
        <div class="navbar-header">
        <Link class="navbar-brand" to = '/homepage'>
                <img height='30' src = {require('../../../assets/img/logo.png')} />
                </Link>  
            </div>        
               <ul class="nav navbar-nav navbar-right">
               <li class="">
                   <Link to = '/main/usersociallogin'>
                          {this.props.myCode==200? this.props.myName:"Login"} 
                   </Link>
                 </li>
                 <li>
                   <Link to = '/main/userregemail'>
                   {this.props.myCode==200? "Logout":"Register"} 
                   </Link>
                 </li>
               </ul>
            

        </div>
        </nav> );
    }
}
const mapStoreToProps = ({common}) => {
  return {
      myCode: common.code,
      myName: common.name, 

  };
};
export default connect(mapStoreToProps)(StaticNavbar);