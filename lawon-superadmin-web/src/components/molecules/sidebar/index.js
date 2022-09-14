import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import PropTypes from "prop-types";
import Tooltip from "../../atoms/Tooltip-Popover";

class SideBar extends Component {
  state = {
    open: this.props.isTrue,
    display: this.props.isTrue,
    dropdownUser:false,
    dropdownPay: false,
  };

  handleOpenContent = () => {
    if (this.state.open == false) {
      this.setState({
        open: true
      });

      setTimeout(() => {
        this.setState({
          display: true
        });
      }, 505);
      this.props.onOpenTrue();
    } else {
      this.setState({
        open: false,
        display: false
      });
      this.props.onOpenFalse();
    }
  };
  deopdown = () => {
    this.setState({ dropdown: !this.state.dropdown });
  }

  render() {
    return (
      <div>
        <div className={this.state.open ? "sidenav" : "sidenav sidenav-false"}>
          <div
            class={this.state.open ? "menu-button-center" : "menu-button"}
            onClick={() => this.handleOpenContent()}
          >
            <div class="menu"></div>
            <div class="menu"></div>
            <div class="menu"></div>
          </div>

          <Link to="/main/dashboardmaster/superadmindashboard">
            <div>
              <div class="col-md-2 padding-left-0">
                <Tooltip
                  placement="right"
                  trigger={this.state.display ? "" : "hover"}
                  tooltip="Dashboard"
                >
                  <span>
                    <img
                      src={require("../../../assets/img/ico_yellow_dashboard.svg")}
                    />
                  </span>
                </Tooltip>
              </div>
              {this.state.display ? (
                <div class="col-md-10 padding-left-20">Dashboard</div>
              ) : null}
            </div>
          </Link>
          
          <Link to="/main/dashboardmaster/firmlist">
            <div>
               <div class="col-md-2 padding-left-0">
                <Tooltip
                  placement="right"
                  // trigger={this.state.display ? "" : "hover"}
                  tooltip="Dashboard"
                >
                  <span>
                    <img
                      src={require("../../../assets/img/manage-plans.png")}
                    />
                  </span>
                </Tooltip>
              </div>
            {/*  {this.state.display ? ( */}

                <div class="col-md-8 padding-left-20">Firm listing</div>
              {/* ) : null} */}

            </div>
          </Link>
          <Link>
            <div data-toggle="collapse" data-target="#demouser" onClick={()=> this.setState({ dropdownUser:!this.state.dropdownUser})}>
              <div class="col-md-2 padding-left-0">
                <Tooltip
                  placement="right"
                  trigger={this.state.display ? "" : "hover"}
                  tooltip="Firm Listing"
                >
                  <span>
                    <img
                      src={require("../../../assets/img/manage-plans.png")}
                    />
                  </span>
                </Tooltip>
              </div>
              {this.state.display ? (
                <div>
                  <div class="col-md-8 padding-left-20" style={{ width: "65%" }}>User</div>
                  <div class="col-md-2">

                    {this.state.dropdownUser ? (
                      <i class="fa fa-chevron-up" aria-hidden="true"></i>
                    ) : (
                        <i class="fa fa-chevron-down" aria-hidden="true"></i>
                      )}
                  </div>
                </div>

              ) : null}

            </div>
          </Link>

          <div className="collapse" id="demouser">
            <Link to="/main/dashboardmaster/freeuser">
              <div>
                <div className="col-md-2 padding-left-0">
                  <Tooltip
                    placement="right"
                    trigger={this.state.display ? "" : "hover"}
                    tooltip="Free Users"
                  >
                    <span>
                      <img
                        src={require("../../../assets/img/manage-plans.png")}
                      />
                    </span>
                  </Tooltip>
                </div>
                {this.state.display ? (
                  <div
                    className="col-md-10 padding-left-20"
                    style={{ fontSize: "14px" }}
                  >
                    Free Users
                </div>
                ) : null}
              </div>
            </Link>{" "}
            <br />
            <Link to="/main/dashboardmaster/lawyers">
              <div>
                <div className="col-md-2 padding-left-0">
                  <Tooltip
                    placement="right"
                    trigger={this.state.display ? "" : "hover"}
                    tooltip="Lawyers"
                  >
                    <span>
                      <img
                        src={require("../../../assets/img/manage-plans.png")}
                      />
                    </span>
                  </Tooltip>
                </div>
                {this.state.display ? (
                  <div
                    className="col-md-10 padding-left-20"
                    style={{ fontSize: "14px" }}
                  >
                    Lawyers
                </div>
                ) : null}
              </div>
            </Link>
          </div>
          <Link to="/main/dashboardmaster/manageplan">
            <div>
              <div class="col-md-2 padding-left-0">
                <Tooltip
                  placement="right"
                  trigger={this.state.display ? "" : "hover"}
                  tooltip="Manage Plans"
                >
                  <span>
                    <img
                      src={require("../../../assets/img/manage-plans.png")}
                    />
                  </span>
                </Tooltip>
              </div>
              {this.state.display ? (
                <div class="col-md-10 padding-left-20">Manage Plans</div>
              ) : null}
            </div>
          </Link>

          <Link to="/main/dashboardmaster/contactinquiries">
            <div>
              <div class="col-md-2 padding-left-0">
                <Tooltip
                  placement="right"
                  trigger={this.state.display ? "" : "hover"}
                  tooltip="Payment History"
                >
                  <span>
                    <img
                      src={require("../../../assets/img/manage-plans.png")}
                    />
                  </span>
                </Tooltip>
              </div>
              {this.state.display ? (
                <div class="col-md-10 padding-left-20">Contact Inquiries</div>
              ) : null}
            </div>
          </Link>

          <Link>
            <div data-toggle="collapse" data-target="#demo" onClick={()=> this.setState({ dropdownPay:!this.state.dropdownPay})}>
              <div class="col-md-2 padding-left-0">
                <Tooltip
                  placement="right"
                  trigger={this.state.display ? "" : "hover"}
                  tooltip="Payment History"
                >
                  <span>
                    <img
                      src={require("../../../assets/img/manage-plans.png")}
                    />
                  </span>
                </Tooltip>
              </div>
              {this.state.display ? (
                <div>
                  <div class="col-md-8 padding-left-20" style={{ width: "65%" }}>Payment History </div>
                  <div class="col-md-2">

                    {this.state.dropdownPay ? (
                      <i class="fa fa-chevron-up" aria-hidden="true"></i>
                    ) : (
                        <i class="fa fa-chevron-down" aria-hidden="true"></i>
                      )}
                  </div>
                </div>

              ) : null}

            </div>
          </Link>

          <div className="collapse" id="demo">
            <Link to="/main/dashboardmaster/transactionhistory">
              <div>
                <div className="col-md-2 padding-left-0">
                  <Tooltip
                    placement="right"
                    trigger={this.state.display ? "" : "hover"}
                    tooltip="Subscription history"
                  >
                    <span>
                      <img
                        src={require("../../../assets/img/manage-plans.png")}
                      />
                    </span>
                  </Tooltip>
                </div>
                {this.state.display ? (
                  <div
                    className="col-md-10 padding-left-20"
                    style={{ fontSize: "14px" }}
                  >
                    Subscription history
                  </div>
                ) : null}
              </div>
            </Link>{" "}
            <br />
            <Link to="/main/dashboardmaster/transactionhistory">
              <div>
                <div className="col-md-2 padding-left-0">
                  <Tooltip
                    placement="right"
                    trigger={this.state.display ? "" : "hover"}
                    tooltip="Transaction history"
                  >
                    <span>
                      <img
                        src={require("../../../assets/img/manage-plans.png")}
                      />
                    </span>
                  </Tooltip>
                </div>
                {this.state.display ? (
                  <div
                    className="col-md-10 padding-left-20"
                    style={{ fontSize: "14px" }}
                  >
                    Transaction history
                  </div>
                ) : null}
              </div>
            </Link>
          </div>

          <Link to="/main/dashboardmaster/categories">
            <div>
              <div className="col-md-2 padding-left-0 ">
                <Tooltip
                  placement="right"
                  trigger={this.state.display ? "" : "hover"}
                  tooltip="Categories"
                >
                  <span>
                    <img src={require("../../../assets/img/categories.png")} />
                  </span>
                </Tooltip>
              </div>
              {this.state.display ? (
                <div class="col-md-10 padding-left-20">Categories</div>
              ) : null}
            </div>
          </Link>
          <Link to="/main/dashboardmaster/manageblog1">
            <div>
              <div class="col-md-2 padding-left-0">
                <Tooltip
                  placement="right"
                  trigger={this.state.display ? "" : "hover"}
                  tooltip="Blogs"
                >
                  <span>
                    <img src={require("../../../assets/img/blog.png")} />
                  </span>
                </Tooltip>
              </div>{" "}
              {this.state.display ? (
                <div class="col-md-10 padding-left-20">Blogs</div>
              ) : null}
            </div>
          </Link>
          <Link to="/main/dashboardmaster/managecoupon">
            <div>
              <div class="col-md-2 padding-left-0">
                <Tooltip
                  placement="right"
                  trigger={this.state.display ? "" : "hover"}
                  tooltip="Coupons"
                >
                  <span>
                    <img src={require("../../../assets/img/coupon.png")} />
                  </span>
                </Tooltip>
              </div>
              {this.state.display ? (
                <div class="col-md-10 padding-left-20">Coupons</div>
              ) : null}
            </div>
          </Link>
          <Link to="/main/dashboardmaster/mobileonboard">
            <div>
              <div class="col-md-2 padding-left-0">
                <Tooltip
                  placement="right"
                  trigger={this.state.display ? "" : "hover"}
                  tooltip="Mobile Onboarding"
                >
                  <span>
                    <img
                      src={require("../../../assets/img/mobile-onboarding.png")}
                    />
                  </span>
                </Tooltip>
              </div>
              {this.state.display ? (
                <div class="col-md-10 padding-left-20">Mobile Onboarding</div>
              ) : null}
            </div>
          </Link>
          <Link to="/main/dashboardmaster/help">
            <div>
              <div class="col-md-2 padding-left-0">
                <Tooltip
                  placement="right"
                  trigger={this.state.display ? "" : "hover"}
                  tooltip="Help"
                >
                  <span>
                    <img src={require("../../../assets/img/help_icon.png")} />
                  </span>
                </Tooltip>
              </div>
              {this.state.display ? (
                <div class="col-md-10 padding-left-20">Help</div>
              ) : null}
            </div>
          </Link>
          <Link>
            <div data-toggle="collapse" data-target="#appContent ">
              <div class="col-md-2 padding-left-0">
                <Tooltip
                  placement="right"
                  trigger={this.state.display ? "" : "hover"}
                  tooltip="App Content"
                >
                  <span>
                    <img src={require("../../../assets/img/app-content.png")} />
                  </span>
                </Tooltip>
              </div>
              {this.state.display ? (
                <div class="col-md-10 padding-left-20">App Content</div>
              ) : null}
            </div>
          </Link>
          <div class="collapse" id="appContent">
            <Link to="/main/dashboardmaster/aboutus">
              <div>
                <div class="col-md-2 padding-left-0">
                  <Tooltip
                    placement="right"
                    trigger={this.state.display ? "" : "hover"}
                    tooltip="About Us"
                  >
                    <span>
                      <img src={require("../../../assets/img/about-us.png")} />
                    </span>
                  </Tooltip>
                </div>
                {this.state.display ? (
                  <div class="col-md-10 padding-left-20 ">About Us</div>
                ) : null}
              </div>
            </Link>
            <Link to="/main/dashboardmaster/privacypolicy">
              <div>
                <div class="col-md-2 padding-left-0">
                  <Tooltip
                    placement="right"
                    trigger={this.state.display ? "" : "hover"}
                    tooltip="Privacy Policy"
                  >
                    <span>
                      <img
                        src={require("../../../assets/img/privacy-policy.png")}
                      />
                    </span>
                  </Tooltip>
                </div>
                {this.state.display ? (
                  <div class="col-md-10 padding-left-20 ">Privacy Policy</div>
                ) : null}
              </div>
            </Link>
            <Link to="/main/dashboardmaster/termsandcondition">
              <div>
                <div class="col-md-2 padding-left-0">
                  <Tooltip
                    placement="right"
                    trigger={this.state.display ? "" : "hover"}
                    tooltip="Terms And Conditions"
                  >
                    <span>
                      <img
                        src={require("../../../assets/img/terms-and-conditions.png")}
                      />
                    </span>
                  </Tooltip>
                </div>
                {this.state.display ? (
                  <div class="col-md-10 padding-left-20 ">
                    Terms And Conditions
                  </div>
                ) : null}
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    isTrue: state.isTrue
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onOpenTrue: () => dispatch({ type: "IS_TRUE" }),
    onOpenFalse: () => dispatch({ type: "IS_FALSE" })
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(SideBar);
