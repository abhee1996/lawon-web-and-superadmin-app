import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from "react-stripe-elements";
import LoadingBar from "react-top-loading-bar";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, Snackbar } from "@material-ui/core";
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
    message: ''
  };

  handleChange = ({ error }) => {
    const { code } = error || {};
    this.setState({ isValidCard: code !== "invalid_number" });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { stripe } = this.props;
    if (stripe) {
      stripe.createToken().then(({ token, error }) => {
        if (error) {
          return this.setState({
            message: {
              description: error.message
            }
          });
        }
        const { id } = token || {};
        this.saveCard(id);
      });
    }
  };

  saveCard = (token) => {
    const { addOrganizationCard, history } = this.props;
    addOrganizationCard({ token }).then(({ errorMessage }) => {
      if (errorMessage) {
        return this.setState({
          message: {
            description: errorMessage
          }
        });
      }

      history.push(`/main/adminprofilesetup`);
    });
  };

  handleEnquiry = (inquiry) => {
    const { payInstructionByQuestion } = this.props;
    payInstructionByQuestion(inquiry).then((result) => {
      this.LoadingBar.complete();
      const { error } = result || {};
      if (result) return this.setState({ message: error });
    });
  };

  handleOnChangeCheck = ({ target: { name, checked } }) => {
    this.setState({ [name]: checked });
  };
  handleCloseSnackbar = () => {
    this.setState({ successStatus: false });
  };


  render() {
    const { cardId } = this.props;
    const { message, privacy, successStatus } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <LoadingBar
            onRef={(ref) => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />

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
          </div>
          <button disabled={false}>Add Details</button>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={successStatus}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          message="Register Successfully"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleCloseSnackbar}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </>
    );
  }
}

export default injectStripe(SplitFieldsForm);
