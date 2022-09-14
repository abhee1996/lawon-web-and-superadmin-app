import React, { Component } from 'react';
import moment from 'moment';
import { TextField } from '@material-ui/core';

import { Button, TYPES } from '../../atoms/YellowButton';

class ConsultationNotes extends Component {
  state = {
    content: ''
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { content } = this.state;
    const { submitNote, consultationDetails, getConsultationDetails } = this.props;
    const { id } = consultationDetails || {};

    submitNote({
      consultationId: id,
      content
    })
      .then(({ errorMessage }) => {
        if (errorMessage) {
          return;
        }

        this.setState({ content: '' });
        getConsultationDetails({ id });
      })

  }

  render() {
    const { consultationDetails } = this.props;
    const { ConsultationNotes = [] } = consultationDetails || {};
    const { content } = this.state;
    return (
      <div className='col-sm-12 pl0'>
        {ConsultationNotes.map(({ content, createdAt }) => (
            <div className='col-md-12 no-padding notes-row'>
              <div className='gray-text'>
                {moment(createdAt).format('DD MMM YYYY, HH:mm')}
              </div>
              <div className="right-side-light-para">
                {content}
              </div>
            </div>
          ))
        }

        <div className="form-group pt-10">
          <TextField
            value={content}
            name='content'
            placeholder='Type your notes here'
            variant='outlined'
            multiline
            style={{ width: '100%' }}
            rows='5'
            onChange={this.handleOnChange}
          />
        </div>
        <div className='col-md-12 no-padding'>
          <div className='step-section-btns'>
            <Button
              text='Send'
              disabled={!content}
              type='button'
              onClick={this.handleSubmit}
              buttonType={TYPES.Generic}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ConsultationNotes;
