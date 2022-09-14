/* global Stripe */
import React, { Component } from "react";
import { Button, TYPES } from "../../components/atoms/YellowButton";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { lawyerAPIs } from "../../apiConstants/lawyerAPIs";
import queryString from "query-string";
import { Loader } from "../../components/atoms/Loader";
import InputMask from "react-input-mask";
import simpleReactValidator from "simple-react-validator";
import LoadingBar from "react-top-loading-bar";
import ErrorPopup from "../../components/molecules/ErrorPopup";
import { connect } from "react-redux";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
  StripeProvider,
  Elements
} from "react-stripe-elements";

var selectedPlanDataObj = [];
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#c23d4b"
      }
    }
  };
};

class _SplitFieldsForm extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.validator = new simpleReactValidator();
    this.state = {
      dialogOpen: false,
      selectedPlanID: "",
      selectedPlan: [],
      selectedPlanPrice: "",
      cardName: "",
      cardNumber: "",
      cardExpiry: null,
      cardCvc: "",
      isDefaultCard: true,
      email: "",
      idForCard: props.lawyerID,
      showLoader: false,
      selectedPlanLawyers: "",
      errorMessage: ""
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    console.log("..............", this.state.idForCard);
    //   this.setState({
    //     selectedPlan:selectedPlanDataObj.data
    // });
    console.log("im upper mount", this.state.selectedPlanPrice);
  }

  async submitCardDetails(evt) {
    evt.preventDefault();
    // if(this.validator.fieldValid('cardName') &&
    // this.validator.fieldValid('cardNumber') &&
    // this.validator.fieldValid('cardExpiry') &&
    // this.validator.fieldValid('cardCvc')){
    this.LoadingBar.continuousStart();
    if (this.props.stripe) {
      var responseStripe = await this.props.stripe
        .createToken()
        .then(this.props.handleResult);
      console.log("responseStripe", responseStripe);
      const dataTobeSent = {
        isDefaultCard: this.state.isDefaultCard,
        cardNumber: responseStripe.token.card.last4,
        expMonth: responseStripe.token.card.exp_month,
        expYear: responseStripe.token.card.exp_year,
        type: responseStripe.token.card.brand,
        token: responseStripe.token.id,
        LawyerId: this.state.idForCard
      };

      var responsevar = await lawyerAPIs.submitLawyerCardDetails(dataTobeSent);
      this.LoadingBar.complete();
      console.log("responsevar", responsevar);
      window.location = "/#/main/welcometolawon";
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
    //}
    //   else{
    //   this.validator.showMessages();
    //   this.forceUpdate();
    // }

    //   if(this.validator.fieldValid('cardName') &&
    //     this.validator.fieldValid('cardNumber') &&
    //    this.validator.fieldValid('cardExpiry') &&
    //   this.validator.fieldValid('cardCvc')){
    //     this.LoadingBar.continuousStart()
    //     var expiryMonth = this.state.cardExpiry.split('/')[0];
    //     var expiryYear = this.state.cardExpiry.split('/')[1];
    //     console.log('cardexpiry',expiryMonth)
    //      const dataTobeSent = {
    //        isDefaultCard:this.state.isDefaultCard,
    //        cardNumber:this.state.cardNumber,
    //        month:expiryMonth,
    //        year:expiryYear,
    //        cvc:this.state.cardCvc,
    //        LawyerId :this.state.idForCard
    //   }
    //    var responsevar = await lawyerAPIs.submitLawyerCardDetails(dataTobeSent);
    //    this.LoadingBar.complete()
    //    console.log('responsevar', responsevar);
    //    if(responsevar.code == 200 || responsevar.code == 201 || responsevar){
    //     localStorage.setItem("selectedPlanLawyers",this.state.selectedPlanLawyers);
    //      this.props.history.push({
    //        pathname: '/main/welcometolawon/',
    //        search:'lawyerID=' + this.state.idForCard  +'&'+ 'selectedPlanLawyers=' + this.state.selectedPlanLawyers
    //     });
    //    }
    //    else if(responsevar === undefined){
    //     this.refs.Errormodalref.openModal();
    //     this.LoadingBar.complete();
    //    }
    //    else{
    //     console.log('Problem in register')
    //     this.refs.Errormodalref.openModal();
    //  }
    //   }
    //   else{
    //     this.validator.showMessages();
    //     this.forceUpdate();
    //   }
  }

  handleChangeInput = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  openPopupPayment = () => {
    this.setState({ dialogOpen: true });
  };
  closePopupPayment = event => {
    this.setState({
      dialogOpen: false
    });
  };

  // handleChange(value) {
  //   this.setState({cardExpiry: value});
  // }
  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    return (
      <div className="container">
        <LoadingBar
          onRef={ref => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <div className="row">
          <div className="col-md-4 no-padding">
            <div className="selected-plan-box">
              <div class="active-package-box package-box">
                <div class="package-box-img">
                  <img src={require("../../assets/img/pkg-icon.png")} />
                </div>
                <div class="package-box-head">
                  {/* {this.state.selectedPlan.name} */}
                </div>
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
            <form onSubmit={this.submitCardDetails.bind(this)}>
              <div className="form-box">
                <div className="stripe-img">
                  <img
                    className=""
                    src={require("../../assets/img/stripe.png")}
                  />
                </div>
                <div className="form-payment">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label>Name on card *</label>
                      <input
                        onChange={this.handleChangeInput}
                        className="form-control"
                        name="cardName"
                        type="text"
                        placeholder="sample name"
                      />
                      {this.validator.message(
                        "cardName",
                        this.state.cardName,
                        "required|alpha"
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <label>Card number *</label>
                      <CardNumberElement
                        {...createOptions()}
                        onChange={this.handleChange}
                        className="form-control"
                        name="cardNumber"
                      />
                      {this.validator.message(
                        "cardNumber",
                        this.state.cardNumber,
                        "required"
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6">
                      <label>Expiry date *</label>
                      <CardExpiryElement
                        {...createOptions()}
                        onChange={this.handleChange}
                        className="form-control"
                        name="cardExpiry"
                      />
                      {this.validator.message(
                        "cardExpiry",
                        this.state.cardExpiry,
                        "required"
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label>CVC *</label>
                      <CardCVCElement
                        {...createOptions()}
                        name="cardCvc"
                        onChange={this.handleChange}
                        className="form-control"
                      />
                      {this.validator.message(
                        "cardCvc",
                        this.state.cardCvc,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="row payment-checks">
                    <div className="col-md-12">
                      <label class="custom-check-box-container">
                        I have read and accept the term of use & privacy policy.
                        <input type="checkbox" />
                        <span class="checkmark" />
                      </label>
                    </div>
                    <div className="col-md-12">
                      <label class="custom-check-box-container">
                        Save my card information to my account for future.
                        <input type="checkbox" />
                        <span class="checkmark" />
                      </label>
                    </div>
                  </div>
                  <div className="make-pay-btn">
                    <button class="btn register-btn">Add card Details</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <ErrorPopup container={this} ref="Errormodalref" />
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.dialogOpen}
        >
          <DialogContent>
            <div className="thanks-text">THANK YOU</div>
            <div className="dialog-head user-profile-dialog">
              Your payment of <b>£2500</b> is completed.
            </div>
            <div className="user-profile-btn">
              <Button
                text="OK"
                type="button"
                onClick={() => this.closePopupPayment()}
                buttonType={TYPES.Generic}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
const SplitFieldsForm = injectStripe(_SplitFieldsForm);
var planPrice;
export class MakePayment extends Component {
  async componentDidMount() {
    console.log("im nmounted in you choice", this.props.lawyerRegistrationData);
    var selectedPlanID = this.props.selectedPlanId;
    this.setState({
      idForCard: this.props.lawyerRegistrationData.id
    });
    selectedPlanDataObj = await lawyerAPIs.getPlanByID(selectedPlanID);
    planPrice = selectedPlanDataObj.data[0].monthlyFee;
    console.log("selectedPlanPrice", planPrice);
  }
  render() {
    return (
      <StripeProvider apiKey="pk_test_h7EoDnk5GPChrFY8wEbz8wFK00xPUlbb7x">
        <Elements>
          <SplitFieldsForm
            lawyerID={this.props.lawyerRegistrationData.lawyer.id}
            handleResult={this.props.handleResult}
          />
        </Elements>
      </StripeProvider>
    );
  }
}

const mapStoreToProps = ({ common }) => {
  return {
    lawyerRegistrationData: common.lawyerRegistrationData,
    selectedPlanId: common.selectedPlanId
  };
};
export default connect(
  mapStoreToProps,
  null
)(MakePayment);
