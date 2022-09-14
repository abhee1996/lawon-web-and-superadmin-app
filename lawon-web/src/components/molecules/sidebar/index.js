import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

export const SideBar = ({ lawyer }) => {
  const { lawyerType } = lawyer || {};
  return (
    <div className="sidenav">
      <Link to="/main/dashboardmaster/dashboardlink">
        <span>
          <img src={require("../../../assets/img/ico_yellow_dashboard.svg")} />
        </span>
        Dashboard
      </Link>
      <Link to="/main/dashboardmaster/enquiries">
        <span>
          <img src={require("../../../assets/img/ico_yellow_enquiries.svg")} />
        </span>
        Enquiries
      </Link>

      <Link to="/main/dashboardmaster/dashboardconsultation">
        <span>
          <img
            src={require("../../../assets/img/ico_yellow_consultations.svg")}
          />
        </span>
        Consultations
      </Link>

      <Link to="/main/dashboardmaster/dashboardcases">
        <span>
          <img src={require("../../../assets/img/ico_yellow_cases.svg")} />
        </span>
        Cases
      </Link>

      <Link to="/main/dashboardmaster/dashboardcalendar">
        <span>
          <img src={require("../../../assets/img/ico_yellow_calendar.svg")} />
        </span>
        Calendar
      </Link>

      <Link to="/main/dashboardmaster/admindashboard">
        <span>
          <img src={require("../../../assets/img/ico_yellow_admin.svg")} />
        </span>
        Settings
      </Link>

      {lawyerType == 1 && (
        <Link to="/main/dashboardmaster/billingupdateplan">
          <span>
            <img
              src={require("../../../assets/img/ico_yellow_createPlan.png")}
            />
          </span>
          Billing
        </Link>
      )}

      <Link to="/main/dashboardmaster/billingcurrentplan">
        <span>
          <img src={require("../../../assets/img/ico_yellow_createPlan.png")} />
        </span>
        Billing Details
      </Link>

      <Link to="/main/Help">
        <span>
          <img src={require("../../../assets/img/ico_yellow_createPlan.png")} />
        </span>
        Help
      </Link>
    </div>
  );
};

const mapStoreToProps = ({ auth }) => ({ ...auth });

export default connect(
  mapStoreToProps,
  null
)(SideBar);
