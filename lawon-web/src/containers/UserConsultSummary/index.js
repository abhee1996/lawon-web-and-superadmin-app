import React, { Component } from 'react';
import { Dialog, DialogContent, Backdrop, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';
import { round } from 'lodash';

import { Button, TYPES } from '../../components/atoms/YellowButton';
import * as actions from '../../actions/user/userConsultation';

const fn = Intl.NumberFormat();

class UserConsultSummary extends Component {
  componentDidMount () {
    const { match, getSubcategory, getLawyer } = this.props;
    const { params } = match || {};
    const { subCategoryId, lawyerId } = params || {};

    Promise.all([
      getSubcategory({ id: subCategoryId }),
      getLawyer({ lawyerId })
    ]);
  }

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      consulationData: [],
    }
  }

  handleBookConsultation = () => {
    const { newConsultation, match, user, history, bookConsultation } = this.props;
    const { id } = user || {};
    const { bookingData } = bookConsultation || {};

    const { description, callType, email, phone, attachments } = bookingData || {};

    const { params } = match || {};
    const { subCategoryId, lawyerId, date, time, enquiryId } = params || {};
    const startTime = moment(`${date} ${time}`, 'DD-MM-YYYY HH:mm').format('YYYY/MM/DD HH:mm');

    newConsultation({
      UserId: id,
      LawyerId: lawyerId,
      startTime,
      channel: callType,
      mobile: phone,
      email,
      SubCategoryId: subCategoryId,
      detail: description,
      enquiryId,
      file: attachments
    })
      .then(({ consultation }) => {
        if (!consultation) {
          // TODO: handle booking failiure
          return
        }

        const { id: consultationId } = consultation || {};
        history.push(`/main/user/consultation/${consultationId}/confirmation`);
      });
  }

  openPopupCancelConsult = () => {
    this.setState({ dialogOpen: true });
  };
  closePopupCancelConsult = event => {
    this.setState({
      dialogOpen: false
    });
  };

  render() {
    const { bookConsultation, match, location } = this.props;
    const { subcategories, lawyer, loading, bookingData } = bookConsultation || {};

    const { name: subcategoryName, Category } = subcategories[0] || {};
    const { name: categoryName } = Category || {};

    const { firstName, lastName } = lawyer || {};

    const { params } = match || {};
    const { date, time } = params || {};
    const datetime = moment(`${date} ${time}`, 'DD-MM-YYYY HH:mm');

    const { pathname } = location;
    if (!bookingData || !Object.keys(bookingData).length) window.location = `#${pathname.replace('summary', 'details')}`;
    const { description, callType, attachments = [] } = bookingData || {};

    return (
      <div className='user-main-content-consultation'>
        <div className='container'>
          <div className='add-details-box instruct-summary'>
            <h2>Summary</h2>
            <div className='row add-details-btm-sec instruct-summary-rows'>
              <div className='row'>
                <div className='col-md-3 gray-text'>Category:</div>
                <div className='col-md-9'>{categoryName}</div>
              </div>
              <div className='row'>
                <div className='col-md-3 gray-text'>SubCategory:</div>
                <div className='col-md-9'>{subcategoryName}</div>
              </div>
              <div className='row'>
                <div className='col-md-3 gray-text'>Lawyer:</div>
                <div className='col-md-9'>{firstName} {lastName}</div>
              </div>
              <div className='row'>
                <div className='col-md-3 gray-text'>Channel:</div>
                <div className='col-md-9'>{callType === 1 ? 'Video Call' : 'Phone Call'}</div>
              </div>

              <div className='row'>
                <div className='col-md-3 gray-text'>Date & Time</div>
                <div className='col-md-9'>{datetime.format('LL')} at {datetime.format('HH:mm A')}</div>
              </div>

              <div className='row'>
                <div className='col-md-3 gray-text'>Details:</div>
                <div className='col-md-9'>{description}</div>
              </div>

              <div className='row'>
                <div className='col-md-3 gray-text'>Attachment:</div>
                <div className='col-md-9'>
                  {attachments.map(({ name, size }) => {
                    return (
                      <div
                        key={name}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                          borderBottom: '1px solid #ebeff1'
                        }}>
                        <div className="right-side-bold-yellow" style={{ marginLeft: '10px' }}>{name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                          <div>{fn.format(round(size / 1000).toFixed(0))}kb</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className='instruct-summary-btns text-center'>
                <div>
                  <Button
                    text='Book Consultation'
                    type='button'
                    onClick={this.handleBookConsultation}
                    buttonType={TYPES.TopDashbord}
                  />
                </div>
                <div onClick={() => this.openPopupCancelConsult()} className='pointer'>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.dialogOpen}>

          <DialogContent>
            <div className='user-consult-dialog'>
              <div className='dialog-head text-center'>
                Are you sure you want to
               cancel the consultation?
              </div>
            </div>
            <div className='user-profile-btn'>
              <Button
                text='No'
                type='button'
                onClick={() => this.closePopupCancelConsult()}
                buttonType={TYPES.Generic}
              />
              <Button
                text='Yes'
                type='button'
                onClick={() => this.closePopupCancelConsult()}
                buttonType={TYPES.Generic}
              />
            </div>
          </DialogContent>
        </Dialog>
        <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userConsultation, auth } = user || {};
  return {
    ...userConsultation,
    ...auth
  };
}

export default connect(mapStateToProps, actions)(UserConsultSummary);