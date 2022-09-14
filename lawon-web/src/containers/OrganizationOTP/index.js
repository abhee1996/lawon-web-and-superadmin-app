import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, TextField, createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";

import * as actions from "../../actions/auth";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 11
  }
});
class OrganizationOTP extends Component {
  state = {
    otp: "",
    message: "",
  };

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;

    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  submitOTP = () => {
    const { verifyOrganizationOTP, history } = this.props;
    const { otp } = this.state;

    verifyOrganizationOTP({ otp }).then(({ errorMessage }) => {
      if (errorMessage) {
        return this.setState({
          message: {
            description: errorMessage
          }
        });
      }

      history.push(`/main/organizationpayment`);
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ successStatus: false });
  }

  handleResendCode = () => {
    const { resendMobileVerificationCode } = this.props;

    this.setState({ errorMessage: '' });
    resendMobileVerificationCode().then(({ errorMessage }) => {
      if (errorMessage) {
        return this.setState({ errorMessage });
      }

      this.setState({
        errorMessage: 'Code has been send.',
        severity: 'success'
      })
    })
  }

  render() {
    const { otp, message } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div class="container">
          <LoadingBar
            onRef={(ref) => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />
          <div class="row">
            <div class="col-md-1" />
            <div class="col-md-10 login-section">
              <h1 class="text-center">Verify Code For Organization</h1>

              <div class="form-box forget-password-form">
                <div class="row">
                  <div class="col-md-4" />
                  <div class="col-md-4">
                    <p class="form-para">
                      Please enter code that has
                    <br />
                      been sent to your mobile
                  </p>
                    <div class="form-area">
                      <form>
                        <div class="form-group">
                          <TextField
                            style={{ width: '100%' }}
                            name="otp"
                            placeholder="ENTER CODE"
                            onChange={this.handleChangeInput}
                            value={otp}
                          />
                          <Button
                            disableRipple={true}
                            style={{ fontSize: '10px'}}
                            variant='text'
                            onClick={this.handleResendCode}
                            size='small'>
                            Resend code
                          </Button>
                        </div>
                        <div class="register-btn-section text-center">
                          <Button
                            disabled={!otp}
                            style={{ width: '100%' }}
                            color='primary'
                            variant='contained'
                            submitForgotForm
                            onClick={this.submitOTP}>
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>

                    <div className='error-display'>
                      {(message && message.description)
                        && (
                        <Alert
                          severity="error"
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => this.setState({ message: '' })}>
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }>
                          {message.description || "Something went wrong"}
                        </Alert>
                      )}
                    </div>
                  </div>
                  <div class="col-md-2" />
                </div>
              </div>
            </div>
            <div class="col-md-1" />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};
export default connect(mapStateToProps, actions)(OrganizationOTP);
