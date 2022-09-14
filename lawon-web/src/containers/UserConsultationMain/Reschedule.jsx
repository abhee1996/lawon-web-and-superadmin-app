import React, {  useState } from "react";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { Alert } from "@material-ui/lab";
import { Button } from '@material-ui/core';

export default (props) => {

  // PROPS DESTRUCTURING
  const { getFreeInterval, bookConsultation, reschedule, onClose, match, onRescheduled } = props;
  const { consultation, freeIntervals } = bookConsultation || {};
  const { LawyerId } = consultation || {};

  const { params } = match || {};
  const { id } = params || {};

  // REACT HOOKS
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState('');
  
  // CALLBACKS
  const handleChangeDate = (date) => {
    setSelectedDate(date);
    getFreeInterval({
      lawyerId: LawyerId,
      date: date.format('DD-MM-YYYY')
    })
  };

  const handleNext = () => {
    onClose();
    reschedule({
      id,
      date: selectedDate.format('DD-MM-YYYY'),
      time: selectedTime
    })
      .then(({ message }) => {
        if (message) return setError({ message });
        onRescheduled();
      })
  };

  return (
    <div className="drawer-up-doc">
      <div class="right-side-dark-para">Reschedule Consultation </div>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <DatePicker
          disableToolbar
          autoOk={true}
          format="LL"
          minDate={moment()}
          maxDate={moment().add(7, 'days')}
          label="Select Date"
          value={selectedDate}
          onChange={handleChangeDate}
        />
      </MuiPickersUtilsProvider>

      <div className="booking-slot-box text-center">
        <div className="right-side-dark-para">{selectedDate.format("LL")}</div>
        <div className="gray-text">
          Select a time for your free 15 minute consultation
        </div>
        <div className="shift-slots-time">
          {freeIntervals.map((interval) => (
            <Button
              key={interval}
              variant={selectedTime === interval ? 'contained' : 'outlined'}
              style={{ margin: '5px' }}
              disableRipple
              color={selectedTime === interval ? 'primary' : 'default'}
              onClick={() => setSelectedTime(interval)}>
              {interval}
            </Button>
          ))}
          {(!freeIntervals || !freeIntervals.length) && (
            <Alert
              style={{
                fontSize: "16px",
                marginTop: "20px",
                textAlign: "center",
              }}
              severity="error">
              This lawyer is not available on {selectedDate.format("LL")}.
              Please select another Day
            </Alert>
          )}
        </div>
      </div>
      {(error && error.message)
        && (
          <Alert
            style={{
              fontSize: "16px",
              marginTop: "20px",
              textAlign: "center",
            }}
            onClose={() => setError('')}
            severity="error">
            {error.message}
          </Alert>
        )}

      <div className="calltype-btn float-right book-slider-btn">
        <Button
          variant='outlined'
          onClick={onClose}>
          Cancel
        </Button>

        <Button
          style={{ marginLeft: '10px' }}
          variant='contained'
          color='primary'
          disabled={!selectedTime}
          type="button"
          onClick={handleNext}>
          Reschedule
        </Button>
      </div>
    </div>
  );
};
