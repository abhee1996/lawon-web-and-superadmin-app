import React, { Component } from 'react';
import { Route, HashRouter, withRouter, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import NavBar from '../components/molecules/navbar/LawyerPostSignupNavbar';
import Enquiries from "../containers/Enquiries";
import DashboardConsultations from "../containers/DashboardConsultations";
import AdminDashboard from "../containers/DashboardAdmin";
import AccountSettings from "../containers/AccountSettings";
import ManageYourFirm from "../containers/ManageFirm";
import DashboardCases from "../containers/DashboardCases";
import DashboardCalendar from "../containers/DashboardCalendar";
import CurrentPlan from "../containers/Billing/Current-Plan";
import DashboardLink from "../containers/DashboardLink";
import ManageYourTeam from "../containers/ManageYourTeam";


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

class LayerPostSignupLayout extends Component {
  render() {
    const { lawyerAccessToken, lawyer } = this.props;
    if (!lawyerAccessToken || !lawyer || !Object.keys(lawyer).length) {
      window.location = '#/';
    }

    // if (!lawyer.isPhoneNumberVerified) {
    //   window.location = '#/main/organizationotp'
    // }
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <NavBar />
          <HashRouter>
            <Switch location={this.props.history.location}>

              <Route path="/main/dashboardmaster/dashboardlink" component={DashboardLink}/>

              {/* ...................Enquiry..................... */}
              <Route path="/main/dashboardmaster/enquiries" component={Enquiries} />
              <Route path="/main/dashboardmaster/dashboardconsultation" component={DashboardConsultations} />
              <Route path="/main/dashboardmaster/dashboardcases" component={DashboardCases} />
              <Route path="/main/dashboardmaster/dashboardcalendar" component={DashboardCalendar} />

              <Route path="/main/dashboardmaster/billingcurrentplan" component={CurrentPlan} />


              {/* ...................Settings..................... */}
              <Route path="/main/dashboardmaster/admindashboard" component={AdminDashboard} />
              <Route path="/main/dashboardmaster/accountsettings" component={AccountSettings} />
              <Route path="/main/dashboardmaster/managefirm" component={ManageYourFirm} />
              <Route path="/main/dashboardmaster/manageteam" component={ManageYourTeam}/>
            </Switch>
          </HashRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });

export default connect(mapStateToProps)(withRouter(LayerPostSignupLayout));