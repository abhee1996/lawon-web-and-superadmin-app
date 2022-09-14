import React, { Component } from 'react';
import LoadingBar from 'react-top-loading-bar'
import { TextField } from '@material-ui/core';

import { Button, TYPES } from '../../atoms/YellowButton';
import { EMAIL_REGEX } from '../../../common/constants';


const initialState = {
  openPopup: false,
  firstName: '',
  lastName: '',
  email: '',
  showWarning: false,
  validateSchema: {
    firstName: '',
    lastName: '',
    email: ''
  }
}

class AddColleague extends Component {
  state = { ...initialState };

  componentWillReceiveProps(nextProps) {
    const { getLawyers, clearNewLawyer, onClose } = this.props;
    const { manageLawers, errorMessage, clearErrorMessage } = nextProps;
    const { newLawyer, loading } = manageLawers || {};

    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }

    if (newLawyer) {
      getLawyers();
      clearNewLawyer();
      onClose();

      this.setState({ ...initialState });
    }
  }

  handleChangeInput = ({ target: { name, value }}) => {
    this.setState({ [name]: value })
  }

  addTeamMember = () => {
    const { inviteLawyer } = this.props;
    const { firstName, lastName, email} = this.state;

    const errors = {};

    if (!firstName) {
      errors.firstName = 'Please enter First Name';
    }

    if (!lastName) {
      errors.lastName = 'Please enter Last Name';
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      errors.email = 'Please enter a valid Email Address';
    }

    if (errors && Object.keys(errors).length) {
      return this.setState({ validateSchema: { ...errors }});
    }

    inviteLawyer({ firstName, lastName, email });
  }

  validateFirstName = ({ target: { value }}) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          firstName: 'Please enter Fisrt Name'
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

  render() {
    const { firstName, lastName, email, validateSchema } = this.state;
    return (
      <div>
        <LoadingBar
          onRef={ref => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <div className='right-side-heading'>Add Colleague</div>
        <div className='col-sm-12 no-padding'>
          {this.state.showWarning &&
            <div className='row warning-max-user'>
              <div className='col-md-2 no-padding'>
                <div className='warning-sign'>
                  <i className="fa fa-exclamation-triangle"></i>
                </div>
              </div>
              <div className='col-md-10 no-padding'>
                <div className='warning-detail'>
                  <p><strong>Warning : </strong>
                    You have reached your limit. Please update your plan to add more
                    team members.
                  </p>
                </div>
              </div>
            </div>
          }

          <div className='col-sm-6 pl0'>
            <div className='right-side-subheading'>PROFILE</div>
            <div className='form-area'>
              <form>
                <div className="form-group">
                  <TextField
                    required
                    label='First Name'
                    error={validateSchema.firstName}
                    helperText={validateSchema.firstName}
                    onBlur={this.validateFirstName}
                    style={{ width: '100%' }}
                    name='firstName'
                    value={firstName || ''}
                    onChange={this.handleChangeInput}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    required
                    label='Last Name'
                    error={validateSchema.lastName}
                    helperText={validateSchema.lastName}
                    onBlur={this.validateLastName}
                    style={{ width: '100%' }}
                    name='lastName'
                    value={lastName || ''}
                    onChange={this.handleChangeInput}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    required
                    label='Email'
                    error={validateSchema.email}
                    helperText={validateSchema.email}
                    onBlur={this.validateEmail}
                    style={{ width: '100%' }}
                    name='email'
                    value={email || ''}
                    onChange={this.handleChangeInput}
                  />
                </div>
              </form>
            </div>

          </div>
          <div className='col-sm-1'></div>
          <div className='col-sm-5 pr0'>
          </div>
        </div>
        <div className='float-right'>
          <Button
            text='Save Changes'
            type='button'
            onClick={this.addTeamMember}
            buttonType={TYPES.Generic}
          />
        </div>
      </div>
    );
  }
}
export default AddColleague;