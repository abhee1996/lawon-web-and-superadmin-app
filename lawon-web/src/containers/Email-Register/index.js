import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import LoadingBar from 'react-top-loading-bar'
import simpleReactValidator from 'simple-react-validator';
import { Snackbar } from '@material-ui/core';

import { Button, TYPES } from '../../components/atoms/YellowButton'
import { Input } from '../../components/atoms/InputField'
import { commonFunctions } from '../../utils/utils.js'
import { Loader } from '../../components/atoms/Loader'
import MainLayout from '../../containers/MainLayout'
import ErrorPopup from '../../components/molecules/ErrorPopup';
import { registerInvitedLawyer } from '../../actions/lawyer';

class EmailRegister extends Component {
  state = {}
  constructor(props) {
    super(props)
    this.validator = new simpleReactValidator();
    this.state = {
      password: "",
      email: "",
      phonenumber: "",
      isNonTechnical: false,
      isUpper: 'gray',
      isLength: 'gray',
      isDigit: 'gray',
      isLower: 'gray',
      isShowPassword: 'password',
      showLoader: false,
      organizationId: '',
      tokenByEmail: ''

    };
  }

  componentWillReceiveProps(nextProps) {
    const { errorMessage, lawyer } = nextProps;
    if (errorMessage) {
      this.LoadingBar.complete();
      this.errorModalRef.setState({ message: errorMessage });
      return this.errorModalRef.openModal();
    }

    if (lawyer.email) {
      this.errorModalRef.openModal();
      this.props.history.push('/main/dashboardmaster/dashboardlink');
    }
  }

  handleChangeInput = event => {
    let isChecked = event.target.checked;
    console.log('change is triggered', isChecked)
    this.setState({ [event.target.name]: event.target.value, isNonTechnical: isChecked })
  }

  submitRegisterForm = () => {
    const { match, registerInvitedLawyer } = this.props;
    const { params: { token } } = match;
    const { password } = this.state;

    if (!this.validator.fieldValid('password')) {
      this.validator.showMessages();
      return this.forceUpdate();                                              // rerender to show messages for the first time
    }
      this.LoadingBar.continuousStart();
      registerInvitedLawyer({ password, token });

  }


  handleNewPassword = event => {
    this.setState({
      password: event.target.value
    })
    const isPasswordValid = commonFunctions.validatePassword(event.target.value);
    console.log('is password valid', isPasswordValid)
    this.setState({
      isUpper: isPasswordValid.isUppercase,
      isLength: isPasswordValid.isLength,
      isDigit: isPasswordValid.isDigit,
      isLower: isPasswordValid.isLowercase,
    })
  }

  showPassword() {
    if (this.state.isShowPassword == 'password')
      this.setState({
        isShowPassword: 'text'
      })
    else {
      this.setState({
        isShowPassword: 'password'
      })
    }
  }


  render() {
    const { isLogin, history } = this.props;
    if(isLogin) {
      history.push('/main/dashboardmaster/dashboardlink');
    }
    
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
              Welcome to LawOn
             </h1>
            <div class='form-box'>
              <div class='row'>
                <div class='col-md-2'></div>
                <div class='col-md-8 email-register-form'>
                  <p class='text-center form-para'>
                    You have been invited to join to your organisation
                 <br />
                    Awe Solicitors on LawOn
                 </p>

                  <div class='form-area form-area-login'>
                    <form>
                      <div class="form-group">
                        <Input
                          type={this.state.isShowPassword}
                          name={'password'}
                          placeholder={'ENTER PASSWORD'}
                          id={'password'}
                          handleChange={this.handleNewPassword}
                        />
                        {this.validator.message('password', this.state.password, 'required')}
                        <span onClick={() => this.showPassword()} class='show-password'>show password</span>
                      </div>
                      <div class='register-btn-section text-center'>

                        <Button
                          text='Register'
                          type='button'
                          onClick={() => this.submitRegisterForm()}
                          buttonType={TYPES.Register}
                        />

                      </div>
                      <div class='agree-terms'>
                        <p>
                          By registering with LawOn you accept our
                          <Link to='/NavbarHome/termsandconditions'>
                          <a> Terms & Conditions </a>
                          </Link>
                        </p>
                      </div>

                      <div class='validation-section'>
                        <div className={this.state.isLength}>
                          <span><i class="fa fa-check-circle"></i></span>
                          <span>at least 8 characters</span>
                        </div>

                        <div className={this.state.isLower}>
                          <span><i class="fa fa-check-circle"></i></span>
                          <span>at least one lowercase character</span>
                        </div>

                        <div className={this.state.isUpper}>
                          <span><i class="fa fa-check-circle"></i></span>
                          <span>at least one uppercase character</span>
                        </div>

                        <div className={this.state.isDigit}>
                          <span><i class="fa fa-check-circle"></i></span>
                          <span>at least one number or symbol (f.e. @#$)</span>
                        </div>
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
        <ErrorPopup container={this} ref={(errorModalRef) => this.errorModalRef = errorModalRef} />
      </div>
    );
  }
}

const mapStateToProps = ({ lawyer, common }) => ({
  ...lawyer,
  ...common
});

const mapDispatchToProps = (dispatch) => ({
  registerInvitedLawyer: (lawyer) => dispatch(registerInvitedLawyer(lawyer))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailRegister);