import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Avatar, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Button, TYPES } from '../../atoms/YellowButton';

const useStyles = makeStyles({
  root: {
    background: '#fff',
    color: '#gray'
  },
  logo: {
    width: '80px',
    height: '20px'
  },
  toolbar: {
    marginLeft: '20px'
  },
  navigation: {
    marginLeft: '60px'
  },
  navigationAction: {
    fontSize: '14px',
    fontWeight: 'bold'
  }
});

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position='fixed' className={classes.root}>
        <Toolbar>
          <a href='#/'>
            <Avatar
              className={classes.logo}
              variant='square'
              src={require("../../../assets/img/logo.png")}
            />
          </a>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%'
          }}>
            <Button
              text='FOR LAWYERS'
              type='button'
              style={{ marginRight: '10px' }}
              onClick={() => (window.location = '#/main/forlawyer')}
              buttonType={TYPES.YellowGeneric}
            />
            <a href='#/main/usersociallogin' className="universalBtn">LOGIN</a>
          </div>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
    // <React.Fragment>
    //   {showNotification == true && (
    //     <div className="notification-div">
    //       <div
    //         class="right-side-light-para text-center"
    //         style={{ fontWeight: "bold" }}>
    //         NOTIFICATIONS
    //       </div>
    //       <div className="address-select-list">
    //         <div class="right-side-light-para">
    //           <div className="notify-icon">
    //             <i className="fa fa-sticky-note" />
    //           </div>
    //           <div className="notify-text">
    //             <div className="notify-head">Hamza Added A Notification</div>
    //             <div>What is it</div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   <nav className="navbar navbar-default">
    //     <div className="container-fluid navbar-dimensions">
    //       <div onClick={this.props.onLogo} className="navbar-header">
    //         <Link className="navbar-brand" to="/homepage">
    //           <img
    //             height="30"
    //             src={require("../../../assets/img/logo.png")}
    //           />
    //         </Link>
    //       </div>

    //       {lawyerAccessToken != "" && (
    //         <ul className="nav navbar-nav navbar-right user-navbar">
    //           <li>
    //             <i
    //               onClick={this.showNotificationWindow}
    //               className="fa fa-bell"
    //             />
    //           </li>
    //           <li className="username-nav">
    //             lawyer FirstName
    //           </li>
    //           <li>
    //             <div onClick={this.showDropdownMenu} className="navbar-image">
    //               <img height="35" />
    //             </div>
    //           </li>

    //           {this.state.displayMenu ? (
    //             <div className="dropdwon-navbar">
    //               <span>
    //                 <i className="fa fa-caret-up caret-top" />
    //               </span>
    //               <Link to="/homepage">
    //                 <div onClick={this.props.onLogout}>
    //                   <span>
    //                     <i className="fa fa-circle-o" />
    //                   </span>
    //                   Log Out
    //                 </div>
    //               </Link>
    //             </div>
    //           ) : null}
    //         </ul>
    //       )}

    //       {userAccessToken != "" && this.props.isLogoTrue && (
    //         <ul className="nav navbar-nav">
    //           <li className="">
    //             <Link to="/main/userdashboardmain">DASHBOARD</Link>
    //           </li>

    //           <li className="">
    //             <Link to="/main/userallquestions">QUESTIONS</Link>
    //           </li>

    //           <li className="">
    //             <Link to="/main/userallconsultations">CONSULTATIONS</Link>
    //           </li>
    //           <li className="">
    //             <Link to="/main/userallinsturctions">INSTRUCTIONS</Link>
    //           </li>
    //         </ul>
    //       )}

    //       <div>
    //          {/* {this.props.forLawyers == false && (
    //           <ul className="nav navbar-nav navbar-right">
    //             <li className="">
    //               <Link to="/main/forlawyer">
    //                 <button
    //                   onClick={this.props.onForLawyers}
    //                   className="universalNavBtn"
    //                 >
    //                   For Lawyers
    //                 </button>
    //               </Link>
    //             </li>
    //             <li className="active">
    //               <Link to="/main/usersocialreg">
    //                 <button
    //                   onClick={this.props.OnSignUp}
    //                   className="universalNavBtn"
    //                 >
    //                   Sign Up
    //                 </button>
    //               </Link>
    //             </li>
    //           </ul>
    //         )}  */}

    //         {/* {(this.props.isLogoTrue && lawyerAccessToken == "") ||
    //           (userAccessToken == "" && this.props.forLawyers == false && (
    //             <ul className="nav navbar-nav navbar-right">
    //               <li className="">
    //                 <Link to="/main/forlawyer">
    //                   <button
    //                     onClick={this.props.onForLawyers}
    //                     className="universalNavBtn"
    //                   >
    //                     For Lawyers
    //                   </button>
    //                 </Link>
    //               </li>
    //               <li className="active">
    //                 <Link to="/main/usersocialreg">
    //                   <button
    //                     onClick={this.props.OnSignUp}
    //                     className="universalNavBtn"
    //                   >
    //                     Sign Up
    //                   </button>
    //                 </Link>
    //               </li>
    //             </ul>
    //           ))} */}
    //         {this.props.forLawyers && lawyerAccessToken == "" ? (
    //           <ul className="nav navbar-nav navbar-right">
    //             <li>
    //               <Link to="/main/userpackages">
    //                 <button className="universalNavBtn">
    //                   {" "}
    //                   Pricing Plans
    //                 </button>
    //               </Link>
    //             </li>

    //             <li className="active">
    //               <Link to="/main/login">
    //                 <button className="universalNavBtn">Login</button>
    //               </Link>
    //             </li>
    //           </ul>
    //         ) : null}
    //         {this.props.isLogin == false &&
    //         this.props.isLogoTrue == false &&
    //         this.props.forLawyers == false ? (
    //           <ul className="nav navbar-nav navbar-right">
    //             <li className="">
    //               <Link to="/main/usersociallogin">Login</Link>
    //             </li>
    //             <li>
    //               <Link to="/main/userregemail">Register</Link>
    //             </li>
    //           </ul>
    //         ) : (
    //           userAccessToken != "" && (
    //             <ul className="nav navbar-nav navbar-right user-navbar">
    //               <li className="username-nav">{this.props.myName}</li>
    //               <li>
    //                 <div
    //                   onClick={this.showDropdownMenu}
    //                   className="navbar-image"
    //                 >
    //                   <img
    //                     height="35"
    //                     src="https://i.picsum.photos/id/633/500/328.jpg"
    //                   />
    //                 </div>
    //               </li>
    //               {this.state.displayMenu ? (
    //                 <div className="dropdwon-navbar">
    //                   <span>
    //                     <i className="fa fa-caret-up caret-top" />
    //                   </span>
    //                   <Link to="/main/userprofile">
    //                     <div>
    //                       <span>
    //                         <i className="fa fa-circle-o" />
    //                       </span>
    //                       My Profile
    //                     </div>
    //                   </Link>

    //                   <Link to="/main/userpaymentdetails">
    //                     <div>
    //                       <span>
    //                         <i className="fa fa-circle-o" />
    //                       </span>
    //                       Payment Details
    //                     </div>
    //                   </Link>

    //                   <Link to="/homepage">
    //                     <div onClick={this.props.onLogout}>
    //                       <span>
    //                         <i className="fa fa-circle-o" />
    //                       </span>
    //                       Log Out
    //                     </div>
    //                   </Link>
    //                 </div>
    //               ) : null}
    //             </ul>
    //           )
    //         )}
    //       </div>
    //     </div>
    //   </nav>
    // </React.Fragment>
  );
}

export default Navbar
