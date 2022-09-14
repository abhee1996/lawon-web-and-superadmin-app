import React, { Component } from "react";
import { connect } from 'react-redux';
import { TextField, Button, Snackbar, FormControl, InputLabel, Select, MenuItem, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { GpsFixed } from '@material-ui/icons';
import MomentUtils from "@date-io/moment";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import moment from 'moment';
import { POSTCODE_REGEX, EMAIL_REGEX } from '../../common/constants';
import countries from '../../common/countries.json'
import * as actions from "../../actions/user/userProfile";
import VerifyPhoneModal from './VerifyPhoneModal';
import { verifyOTP } from '../../actions/user/auth';

// eslint-disable-next-line no-undef
const geocoder = new google.maps.Geocoder();
class Profile extends Component {
  state = {
    showMessage: false,
    isVerifyModalOpen: false,
    message: '',
    validateSchema: {
      postcode: '',
      firstName: '',
      lastName: '',
      email: ''
    }
  };

  handleChangeInput = ({ target: { name, value } }) => {
    const { setUserProfileChange } = this.props;
    setUserProfileChange({ key: name, value: value });
  };

  updateUserProfile = () => {
    const { userProfileUpdate } = this.props;
    userProfileUpdate().then(({ errorMessage }) => {
      if (errorMessage) {
        // TODO: show error message
        return;
      }

      const { user } = this.props
      const { isVerified } = user || {};
      if (!isVerified) {
        this.setState({ isVerifyModalOpen: true });
      }
      
      this.setState({
        message: 'Your profile has been updated successfully',
        showMessage: true
      });
    });
  };

  handleDateChange = (date) => {
    const { setUserProfileChange } = this.props;
    setUserProfileChange({ key: "dateOfBirth", value: date && date.toISOString() });
  };

  handleChangePhone = (value) => {
    const { setUserProfileChange } = this.props;
    setUserProfileChange({ key: 'phoneNumber', value: value });
  };

  validatePostcode = ({ target: { value }}) => {
    if ( value && !POSTCODE_REGEX.test(value)) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          postcode: 'Please enter valid Postcode e.g. ABC 123'
        }
      });
    } else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          postcode: ''
        }
      });
    }
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

  handleLookupAddress = () => {
    const { user, setUserProfileChange } = this.props;
    const { postcode } = user || {};

    if (!POSTCODE_REGEX.test(postcode)) return;

    geocoder.geocode({ address: postcode }, (address) => {
      if (!address || !address.length) return;

      const { address_components, formatted_address } = address[0] || {};
      const street = address_components[1] || {};
      const town = address_components[2] || {};
      const country = address_components[address_components.length - 1] || {};

      setUserProfileChange({ key: 'country', value: country.short_name });
      setUserProfileChange({ key: 'address', value: formatted_address });
      setUserProfileChange({ key: 'street', value: street.long_name });
      setUserProfileChange({ key: 'town', value: town.long_name });
    });
  }

  handleVerify = (otp) => {
    const { verifyOTP } = this.props;
    verifyOTP({ otp }).then(({ isVerified, errorMessage }) => {
      if (errorMessage) {
        // TODO: show error message
        return;
      }
      
      this.setState({
        message: 'Your Phone Number has been verified.',
        showMessage: true,
        isVerifyModalOpen: false
      });
    });
  }

  render() {
    const { user } = this.props;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      postcode,
      street,
      address,
      town,
      country
    } = user || {};

    const { validateSchema, showMessage, message } = this.state;
    const isInvalid = Object.values(validateSchema).some(x => x);

    const countriesOptions = countries.map(({ name, alpha2Code }) => <MenuItem key={alpha2Code} value={alpha2Code}>{name}</MenuItem>)

    return (
      <div className="row">
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showMessage}
          onClose={() => this.setState({ showMessage: false })}
          autoHideDuration={4000}
          message={message}
        />
        <div className="col-md-6">
          <div className="right-side-subheading">Basic Info</div>
          <div className="form-area">
            <form>
              <div class="form-group">
                <TextField
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
                  label="Last Name"
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
                <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                  <DatePicker
                    label='Date of Birth'
                    style={{ width: '100%' }}
                    disableFuture
                    clearable={true}
                    openTo="year"
                    format="LL"
                    views={["year", "month", "date"]}
                    value={dateOfBirth}
                    onChange={this.handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 pos-relative">
          <div className="right-side-subheading">Contact</div>
          <div className="form-area">
            <form>
              <div class="form-group">
                <PhoneInput
                  country="US"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={this.handleChangePhone}
                />
              </div>
              <div class="form-group pos-relative">
                <TextField
                  label='Postcode'
                  onBlur={this.validatePostcode}
                  style={{ width: '100%' }}
                  error={validateSchema.postcode}
                  helperText={validateSchema.postcode}
                  name="postcode"
                  onChange={this.handleChangeInput}
                  value={postcode || ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <Tooltip title='Lookup for address'>
                          <IconButton
                            size='small'
                            onClick={this.handleLookupAddress}>
                            <GpsFixed />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div class="form-group">
                <TextField
                  label='Street'
                  style={{ width: '100%' }}
                  name="street"
                  onChange={this.handleChangeInput}
                  value={street || ''}
                />
              </div>
              <div class="form-group pos-relative">
                <TextField
                  style={{ width: '100%' }}
                  label="Address"
                  name="address"
                  onChange={this.handleChangeInput}
                  value={address || ''}
                />
              </div>

              <div class="form-group">
                <TextField
                  style={{ width: '100%' }}
                  label="Town"
                  name="town"
                  onChange={this.handleChangeInput}
                  value={town || ''}
                />
              </div>

              <div class="form-group">
                <FormControl style={{ width: '100%' }}>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    value={country || ''}
                    labelId="country-label"
                    onChange={this.handleChangeInput}
                    name='country'
                    id="country-select">
                    {countriesOptions}
                  </Select>
                </FormControl>
              </div>

              <div className="user-profile-btn">
                <Button
                  onClick={this.updateUserProfile}
                  variant='outlined'
                  disabled={isInvalid}
                  color='primary'>
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
        <VerifyPhoneModal
          {...this.props}
          {...this.state}
          onClose={() => this.setState({ isVerifyModalOpen: false })}
          onVerify={this.handleVerify}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { userProfile, auth } }) => ({
  ...userProfile,
  auth
});

export default connect(mapStateToProps, { ...actions, verifyOTP })(Profile);
