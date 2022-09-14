import React, { Component } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import { connect } from "react-redux";

import FormElements from "./StripeElements";
import * as actions from "../../actions/organization";
import { STRIPE_PUBLIC_KEY } from '../../common/constants';
import "./stripe.css";

class OrganizationPaymentDetails extends Component {
  state = {
    cardId: 0,
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 no-padding">
            <div className="selected-plan-box">
              <div class="active-package-box package-box">
                <div class="package-box-img">
                  <img src={require("../../assets/img/pkg-icon.png")} />
                </div>
                <div class="package-box-head"></div>
                <div class="pkg-btn-btm active-pkg-btn-btm">
                  <div class="pkg-price">
                    <span class="pound">£</span>
                    <span class="bold-price">
                      {this.state.selectedPlanPrice}
                    </span>
                    <span> / month</span>
                  </div>
                </div>
                <div className="update-plan">UPDATE YOUR PLAN</div>
              </div>

              <div class="pkg-btn-btm">
                <div class="pkg-price">
                  <span class="bold">Save 20% with the annual plan!</span>
                </div>
                <button type="button" class="btn top-dashboard-btn">
                  Pay Annually
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8 make-payment-sec">
            <h1 className="text-center">Make Payment</h1>
            <div className="form-box">
              <div className="stripe-img">
                <img
                  className=""
                  src={require("../../assets/img/stripe.png")}
                />
              </div>
              <div className="form-payment">
                <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
                  <Elements>
                    <FormElements {...this.props} {...this.state} />
                  </Elements>
                </StripeProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ organization }) => {
  const { cards } = organization || {};
  return {
    ...cards,
  };
};

export default connect(mapStateToProps, actions)(OrganizationPaymentDetails);
