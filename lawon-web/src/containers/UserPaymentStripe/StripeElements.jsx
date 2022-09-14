import React, { Component } from "react";
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from "react-stripe-elements";
import { round } from 'lodash';
import { Alert } from '@material-ui/lab';
import { Checkbox, FormControlLabel, Button } from '@material-ui/core';

import { getTotal } from '../../utils/utils';

const createOptions = {
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

class SplitFieldsForm extends Component {
  state = {
    isValidCard: false,
    saveCard: false,
    privacy: false,
    message: ""
  };

  handleChange = ({ error }) => {
    const { code } = error || {};
    this.setState({ isValidCard: code !== 'invalid_number' })
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { stripe, match, cardId } = this.props;
    const { params } = match || {};
    const { conversationId, consultationId } = params || {};
    const { saveCard } = this.state;

    if (!stripe) return;

    let data = { saveCard };

    if (conversationId) {
      data.conversationId = conversationId;
    }
    else {
      data.consultationId = consultationId;
    }

    if (cardId !== 0)
      return this.handleEnquiry({ ...data, cardId });

    stripe.createToken().then(({ token, error }) => {
      if (error) {
        const { message } = error || {};
        return this.setState({ message });
      }
        const { id } = token || {};

        this.handleEnquiry({
          ...data,
          card: { token: id }
        });
      });
  };

  handleEnquiry = (data) => {
    const { payInstructionByQuestion, payInstructionByConsultaiton, match } = this.props;
    const { params } = match || {};
    const { conversationId } = params || {};

    if (conversationId) {
      payInstructionByQuestion(data)
        .then((result) => {
          const { error, instruction } = result || {};
          if (error) return this.setState({ message: error });

          const { id } = instruction || {};
          window.location = `#/main/instruct-confirm/${id}`;
        });
    } else {
      payInstructionByConsultaiton(data)
        .then((result) => {
          const { error, instruction } = result || {};
          if (error) return this.setState({ message: error });

          const { id } = instruction || {};
          window.location = `#/main/instruct-confirm/${id}`;
        });
    }
  }

  handleOnChangeCheck = ({ target: { name, checked }}) => {
    this.setState({ [name]: checked });
  }

  render() {
    const { quotation, cardId } = this.props;
    const { legalFee, estimatedDisbursements, vatTax, other } = quotation || {};
    const totalFee = getTotal({
      legalFee,
      vatTax,
      estimatedDisbursements,
      other
    });

    const { message, saveCard, privacy } = this.state;
    return (
      <div>
        {message && <Alert style={{ fontSize: "16px" }} severity="error">{message}</Alert>}
        {
          cardId === 0
          && (
            <div className="split-form">
              <label>
                Name
                <input name="name" type="text" placeholder="Jane Doe" required={cardId === 0} />
              </label>
              <label>
                Card number
                <CardNumberElement
                  {...createOptions}
                  onChange={this.handleChange}
                />
              </label>

              <div className="row">
                <div className="col-sm-6">
                  <label className="expiredate">
                    Expiration date
                    <CardExpiryElement
                      {...createOptions}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="col-sm-6">
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
          )
        }

        <div className="row payment-checks">
          <div className="col-md-12">
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="privacy"
                  onChange={this.handleOnChangeCheck}
                />
              }
              label="I have read and accept the term of use & privacy policy."
            />
          </div>
          {cardId === 0
            && (
              <div className="col-md-12">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="saveCard"
                      checked={saveCard}
                      onChange={this.handleOnChangeCheck}
                    />
                  }
                  label="Save my card information to my account for future."
                />
              </div>
            )}
        </div>
        <Button
          onClick={this.handleSubmit}
          color='primary'
          variant='contained'
          disabled={!privacy}>
          Pay £{round(totalFee, 2).toFixed(2)}
        </Button>
      </div>
    );
  }
}

export default injectStripe(SplitFieldsForm);