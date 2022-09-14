import React from 'react';
import { connect } from 'react-redux'
import simpleReactValidator from 'simple-react-validator';
import LoadingBar from 'react-top-loading-bar'
import { TextField, Avatar, Snackbar } from "@material-ui/core";
import PhoneInput from "react-phone-number-input";

import * as actions from '../../../actions/accountSettings';
import { Button, TYPES } from '../../atoms/YellowButton';
import { EMAIL_REGEX } from '../../../common/constants';

import "react-phone-number-input/style.css";

class PersonalSettings extends React.Component {

  constructor(props) {
    super(props)
    this.validator = new simpleReactValidator();
    this.state = {
      firstName: '',
      lastName: '',
      jobtitle: '',
      email: '',
      phonenumber: '',
      image: '',
      load: true,
      imageUrl: '',
      message:'',
      validateSchema: {
        firstName: '',
        lastName: '',
        email: '',
        jobtitle: ''
      }
    }

  }

  componentDidMount() {
    const { auth } = this.props;
    const { lawyer = {} } = auth || {};
    const { firstName, lastName, email, jobTitle, phoneNumber, imageUrl } = lawyer || {};

    this.setState((prevState) => ({
      ...prevState,
      firstName,
      lastName,
      email,
      jobtitle: jobTitle,
      phonenumber: phoneNumber,
      imageUrl
    }))
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  handleChangeFile = ({ target: { files }}) => {
    if (files && files.length) {
      const file = files[0];

      this.setState({
        imageUrl: URL.createObjectURL(file),
        image: file
      });
    }
  }

  handleChangeInput = ({ target: { value, name }}) => {
    this.setState({ [name]: value })
  }

  handleChangePhone = (phonenumber) => {
    this.setState({ phonenumber });
  }

  handleSubmit = () => {
    const { firstName, lastName, email, jobtitle, phonenumber, image } = this.state;
    const { saveLawyerPersonalSettings } = this.props;

    const errors = {};

    if (!firstName) {
      errors.firstName = 'Please enter First Name';
    }

    if (!lastName) {
      errors.lastName = 'Please enter Last Name';
    }

    if (!email) {
      errors.email = 'Please enter Email';
    }

    if (!jobtitle) {
      errors.jobtitle = 'Please enter Job Title';
    }

    if (errors && Object.keys(errors).length) {
      return this.setState({ validateSchema: { ...errors }});
    }

    saveLawyerPersonalSettings({
      firstName,
      lastName,
      email,
      jobTitle: jobtitle,
      phoneNumber: phonenumber,
      media: image
    })
      .then(({ errorMessage }) => {
        if (errorMessage) {
          // TODO: handle error message
          return
        }

        this.setState({
          message: {
            description: 'Personal Settings has been updated successfully.',
            type: 'success'
          },
          image: ''
        })

      })

  }

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

  validateJobTitle = ({ target: { value }}) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          jobtitle: 'Please enter Job Title'
        }
      });
    } else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          jobtitle: ''
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
    const { firstName, lastName, email, phonenumber, jobtitle, imageUrl, validateSchema, message } = this.state;

    return (
      <div>
        <LoadingBar
          onRef={ref => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={message && message.description && message.type === 'success'}
          onClose={() => this.setState({ message: '' })}
          autoHideDuration={4000}
          message={message && message.description}
        />
        <div className='right-side-heading'>
          Personal Settings
        </div>
        <div className='col-sm-12 no-padding'>
          <div className='col-sm-6 pl0'>
            <div className='right-side-subheading'>PROFILE</div>
            <div className='form-area'>
              <form>
                <div class="form-group">
                  <TextField
                    required
                    label='First Name'
                    error={validateSchema.firstName}
                    helperText={validateSchema.firstName}
                    onBlur={this.validateFirstName}
                    style={{ width: '100%' }}
                    name="firstName"
                    onChange={this.handleChangeInput}
                    value={firstName || ''}
                  />
                </div>
                <div class="form-group">
                  <TextField
                    required
                    label='Last Name'
                    error={validateSchema.lastName}
                    helperText={validateSchema.lastName}
                    onBlur={this.validateLastName}
                    style={{ width: '100%' }}
                    name="lastName"
                    onChange={this.handleChangeInput}
                    value={lastName || ''}
                  />
                </div>
                <div class="form-group">
                  <TextField
                    required
                    label='Job Title'
                    error={validateSchema.jobtitle}
                    helperText={validateSchema.jobtitle}
                    onBlur={this.validateJobTitle}
                    style={{ width: '100%' }}
                    name="jobtitle"
                    onChange={this.handleChangeInput}
                    value={jobtitle || ''}
                  />
                </div>
                <div class="form-group">
                  <PhoneInput
                    country="US"
                    placeholder="Enter phone number"
                    value={phonenumber}
                    onChange={this.handleChangePhone}
                  />
                </div>
                <div class="form-group">
                  <TextField
                    required
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
              </form>
            </div>

          </div>
          <div className='col-sm-1'></div>
          <div className='col-sm-5 pr0'>
            <div className='right-side-subheading'>PROFILE PHOTO</div>
            <div className='user-img-box lawyer-img-width'>
              <input type="file" onChange={this.handleChangeFile} />
              <Avatar
                variant='square'
                style={{ width: '180px', height: '200px' }}
                src={imageUrl}
              />
              <div class="middle">
                <div class="text">
                  <div className='upload-icon'>
                    <i className='fa fa-upload'></i>
                  </div>
                  <div>Upload Profile Photo</div>
                </div>
              </div>
            </div>
          </div>
          <div className='float-right clearfix pt40'>
            <Button
              text='Save Changes'
              type='button'
              onClick={this.handleSubmit}
              buttonType={TYPES.Generic}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ accountSettings, auth }) => ({
  ...accountSettings,
  auth
});
export default connect(mapStateToProps, actions)(PersonalSettings);