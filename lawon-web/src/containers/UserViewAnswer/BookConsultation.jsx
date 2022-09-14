import React, { useState } from "react";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";


export default (props) => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState("");

  const handleChangeDate = (date) => {
    const { getFreeInterval, questionsDetails } = props;
    const { LawyerId } = questionsDetails || {};

    setSelectedDate(date);

    getFreeInterval({
      lawyerId: LawyerId,
      date: date.format("DD-MM-YYYY"),
    });
  };

  const handleNext = () => {
    const { questionsDetails, history, match } = props;
    const { Enquiry, LawyerId } = questionsDetails || {};
    const { SubCategory } = Enquiry || {};
    const { id: subCategoryId, CategoryId } = SubCategory || {};

    const { params } = match || {};
    const { conversationId } = params || {};

    history.push(
      `/main/user/consultation/${subCategoryId}/${CategoryId}/lawyers/${LawyerId}/datetime/${selectedDate.format(
        "DD-MM-YYYY"
      )}/${selectedTime}/enquiry/${conversationId}/details`
    );
  };

  const { enquiryConsultation } = props;
  const { freeIntervals = [], loading } = enquiryConsultation || {};

  return (
    <div className="drawer-up-doc">
      <div class="right-side-dark-para">Book Consultation</div>
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
              type='button'
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

      <div className="calltype-btn float-right book-slider-btn">
        <Button
          disabled={!selectedTime}
          type="button"
          variant='contained'
          color='primary'
          onClick={handleNext}>
          BOOK
         </Button>
      </div>
    </div>
  );
};
