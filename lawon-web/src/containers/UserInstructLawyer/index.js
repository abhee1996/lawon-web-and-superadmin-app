import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Dialog, DialogContent, Drawer, withStyles, Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

import * as actions from "../../actions/user/questions";
import { getTotalPrice } from "../../utils/utils";


const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  paper: {
    height: "calc(100% - 350px)"
  }
};

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

class UserInstructLawyer extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      buttonId: null,
      open: false
    };
    this.setButton = this.setButton.bind(this);
  }
  componentDidMount() {
    const { getQuestionDetails, match } = this.props;
    const { params } = match;
    const { conversationId } = params || {};

    getQuestionDetails({ conversationId });
  }

  closeDrawer = () => {
    this.setState({ open: false });
  };

  setButton = (id) => {
    this.setState({ buttonId: id, open: true });
  }

  openPopupCancelConsult = () => {
    this.setState({ dialogOpen: true, open: false });
  };

  closePopupCancelConsult = event => {
    this.setState({ dialogOpen: false });
  };

  closeInstruct = () => {
    return (
      <div className="drawer-up-doc">
        <div class="label-add-details">
          Are you sure you want to cancel the instruction?
        </div>

        <div>
          <Button
            text="Yes"
            type="button"
            onClick={() => this.openPopupCancelConsult()}
          />
          <Button
            text="No"
            type="button"
            onClick={() => this.setButton(1)}
          />
        </div>
      </div>
    );
  }

  handleInstruction = () => {
    const { match, history } = this.props;
    const { params } = match || {};
    const { conversationId } = params || {};

    history.push(`/main/question/conversation/${conversationId}/instruct-lawyer/payment`)
  }

  render() {
    const { questionsDetails, classes } = this.props;
    const { open } = this.state;
    const { Enquiry, EnquiryQuotation, Lawyer } = questionsDetails || {};

    const { problem, SubCategory, } = Enquiry || {};

    const { Category, name } = SubCategory || {};
    const { name: catName } = Category || {};

    const { legalFee, estimatedDisbursements, vatTax, other } = EnquiryQuotation || {};
    const { firstName, lastName } = Lawyer || {};

    return (
      <ThemeProvider theme={theme}>
        <div className="user-main-content-consultation">
          <div className="container">
            <div className="add-details-box instruct-summary">
              <h2>Summary</h2>

              <div className="row add-details-btm-sec instruct-summary-rows">
                <div className="label-add-details">
                  You are about to instruct the lawyer to act on your behalf. Make
                  sure all details are correct
                </div>

                <div className="row">
                  <div className="col-md-3 gray-text">Category:</div>
                  <div className="col-md-9">{catName}</div>
                </div>

                <div className="row">
                  <div className="col-md-3 gray-text">SubCategory:</div>
                  <div className="col-md-9">{name}</div>
                </div>
                <div className="row">
                  <div className="col-md-3 gray-text">Lawyer:</div>
                  <div className="col-md-9">
                    {firstName} {lastName}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 gray-text">Fee:</div>
                  <div className="col-md-9">
                    £{getTotalPrice({ legalFee, vatTax, estimatedDisbursements, other })}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 gray-text">Details:</div>
                  <div className="col-md-9">
                    {problem}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 gray-text">Attachment:</div>
                  <div className="col-md-9">
                    short-term-household-agreement.pdf
                </div>
                </div>

                <div className="instruct-summary-btns text-center">
                  {!EnquiryQuotation
                    && (
                      <Alert color='error' severity='error'>Lawyer did not provide Quotation</Alert>
                    )}
                  <div>
                    <Button
                      color='primary'
                      variant='contained'
                      style={{ marginTop: '10px' }}
                      disabled={!EnquiryQuotation}
                      onClick={this.handleInstruction}>
                      Instruct the Lawyer
                    </Button>
                  </div>

                  <div onClick={() => this.setButton(1)}>
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Drawer
            classes={{ paper: classes.paper }}
            anchor="bottom"
            open={open}>
            <div>
              <span
                onClick={() => this.closeDrawer()}
                style={{ float: "right", padding: "20px" }}>
                <i className="fa fa-close"></i>
              </span>

              <div className="container bottom-drawer-area">
                <div className="col-md-offset-3 col-md-6">
                  {this.state.buttonId === 1 && this.closeInstruct()}
                </div>
              </div>
            </div>
          </Drawer>
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.dialogOpen}>
            <DialogContent>
              <div className="user-consult-dialog">
                <div className="dialog-head text-center">
                  Your instruction request has been cancelled
              </div>
              </div>
              <div className="user-profile-btn">
                <Button
                  text="OK"
                  type="button"
                  onClick={() => this.closePopupCancelConsult()}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </ThemeProvider>
    );
  }
}

function mapStateToProps({ user }) {
  const { questions } = user || {};
  return {
    ...questions
  };
}
const withRedux = connect(mapStateToProps, actions);
export default compose(withStyles(styles), withRedux)(UserInstructLawyer);
