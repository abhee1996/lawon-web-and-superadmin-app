import React from 'react';
import moment from 'moment';
import { findKey } from 'lodash';
import { Menu, MenuItem, ListItemIcon, Typography } from '@material-ui/core';
import { PictureAsPdf, LibraryAddCheck } from '@material-ui/icons';

import { INSTRUCTION_STATUS } from '../../../constants';
import { Button, TYPES } from '../../atoms/YellowButton'
import CaseNotes from './CaseNotes';
import Details from './Details'
import Attachment from './Attachment';
import CaseEnquiry from './CaseEnquiry';

class HandleCases extends React.Component {
  state = {
    buttonId: 1,
    anchorEl: null
  }

  setButton = (id) => {
    this.setState({ buttonId: id });
  }

  handleCloseCase = (id) => {
    const { markAsComplete, getInstructionsById } = this.props;
    markAsComplete({ id }).then(({ errorMessage }) => {
      if (errorMessage) return;
      getInstructionsById({ id });
    })
  }

  render() {
    const { buttonId, anchorEl } = this.state;

    const { instructionDetails } = this.props;
    const { createdAt, status, User, id } = instructionDetails || {};
    const { firstName, lastName } = User || {};

    return (
      <div>
        <div className='col-sm-12 no-padding top-cases-section'>
          <div className='col-sm-8 pl0'>
            <div className='right-side-heading-top'>
              Instruction by {`${firstName} ${lastName}`}
            </div>
            <div class="right-side-subheading">Instructed on {moment(createdAt).format('DD MMM YYYY, HH:mm')}</div>
            <div class="right-side-light-text-cases">STATUS: {findKey(INSTRUCTION_STATUS, (value) => value === status)}</div>
          </div>
          <div className='col-sm-4'>
            <div class='drawer-btn-top'>
              <Button
                aria-controls="case-actions"
                text='Actions'
                type='button'
                onClick={(e) => this.setState({ anchorEl: e.currentTarget })}
                buttonType={TYPES.TopDashbord}
              />
              <Menu
                id="case-actions"
                anchorEl={anchorEl}
                keepMounted
                PaperProps={{
                  style: { width: 180 }
                }}
                open={Boolean(anchorEl)}
                onClose={() => this.setState({ anchorEl: null })}>
                <MenuItem>
                  <ListItemIcon>
                    <PictureAsPdf fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Export PDF</Typography>
                </MenuItem>
                <MenuItem onClick={() => this.handleCloseCase(id)}>
                  <ListItemIcon>
                    <LibraryAddCheck fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Mark as Complete</Typography>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>

        <div className='col-sm-12 no-padding'>
          <div className='filter-lawyer-prof'>
            <span className='active-filter' onClick={() => this.setButton(1)}>DETAILS</span>
            <span onClick={() => this.setButton(2)}>ATTACHMENT</span>
            <span onClick={() => this.setButton(3)}>ENQUIRY</span>
            <span onClick={() => this.setButton(4)}>NOTES</span>
          </div>


          {buttonId === 1 && <Details {...this.props} />}
          {buttonId === 2 && <Attachment {...this.props} />}
          {buttonId === 3 && <CaseEnquiry  {...this.props} />}
          {buttonId === 4 && <CaseNotes {...instructionDetails} { ...this.props } />}
        </div>
      </div>
    );
  }
}
export default HandleCases;