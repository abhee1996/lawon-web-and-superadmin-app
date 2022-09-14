import React, { Component } from "react";
import { Link } from "react-router-dom";
import simpleReactValidator from "simple-react-validator";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, Snackbar, TextField, createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import { Button, TYPES } from "../../../components/atoms/YellowButton";
import * as actions from "../../../actions/organization";

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

class AdminProfileSetup extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.validator = new simpleReactValidator();
    this.state = {
      firstName: "",
      secondName: "",
      message: "",
      validateSchema: {
        firstName: '',
        lastName: '',
      }
    };
  }

  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleAdminProfile = () => {
    const { firstName, secondName } = this.state;
    const { organizationAdminProfileSetup, history } = this.props;

      organizationAdminProfileSetup({
        firstName,
        secondName,
      }).then(({ errorMessage }) => {
        if (errorMessage) {
          return this.setState({
            message: { description: errorMessage }
          });
        }
  
        history.push(`/main/firmprofilesetup`)
      });
  };

  handleError = () => {
    this.setState({ errorStatus: false });
  };
  handleCloseSnackbar = () => {
    this.setState({ successStatus: false });
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

  render() {
    const { message, validateSchema } = this.state;
    const { lawyer } = this.props;
    const { firstName, lastName } = lawyer;
    const isInvalid = Object.values(validateSchema).some(x => x);

    return (
      <MuiThemeProvider theme={theme}>
        <div className="container">
          <LoadingBar
            onRef={(ref) => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />
          <div className="row text-center step-img">
            <img src={require("../../../assets/img/step-1.png")} />
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">Admin profile</h1>
              <div className="form-box admin-profile">
                <div className="row">
                  <p className="text-center form-para">
                    What is your name? We'd like to get to know you
                  </p>

                  <div className="form-area form-area-login">
                    <form>
                      <div className="form-group">
                        <TextField
                          error={validateSchema.firstName}
                          helperText={validateSchema.firstName}
                          onBlur={this.validateFirstName}
                          style={{ width: '100%' }}
                          name='firstName'
                          label='First Name'
                          defaultValue={firstName}
                          onChange={this.handleChangeInput}
                        />
                      </div>
                      <div className="form-group">
                        <TextField
                          error={validateSchema.lastName}
                          helperText={validateSchema.lastName}
                          onBlur={this.validateLastName}
                          style={{ width: '100%' }}
                          defaultValue={lastName}
                          name='secondName'
                          label='Second Name'
                          onChange={this.handleChangeInput}
                        />
                      </div>

                      <div className="col-md-12 no-padding">
                        <div className="step-section-btns">
                          <Link to="/main/welcometolawon">
                            <Button
                              text="Cancel"
                              type="button"
                              onClick={() => { }}
                              buttonType={TYPES.Generic}
                            />
                          </Link>

                          <Button
                            text="Next"
                            disabled={isInvalid}
                            type="button"
                            onClick={() => this.handleAdminProfile()}
                            buttonType={TYPES.Generic}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className='error-display'>
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
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });

export default connect(mapStateToProps, actions)(AdminProfileSetup);
