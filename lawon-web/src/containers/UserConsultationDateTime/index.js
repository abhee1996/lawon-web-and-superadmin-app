import React, { Component } from 'react';
import moment from 'moment';
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { Backdrop, CircularProgress, createMuiTheme, ThemeProvider, Button } from '@material-ui/core';

import * as actions from '../../actions/user/userConsultation';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 11
  },
});

class UserConsultationDateTime extends Component {
  state = {
    selectedDate: moment(),
    selectedTime: ''
  }

  componentDidMount() {
    const { selectedDate } = this.state;
    this.handleChangeDate(selectedDate);
  }

  handleChangeDate = (date) => {
    const { getFreeInterval, match } = this.props;
    const { params } = match || {};
    const { lawyerId } = params || {};

    this.setState({ selectedDate: date });

    getFreeInterval({
      lawyerId,
      date: date.format('DD-MM-YYYY')
    });
  }

  handleNext = () => {
    const { history, match } = this.props;
    const { params } = match || {};
    const { lawyerId, categoryId, subCategoryId } = params || {};

    const { selectedDate, selectedTime } = this.state;
    if (!selectedTime) return;

    history.push(`/main/user/consultation/${categoryId}/${subCategoryId}/lawyers/${lawyerId}/datetime/${selectedDate.format('DD-MM-YYYY')}/${selectedTime}/details`);
  }

  render() {
    const { bookConsultation } = this.props;
    const { freeIntervals, loading } = bookConsultation || {};
    const { selectedDate, selectedTime } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <div className='user-main-content-consultation'>
          <div className='container'>
            <div className='add-details-box'>
              <h2>Date/Time</h2>
              <div>Select a date and time that suits you. Your free consultation will last up to 15 minutes</div>
              <div className='row find-location'>
                <div className='label-add-details'>When are you available for a consultation?</div>
                <div className='time-slider'>
                  <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                    <DatePicker
                      disableToolbar
                      autoOk={true}
                      format="LL"
                      minDate={moment()}
                      maxDate={moment().add(7, 'days')}
                      label="Select Date"
                      value={selectedDate}
                      onChange={this.handleChangeDate}
                    />
                  </MuiPickersUtilsProvider>
                </div>

                <div className='booking-slot-box text-center'>
                  <div className='right-side-dark-para'>{selectedDate.format('LL')}</div>
                  <div className='gray-text'>Select a time for your free 15 minute consultation</div>
                  <div className='shift-slots-time'>
                    {
                      freeIntervals.map(((interval) =>
                        <Button
                          key={interval}
                          variant={selectedTime === interval ? 'contained' : 'outlined'}
                          style={{ margin: '5px' }}
                          disableRipple
                          color={selectedTime === interval ? 'primary' : 'default'}
                          onClick={() => this.setState({ selectedTime: interval })}>
                          {interval}
                        </Button>
                      ))
                    }
                    {(!freeIntervals || !freeIntervals.length) && <Alert style={{ fontSize: "16px", marginTop: '20px', textAlign: 'center' }} severity="error">This lawyer is not available on {selectedDate.format('LL')}. Please select another Day</Alert>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bottom-blacknav'>
            <div className='text-center'>
              <span>Category <i className='fa fa-chevron-right'></i></span>
              <span> Location  <i className='fa fa-chevron-right'></i> </span>
              <span className='active-yellow'> Date/Time <i className='fa fa-chevron-right'></i></span>
              <span> Lawyer <i className='fa fa-chevron-right'></i></span>
              <span> Details <i className='fa fa-chevron-right'></i></span>
              <span> Summary <i className='fa fa-chevron-right'></i></span>
              <span> Confirmation <i className='fa fa-chevron-right'></i></span>
              <span onClick={this.handleNext} className='float-right active-yellow'>
                NEXT <i className='fa fa-chevron-right'></i> </span>
            </div>
          </div>
          <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userConsultation } = user || {};
  return { ...userConsultation };
}

export default connect(mapStateToProps, actions)(UserConsultationDateTime);