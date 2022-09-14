import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import Alert from '@material-ui/lab/Alert';
import { ThemeProvider, createMuiTheme, TextField, Button } from '@material-ui/core';

import * as actions from '../../actions/user/auth';
import { EMAIL_REGEX } from '../../common/constants';

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

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errorMessage: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;

    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  handleChangeInput = ({ target: { name, value }}) => {
    this.setState({ [name]: value })
  }

  submitForgotForm = () => {
    const { sendEmailForForgotPassword } = this.props;
    const { email } = this.state;

    if (!EMAIL_REGEX.test(email)) {
      return this.setState({ errorMessage: 'Invalid email address.'});
    }
    this.setState({ errorMessage: ''})
    sendEmailForForgotPassword({ email }).then(({ errorMessage, isSent }) => {
      if (errorMessage) {
        return this.setState({ errorMessage });
      }

      window.location = `#/main/resetpassword-otp?email=${email}`;
    });
  }

  render() {
    const { email, errorMessage } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <div class='container'>
          <LoadingBar
            onRef={ref => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />
          <div class='row'>
            <div class='col-md-1'></div>
            <div class='col-md-10 login-section'>
              <h1 class='text-center'>
                Reset your password
              </h1>
              <div class='form-box forget-password-form'>
                <div class='row'>
                  <div class='col-md-4'></div>
                  <div class='col-md-4'>
                    <p class='form-para'>
                      Plese enter your email address
                      <br />
                      below and we'll send you instructions
                      <br />
                      to reset your password
                    </p>
                    <div class='form-area'>
                      <form>
                        <div class="form-group">
                          <TextField
                            style={{ width: '100%' }}
                            placeholder="Enter your email..."
                            name="email"
                            onChange={this.handleChangeInput}
                            value={email}
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
                        <div class='register-btn-section text-center'>
                          <Button
                            disabled={!email}
                            style={{ width: '100%' }}
                            variant='contained'
                            color='primary'
                            onClick={this.submitForgotForm}>
                            Send
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class='col-md-2'></div>
                </div>
              </div>
            </div>
            <div class='col-md-1'></div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { auth } = user || {};
  return {
    ...auth
  }
}

export default connect(mapStateToProps, actions)(ResetPassword);