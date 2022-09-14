import React, { Component } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Tooltip, Chip } from "@material-ui/core";
import { DeleteOutline, Check } from '@material-ui/icons';
import { connect } from "react-redux";

import { StripeProvider, Elements } from "react-stripe-elements";
import FormElements from "./StripeElements";
import { STRIPE_PUBLIC_KEY } from '../../../common/constants';
import * as actions from "../../../actions/payment";

class UpdatePlan extends Component {
  state = {
    cardId: 0,
  };

  handleChange = ({ id }) => {
    this.setState({ cardId: id });
  };
  componentDidMount() {
    const { getCards } = this.props;
    getCards();
  }

  handleDelete = (cardID) => {
    const { deleteCard, getBillingDetails } = this.props;

    deleteCard({ cardID }).then(({ error }) => {
      if (error) return;
      getBillingDetails();
    });
  };

  handleSetAsDefaultCard = ({ cardId }) => {
    const { setDefaultCard, getBillingDetails } = this.props;

    setDefaultCard({ cardId }).then(({ error }) => {
      if (error) return;
      getBillingDetails();
    });
  }

  handleSaveCard = () => {
    this.Elements
      .getWrappedInstance()
      .handleSubmit();
  }

  render() {
    const { close, setOpen, billingDetails } = this.props;
    const { sources, default_source } = billingDetails || {};
    const { data: cards = [] } = sources || {};

    return (
      <Dialog
        open={setOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Cards</DialogTitle>
        <DialogContent dividers>
          <div
            class="col-md-12"
            style={{ margin: "0px" }}>
            <div style={{ textAlign: 'center' }}>
              <img src={require("../../../assets/img/payment-cards.png")} />
            </div>

            {cards && cards.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <div className="heading"><strong>Select Default Cards</strong></div>
                <div style={{ marginTop: '10px' }}>
                  {cards.map(
                    ({ id, brand, last4, exp_month, exp_year }) => (
                      <div style={{ backgroundColor: '#ececec', padding: '15px', borderRadius: '4px', margin: '5px' }}>
                        <span>
                          {brand} •••• {last4} Expires {exp_month}/{exp_year}
                        </span>
                        <span style={{ float: 'right' }}>
                          {default_source == id
                            ? (
                              <Chip
                                label='Default Card'
                                color='primary'
                                size='small'
                              />
                            )
                            : (
                              <Tooltip title='Set as Default'>
                                <IconButton
                                  onClick={() => this.handleSetAsDefaultCard({ cardId: id })}
                                  size='small'>
                                  <Check />
                                </IconButton>
                              </Tooltip>
                            )}

                          <Tooltip title='Delete'>
                            <IconButton
                              onClick={() => this.handleDelete(id)}
                              size='small'>
                              <DeleteOutline />
                            </IconButton>
                          </Tooltip>
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div style={{ marginTop: '20px' }}>
                  <span className="save-card-radiotext-newcard">
                    <strong>Add New Card</strong>
                  </span>
                </div>
              </div>
            )}

            <div style={{ marginTop: '20px' }}>
              <div className="row">
                <div className=" col-md-12">
                  <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
                    <Elements>
                      <FormElements {...this.props} {...this.state} ref={ref => this.Elements = ref}/>
                    </Elements>
                  </StripeProvider>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={this.handleSaveCard}
            color="primary">
            Save Card
        </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ payment }) => ({ ...payment });

export default connect(mapStateToProps, actions)(UpdatePlan);
