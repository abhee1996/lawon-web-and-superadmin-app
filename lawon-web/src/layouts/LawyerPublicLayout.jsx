import React, { Component } from 'react';
import { Route, HashRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import LawyerPublicNavbar from '../components/molecules/navbar/LawyerPublicNavbar';
import ForLawyer from "../containers/ForLawyerPage";
import UserPackages from "../containers/UserPackages";
import Register from "../containers/Register";
import ResetPassword from "../containers/Lawyer-Reset-Password/GetResetEmail";
import Login from "../containers/Login";
import SendOpt from '../containers/Lawyer-Reset-Password/SendOpt';
import LawyerNewPassword from '../containers/Lawyer-Reset-Password/Lawyer-New-Password';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 11
  }
});

class MainLayout extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <LawyerPublicNavbar />
          <HashRouter>
            <Route path="/main/forlawyer" component={ForLawyer} />
            <Route path="/main/userpackages" component={UserPackages} />
            <Route path="/main/lawyer-resetpassword" component={ResetPassword} />
            <Route path="/main/register" component={Register} />
            <Route path="/main/lawyer-resetpassword-otp" component={SendOpt}/>
            <Route path="/main/lawyer/newpassword" component={LawyerNewPassword} />
            <Route path="/main/login" component={Login} />
          </HashRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MainLayout;