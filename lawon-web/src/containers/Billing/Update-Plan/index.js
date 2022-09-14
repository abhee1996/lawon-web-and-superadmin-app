import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Switch, MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import { lawyerAPIs } from "./../../../apiConstants/lawyerAPIs";
import { Button, TYPES } from "../../../components/atoms/YellowButton";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#feb41d"
    },
    secondary: {
      main: "#fafafa"
    }
  }
});

class UpdatePlan extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      businessValue: 45,
      StandardValue: 95,
      eliteValue: 345,
      addActive: 1
    };
  }

  async componentDidMount() {
    var allPlans = await lawyerAPIs.getAllPlans();
    console.log("im plans", allPlans.data);
  }

  saveLawyerPlan(selectedPlan) {
    localStorage.setItem("_lawyerSelectedPlanID", selectedPlan);
    this.props.history.push({
      pathname: "/main/register/",
      search: "selectedPlan=" + selectedPlan.toString()
    });
    // this.props.history.push("/main/register");
  }

  handlecheckPackage = ({ target: { checked }}) => {
    if (checked) {
      this.setState({
        businessValue:
          this.state.businessValue - (this.state.businessValue * 20) / 100,
        StandardValue:
          this.state.StandardValue - (this.state.StandardValue * 20) / 100,
        eliteValue: this.state.eliteValue - (this.state.eliteValue * 20) / 100,
        addActive: 2
      });
    } else {
      this.setState({
        businessValue: 45,
        StandardValue: 95,
        eliteValue: 345,
        addActive: 1
      });
    }
  }

  render() {
    return (
      <div class="main">
        <div class="user-main-content-consultation">
          <div class="container">
            <div className="package-upper text-center">
              <div className="package-upper-head">Select Plan</div>
              <div className="package-upper-subhead">
                Find the right plan for you!
              </div>
              <div className="mini-hr-line"></div>
              <div>
                <span className={this.state.addActive === 1 && "active-filter"}>
                  Monthly
                </span>
                <span>
                  <MuiThemeProvider theme={Theme}>
                    <Switch
                      onChange={this.handlecheckPackage}
                      value="checkedA"
                      color="primary"
                    />
                  </MuiThemeProvider>
                </span>
                <span className={this.state.addActive === 2 && "active-filter"}>
                  Annually{" "}
                </span>
                <span className="save-25"> - Save 20%</span>
              </div>
            </div>

            <div className="row package-boxes billing-current-plan">
              <div className="col-md-3 width">
                <div className="package-box">
                  <div className="package-box-img">
                    <img src={require("../../../assets/img/pkg-icon.png")} />
                  </div>
                  <div className="package-box-head">Small Business</div>
                  <div className="mini-hr-line"></div>
                  <div className="package-lines">
                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">1 Lawyer</span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        1 Area of Law (private)
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        25 mile radius
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Access to New Enquiries via LawOn features
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        3 months free trial
                      </span>
                    </div>
                  </div>

                  <div className="pkg-btn-btm">
                    <div className="pkg-price">
                      <span className="pound">£</span>
                      <span className="bold-price">50</span>
                      <span> / month</span>
                    </div>
                    <Button
                      text="Choose Plan"
                      type="button"
                      onClick={() => this.saveLawyerPlan(1)}
                      buttonType={TYPES.TopDashbord}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-3 width">
                <div className="active-package-box package-box">
                  <div className="package-box-img">
                    <img src={require("../../../assets/img/pkg-icon.png")} />
                  </div>
                  <div className="package-box-head">Standard</div>
                  <div className="mini-hr-line"></div>
                  <div className="package-lines">
                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">3 Lawyer</span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        3 Areas of Law (personal & business)
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        50 mile radius
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Access to New Enquiries
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Whatsapp style communication with clients (end-to-end
                        encryption)
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Video Consultation with new clients
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Use LawOn’s features with your existing clients
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        3 month free trial
                      </span>
                    </div>
                  </div>

                  <div className="pkg-btn-btm active-pkg-btn-btm">
                    <div className="pkg-price">
                      <span className="pound">£</span>
                      <span className="bold-price">125</span>
                      <span> / month</span>
                    </div>
                    <Link to="/main/dashboardmaster/billingcurrentplan">
                      <Button
                        text="Current Plan"
                        type="button"
                        onClick={() => this.saveLawyerPlan(2)}
                        buttonType={TYPES.TopDashbord}
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-3 width">
                <div className="package-box">
                  <div className="package-box-img">
                    <img src={require("../../../assets/img/pkg-icon.png")} />
                  </div>
                  <div className="package-box-head">Elite</div>
                  <div className="mini-hr-line"></div>
                  <div className="package-lines">
                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">10 Lawyer</span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        6 Areas of Law (personal & business)
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        200 mile radius
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Access to New Enquiries
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Whatsapp style communication with clients (end-to-end
                        encryption)
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Video Consultation with new clients
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Use LawOn’s features with your existing clients
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        3 month free trial
                      </span>
                    </div>
                  </div>

                  <div className="pkg-btn-btm">
                    <div className="pkg-price">
                      <span className="pound">£</span>
                      <span className="bold-price">425</span>
                      <span> / month</span>
                    </div>
                    <Button
                      text="Choose Plan"
                      type="button"
                      onClick={() => this.saveLawyerPlan(3)}
                      buttonType={TYPES.TopDashbord}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-3 width">
                <div className="package-box">
                  <div className="package-box-img">
                    <img src={require("../../../assets/img/pkg-icon.png")} />
                  </div>
                  <div className="package-box-head">Bespoke</div>
                  <div className="mini-hr-line"></div>
                  <div className="package-lines">
                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Upto 20 Lawyers
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Upto all Areas of Law (personal & business)
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Upto National radius
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Access to New Enquiries
                      </span>
                    </div>

                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Whatsapp style communication with clients (end-to-end
                        encryption)
                      </span>
                    </div>
                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Video Consultation with new clients
                      </span>
                    </div>
                    <div className="package-line-row">
                      <span>
                        <i className="fa fa-check"></i>
                      </span>
                      <span className="package-line-row-text">
                        Use LawOn’s features with your existing clients
                      </span>
                    </div>
                  </div>

                  <div className="pkg-btn-btm">
                    <div className="pkg-price">
                      <span className="pound">£</span>
                      <span className="bold-price">2000</span>
                      <span> / month</span>
                    </div>

                    <Button
                      text="Choose Plan"
                      type="button"
                      onClick={() => this.saveLawyerPlan(4)}
                      buttonType={TYPES.TopDashbord}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdatePlan;
