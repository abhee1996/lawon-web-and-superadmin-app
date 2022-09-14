import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import Alert from '@material-ui/lab/Alert';
import queryString from 'query-string';
import { ThemeProvider, createMuiTheme, TextField, Button } from '@material-ui/core';
import * as actions from "../../actions/user/auth";

import Popup from "../../components/molecules/ErrorPopup";

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

class UserEnterCode extends Component {
  state = {
    OTP: "",
    errorMessage: '',
    severity: 'error'
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
    const { verifyOTPForForgotPassword, location } = this.props;
    const { OTP } = this.state;

    const params = queryString.parse(location.search);
    const { email } = params || {};

    this.setState({ errorMessage: '' });
    verifyOTPForForgotPassword({ token: OTP, email }).then(({ errorMessage }) => {
      if (errorMessage) {
        return this.setState({ errorMessage, severity: 'error' });
      }

      window.location = `#/main/user/newpassword?email=${email}&otp=${OTP}`;
    });
  };

  handleResendCode = () => {
    const { sendEmailForForgotPassword, location } = this.props;
    const params = queryString.parse(location.search);
    const { email } = params || {};

    this.setState({ errorMessage: '' });
    sendEmailForForgotPassword({ email }).then(({ errorMessage }) => {
      if (errorMessage) {
        return this.setState({ errorMessage });
      }

      this.setState({
        errorMessage: 'Code has been send to your register Email address.',
        severity: 'success'
      })
    })
  }

  render() {
    const { OTP, errorMessage, severity } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <div class="container">
          <LoadingBar
            onRef={ref => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />
          <div class="row">
            <div class="col-md-1" />
            <div class="col-md-10 login-section">
              <h1 class="text-center">Verify Code</h1>

              <div class="form-box forget-password-form">
                <div class="row">
                  <div class="col-md-4" />
                  <div class="col-md-4">
                    <p class="form-para">
                      Please enter code that has
                      been sent to your Email
                  </p>
                    <div class="form-area">
                      <form>
                        <div class="form-group">
                          <TextField
                            style={{ width: '100%' }}
                            placeholder="ENTER CODE"
                            name="OTP"
                            autoComplete='off'
                            onChange={this.handleChangeInput}
                            value={OTP}
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
                        {
                          errorMessage
                          && (
                            <Alert
                              color={severity}
                              severity={severity}
                              style={{ fontSize: '14px' }}
                              onClose={() => this.setState({ errorMessage: '' })}>
                              {errorMessage}
                            </Alert>
                          )
                        }
                        <div class="register-btn-section text-center">
                          <Button
                            disabled={!OTP}
                            style={{ width: '100%' }}
                            variant='contained'
                            onClick={this.submitOTP}
                            color='primary'>
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="col-md-2" />
                </div>
              </div>
            </div>
            <div class="col-md-1" />
          </div>
          <Popup ref={ref => (this.popup = ref)} />
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { auth } = user || {};
  return {
    ...auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(UserEnterCode);
