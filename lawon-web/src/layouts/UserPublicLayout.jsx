import React, { Component } from 'react';
import { Route, HashRouter } from "react-router-dom";
import UserPublicNavbar from '../components/molecules/navbar/UserPublicNavbar'
import HomePage from "../containers/HomePage";
import AboutUs from "../containers/Aboutus/AboutUs";
import ContactUs from "../containers/ContactUs/ContactUs";
import Blog from "../containers/Blog/blog";
import PrivacyPolicy from "../containers/PrivacyPolicy";
import TermsandConditions from "../containers/TermsandConditions";
import UserSocialLogin from "../containers/UserSocialMediaLogin";
import UserRegisterEmail from "../containers/UserRegEmail";
import ResetPassword from "../containers/ResetPassword";
import UserSocialReg from "../containers/UserSocialMediaReg";
import UserEnterOtpCodeResetPassword from '../containers/UserEnterOtpCodeResetPassword';
import UserNewPassword from '../containers/UserNewPassword';


class MainLayout extends Component {
  render() {
    return (
      <div>
        <UserPublicNavbar/>
        <HashRouter>
          <Route exact path="/" component={HomePage} />
          <Route path="/main/aboutus" component={AboutUs} />
          <Route path="/main/contactus" component={ContactUs} />
          <Route path="/main/blog" component={Blog} />
          <Route path="/main/privacypolicy" component={PrivacyPolicy} />
          <Route path="/main/termsandconditions" component={TermsandConditions} />
          <Route path="/main/usersociallogin" component={UserSocialLogin} />
          <Route path="/main/userregemail" component={UserRegisterEmail} />
          <Route path="/main/resetpassword" component={ResetPassword} />
          <Route path="/main/resetpassword-otp" component={UserEnterOtpCodeResetPassword}/>
          <Route path="/main/usersocialreg" component={UserSocialReg} />
          <Route path="/main/user/newpassword" component={UserNewPassword} />
        </HashRouter>
      </div>
    );
  }
}

export default MainLayout;