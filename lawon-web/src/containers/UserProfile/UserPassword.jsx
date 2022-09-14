import React, { Component } from "react";
import { TextField, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { commonFunctions } from "../../utils/utils.js";

import * as actions from "../../actions/user/userProfile";

class UserPassword extends Component {
  state = {
    isShowPassword: 'password',
    newPassword: '',
    oldPassword: '',
    errorMessage: '',
    severity: 'error',
    validateSchema: {
      oldPassword: '',
      newPassword: ''
    }
  };

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  showPassword = () => {
    const { isShowPassword } = this.state;
    this.setState({
      isShowPassword: isShowPassword === 'password' ? 'text' : 'password'
    });
  };

  validateOldPassword = ({ target: { value }}) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          oldPassword: 'Please enter Old Password'
        }
      });
    } else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          oldPassword: ''
        }
      });
    }
  }

  validateNewPassword = ({ target: { value }}) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          newPassword: 'Please enter New Password'
        }
      });
    } else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          newPassword: ''
        }
      });
    }
  }

  updatePassword = () => {
    const { updatePassword } = this.props;
    const { newPassword, oldPassword } = this.state;

    this.setState({ errorMessage: '' });
    updatePassword({
      newPassword,
      oldPassword
    })
      .then(({ errorMessage }) => {
        if (errorMessage) {
          return this.setState({
            errorMessage,
            severity: 'error'
          });
        }

        this.setState({
          message: 'Your Password has been updated successfully',
          newPassword: '',
          oldPassword: ''
        });
      });
  }

  render() {
    const { newPassword, isShowPassword, validateSchema, errorMessage, severity, message } = this.state;

    const { isUppercase, isLowercase, isDigit, isLength } = commonFunctions.validatePassword(newPassword);
    const isValid = !Object.values({ isUppercase, isLowercase, isDigit, isLength }).some(value => value === 'red');
    const isInvalid = Object.values(validateSchema).some(x => x) || !isValid;

    return (
      <div className="row">
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={message}
          onClose={() => this.setState({ message: '' })}
          autoHideDuration={4000}
          message={message}
        />
        <div className="col-md-12 no-padding">
          <div className="col-md-8">
            <div className="right-side-subheading">Password</div>
            <div className="form-area user-prof-password">
              <form>
                <div class="form-group pos-relative">
                  <TextField
                    error={validateSchema.oldPassword}
                    helperText={validateSchema.oldPassword}
                    onBlur={this.validateOldPassword}
                    style={{ width: '100%' }}
                    placeholder="Current Password"
                    name="oldPassword"
                    onChange={this.handleChangeInput}
                    type={isShowPassword}
                  />
                  <span className="user-password-opts-current">
                    <Link to="/main/resetpassword">
                      I've forgotten my password
                    </Link>
                  </span>
                </div>
                <div class="form-group pos-relative">
                  <TextField
                    error={validateSchema.newPassword}
                    helperText={validateSchema.newPassword}
                    onBlur={this.validateNewPassword}
                    style={{ width: '100%' }}
                    placeholder="New Password"
                    name="newPassword"
                    onChange={this.handleChangeInput}
                    type={isShowPassword}
                  />
                  <span
                    onClick={this.showPassword}
                    className="user-password-opts-new">
                    show password
                  </span>
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

                <div class="validation-section">
                  <div className={isLength}>
                    <span>
                      <i class="fa fa-check-circle"></i>
                    </span>
                    <span>at least 8 characters</span>
                  </div>

                  <div className={isLowercase}>
                    <span>
                      <i class="fa fa-check-circle"></i>
                    </span>
                    <span>at least one lowercase character</span>
                  </div>

                  <div className={isUppercase}>
                    <span>
                      <i class="fa fa-check-circle"></i>
                    </span>
                    <span>at least one uppercase character</span>
                  </div>

                  <div className={isDigit}>
                    <span>
                      <i class="fa fa-check-circle"></i>
                    </span>
                    <span>at least one number or symbol (f.e. @#$)</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="user-profile-btn">
          <Button
            disabled={isInvalid}
            onClick={this.updatePassword}
            variant='outlined'
            color='primary'>
            Update
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { userProfile } }) => ({ ...userProfile });

export default connect(mapStateToProps, actions)(UserPassword);
