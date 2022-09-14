import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import PhoneInput from "react-phone-number-input";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, TextField, createMuiTheme, MuiThemeProvider, Checkbox, FormControlLabel, Button, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import queryString from "query-string";

import "react-phone-number-input/style.css";

import { EMAIL_REGEX } from '../../common/constants';
import { commonFunctions } from "../../utils/utils.js";
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

class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    password: "",
    email: "",
    phone: "",
    isTechnical: true,
    isUpper: "gray",
    isLength: "gray",
    isDigit: "gray",
    isLower: "gray",
    isShowPassword: false,
    message: "",
    successStatus: false,
    validateSchema: {
      firstName: '',
      lastName: '',
      email: ''
    }
  };

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleChangeIsTechnical = ({ target: { name, checked } }) => {
    this.setState({ [name]: checked });
  };

  handleChangePhone = (value) => {
    this.setState({ phone: value });
  };

  handlePassword = ({ target: { value } }) => {
    const {
      isUppercase,
      isLength,
      isDigit,
      isLowercase,
    } = commonFunctions.validatePassword(value);
    this.setState({
      isUpper: isUppercase,
      isLength: isLength,
      isDigit: isDigit,
      isLower: isLowercase,
      password: value,
      planId: "",
    });
  };

  handleSingupOrganization = () => {
    const { firstname, lastname, email, password, phone, isTechnical } = this.state;
    const { signup, history, location } = this.props;

    const params = queryString.parse(location.search);
    const { planid } = params || {};

    signup({
      firstName: firstname,
      lastName: lastname,
      email,
      password,
      phone,
      planId: planid,
      isTechnical
    }).then(({ errorMessage }) => {
      if (errorMessage) {
        return this.setState({
          message: { description: errorMessage }
        });
      }

      history.push(`/main/organizationotp`)
    });
  };

  handleError = () => {
    this.setState({ errorStatus: false });
  };

  validateFirstName = ({ target: { value }}) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          firstName: 'Please enter First Name'
        }
      });
    } else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          firstName: ''
        }
      });
    }
  }

  validateLastName = ({ target: { value }}) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          lastName: 'Please enter Last Name'
        }
      });
    } else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          lastName: ''
        }
      });
    }
  }

  validateEmail = ({ target: { value }}) => {
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

  validatePassword = ({ target: { value }}) => {
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

  render() {
    const { loading } = this.props;
    const { firstname, lastname, email, phone, isShowPassword, password, isTechnical, message, isLength, isLower, isUpper, isDigit, validateSchema } = this.state;
    const isInvalid = Object.values(validateSchema).some(x => x);

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
              <h1 class="text-center">Join the future of legal services</h1>

              <div class="form-box">
                <div class="row">
                  <div class="col-md-6 register-left-side">
                    <p class="text-center form-para">
                      Start by registering your law firm
                      <br />
                      using your business email address
                    </p>

                    <div class="form-area form-area-register">
                      <form>
                      <div class="form-group">
                          <TextField
                            label='First Name'
                            error={validateSchema.firstName}
                            helperText={validateSchema.firstName}
                            onBlur={this.validateFirstName}
                            style={{ width: '100%' }}
                            name="firstname"
                            onChange={this.handleChangeInput}
                            value={firstname || ''}
                          />
                        </div>
                        <div class="form-group">
                          <TextField
                            label='Last Name'
                            error={validateSchema.lastName}
                            helperText={validateSchema.lastName}
                            onBlur={this.validateLastName}
                            style={{ width: '100%' }}
                            name="lastname"
                            onChange={this.handleChangeInput}
                            value={lastname || ''}
                          />
                        </div>
                        <div class="form-group">
                          <TextField
                            label='Email'
                            error={validateSchema.email}
                            helperText={validateSchema.email}
                            onBlur={this.validateEmail}
                            style={{ width: '100%' }}
                            name="email"
                            onChange={this.handleChangeInput}
                            value={email || ''}
                          />
                        </div>
                        <div class="form-group">
                          <PhoneInput
                            country="US"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={this.handleChangePhone}
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
                            onChange={this.handlePassword}
                            type={isShowPassword ? 'text' : 'password'}
                          />
                        </div>

                        <div className="non-tech-check">
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                name="isTechnical"
                                checked={isTechnical}
                                onChange={this.handleChangeIsTechnical}
                              />
                            }
                            label="Are you technical?"
                          />
                        </div>

                        <div class="register-btn-section text-center">
                          <Button
                            style={{ width: '100%' }}
                            color='primary'
                            variant='contained'
                            disabled={isInvalid || loading}
                            onClick={this.handleSingupOrganization}>
                            Register
                          </Button>
                        </div>

                        <div class="agree-terms">
                          <p>
                            By registering with LawOn you accept our
                            <Link to="/NavbarHome/termsandconditions">
                              <a> Terms & Conditions </a>
                            </Link>
                          </p>
                        </div>

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
                                  <CloseIcon fontSize="inherit" />
                                </IconButton>
                              }>
                              {message.description || "Something went wrong"}
                            </Alert>
                          )}
                        </div>

                        <div class="validation-section">
                          <div className={isLength}>
                            <span>
                              <i class="fa fa-check-circle" />
                            </span>
                            <span>at least 8 characters</span>
                          </div>

                          <div className={isLower}>
                            <span>
                              <i class="fa fa-check-circle" />
                            </span>
                            <span>at least one lowercase character</span>
                          </div>

                          <div className={isUpper}>
                            <span>
                              <i class="fa fa-check-circle" />
                            </span>
                            <span>at least one uppercase character</span>
                          </div>

                          <div className={isDigit}>
                            <span>
                              <i class="fa fa-check-circle" />
                            </span>
                            <span>at least one number or symbol (f.e. @#$)</span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="background-form-section-register">
                      <div className="para-data">
                        <p>
                          We'll send you an email with a confirmation link.
                          <br />
                          <br />
                          You can begin exploring LawOn before confirming your
                          account. But remember to do so to use all our features.
                        </p>
                        <br />
                        <p>
                          Already registered?
                          <Link to="/main/login">Log in</Link>
                        </p>
                      </div>
                    </div>
                  </div>
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

const mapStateToProps = ({ auth }) => ({ ...auth });

export default connect(mapStateToProps, actions)(Register);
