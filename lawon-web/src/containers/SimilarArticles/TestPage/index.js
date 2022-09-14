import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
  StripeProvider,
  Elements,
} from "react-stripe-elements";

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#c23d4b",
      },
    },
  };
};

class _SplitFieldsForm extends Component {
  state = {
    errorMessage: "",
  };

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(this.props.handleResult);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <div className="col-md-8 make-payment-sec">
        <h1 className="text-center">Make Payment</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-box">
            <div className="stripe-img">
              <img
                className=""
                src={require("../../../assets/img/stripe.png")}
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
                </div>
                <div className="form-group col-md-12">
                  <label>Card number *</label>
                  <CardNumberElement
                    {...createOptions()}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <label>Expiry date *</label>
                  <CardExpiryElement
                    {...createOptions()}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>CVC *</label>
                  <CardCVCElement
                    {...createOptions()}
                    onChange={this.handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row payment-checks">
                <div className="col-md-12">
                  <label class="custom-check-box-container">
                    I have read and accept the term of use & privacy policy.
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div className="col-md-12">
                  <label class="custom-check-box-container">
                    Save my card information to my account for future.
                    <input type="checkbox" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div className="error" role="alert">
                {this.state.errorMessage}
              </div>
              <div className="make-pay-btn">
                <button class="btn">Pay</button>
              </div>
            </div>
          </div>
        </form>
      </div>

      //   <form onSubmit={this.handleSubmit.bind(this)}>
      //     <div className="split-form">
      //       <label>
      //         Card number
      //         <CardNumberElement
      //           {...createOptions()}
      //           onChange={this.handleChange}
      //         />
      //       </label>
      //       <label>
      //         Expiration date
      //         <CardExpiryElement
      //           {...createOptions()}
      //           onChange={this.handleChange}
      //         />
      //       </label>
      //     </div>
      //     <div className="split-form">
      //       <label>
      //         CVC
      //         <CardCVCElement {...createOptions()} onChange={this.handleChange} />
      //       </label>
      //       <label>
      //         Postal code
      //         <input
      //           name="name"
      //           type="text"
      //           placeholder="94115"
      //           className="StripeElement"
      //           required
      //         />
      //       </label>
      //     </div>
      //     <div className="error" role="alert">
      //       {this.state.errorMessage}
      //     </div>
      //     <button>Pay</button>
      //   </form>
    );
  }
}

const SplitFieldsForm = injectStripe(_SplitFieldsForm);

export class TestPage extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <Elements>
          <SplitFieldsForm handleResult={this.props.handleResult} />
        </Elements>
      </StripeProvider>
    );
  }
}
export default TestPage;
