import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';

import { Button, TYPES } from "../../components/atoms/YellowButton";
import * as actions from '../../actions/user/userConsultation';

class UserConsultationConfirm extends Component {
  componentDidMount() {
    const { match, getConsultation, location } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    const { search } = location || {};
    const { message, error } = queryString.parse(search);

    const googleAuthPopup = window.opener;
    if (googleAuthPopup && (message || error)) {
      googleAuthPopup.postMessage({ message, error }, window.location.origin);
    }

    getConsultation({ id });
  }

  handleEvent = ({ e, title, url }) => {
    e.preventDefault();
    const { match } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    const googleAuthPopup = window.open(`${window.baseUrl}${url}?consultationId=${id}`, '_blank', 'width=446,height=630,left=200,top=100');
    googleAuthPopup.document.title = title;

    window.addEventListener('message', ({ data }) => {
      const { message, error } = data || {};
      googleAuthPopup.close();

      if (error) {
        
      }

      if (message) {
      }
    },
    false);
  }

  render() {
    const { bookConsultation } = this.props;
    const { consultation } = bookConsultation || {};
    const { Lawyer, startTime } = consultation || {};
    const { firstName, lastName } = Lawyer || {};

    return (
      <div className='user-main-content-consultation'>
        <div className='container'>
          <div className='add-details-box confirm-instruct'>

            <div className='row add-details-btm-sec'>
              <h2 class="text-center">
                Your consultation with {firstName} {lastName} has been booked on {moment(startTime).format('LL')} at {moment(startTime).format('hh:mm A')}
              </h2>

              <div className='add-calendar-btn text-center'>
                <Button
                  onClick={(e) => this.handleEvent({
                    e,
                    title: 'Google',
                    url: '/calendars/auth/google'
                  })}
                  style={{ marginTop: '40px' }}
                  text="Add to Google Calendar"
                  type="button"
                  buttonType={TYPES.Generic}
                />
                <Button
                  onClick={(e) => this.handleEvent({
                    e,
                    title: 'Outlook',
                    url: '/calendars/auth/outlook'
                  })}
                  style={{ marginTop: '10px' }}
                  text="Add to Outlook Calendar"
                  type="button"
                  buttonType={TYPES.Generic}
                />
              </div>

              <Link to='/main/userdashboardmain'>
                <div className='text-center right-side-bold-yellow pt40'>GO BACK TO DASHBOARD</div>
              </Link>
              
              <div className='download-app-sec text-center'>
                <img src={require('../../assets/img/download-app.png')} />
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProp = ({ user }) => {
  const { userConsultation } = user || {};
  return { ...userConsultation };
}

export default connect(mapStateToProp, actions)(UserConsultationConfirm);