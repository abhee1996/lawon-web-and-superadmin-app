import React, { Component } from "react";
import { Link } from "react-router-dom";
import { userAPIs } from "../../../apiConstants/userAPIs";
import { connect } from "react-redux";
import { adminAPIs } from "../../../apiConstants/adminAPIs";

class Navbar extends Component {
  state = {
    adminName: "",
    adminImageURL: "",
    displayMenu: false,
    isUserLog: "",
    showNavLog: null,
  };

  showDropdownMenu = (event) => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  };

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  };

  render() {
    return (
      <nav className="navbar navbar-default">
        <div class="container-fluid navbar-dimensions">
          <div onClick={this.props.onLogo} class="navbar-header">
            <Link class="navbar-brand" to="/homepage">
              <img height="30" src={require("../../../assets/img/logo.png")} />
            </Link>
          </div>
          <div>
            {this.props.isLogin ? (
              <ul class="nav navbar-nav navbar-right user-navbar">
                {/* <li class="padding-t-b-15">
                                <div>
                                        <i class="fa fa-bell"></i>
                                </div>
                        </li> */}
                <li>
                  <div class="navbar-image">
                    {/* <img onClick={this.showDropdownMenu} height="35" src={this.props.AdminInfo.rows[0].imageUrl} /> */}
                  </div>
                </li>
                <li class="username-nav">
                  {/* {this.props.AdminInfo.rows[0].firstName} */}
                </li>
                <li class="username-nav" onClick={this.showDropdownMenu}>
                  <span>
                    <i className="fa fa-caret-down"></i>
                  </span>
                </li>

                {this.state.displayMenu ? (
                  <div className="dropdwon-navbar ">
                    <span>
                      <i className="fa fa-caret-up caret-top"></i>
                    </span>
                    <Link to="/main/dashboardmaster/adminprofile">
                      <div>
                        <span>
                          <i className="fa fa-circle-o"></i>
                        </span>
                        My Profile
                      </div>
                    </Link>

                    <Link to="">
                      <div>
                        <span>
                          <i className="fa fa-circle-o"></i>
                        </span>
                        Settings
                      </div>
                    </Link>
                    <Link to="/main/adminlogin">
                      <div onClick={this.props.onLogout}>
                        <span>
                          <i className="fa fa-circle-o"></i>
                        </span>
                        Log Out
                      </div>
                    </Link>
                  </div>
                ) : null}
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}
const mapStoreToProps = (state) => {
  return {
    isLogin: state.isLogin,

    isLogoTrue: state.isLogoTrue,

    AdminInfo: state.AdminInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () =>
      dispatch({ type: "IS_LOGOUT", localstorage: localStorage.clear() }),
    onLogo: () => dispatch({ type: "ON_LOGO_TRUE" }),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Navbar);
