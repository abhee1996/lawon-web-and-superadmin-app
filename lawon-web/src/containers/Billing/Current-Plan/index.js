import React, { Component } from "react";
import { Button, TYPES } from "../../../components/atoms/YellowButton";
import Dialog from "@material-ui/core/Dialog";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
import moment from 'moment';
import { round } from 'lodash';
import { GetApp } from '@material-ui/icons';

import * as actions from "../../../actions/payment";
import Popup from "../../../components/molecules/ErrorPopup";


import UpdatePlan from "./UpdatePlan";
class CurrentPlan extends Component {
  componentDidMount() {
    const { getInvoices, getBillingDetails } = this.props;
    getInvoices();
    getBillingDetails();
  }

  state = {
    setOpen: false,
    Open: false,
    saveCard: false,
  };
  handleClickOpen = () => {
    this.setState({
      setOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      setOpen: false,
    });
  };
  handleCloseSaveCard = () => {
    this.setState({ saveCard: false });
  };

  componentWillReceiveProps(nextProps) {
    const { loading, errorMessage, clearError } = nextProps;
    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
    if (errorMessage) {
      this.popup.setState({
        dialogOpen: true,
        message: errorMessage,
      });
      clearError();
    }
  }

  render() {
    const { invoices, billingDetails } = this.props;
    const { sources, default_source, subscriptions } = billingDetails || {};
    const { data: cards = [] } = sources || {};

    const { data: currentPlan = [] } = subscriptions || {};
    const { current_period_end, plan } = currentPlan[0] || {}; 
    const { interval, amount } = plan || {};

    const { brand, exp_month, exp_year, last4 } = cards.find(({ id }) => id === default_source) || {};

    const invoicesRows = invoices.map(({ amount_paid, status_transitions, invoice_pdf, lines }) => {
      const { data = [] } = lines || {};
      const { period } = data[0] || {};
      const { end, start } = period || {};
      const { paid_at } = status_transitions;

      return (
        <tr class="dashed-line">
          <td>
            <span class="text-FCA900">{moment(paid_at * 1000).format('DD MMM, YYYY (HH:mm)')}</span>
          </td>

          <td>{moment(start * 1000).format('MMM, YYYY')} - {moment(end * 1000).format('MMM, YYYY')}</td>
          <td>
            £{round(amount_paid / 100, 2).toFixed(2)}
            <a href={invoice_pdf}>
              <span class="download-invoice">
                <GetApp/>
                <span class="download-invoice-text">
                  Download Invoice
                </span>
              </span>
            </a>
          </td>
        </tr>
      );
    });

    return (
      <div class="main">
        <LoadingBar
          onRef={(ref) => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <section class="billing-update-plan">
          <div class="col-md-12">
            <div class="col-md-3 ">
              <div class="heading">Current Plan</div>
              <div class="row white-background margin-l-r">
                <div class="col-md-3"></div>
                <div class="col-md-8 no-padding">
                  <div class="circle">
                    <img
                      class="current-pakage-img"
                      src="./images/firm-details/current-pakage.png"
                      alt="current-pakage"
                    />
                  </div>
                  <div class="current-pakage-small-business">
                    Small Business
                  </div>
                  <div>
                    <button class="update-plan">Update Plan </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-9 billing-detail">
              <div class="heading">Billing Details</div>
              <div class="row white-background margin-l-r">
                <div class="col-md-12  ">
                  <div class="background-grey">
                    <span class="pound"> £</span>
                    <span class="amount">{round(amount / 100).toFixed(2)}</span>
                    <span class="month">/ {interval}</span>
                    <span class="active">Active</span>
                  </div>
                  <div class="col-md-8">
                    <div class="col-md-3 category">Current Pakage:</div>
                    <div class="col-md-9 category-fill">Small Business</div>
                    <div class="col-md-3 category">Card details:</div>
                    <div class="col-md-9 category-fill">
                      {brand} •••• {last4} Expires {exp_month}/{exp_year}
                    </div>
                    <div class="col-md-3 category">Billing Date:</div>
                    <div class="col-md-9 category-fill">
                      {moment(current_period_end * 1000).format('DD MMM, YYYY')}
                    </div>
                  </div>
                  <div class="col-md-4">
                    <button class="update-card" onClick={this.handleClickOpen}>
                      Update Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 billing-invoices">
            <div class="col-md-12">
              <div class="billing-invoices-bg ">Billing Invoices</div>
              <div class="table-responsive">
                <table cellpadding="20" class="table ">
                  <thead>
                    <tr>
                      <th width="25%" class="table-th">
                        Date
                      </th>
                      <th width="35%" class="table-th">
                        Period
                      </th>
                      <th width="40%" class="table-th">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoicesRows}
                  </tbody>
                </table>
              </div>
            </div>

            <Dialog
              onClose={this.handleCloseSaveCard}
              open={this.state.saveCard}
            >
              <div class="card-saved-section">
                <div class="card-saved">
                  <div class="thank-you">THANK YOU!</div>
                  <div class="">Your Card Saved Succesful.</div>
                </div>
                <div class="col-md-offset-8 col-md-4">
                  <Button
                    text="OK"
                    type="button"
                    onClick={this.handleCloseSaveCard}
                    buttonType={TYPES.Register}
                  />
                </div>
              </div>
            </Dialog>
          </div>
          <UpdatePlan
            {...this.props}
            {...this.state}
            close={this.handleClose}
          />
        </section>
        <Popup ref={(ref) => (this.popup = ref)} />
      </div>
    );
  }
}

const mapStateToProps = ({ payment }) => ({ ...payment });

export default connect(mapStateToProps, actions)(CurrentPlan);
