import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from "react-stripe-elements";
import { round } from "lodash";
import Alert from "@material-ui/lab/Alert";

import { getTotal } from "../../utils/utils";

const createOptions = {
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

class SplitFieldsForm extends Component {
  state = {
    isValidCard: false,
    saveCard: false,
    privacy: false,
    message: "",
  };

  handleChange = ({ error }) => {
    const { code } = error || {};
    this.setState({ isValidCard: code !== "invalid_number" });
  };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const { stripe, match, cardId } = this.props;
  //   const { params } = match || {};
  //   const { questionId, lawyerId } = params || {};
  //   const { saveCard } = this.state;

  //   if (!stripe) return;

  //   let inquiry = {
  //     questionId,
  //     lawyerId,
  //     saveCard
  //   };

  //   if (cardId !== 0) return this.handleEnquiry({ ...inquiry, cardId });

  //   stripe.createToken().then(({ token, error }) => {
  //     if (error) {
  //       const { message } = error || {};
  //       return this.setState({ message });
  //     }
  //     const { id, card } = token || {};
  //     const { brand, exp_month, exp_year, last4 } = card || {};

  //     this.handleEnquiry({
  //       ...inquiry,
  //       card: {
  //         brand,
  //         exp_month,
  //         exp_year,
  //         last4,
  //         token: id
  //       }
  //     });
  //   });
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    const { stripe, match, cardId } = this.props;
    if (stripe) {
      stripe.createToken().then(({ token, error }) => {
        if (error) {
          const { message } = error || {};
          return this.setState({ message });
        }
        const { id, card } = token || {};
        const { brand, exp_month, exp_year, last4 } = card || {};
        this.saveCard(id);
      });
    }
  };

  saveCard = (token) => {
    const { addOrganizationCard } = this.props;
    addOrganizationCard({ token }).then((result) => {
      const { error, payload } = result || {};
      const { cards } = payload || {};
      if (cards.id) {
        this.props.history.push(`/main/adminprofilesetup`);
      }
      if (result) return this.setState({ message: error });
    });
  };

  handleEnquiry = (inquiry) => {
    const { payInstructionByQuestion } = this.props;
    payInstructionByQuestion(inquiry).then((result) => {
      const { error } = result || {};
      if (result) return this.setState({ message: error });
    });
  };

  handleOnChangeCheck = ({ target: { name, checked } }) => {
    this.setState({ [name]: checked });
  };

  // addPaymentDetails = () => {
  //   this.props.history.push(`/main/adminprofilesetup`);
  // };

  render() {
    const { quotation, cardId } = this.props;
    const { legalFee, estimatedDisbursements, vatTax, other } = quotation || {};
    const totalFee = getTotal({
      legalFee,
      vatTax,
      estimatedDisbursements,
      other,
    });

    const { message, saveCard, privacy } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {message && (
          <Alert style={{ fontSize: "16px" }} severity="error">
            {message}
          </Alert>
        )}
        {cardId === 0 && (
          <div className="split-form">
            <label>
              Name
              <input
                name="name"
                type="text"
                placeholder="Jane Doe"
                required={cardId === 0}
              />
            </label>
            <label>
              Card number
              <CardNumberElement
                {...createOptions}
                onChange={this.handleChange}
              />
            </label>

            <div className="row">
              <div className="col-sm-7">
                <label className="expiredate">
                  Expiration date
                  <CardExpiryElement
                    {...createOptions}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <div className="col-sm-5">
                <label className="cvc">
                  CVC
                  <CardCVCElement
                    {...createOptions}
                    onChange={this.handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="row payment-checks">
          <div className="col-md-12">
            <label className="custom-check-box-container terms">
              I have read and accept the term of use & privacy policy.
              <input
                type="checkbox"
                name="privacy"
                checked={privacy}
                onChange={this.handleOnChangeCheck}
              />
              <span class="checkmark" />
            </label>
          </div>

          <div className="col-md-12">
            <label className="custom-check-box-container terms">
              Save my card information to my account for future.
              <input
                type="checkbox"
                name="saveCard"
                checked={saveCard}
                onChange={this.handleOnChangeCheck}
              />
              <span className="checkmark" />
            </label>
          </div>
        </div>
        <button>Add Details</button>
      </form>
    );
  }
}

export default injectStripe(SplitFieldsForm);
