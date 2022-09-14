import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { connect } from 'react-redux'
import LoadingBar from 'react-top-loading-bar'
import * as actions from '../../../actions/accountSettings';

class NotificationSettings extends Component {
  state = {
    confirmationNotification: true,
    responseNotification: true,
    reminders: true,
    updates: true,
    surveys: true,
    articles: true
  }

  handleChangeInput = ({ target: { name, checked } }) => {
    this.setState({ [name]: checked });
  }

  componentDidMount() {
    const { getLawyerNotificationPreferences } = this.props;
    getLawyerNotificationPreferences().then(() => {
      const { lawyerNotificationPreferences } = this.props;
      this.setState({ ...lawyerNotificationPreferences });
    })
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  lawyerNotificationPrefSubmit() {
    const { saveLawyerNotificationPreferences, getLawyerNotificationPreferences } = this.props;
    const { confirmationNotification, responseNotification, reminders, updates, surveys, articles, id } = this.state;

    saveLawyerNotificationPreferences({
      confirmationNotification,
      responseNotification,
      reminders,
      updates,
      surveys,
      articles,
      id
    })
      .then(() => {
        getLawyerNotificationPreferences();
      });
  }


  render() {
    const { confirmationNotification, responseNotification, reminders, updates, surveys, articles } = this.state;
    return (
      <div>
        <LoadingBar
          onRef={ref => (this.LoadingBar = ref)}
          height={6}
          color="#feb41c"
        />
        <div className='right-side-heading'>
          Notifications
        </div>
        <div className='col-sm-12 no-padding'>
          <div className='right-side-light-text'>
            Control what emails you are receiving from LawOn.
            </div>
          <div className='col-sm-12 no-padding notification-row'>
            <div className='col-sm-10 pl0'>
              <div className='right-side-dark-para'>
                Confirmation Notifications
              </div>
              <div className='right-side-light-para'>
                All emails confirming your actions (e.g. when you submit your question)
              </div>
            </div>
            <div className='col-sm-2'>
              <Switch
                onChange={this.handleChangeInput}
                value='confirmationNotification'
                color='primary'
                name='confirmationNotification'
                checked={confirmationNotification}
              />
            </div>
          </div>

          <div className='col-sm-12 no-padding notification-row'>
            <div className='col-sm-10 pl0'>
              <div className='right-side-dark-para'>
                Response Notifications
                </div>
              <div className='right-side-light-para'>
                All emails notifying you about new messages from users
                </div>
            </div>
            <div className='col-sm-2'>
              <Switch
                onChange={this.handleChangeInput}
                value="responseNotification"
                color='primary'
                name='responseNotification'
                checked={responseNotification}
              />
            </div>
          </div>

          <div className='col-sm-12 no-padding notification-row'>
            <div className='col-sm-10 pl0'>
              <div className='right-side-dark-para'>
                Reminders
              </div>
              <div className='right-side-light-para'>
                Polite emails to remind you about a consultation you have booked, or messages you haven't responded to
              </div>
            </div>
            <div className='col-sm-2'>
              <Switch
                onChange={this.handleChangeInput}
                value="checkedA"
                color='primary'
                name='reminders'
                checked={reminders}
              />
            </div>
          </div>

          <div className='col-sm-12 no-padding notification-row'>
            <div className='col-sm-10 pl0'>
              <div className='right-side-dark-para'>
                Updates
              </div>
              <div className='right-side-light-para'>
                News about the app and updates
              </div>
            </div>
            <div className='col-sm-2'>
              <Switch
                onChange={this.handleChangeInput}
                value="checkedA"
                color='primary'
                name='updates'
                checked={updates}
              />
            </div>
          </div>


          <div className='col-sm-12 no-padding notification-row'>
            <div className='col-sm-10 pl0'>
              <div className='right-side-dark-para'>
                Surveys
              </div>
              <div className='right-side-light-para'>
                Participation in LawOn research surveys
              </div>
            </div>
            <div className='col-sm-2'>
              <Switch
                onChange={this.handleChangeInput}
                value="checkedA"
                color='primary'
                name='surveys'
                checked={surveys}
              />
            </div>
          </div>

          <div className='col-sm-12 no-padding notification-row'>
            <div className='col-sm-10 pl0'>
              <div className='right-side-dark-para'>
                Articles
                </div>
              <div className='right-side-light-para'>
                News from the legal sector
                </div>
            </div>
            <div className='col-sm-2'>
              <Switch
                onChange={this.handleChangeInput}
                value="checkedA"
                color='primary'
                name='articles'
                checked={articles}
              />
            </div>
          </div>

          <div className='float-right clearfix pt40'>
            <Button
              text='Save Changes'
              type='button'
              onClick={() => this.lawyerNotificationPrefSubmit()}
              buttonType={TYPES.Generic}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ accountSettings }) => ({ ...accountSettings });
export default connect(mapStateToProps, actions)(NotificationSettings);