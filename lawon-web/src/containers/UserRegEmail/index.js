import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { TextField, ThemeProvider, createMuiTheme, } from '@material-ui/core';
import LoadingBar from "react-top-loading-bar";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Button, TYPES } from "../../components/atoms/YellowButton";
import { commonFunctions } from "../../utils/utils.js";
import * as actions from "../../actions/user/auth";
import Popup from "../../components/molecules/ErrorPopup";
import { EMAIL_REGEX} from '../../common/constants';

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

class UserRegisterEmail extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: "",
      email: "",
      phonenumber: "",
      isNonTechnical: null,
      isUpper: "gray",
      isLength: "gray",
      isDigit: "gray",
      isLower: "gray",
      isShowPassword: "password",
      showLoader: false,
      validateSchema: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    };
  }

  validateFirstName = ({ target: { value }}) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          firstName: 'Please enter Firstname'
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
          lastName: 'Please enter Lastname'
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
          email: 'Please a valid Email Address'
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

  componentWillReceiveProps(nextProps) {
    const { loading, errorMessage, accessToken, clearError } = nextProps;
    const { history } = this.props;


    if (accessToken) {
      history.push({ pathname: "/main/userentercode" });
    }

    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }

    if (errorMessage) {
      this.popup.setState({
        dialogOpen: true,
        message: errorMessage
      });

      clearError();
    }
  }

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSignup = () => {
    const { firstName, lastName, email, password, phoneNumber } = this.state;
    const { signup } = this.props;

    signup({
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    });
  };

  handleNewPassword = ({ target: { value } }) => {
    const {
      isUppercase,
      isLength,
      isDigit,
      isLowercase
    } = commonFunctions.validatePassword(value);
    this.setState({
      isUpper: isUppercase,
      isLength: isLength,
      isDigit: isDigit,
      isLower: isLowercase,
      password: value
    });
  };

  showPassword = () => {
    const { isShowPassword } = this.state;
    this.setState({
      isShowPassword: isShowPassword === "password" ? "text" : "password"
    });
  };

  handleChangePhone = (value) => {
    this.setState({ phoneNumber: value });
  };

  render() {
    const { firstName, lastName, email, password, phoneNumber, isShowPassword, validateSchema } = this.state;
    const { loading } = this.props;
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
            <div class="col-md-10 login-section user-email-reg">
              <h1 class="text-center">Registration</h1>
              <div class="form-box">
                <div class="row">
                  <div class="col-md-6 register-left-side">
                    <p class="text-center form-para">
                      Great! Type your details
                      <br />
                      below to start your journey
                    </p>

                    <div class="form-area form-area-register">
                      <form>
                        <div class="form-group">
                          <TextField
                            error={validateSchema.firstName}
                            helperText={validateSchema.firstName}
                            onBlur={this.validateFirstName}
                            label='First Name'
                            style={{ width: '100%' }}
                            name="firstName"
                            onChange={this.handleChangeInput}
                            value={firstName || ''}
                          />
                        </div>
                        <div class="form-group">
                          <TextField
                            error={validateSchema.lastName}
                            helperText={validateSchema.lastName}
                            onBlur={this.validateLastName}
                            label='Last Name'
                            style={{ width: '100%' }}
                            name="lastName"
                            onChange={this.handleChangeInput}
                            value={lastName || ''}
                          />
                        </div>
                        <div class="form-group">
                          <TextField
                            error={validateSchema.email}
                            helperText={validateSchema.email}
                            onBlur={this.validateEmail}
                            label='Email'
                            style={{ width: '100%' }}
                            name="email"
                            onChange={this.handleChangeInput}
                            alue={email || ''}
                          />
                        </div>

                        <div class="form-group">
                          <TextField
                            error={validateSchema.password}
                            helperText={validateSchema.password}
                            onBlur={this.validatePassword}
                            type={isShowPassword}
                            label='Password'
                            style={{ width: '100%' }}
                            name="password"
                            onChange={this.handleChangeInput}
                            alue={password || ''}
                          />
                          <span onClick={this.showPassword} class="show-password">
                            show password
                          </span>
                        </div>

                        <div class="form-group">
                          <PhoneInput
                            country="US"
                            style={{ width: '100%' }}
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            name="phoneNumber"
                            onChange={this.handleChangePhone}
                          />
                        </div>
                        <div class="register-btn-section text-center">
                          <Button
                            disabled={loading}
                            text="Register"
                            type="button"
                            onClick={this.handleSignup}
                            buttonType={TYPES.Register}
                          />
                        </div>

                        <div class="agree-terms">
                          <p>
                            By registering with LawOn you accept our
                            <Link to="/NavbarHome/termsandconditions">
                              <a> Terms & Conditions </a>
                            </Link>
                          </p>
                        </div>

                        <div class="validation-section">
                          <div className={this.state.isLength}>
                            <span>
                              <i class="fa fa-check-circle" />
                            </span>
                            <span>at least 8 characters</span>
                          </div>

                          <div className={this.state.isLower}>
                            <span>
                              <i class="fa fa-check-circle" />
                            </span>
                            <span>at least one lowercase character</span>
                          </div>

                          <div className={this.state.isUpper}>
                            <span>
                              <i class="fa fa-check-circle" />
                            </span>
                            <span>at least one uppercase character</span>
                          </div>

                          <div className={this.state.isDigit}>
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
                    <div class="background-form-section-register background-form-section-register-user">
                      <div className="para-data">
                        <p>
                          We'll send you an email with a confirmation link.
                        <br />
                          <br />
                          You can begin exploring LawOn before confirming your
                          account. But remember to do so to use all our features.
                      </p>
                        <br />
                        <br />
                        <br />
                        <p>
                          Would you prefer using Google or Facebook to register?
                        <Link to="/main/usersocialreg">Go back</Link>
                        </p>
                      </div>
                    </div>
                  </div>
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

const mapStateToProps = ({ user: { auth } }) => ({
  ...auth
});

export default connect(
  mapStateToProps,
  actions
)(UserRegisterEmail);
