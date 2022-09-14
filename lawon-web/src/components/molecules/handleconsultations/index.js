import React from 'react';
import { DialogContent, Dialog } from '@material-ui/core';
import moment from 'moment';
import { findKey } from 'lodash';
import { Today, Call, BusinessCenter } from '@material-ui/icons';

import { Input } from '../../atoms/InputField';
import { Button, TYPES } from '../../atoms/YellowButton';
import { TextArea } from '../../atoms/textarea';
import ConsultationNotes from './ConsultationNotes';
import Details from './Details';
import Attachments from './Attachments';

const allStatus = ['Active', 'Closed', 'Canceled', 'Active-Rescheduled'];
const channelType = ['Phnoe Call', 'Video Call'];


class HandleCosnultations extends React.Component {

  constructor() {
    super();
    this.state = {
      buttonId: 1,
      slide: 0,
      isShowtext: 1,
      dialogOpen: false,
      dialogQuoteDesOpen: false,
      quotation: {
        legalFee: 0,
        legalFeeDescription: '',
        estimatedDisbursements: 0,
        estimatedDisbursementsDescription: '',
        other: 0,
        otherDescription: '',
        vatTax: 20
      }
    }
    this.setButton = this.setButton.bind(this);
    this.setSlide = this.setSlide.bind(this);
  }

  onchange = ({ target: { name, value } }) => {
    this.setState({
      quotation: {
        ...this.state.quotation,
        [name]: value
      }
    });
  }

  setButton(id) {
    this.setState({ buttonId: id });
  }
  setSlide(idslide, isShowtext) {
    this.setState({ slide: idslide, isShowtext: isShowtext });
  }

  handleSubmitQuotation = (id) => {
    const { consultationProps: { saveQuotation } } = this.props;
    saveQuotation({
      ...this.state.quotation,
      ConsultationId: id
    });
  }

  openPopupConsult = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false,
      dialogQuoteDesOpen: false
    });
  };

  handleChangeInput = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  openPopupQuoteDescription(descriptionField) {
    this.setState({
      dialogQuoteDesOpen: true,
      quoteName: descriptionField,
    });
  }


  render() {
    const { consultationDetails: consultation, onCall, onCallJoin, showCallView } = this.props;
    const { name, startTime, channel, status, token, sessionId, User } = consultation || {};
    const start = moment(startTime).startOf('minute');
    const end = moment(startTime).add(15, 'minutes').endOf('minutes');
    const now = moment();

    const { firstName, lastName } = User || {};

    return (
      <div>
        <div className='col-sm-12 no-padding top-consult-section'>
          <div className='col-sm-8 pl0'>
            <div className='right-side-heading-top'>
              Consultation with {firstName} {lastName}
            </div>
            <div class="right-side-subheading">
              <Today style={{ width: '25px', height: '25px', marginRight: '10px' }} />
              {moment(startTime).format('DD MMM YYYY, HH:mm')}
            </div>
            <div class="right-side-light-text-consultation">
              <Call style={{ width: '25px', height: '25px', marginRight: '10px' }} />
              {channelType[channel - 1]}
            </div>
            <div class="right-side-light-text-consultation">
              <BusinessCenter style={{ width: '25px', height: '25px', marginRight: '10px' }} />
              Status: {allStatus[status - 1]}</div>
          </div>
          <div className='col-sm-4 pr0'>
            <div class='drawer-btn-top consult-btn'>
              {
                (now >= start && now <= end)
                && (
                  <React.Fragment>
                    {(!token || !sessionId)
                      && (
                        <Button
                          disabled={showCallView}
                          text='Call'
                          type='button'
                          onClick={onCall}
                          buttonType={TYPES.TopDashbord}
                        />
                      )}
                    {(token && sessionId)
                      && (
                        <Button
                          disabled={showCallView}
                          text='Join Call'
                          type='button'
                          onClick={() => onCallJoin({ sessionId, token })}
                          buttonType={TYPES.TopDashbord}
                        />
                      )}
                  </React.Fragment>
                )
              }
            </div>
          </div>
        </div>


        <div className='col-sm-12 no-padding'>
          <div className='filter-lawyer-prof'>
            <span className='active-filter' onClick={() => this.setButton(1)}>DETAILS</span>
            <span onClick={() => this.setButton(2)}>ATTACHMENT</span>
            <span onClick={() => this.setButton(4)}>NOTES</span>
          </div>

          {this.state.buttonId === 1 && <Details {...this.props}/>}
          {this.state.buttonId === 2 && <Attachments props={{ ...consultation }} />}
          {this.state.buttonId === 4 && <ConsultationNotes {...this.props} {...consultation} />}

        </div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.dialogOpen}>

          <DialogContent>
            <div className='dialog-head'>
              Lawyer Summary
          </div>
            <div className='right-side-subheading'>DESCRIPTION</div>
            <div class="right-side-light-para-cases">
              Holisticly initiate 2.0
              experiences with inexpensive total linkage. Conveniently fabricate
              world-class products without interactive leadership skills. Energistically
              supply out-of-the-box channels via competitive data. Interactively
              envisioneer client-focused portals and frictionless results. Interactively reconceptualize
              client-based paradigms
              for cross-media information.
            </div>
            <div className='right-side-subheading'>Add your summary notes</div>
            <div class="right-side-light-para-cases">
              Type here your summary after consultation. All what you type here will be sent to user.
            </div>
            <form>
              <div class="form-group pt-10">
                <TextArea type={'text'}
                  name={''}
                  value={() => { }}
                  placeholder={'Write a note'}
                  handleChange={() => { }}
                  id={''}
                />
              </div>

            </form>
            <div className='provide-a-quote'>
              {this.state.isShowtext === 1 && <div class="right-side-bold-yellow" onClick={() => this.setSlide(1, 0)}>PROVIDE A QUOTE</div>}
              {this.state.slide === 1 && <div className='quote-slide-down'>
                <div class="right-side-subheading">PROVIDE A QUOTE
                  <div class="right-side-bold-yellow float-right" onClick={() => this.setSlide(0, 1)}>CLOSE</div>
                </div>
                <div class="right-side-light-para">Choose Fixed or Estimated fee to provide the most transparency to the user</div>
                <div className='provide-a-quote-box'>
                  <div className='filter-lawyer-prof'>
                    <span className='active-filter'>FIXED FEE</span>
                    <span>ESTIMATED FEE</span>
                  </div>
                  <div className='row consult-fee-row form-area'>
                    <div className='col-sm-4 quote-padding'>
                      <div class="right-side-light-para">Legal Fee</div>
                    </div>
                    <div className='col-sm-2'>
                      <Input type={'text'}
                        name={''}
                        value={() => { }}
                        placeholder={'£'}
                        handleChange={() => { }}
                        id={''}
                      />
                    </div>
                    <div className='col-sm-2 quote-padding'>
                      <img src={require('../../../assets/img/plus-btn.png')} />
                    </div>
                  </div>
                  <div className='row consult-fee-row form-area'>
                    <div className='col-sm-4 quote-padding'>
                      <div class="right-side-light-para">VAT @ 20%</div>
                    </div>
                    <div className='col-sm-2'>
                      <Input type={'text'}
                        name={''}
                        value={() => { }}
                        placeholder={'£'}
                        handleChange={() => { }}
                        id={''}
                      />
                    </div>
                    <div className='col-sm-2 quote-padding'></div>
                  </div>

                  <div className='row consult-fee-row form-area'>
                    <div className='col-sm-4 quote-padding'>
                      <div class="right-side-light-para">Estimated Disbursements</div>
                    </div>
                    <div className='col-sm-2'>
                      <Input type={'text'}
                        name={''}
                        value={() => { }}
                        placeholder={'£'}
                        handleChange={() => { }}
                        id={''}
                      />
                    </div>
                    <div className='col-sm-2 quote-padding'>
                      <img src={require('../../../assets/img/plus-btn.png')} />
                    </div>
                  </div>

                  <div className='row consult-fee-row form-area'>
                    <div className='col-sm-4 quote-padding'>
                      <div class="right-side-light-para">Other</div>
                    </div>
                    <div className='col-sm-2'>
                      <Input type={'text'}
                        name={''}
                        value={() => { }}
                        placeholder={'£'}
                        handleChange={() => { }}
                        id={''}
                      />
                    </div>
                    <div className='col-sm-2 quote-padding'>
                      <img src={require('../../../assets/img/plus-btn.png')} />
                    </div>
                  </div>
                  <div className='row consult-fee-row form-area'>
                    <div className='col-sm-4 quote-padding'>
                      <div class="right-side-dark-para">TOTAL</div>
                    </div>
                    <div className='col-sm-2'>
                      <Input type={'text'}
                        name={''}
                        value={() => { }}
                        placeholder={'£'}
                        handleChange={() => { }}
                        id={''}
                      />
                    </div>
                    <div className='col-sm-2 quote-padding'>
                    </div>
                  </div>
                </div>

                <div className='col-md-12 no-padding'>
                  <div className='step-section-btns'>
                    <Button
                      text='Save'
                      type='button'
                      onClick={() => { }}
                      buttonType={TYPES.Generic}
                    />
                  </div>
                </div>
              </div>}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.dialogQuoteDesOpen}>
          <DialogContent>
            <div className='notification-dialog'>
              <div>
                <span>{this.state.quoteName}</span>
                <Input type={'text'}
                  name={this.state.quoteName}
                  placeholder={'Enter description'}
                  handleChange={this.handleChangeInput}
                  id={''}
                />
              </div>
              <Button
                text='Save'
                type='button'
                onClick={() => this.handleClose()}
                buttonType={TYPES.Generic}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default HandleCosnultations;