import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TextField, InputAdornment, IconButton, FormControlLabel, Checkbox } from '@material-ui/core';
import { Visibility, VisibilityOff, Close } from '@material-ui/icons';
import { Alert } from "@material-ui/lab";

import { Button, TYPES } from "../../components/atoms/YellowButton";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import { EMAIL_REGEX } from '../../common/constants';


class Login extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      isShowPassword: false,
      loginFor30days: false,
      message: '',
      validateSchema: {
        email: '',
        password: ''
      }
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

  validateEmail = ({ target: { value } }) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          email: 'Please enter your Email Address'
        }
      });
    } else if (value && !EMAIL_REGEX.test(value)) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          email: 'Please enter a valid Email Address'
        }
      });
    } else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          email: ''
        }
      });
    }
  }

  validatePassword = ({ target: { value } }) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          password: 'Please enter Password'
        }
      });
    } else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          password: ''
        }
      });
    }
  }

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  submitLawyerLoginForm = () => {
    const { lawyerLogin, history } = this.props;
    const { email, password, loginFor30days } = this.state;
    lawyerLogin({ email, password, loginFor30days }).then(({ errorMessage }) => {
      if (errorMessage) {
        return this.setState({
          message: { description: errorMessage }
        });
      }

      history.push('/main/dashboardmaster/dashboardlink');
    })
  };

  showPasswordLawyer = () => {
    let { isShowPassword } = this.state;

    isShowPassword = isShowPassword === "password" ? "text" : "password";
    this.setState({ isShowPassword });
  };

  handleTogglePassword = () => {
    if (this.state.isShowPassword == "password")
      this.setState({
        isShowPassword: "text",
      });
    else {
      this.setState({
        isShowPassword: "password",
      });
    }
  }

  render() {
    const { email, password, isShowPassword, message, validateSchema, loginFor30days } = this.state;

    return (
      <div class="container">
        <LoadingBar
          onRef={(ref) => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <div class="row">
          <div class="col-md-1" />
          <div class="col-md-10 login-section">
            <h1 class="text-center">Welcome Back</h1>
            <div class="form-box">
              <div class="row">
                <div class="col-md-6 login-left-side">
                  <p class="text-center form-para">
                    Please login to your account
                  </p>

                  <div class="form-area form-area-register">
                    <div class="form-group">
                      <TextField
                        error={validateSchema.email}
                        helperText={validateSchema.email}
                        onBlur={this.validateEmail}
                        label='Your Business Email'
                        style={{ width: '100%' }}
                        value={email}
                        name='email'
                        onChange={this.handleChangeInput}
                      />
                    </div>

                    <div class="form-group">
                      <TextField
                        error={validateSchema.password}
                        helperText={validateSchema.password}
                        onBlur={this.validatePassword}
                        style={{ width: '100%' }}
                        label="Password"
                        name="password"
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
                        value={password || ''}
                        onChange={this.handleChangeInput}
                        type={isShowPassword ? 'text' : 'password'}
                      />
                      <span class="forget-password">
                        <Link to="/main/lawyer-resetpassword">
                          I've forgotten my password
                        </Link>
                      </span>
                    </div>
                    <div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            name='isTechnical'
                            value={loginFor30days}
                            onChange={({ target: { checked }}) => this.setState({ loginFor30days: checked })}
                          />
                        }
                        label='Keep me logged in for 30 days'
                      />
                    </div>
                    <div class="text-center">
                      <Button
                        text="Login"
                        type="button"
                        onClick={() => this.submitLawyerLoginForm()}
                        buttonType={TYPES.Login}
                      />
                    </div>

                    <p class="new-to-lawon">
                      New to LawOn?
                        <Link to="/main/register">Register</Link>
                      here
                      </p>
                    <div className="error-display">
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
                                <Close fontSize="inherit" />
                              </IconButton>
                            }>
                            {message.description || "Something went wrong"}
                          </Alert>
                        )}
                    </div>

                    <div class="agree-terms">
                      <p>
                        By registering with LawOn you accept our
                          <Link to="/main/termsandconditions">
                          <a> Terms & Conditions </a>
                        </Link>
                        and
                          <Link to="/main/privacypolicy">
                          <a> Cookie & Privacy Policy </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="background-form-section" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-1" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth })

export default connect(mapStateToProps, actions)(Login);
