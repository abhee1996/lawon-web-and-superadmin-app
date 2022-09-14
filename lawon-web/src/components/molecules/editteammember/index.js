import React, { Component } from "react";
import PropTypes from "prop-types";
import LoadingBar from "react-top-loading-bar";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";

import { Input } from "../../atoms/InputField";
import MakeActiveModal from "./MakeActiveModal";

const styles = () => ({
  root: { width: 200 },
  paper: {},
  listItemText: { fontSize: "24px" },
});

class EditTeamMember extends Component {
  componentWillReceiveProps(nextProps) {
    const { manageLawers } = nextProps;
    const { loading } = manageLawers || {};
    if (loading) {
      this.LoadingBar.continuousStart();
    }
    if (!loading) {
      this.LoadingBar.complete();
    }
  }

  state = {
    open: false,
    isModalOpen: false,
    buttonId: this.props.buttonId,
  };

  setButton = (id) => {
    this.setState({ buttonId: id });

    if (id !== 3) {
      this.setState({
        isModalOpen: id,
      });
    }
  };

  handleToggle = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  handleClose = () => {
    this.setState({
      open: false,
      isModalOpen: false,
    });
  };

  editLawyer = () => {
    const { editLawyer, selectedLawyer } = this.props;
    editLawyer(selectedLawyer);
  };

  handleMakeActive = ({ id }) => {
    const { makeLawyerActive, onDrawerClose } = this.props;

    makeLawyerActive({ isActive: true, lawyerId: id }).then(() =>
      onDrawerClose()
    );
  };

  render() {
    const { selectedLawyer, handleChangeInput, manageLawers } = this.props;
    const {
      firstName,
      lastName,
      jobTitle,
      email,
      phoneNumber,
      id: selectedId,
      imageUrl,
      isActive,
      lawyerType,
    } = selectedLawyer || {};

    const { lawyers = [], loading } = manageLawers || {};
    const { firstName: fName, lastName: lName, id } =
      lawyers.find(({ id }) => id === selectedId) || {};
    const { open } = this.state;

    return (
      <div>
        <LoadingBar
          onRef={(ref) => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <div className="right-side-heading">
          {fName} {lName}
          <span className="rightsidenav-option-text">
            <Button
              buttonRef={(node) => {
                this.anchorEl = node;
              }}
              aria-owns={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}
            >
              OPTIONS
            </Button>
          </span>
        </div>

        <Popper
          style={{ zIndex: "99999" }}
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper style={{ width: 150 }}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem style={{ fontSize: 15 }}>
                      {isActive ? (
                        <span onClick={() => this.setButton(1)}>
                          Make InActive
                        </span>
                      ) : (
                        <span onClick={() => this.handleMakeActive({ id })}>
                          Make Active
                        </span>
                      )}
                    </MenuItem>

                    {lawyerType === 1 ? (
                      <span></span>
                    ) : (
                      <MenuItem
                        style={{ fontSize: 15 }}
                        onClick={() => this.setButton(2)}
                      >
                        Delete
                      </MenuItem>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <div className="edit-user-info col-md-12 pl0">
          <div className="col-sm-6 pl0">
            <div className="right-side-subheading">EDIT PROFILE</div>
            <div className="form-area">
              <form>
                <div className="form-group">
                  <Input
                    type="text"
                    value={firstName}
                    name="firstName"
                    placeholder="First name"
                    handleChange={handleChangeInput}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type="text"
                    value={lastName}
                    name="lastName"
                    placeholder="Last name"
                    handleChange={handleChangeInput}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type="text"
                    name={"jobTitle"}
                    value={jobTitle}
                    placeholder="Job Title"
                    handleChange={handleChangeInput}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type={"text"}
                    name="phoneNumber"
                    value={phoneNumber}
                    placeholder={"Phone Number"}
                    handleChange={handleChangeInput}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type={"text"}
                    value={email}
                    name="email"
                    placeholder="Email"
                    handleChange={handleChangeInput}
                  />
                </div>
              </form>
            </div>
            <div className="pt40">
              <button
                disabled={loading}
                type="button"
                onClick={() => this.editLawyer(selectedId)}
                className="btn btn-generic"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-5 pr0">
            <div className="right-side-subheading">PROFILE PHOTO</div>
            {imageUrl ? (
              <div className="img-preview-box">
                <img src={imageUrl} alt={fName} />
              </div>
            ) : (
              <div className="img-uploadbox">
                <div className="img-dark-text">
                  Click to upload or drag and drop the profile photo
                </div>
                <div className="img-light-text">
                  (JPEG, or PNG file, max size 2MB)
                </div>
              </div>
            )}
          </div>
        </div>

        <MakeActiveModal
          {...this.state}
          {...this.props}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

EditTeamMember.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {
    withTheme: true,
  })
)(EditTeamMember);
