import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, TYPES } from "../../atoms/YellowButton";

class ErrorPopup extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dialogOpen: false,
      message: "",
      error: true
    };
  }

  openModal = () => {
    this.setState({ dialogOpen: true });
  };

  closeModal = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { message, error } = this.state;
    return (
      <Dialog
        onClose={this.closeModal}
        aria-labelledby="customized-dialog-title"
        open={this.state.dialogOpen}
      >
        <DialogContent>
          <div className="notification-dialog">
            <h3 className="text-center pt-4">
              {message || "Something Went Wrong"}
            </h3>
            <div className="text-center">
              {error ? (
                <i className="fa fa-times times-circle-icon"></i>
              ) : (
                <i className="fa fa-check-circle circle-icon"></i>
              )}
            </div>
            <Button
              text="Close"
              type="button"
              onClick={() => this.closeModal()}
              buttonType={TYPES.Generic}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default ErrorPopup;
