import React, { Component } from 'react';
import moment from 'moment';

import { Button, TYPES } from '../../atoms/YellowButton';
import { TextField } from '@material-ui/core';

class CaseNotes extends Component {
  state = {
    content: ''
  };

  handleOnChange = ({ target: { value } }) => {
    this.setState({ content: value });
  }

  handleSubmit = () => {
    const { submitNote, instructionDetails, getInstructionsById } = this.props;
    const { id } = instructionDetails || {};

    const { content } = this.state;

    submitNote({  id, content }).then(({ errorMessage }) => {
      if (errorMessage) {
        return;
      }

      getInstructionsById({ id });
      this.setState({ content: '' });
    })
  }

  render() {
    const { instructionDetails } = this.props;
    const { InstructionNotes = [] } = instructionDetails || {};
    const { content } = this.state;
    return (
      <div className='col-sm-12 pl0'>
        {
          InstructionNotes.map(({ content, createdAt }) => (
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
              style={{ width: '100%' }}
              multiline
              variant='outlined'
              rows='5'
              value={content}
              placeholder='Type your notes here'
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
export default CaseNotes;
