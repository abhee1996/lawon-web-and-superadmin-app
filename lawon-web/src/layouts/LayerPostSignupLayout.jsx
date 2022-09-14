import React, { Component } from 'react';
import { Route, HashRouter, withRouter, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import NavBar from '../components/molecules/navbar/LawyerPostSignupNavbar';

import OrganizationOTP from "../containers/OrganizationOTP";
import OrganizationPaymentDetails from "../containers/OrganizationPaymentDetails";
import AdminProfileSetup from "../components/molecules/adminprofilesetup";
import FirmProfileSetup from "../components/molecules/firmprofilesetup";
import PeopleProfileSetup from "../components/molecules/peopleprofilesetup";


class LayerPostSignupLayout extends Component {
  render() {
    const { lawyerAccessToken, lawyer } = this.props;
    if (!lawyerAccessToken || !lawyer || !Object.keys(lawyer).length) {
      window.location = '#/';
    }
    return (
      <div>
        <NavBar />
        <HashRouter>
          <Switch location={this.props.history.location}>
            <Route path="/main/organizationotp" component={OrganizationOTP} />
            <Route path="/main/organizationpayment" component={OrganizationPaymentDetails} />
            <Route path="/main/adminprofilesetup" component={AdminProfileSetup} />
            <Route path="/main/firmprofilesetup" component={FirmProfileSetup} />
            <Route path="/main/peopleprofilesetup" component={PeopleProfileSetup}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });

export default connect(mapStateToProps)(withRouter(LayerPostSignupLayout));