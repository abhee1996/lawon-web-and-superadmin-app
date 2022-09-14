import React from "react";
import { connect } from "react-redux";
import { TextField, Avatar, Snackbar } from '@material-ui/core';
import { Business } from '@material-ui/icons';
import LoadingBar from "react-top-loading-bar";
import PhoneInput from "react-phone-number-input";

import { Button, TYPES } from "../../atoms/YellowButton";
import * as actions from "../../../actions/organization";
import { POSTCODE_REGEX, URL_REGEX, EMAIL_REGEX } from "../../../common/constants";

import "react-phone-number-input/style.css";

class FirmContactInfo extends React.Component {
  state = {
    address1: "",
    address2: "",
    town: "",
    postcode: null,
    website: "",
    sraID: "",
    companyName: "",
    email: '',
    imageUrl: '',
    image:'',
    number: '',
    message: "",
    validateSchema: {
      companyName: '',
      address1: '',
      postcode: '',
      email: ''
    }
  };

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
  };

  handleChangePhone = (phonenumber) => {
    this.setState({ phonenumber });
  }

  handleChangeFile = ({ target: { files }}) => {
    if (files && files.length) {
      const file = files[0];

      this.setState({
        imageUrl: URL.createObjectURL(file),
        image: file
      });
    }
  };

  componentDidMount() {
    const { auth } = this.props;
    const { lawyer } = auth;
    const { Organization } = lawyer || {};
    const { name, phone, address1, address2, town, postcode, logoUrl, website, email } = Organization || {};

    this.setState((prevState) => ({
      ...prevState,
      address1,
      address2,
      town,
      postcode,
      website,
      companyName: name,
      email,
      imageUrl: logoUrl,
      number: phone
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

  validateCompanyName = ({ target: { value } }) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          companyName: 'Please enter Company Name'
        }
      });
    } else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          companyName: ''
        }
      });
    }
  }

  validateAddress1 = ({ target: { value } }) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          address1: 'Please enter First line address'
        }
      });
    } else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          address1: ''
        }
      });
    }
  }

  validatePostCode = ({ target: { value } }) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          postcode: 'Please enter Post Code'
        }
      });
    }
    else if (value && !POSTCODE_REGEX.test(value)) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          postcode: 'Please enter a valid Post Code'
        }
      });
    }
    else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          postcode: ''
        }
      });
    }
  }

  validateWebsite = ({ target: { value }}) => {
    if (!value) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          website: 'Please enter Website'
        }
      });
    }
    else if (value && !URL_REGEX.test(value)) {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          website: 'Please enter valid Website Address'
        }
      });
    }
    else {
      this.setState({
        ...this.state,
        validateSchema: {
          ...this.state.validateSchema,
          website: ''
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

  submitFirmProfile = () => {
    const { organizationFirmProfileSetup, getLatLngByPostcodeForFirm } = this.props;
    const { companyName, address1, address2, town, postcode, website, image, number } = this.state;

    const errors = {};

    if (!companyName) {
      errors.companyName = 'Please enter Company Name';
    }

    if (!address1) {
      errors.address1 = 'Please enter first line address';
    }

    if (!postcode) {
      errors.postcode = 'Please enter Post Code';
    }

    if (!website) {
      errors.website = 'Please enter Website';
    }

    if (errors && Object.keys(errors).length) {
      return this.setState({ validateSchema: { ...errors }});
    }

    getLatLngByPostcodeForFirm({ postcode }).then(({ location }) => {
      const { lat, lng } = location || {};

      organizationFirmProfileSetup({
        name: companyName,
        address1,
        address2,
        phone: number,
        town,
        postcode,
        website,
        latlng: `${lat},${lng}`,
        media: image
      })
        .then(({ errorMessage }) => {
          if (errorMessage) {
            return this.setState({
              message: { description: errorMessage }
            });
          }

          this.setState({
            message: {
              description: 'Contact Information has been updated successfully.',
              type: 'success'
            },
            image: ''
          })
        });
    });
  };

  render() {
    const { companyName, address1, address2, town, postcode, website, message, email, number, imageUrl, validateSchema } = this.state;
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
        <div className="right-side-heading">Contact Information</div>
        <div className="col-sm-12 no-padding">
          <div className="col-sm-6 pl0">
            <div className="form-area">
              <form>
                <div className="right-side-subheading">NAME</div>
                <div className="form-group">
                  <TextField
                    required
                    label='Company Name'
                    error={validateSchema.companyName}
                    helperText={validateSchema.companyName}
                    onBlur={this.validateCompanyName}
                    style={{ width: '100%' }}
                    name="companyName"
                    onChange={this.handleChangeInput}
                    value={companyName || ''}
                  />
                </div>

                <div className="right-side-subheading">ADDRESS</div>
                <div className="form-group">
                  <TextField
                    required
                    label='First line of Address'
                    error={validateSchema.address1}
                    helperText={validateSchema.address1}
                    onBlur={this.validateAddress1}
                    style={{ width: '100%' }}
                    name="address1"
                    onChange={this.handleChangeInput}
                    value={address1 || ''}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    label='Second line of address'
                    style={{ width: '100%' }}
                    name="address2"
                    onChange={this.handleChangeInput}
                    value={address2 || ''}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    required
                    label='Post code'
                    error={validateSchema.postcode}
                    helperText={validateSchema.postcode}
                    onBlur={this.validatePostCode}
                    style={{ width: '100%' }}
                    name="postcode"
                    onChange={this.handleChangeInput}
                    value={postcode || ''}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    label='Town'
                    style={{ width: '100%' }}
                    name="town"
                    onChange={this.handleChangeInput}
                    value={town || ''}
                  />
                </div>
                <div className="right-side-subheading">CONTACT</div>
                <div class="form-group">
                  <PhoneInput
                    country="US"
                    placeholder="Enter phone number"
                    value={number}
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
                <div class="form-group">
                  <TextField
                    required
                    label='Website'
                    error={validateSchema.website}
                    helperText={validateSchema.website}
                    onBlur={this.validateWebsite}
                    style={{ width: '100%' }}
                    name="website"
                    onChange={this.handleChangeInput}
                    value={website || ''}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-5 pr0">
            <div className="right-side-subheading">COMPANY LOGO</div>
            <div className="user-img-box lawyer-img-width">
              <input type="file" onChange={this.handleChangeFile} />
              <Avatar
                variant='square'
                style={{ width: '180px', height: '200px' }}
                src={imageUrl}>
                <Business style={{ width: '70%', height: '70%' }}/>
              </Avatar>
              <div class="middle">
                <div class="text">
                  <div className="upload-icon">
                    <i className="fa fa-upload"></i>
                  </div>
                  <div>Upload Profile Photo</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="float-right">
              <Button
                text="Save Changes"
                type="button"
                onClick={this.submitFirmProfile}
                buttonType={TYPES.Generic}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, organization }) => ({ auth, ...organization });
export default connect(mapStateToProps, actions)(FirmContactInfo);
