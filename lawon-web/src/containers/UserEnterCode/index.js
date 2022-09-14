import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import Alert from '@material-ui/lab/Alert';
import { ThemeProvider, createMuiTheme, TextField } from '@material-ui/core';

import { Button, TYPES } from "../../components/atoms/YellowButton";
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
    errorMessage: ''
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
    const { verifyOTP } = this.props;
    const { OTP } = this.state;
    verifyOTP({ otp: OTP }).then(({ isVerified, errorMessage }) => {
      if (errorMessage) {
        return this.setState({ errorMessage });
      }

      window.location = '#/main/userfirsttime';
    })
  };

  render() {
    const { OTP, errorMessage } = this.state;
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
                      been sent to your mobile
                  </p>
                    <div class="form-area">
                      <form>
                        <div class="form-group">
                          <TextField
                            style={{ width: '100%' }}
                            placeholder="ENTER CODE"
                            name="OTP"
                            onChange={this.handleChangeInput}
                            value={OTP}
                          />
                        </div>
                        {
                          errorMessage
                          && (
                            <Alert
                              color='error'
                              severity='error'
                              style={{ fontSize: '14px' }}
                              onClose={() => this.setState({ errorMessage: '' })}>
                              {errorMessage}
                            </Alert>
                          )
                        }
                        <div class="register-btn-section text-center">
                          <Button
                            disabled={!OTP}
                            text="Submit"
                            type="button"
                            submitForgotForm
                            onClick={this.submitOTP}
                            buttonType={TYPES.Register}
                          />
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
