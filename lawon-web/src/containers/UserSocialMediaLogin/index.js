import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import queryString from 'query-string';

import { Button, TYPES } from "../../components/atoms/YellowButton";
import { Input } from "../../components/atoms/InputField";
import * as actions from "../../actions/user/auth";
import Popup from "../../components/molecules/ErrorPopup";

class UserSocialLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      isShowPassword: "password",
      showLoader: false,
    };
  }

  socialLogin = ({ e, title, url }) => {
    e.preventDefault();
    const { exchangeAuthToken, history } = this.props;
    const googleAuthPopup = window.open(`${window.baseUrl}${url}`, '_blank', 'width=446,height=630,left=200,top=100');
    googleAuthPopup.document.title = title;

    window.addEventListener('message', ({ data }) => {
      const { token, error } = data || {};
      googleAuthPopup.close();

      if (error) {
        return this.setState({ message: error });
      }

      if (token) {
        exchangeAuthToken({ token }).then(({ user }) => {
          if (!user) return;
          
          const { initailCreated } = user;
          if (initailCreated) {
            history.push('/main/userentercode');
          } else {
            history.push('/main/userdashboardmain');
          }
        });
      }
    },
    false);
  }

  componentDidMount() {
    const { location } = this.props;
    const { search } = location || {};
    const { token, error } = queryString.parse(search);

    const googleAuthPopup = window.opener;
    if (googleAuthPopup && (token || error)) {
      googleAuthPopup.postMessage({ token, error }, window.location.origin);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user, errorMessage, clearError, loading } = nextProps;
    const { history } = this.props;

    if (errorMessage) {
      this.popup.setState({ dialogOpen: true, message: errorMessage });
      clearError();
    }

    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }

    if (user) {
      history.push("/main/userdashboardmain");
    }
  }

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  submitLoginForm = () => {
    const { login } = this.props;
    const { email, password } = this.state;
    login({ email, password });
  };

  showPassword = () => {
    let { isShowPassword } = this.state;

    isShowPassword = isShowPassword === "password" ? "text" : "password";
    this.setState({ isShowPassword });
  };

  onSubmit = () => {
    this.props.onAdd();
  };
  render() {
    const { isShowPassword, email, password } = this.state;
    const { user, history } = this.props;

    if (user) {
      history.push("/main/userdashboardmain");
    }

    return (
      <div class="container">
        <LoadingBar
          onRef={(ref) => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-10 login-section">
            <h1 class="text-center">Deal with legal matters like a pro</h1>
            <div class="form-box" style={{height:'560px'}}>
              <div class="row">
                <div class="col-md-6">
                  <div class="background-form-section-social-login">
                    <div className="social-media-btns">
                      <div class="fb-btn text-center">
                        
                        <Button
                          text="Login with Facebook"
                          type="button"
                          onClick={(e) =>
                            this.socialLogin({
                              e,
                              title: "Facebook",
                              url: "/social/auth/facebook",
                            })
                          }
                          buttonType={TYPES.Facebook}
                        />
                      </div>
                      <div class="ggle-btn text-center">
                        

                        <Button
                          text="Login with Google"
                          type="button"
                          onClick={(e) =>
                            this.socialLogin({
                              e,
                              title: "Google",
                              url: "/social/auth/google",
                            })
                          }
                          buttonType={TYPES.Google}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 login-left-side">
                  <p class="text-center welcome-text">
                    Welcome back. Please login to your account
                  </p>
                  <div class="form-area form-area-register">
                    <form>
                      <div class="form-group pb-20">
                        <p className="form-para">Login with your email</p>
                        <Input
                          type="text"
                          name="email"
                          value={email}
                          placeholder="YOUR EMAIL"
                          handleChange={this.handleChangeInput}
                        />
                      </div>

                      <div class="form-group">
                        <Input
                          type={isShowPassword}
                          value={password}
                          name="password"
                          placeholder="ENTER PASSWORD"
                          handleChange={this.handleChangeInput}
                        />
                        <span class="forget-password">
                          <Link to="/main/resetpassword">
                            I've forgotten my password
                          </Link>
                        </span>
                        <span
                          onClick={() => this.showPassword()}
                          class="show-password"
                        >
                          show password
                        </span>
                      </div>
                      <div class="register-btn-section text-center">
                        <Button
                          text="Login"
                          type="button"
                          onClick={() => this.submitLoginForm()}
                          buttonType={TYPES.Register}
                        />
                      </div>
                      <p class="new-to-lawon">
                        New to LawOn?
                        <Link to="/main/usersocialreg">Register</Link>
                        here
                      </p>
                      <div class="agree-terms social-login-agree-terms">
                        <p>
                          By Signing in with LawOn you accept our
                          <a>Terms & Conditions </a>
                          and
                          <a> Cookie & Privacy Policy </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
        </div>
        <Popup ref={(ref) => (this.popup = ref)} />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { auth } = user || {};
  return {
    ...auth,
  };
};

export default connect(mapStateToProps, actions)(UserSocialLogin);
