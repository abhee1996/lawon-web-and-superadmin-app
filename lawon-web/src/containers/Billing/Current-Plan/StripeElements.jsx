import React, { Component } from "react";
import { CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from "react-stripe-elements";
import Alert from "@material-ui/lab/Alert";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";

class SplitFieldsForm extends Component {
  state = {
    isValidCard: false,
    privacy: false,
    message: "",
  };

  handleChange = ({ error }) => {
    const { code } = error || {};
    this.setState({ isValidCard: code !== "invalid_number" });
  };

  handleSubmit = () => {
    const { stripe, addCard, getBillingDetails, close } = this.props;
    if (!stripe) return;

    stripe.createToken().then(({ token, error }) => {
      if (error) {
        const { message } = error || {};
        return this.setState({ message });
      }
      const { id } = token || {};
      addCard({ token: id}).then(() => {
        getBillingDetails();
        close();
      })
    });
  };

  handleOnChangeCheck = ({ target: { name, checked } }) => {
    this.setState({ [name]: checked });
  };

  render() {
    const { message } = this.state;
    return (
      <div>
        <div>
          <div>
            <label style={{ width: '100%' }}>
              Card number
              <CardNumberElement/>
            </label>
          </div>


          <div>
            <label>
              Expiration date
              <CardExpiryElement />
            </label>
          </div>

          <div>
            <label>
              CVC
              <CardCVCElement />
            </label>
          </div>
        </div>

        <div className="row">
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
        </div>
        {message && (
          <Alert style={{ fontSize: "16px" }} severity="error">
            {message}
          </Alert>
        )}
      </div>
    );
  }
}

export default injectStripe(SplitFieldsForm, { withRef: true });
