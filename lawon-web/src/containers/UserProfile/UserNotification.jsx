import React, { Component } from "react";
import { Switch, Snackbar, Button } from "@material-ui/core";
import { connect } from "react-redux";

import * as actions from "../../actions/user/userProfile";

class UserNotification extends Component {
  state = {
    message: ''
  };

  componentDidMount() {
    const { getProfileNotification } = this.props;
    getProfileNotification();
  }

  notificationOnChange = ({ target: { name, checked } }) => {
    const { userProfileNotificationOnChange } = this.props;
    userProfileNotificationOnChange({ key: name, value: checked });
  };

  handleUpdateNotification = () => {
    const { updateNotifications } = this.props;
    updateNotifications().then(({ errorMessage }) => {
      if (errorMessage) {
        return;
      }

      this.setState({ message: 'Notification Preferences has been updated successfully.'})
    });
  }

  render() {
    const { message } = this.state;
    const { preferences } = this.props;
    const { confirmationNotification, responseNotification, reminders, updates, surveys, articles } = preferences || {};
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
        <div className="col-md-12">
          <div className="right-side-subheading">Notifications</div>
          <div className="right-side-light-text">
            Control what emails you are receiving from LawOn.
          </div>
          <div className="col-sm-12 no-padding notification-row">
            <div className="col-sm-10 pl0">
              <div className="right-side-dark-para">
                Confirmation Notifications
              </div>
              <div className="right-side-light-para">
                All emails confirming your actions (e.g. when you submit your
                question)
              </div>
            </div>
            <div className="col-sm-2">
              <Switch
                color="primary"
                name="confirmationNotification"
                checked={confirmationNotification || false}
                onChange={this.notificationOnChange}
              />
            </div>
          </div>

          <div className="col-sm-12 no-padding notification-row">
            <div className="col-sm-10 pl0">
              <div className="right-side-dark-para">Response Notifications</div>
              <div className="right-side-light-para">
                All emails notifying you about new messages from users
              </div>
            </div>
            <div className="col-sm-2">
              <Switch
                color="primary"
                name="responseNotification"
                checked={responseNotification || false}
                onChange={this.notificationOnChange}
              />
            </div>
          </div>

          <div className="col-sm-12 no-padding notification-row">
            <div className="col-sm-10 pl0">
              <div className="right-side-dark-para">Reminders</div>
              <div className="right-side-light-para">
                Polite emails to remind you about a consultation you have
                booked, or messages you haven't responded to
              </div>
            </div>
            <div className="col-sm-2">
              <Switch
                color="primary"
                name="reminders"
                checked={reminders || false}
                onChange={this.notificationOnChange}
              />
            </div>
          </div>

          <div className="col-sm-12 no-padding notification-row">
            <div className="col-sm-10 pl0">
              <div className="right-side-dark-para">Updates</div>
              <div className="right-side-light-para">
                News about the app and updates
              </div>
            </div>
            <div className="col-sm-2">
              <Switch
                color="primary"
                name="updates"
                checked={updates || false}
                onChange={this.notificationOnChange}
              />
            </div>
          </div>

          <div className="col-sm-12 no-padding notification-row">
            <div className="col-sm-10 pl0">
              <div className="right-side-dark-para">Surveys</div>
              <div className="right-side-light-para">
                Participation in LawOn research surveys
              </div>
            </div>
            <div className="col-sm-2">
              <Switch
                color="primary"
                name="surveys"
                checked={surveys || false}
                onChange={this.notificationOnChange}
              />
            </div>
          </div>

          <div className="col-sm-12 no-padding notification-row">
            <div className="col-sm-10 pl0">
              <div className="right-side-dark-para">Articles</div>
              <div className="right-side-light-para">
                News from the legal sector
              </div>
            </div>
            <div className="col-sm-2">
              <Switch
                color="primary"
                name="articles"
                checked={articles || false}
                onChange={this.notificationOnChange}
              />
            </div>
          </div>
        </div>
        <div className="user-profile-btn">
          <Button
            onClick={this.handleUpdateNotification}
            variant='outlined'
            color='primary'>
            Update
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userProfile } = user || {};
  return { ...userProfile };
}

export default connect(mapStateToProps, actions)(UserNotification);
