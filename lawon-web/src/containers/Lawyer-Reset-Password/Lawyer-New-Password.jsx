import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import LoadingBar from 'react-top-loading-bar'
import simpleReactValidator from 'simple-react-validator';
import { TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import { commonFunctions } from '../../utils/utils.js'
import * as actions from '../../actions/auth';

class UpdatePassword extends Component {
  state = {}
  constructor(props) {
    super(props)
    this.validator = new simpleReactValidator();
    this.state = {
      password: "",
      isShowPassword: false,
      errorMessage: '',
      severity: 'error'
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;

    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  submitNewPassword = () => {
    debugger
    const { location, resetPassword } = this.props;
    const params = queryString.parse(location.search);
    const { email, otp } = params || {};

    const { password } = this.state;

    resetPassword({
      newPassword: password,
      token: otp,
      email
    })
      .then(({ errorMessage }) => {
        if (errorMessage) {
          return this.setState({ errorMessage, severity: 'error' });
        }

        this.setState({
          errorMessage: (
            <div>
              Password has been updated Successfully
              <Button
                size='small'
                variant='outlined'
                style={{ marginLeft: '5px' }}
                disableRipple={true}
                onClick={() => (window.location = '#/main/login')}>
                Go to Login Page
              </Button>
            </div>
          ),
          severity: 'success',
          password: ''
        });
      });

  }


  handleNewPassword = ({ target: { value } }) => {
    this.setState({ password: value });
  }

  showPassword = () => {
    const { isShowPassword } = this.state;
    this.setState({
      isShowPassword: isShowPassword === 'password' ? 'text' : 'password'
    });
  }


  render() {
    const { isShowPassword, errorMessage, severity, password } = this.state;
    const { loading } = this.props;

    const { isUppercase, isLowercase, isDigit, isLength } = commonFunctions.validatePassword(password);
    const isValid = !Object.values({ isUppercase, isLowercase, isDigit, isLength }).some(value => value === 'red');

    return (
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
              New Password
            </h1>
            <div class='form-box forget-password-form'>
              <div class='row'>
                <div class='col-md-4'></div>
                <div class='col-md-4'>
                  <div class='form-area'>
                    <form>
                      <div class="form-group">
                        <TextField
                          style={{ width: '100%' }}
                          value={password}
                          placeholder="Enter New Password"
                          autoComplete='off'
                          type={isShowPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <IconButton
                                  size='small'
                                  onClick={() => this.setState(({ isShowPassword }) => ({ isShowPassword: !isShowPassword }))}>
                                  {isShowPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          onChange={this.handleNewPassword}
                        />
                      </div>
                      <div class='register-btn-section text-center'>
                        <Button
                          disabled={!isValid || loading}
                          style={{ width: '100%' }}
                          variant='contained'
                          onClick={this.submitNewPassword}
                          color='primary'>
                          Reset Password
                          </Button>
                      </div>
                      {
                        errorMessage
                        && (
                          <Alert
                            color={severity}
                            severity={severity}
                            style={{ fontSize: '14px', marginTop: '20px' }}
                            onClose={() => this.setState({ errorMessage: '' })}>
                            {errorMessage}
                          </Alert>
                        )
                      }

                      <div class='validation-section'>
                        <div className={isLength}>
                          <span><i class="fa fa-check-circle"></i></span>
                          <span>at least 8 characters</span>
                        </div>

                        <div className={isLowercase}>
                          <span><i class="fa fa-check-circle"></i></span>
                          <span>at least one lowercase character</span>
                        </div>

                        <div className={isUppercase}>
                          <span><i class="fa fa-check-circle"></i></span>
                          <span>at least one uppercase character</span>
                        </div>

                        <div className={isDigit}>
                          <span><i class="fa fa-check-circle"></i></span>
                          <span>at least one number or symbol (f.e. @#$)</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });

export default connect(mapStateToProps, actions)(UpdatePassword);