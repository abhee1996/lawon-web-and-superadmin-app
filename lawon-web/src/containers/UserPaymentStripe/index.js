import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme, Radio, CircularProgress, Backdrop, IconButton, Tooltip } from "@material-ui/core";
import { StripeProvider, Elements } from "react-stripe-elements";
import { Delete } from '@material-ui/icons';
import { connect } from 'react-redux';

import * as actions from '../../actions/user/payments';

import FormElements from './StripeElements';
import "./stripe.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 11
  },
});

class UserPaymentStripe extends Component {
  componentDidMount() {
    const { getSavedCards, getQuestionQuotation, match, getConsultationQuotation } = this.props;
    const { params } = match || {};
    const { conversationId, consultationId } = params || {};

    if (consultationId) {
      getConsultationQuotation({ consultationId })
        .then(() => getSavedCards());
    }
    else {
      getQuestionQuotation({ conversationId })
      .then(() => getSavedCards());
    }
  }

  state = {
    cardId: 0
  };

  handleDeleteCard = ({ id }) => {
    const { deleteUserCard } = this.props;
    deleteUserCard({ cardId: id }).then(({ errorMessage }) => {
      if (errorMessage) return;
      this.componentDidMount();
    })
  }

  handleChange = ({ id }) => {
    this.setState({ cardId: id });
  };

  render() {
    const { cardId } = this.state;
    const { cards, loading } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <div class="col-md-6 add-card col-md-offset-3">
            <div class=" col-md-12">
              <h2 style={{ textAlign: "center" }}> Stripe Payment Details</h2>
              <div className="payment-card-img">
                <img src={require("../../assets/img/payment-cards.png")} alt='cards-logo' />
              </div>
              {
                (cards && cards.length > 0)
                && (
                  <div class="save-cards">
                    <div class="heading">Pay with your save credit cart</div>
                    <div class="save-card-checkbox">

                      {
                        cards.map(({ id, last4, brand, exp_month, exp_year }) => (
                          <div key={id}>
                            <Radio
                              color="primary"
                              checked={id === cardId}
                              onChange={() => this.handleChange({ id })}
                              value="b"
                              name="radio-button-demo"
                            />
                            <span className="save-card-radiotext">
                              {brand} •••• {last4}
                              <span style={{ marginLeft: '15px' }}>
                                {exp_month}/{exp_year}
                              </span>
                            </span>
                            <Tooltip title='Delete Card'>
                              <IconButton
                                onClick={() => this.handleDeleteCard({ id })}
                                style={{ float: 'right' }}
                                size='small'>
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </div>
                        ))
                      }
                    </div>

                    <div class="save-card-payment-form">
                      <Radio
                        color="primary"
                        checked={cardId === 0}
                        onChange={() => this.handleChange({ id: 0 })}
                        name="radio-button-demo"
                      />
                      <span className="save-card-radiotext-newcard">
                        Add New Card
                      </span>
                    </div>
                  </div>
                )
              }

              <div className="form-payment">
                <div className="row">
                  <div className="form-group col-md-12">
                    <StripeProvider apiKey="pk_test_ECqXUnHXWQlfz3JGGTIJ5MaW">
                      <Elements>
                        <FormElements {...this.props} {...this.state} />
                      </Elements>
                    </StripeProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ user: { payments } }) => ({ ...payments });

export default connect(mapStateToProps, actions)(UserPaymentStripe);
