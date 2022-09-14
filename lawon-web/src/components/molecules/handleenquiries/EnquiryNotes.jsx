import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Button, TYPES } from "../../atoms/YellowButton";

export default ({ enquireyDetails, submitNote, getNotes, enquiryNotes }) => {
  const [note, setNote] = useState('');
  const [ message, setMessage ] = useState('');
  const { id } = enquireyDetails || {};

  useEffect(() => {
    getNotes({ enquiryId: id });
  }, [])

  const handleSubmitNote = () => {
    submitNote({ enquiryId: id, note }).then(({ errorMessage }) => {
      if (errorMessage) return setMessage(errorMessage);

      getNotes({ enquiryId: id });
      setNote('');
      setMessage('');
    });
  }

  const handleOnChange = ({ target: { value }}) => {
    setNote(value);
  }

  return (
    <div className="col-sm-12 pl0">
      <div className="col-md-12 no-padding notes-row">
        <div className="right-side-dark-para">
          Use this section to make your own files notes on this matter. The
          user will not be able to see the information you enter here
        </div>
        <br />
        {enquiryNotes && (
          <React.Fragment>
            {enquiryNotes.map(({ createdAt, notes }) => (
              <div className="lawyer-notes">
                <div className="gray-text">
                  {moment(createdAt).format("LL")},{" "}
                  {moment(createdAt).format("HH:mm")}
                </div>
                <div className="right-side-light-para">{notes}</div>
              </div>
            ))}
          </React.Fragment>
        )}
      </div>
      <div className="form-group pt-10">
        <TextField
          multiline
          value={note}
          style={{ width: '100%' }}
          variant='outlined'
          rows='4'
          onChange={handleOnChange}
          name='lawyerNotes'
          placeholder='Type your notes here'
        />
      </div>
      <div className="col-md-12 no-padding">
        {message && (
          <Alert
            style={{ fontSize: "16px" }}
            severity="error">
            {message}
          </Alert>
        )}
        <div className="step-section-btns">
          <Button
            disabled={!note}
            onClick={handleSubmitNote}
            text="Send"
            type="button"
            buttonType={TYPES.Generic}
          />
        </div>
      </div>
    </div>
  )
}