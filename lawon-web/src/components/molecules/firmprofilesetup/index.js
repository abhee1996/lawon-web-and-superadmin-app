import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, TextField, createMuiTheme, MuiThemeProvider, Button } from "@material-ui/core";

import * as actions from "../../../actions/organization";
import { POSTCODE_REGEX, URL_REGEX } from "../../../common/constants";

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
class FirmProfileSetup extends Component {
  state = {
    address1: "",
    address2: "",
    town: "",
    postcode: null,
    website: "",
    sraID: "",
    companyName: "",
    message: "",
    validateSchema: {
      companyName: '',
      address1: '',
      postcode: ''
    }
  };

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  validateCompanyName = ({ target: { value }}) => {
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

  validateAddress1 = ({ target: { value }}) => {
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

  submitFirmProfile = () => {
    const { organizationFirmProfileSetup, getLatLngByPostcodeForFirm, history } = this.props;
    const { companyName, address1, address2, town, postcode, website } = this.state;

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
        companyName,
        address1,
        address2,
        town,
        postcode,
        website,
        latlng: `${lat},${lng}`,
      })
        .then(({ errorMessage }) => {
          if (errorMessage) {
            return this.setState({
              message: { description: errorMessage }
            });
          }
          history.push(`/main/peopleprofilesetup`);
        });
    });
  };



  render() {
    const { companyName, address1, address2, town, postcode, website, sraID, message, validateSchema } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div class="container">
          <LoadingBar
            onRef={(ref) => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />
          <div className="row text-center step-img">
            <img src={require("../../../assets/img/step-2.png")} />
          </div>
          <div class="row">
            <div class="col-md-12">
              <h1 class="text-center">Firm's profile</h1>
              <div class="form-box firm-profile">
                <div class="row">
                  <p class="form-para">
                    Hi John. Since you are going to be the admin of your firm's
                    LawOn account, we'd like you to complete some information
                    about your firm. We strive to promote the legal profession and
                    ensure our users get the best service, so we'll just need to
                    verify your firm before you can start giving legal advice. We
                    hope this is okay.
                  </p>

                  <div class="form-area form-area-login">
                    <form>
                      <div className="col-sm-6">
                        <div class="form-group">
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
                        <div class="form-group">
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
                        <div class="form-group">
                          <TextField
                            label='Second line of address'
                            style={{ width: '100%' }}
                            name="address2"
                            onChange={this.handleChangeInput}
                            value={address2 || ''}
                          />
                        </div>
                        <div class="form-group">
                          <TextField
                            label='Town'
                            style={{ width: '100%' }}
                            name="town"
                            onChange={this.handleChangeInput}
                            value={town || ''}
                          />
                        </div>

                        <div class="form-group">
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
                      </div>
                      <div className="col-sm-6">
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

                        <div class="form-group">
                          <TextField
                            label='SRA ID'
                            style={{ width: '100%' }}
                            name="sraID"
                            onChange={this.handleChangeInput}
                            value={sraID || ''}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="quality-checks">
                  <p class="form-para">
                    Thanks. We'll do some quick checks and confirm your account as
                    soon as possible.
                  <br />
                    While you wait, you can begin exploring some of LawOn's
                    features.
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
                            onClick={this.handleError}>
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }>
                        {message.description || "Something Went Wrong"}
                      </Alert>
                    )}
                </div>

                <div className="col-md-12 no-padding">
                  <div className="step-section-btns">
                    <Link to="/main/adminprofilesetup">
                      <Button
                        color='primary'
                        variant='outlined'>
                        Cancel
                      </Button>
                    </Link>

                    <Button
                      style={{ marginLeft: '10px' }}
                      color='primary'
                      variant='outlined'
                      onClick={this.submitFirmProfile}>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ organization }) => ({ ...organization });

export default connect(mapStateToProps, actions)(FirmProfileSetup);
