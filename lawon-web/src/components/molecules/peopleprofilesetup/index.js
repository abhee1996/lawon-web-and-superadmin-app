import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IconButton, TextField, createMuiTheme, MuiThemeProvider, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { Alert} from '@material-ui/lab';
import { Close } from '@material-ui/icons';

import { Button, TYPES } from "../../../components/atoms/YellowButton";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";
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

class PeopleProfileSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      lawyers: [],
      showWarning: false,
      validateSchema: {
        firstName: '',
        lastName: '',
        address1: '',
        postcode: ''
      }
    };
  }

  componentDidMount() {
    const { getColleagues } = this.props;
    getColleagues();
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;

    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  validateFirstName = ({ target: { value }}) => {
    if (!value) {
      this.setState({
        validateSchema: {
          ...this.state.validateSchema,
          firstName: 'Please enter First Name'
        }
      });
    } else {
      this.setState({
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
        validateSchema: {
          ...this.state.validateSchema,
          lastName: 'Please enter Last Name'
        }
      });
    } else {
      this.setState({
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
        validateSchema: {
          ...this.state.validateSchema,
          email: 'Please enter Email Address'
        }
      });
    } else {
      this.setState({
        validateSchema: {
          ...this.state.validateSchema,
          email: ''
        }
      });
    }
  }


  handleChangeInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  navigateToDashboard = () => {
    this.props.history.push({
      pathname: "/main/login",
    });
  }

  inviteLawyer = () => {
    const { organizationInviteLawyers } = this.props;
    const { firstName, lastName, email } = this.state;

    const errors = {};

    if (!firstName) {
      errors.firstName = 'Please enter Fist Name';
    }

    if (!lastName) {
      errors.lastName = 'Please enter Last Name';
    }

    if (!email) {
      errors.email = 'Please enter Email';
    }

    if (errors && Object.keys(errors).length) {
      return this.setState({ validateSchema: { ...errors }});
    }

    organizationInviteLawyers({
      firstName,
      lastName,
      email
    })
      .then(({ errorMessage }) => {
        if (errorMessage) {
          return this.setState({
            message: { description: errorMessage }
          });
        }
        this.componentDidMount();
      })
  };

  render() {
    const { validateSchema, lastName, firstName, email, message } = this.state;
    const { colleagues } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="container">
          <LoadingBar
            onRef={(ref) => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />
          <div className="row text-center step-img">
            <img src={require("../../../assets/img/step-3.png")} />
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">People</h1>
              <div className="form-box people-profile">
                <div className="row">
                  <div
                    onClick={this.navigateToDashboard}
                    className="gray skip-text">
                    Next
                  </div>
                  <p className="form-para">
                    While you wait for verification you can start adding your
                    colleagues to LawOn. You can also skip this step and complete
                    it later from the admin account
                  </p>
                  <div className="form-area form-area-login add-more-user-form-main">
                    <div className="additional-user">First User</div>
                    <form>
                      <div className="form-group">
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
                      <div className="form-group">
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
                      <div className="form-group">
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
                      <div className="form-group">
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
                                  <Close fontSize="inherit" />
                                </IconButton>
                              }>
                              {message.description || "Something Went Wrong"}
                            </Alert>
                          )}
                      </div>
                      <div className="col-md-12 no-padding">
                        <div className="step-section-btns">
                          <Link to="/main/firmprofilesetup">
                            <Button
                              text="Cancel"
                              type="button"
                              onClick={() => { }}
                              buttonType={TYPES.Generic}
                            />
                          </Link>
                          <Button
                            text="Add"
                            type="button"
                            onClick={() => this.inviteLawyer()}
                            buttonType={TYPES.Generic}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">Lawyers to be Registered</h1>
              <div className="form-box people-profile">
                {(colleagues && colleagues.length != 0)
                  && (
                    <List>
                      {colleagues.map(({ id, firstName, lastName, email }) => (
                        <ListItem key={id}>
                          <ListItemAvatar>
                            <Avatar />
                          </ListItemAvatar>
                          <ListItemText primary={`${firstName} ${lastName}`} secondary={email} />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                              <Close />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>

                      ))}
                  </List>
                  )}
              </div>
            </div>
          </div>


        
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ organization }) => {
  return {
    ...organization,
  };
};

export default connect(
  mapStateToProps,
  actions
)(PeopleProfileSetup);
