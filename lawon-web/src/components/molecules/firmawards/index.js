import React from 'react';
import FileDrop from 'react-file-drop';
import LoadingBar from 'react-top-loading-bar';
import { connect } from 'react-redux';
import { IconButton, Avatar, Snackbar, GridList, GridListTile, GridListTileBar, Backdrop, CircularProgress } from '@material-ui/core';
import { HighlightOff, CardMembership, Delete } from '@material-ui/icons';

import { Button, TYPES } from '../../atoms/YellowButton'
import * as actions from '../../../actions/manageFirm';
import AwardNameModel from './AwardNameModel';

class FirmAwards extends React.Component {
  state = {
    awards: [],
    file: '',
    isTitleModalOpen: false,
    message: ''
  }

  componentDidMount() {
    const { getFirmAwards } = this.props;
    getFirmAwards();
  }

  handleDrop = (files) => {
    if (files && files.length) {
      this.setState({ file: files[0] });
    }
  }

  handleOpenTitleModal = () => {
    const { file } = this.state;

    if (file) {
      this.setState({ isTitleModalOpen: true });
    }
  }

  onSubmit = () => {
    this.setState({
      message: {
        description: 'Description has been updated successfully.',
        type: 'success'
      },
      file: ''
    });
  }

  handleDelete = ({ id }) => {
    const { deleteReward, getFirmAwards } = this.props;
    deleteReward({ id }).then(() => {
      getFirmAwards();
    })
  }

  render() {
    const { awards, loading } = this.props;
    const { file, message } = this.state;
    let url = '';
    if (file) url = URL.createObjectURL(file);

    const { name, size } = file || {};
    return (
      <div>
        <LoadingBar
          onRef={ref => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={message && message.description && message.type === 'success'}
          onClose={() => this.setState({ message: '' })}
          autoHideDuration={4000}
          message={message && message.description}
        />
        <div className='right-side-heading'>
          Awards & Accreditations
        </div>
        <div className='col-sm-12 no-padding'>
          <div className='col-sm-12 pl0'>
            <div className='right-side-light-text'>Has your firm won any awards or accreditations? Let your clients know</div>
            <div id='id="react-file-drop-demo"' className=''>
              <FileDrop onDrop={this.handleDrop}>
                <div className='img-uploadbox'>
                  <input className='awards-file-upload' type="file" onChange={({ target: { files }}) => this.handleDrop(files)} />
                  <div className='img-dark-text'>Click to upload or drag and drop the logo of the award</div>
                  <div className='img-light-text'>(JPEG, or PNG file, max size 2MB)</div>
                </div>
              </FileDrop>
            </div>
          </div>
        </div>
        {file
          && (
            <div className='firm-awards-list col-sm-12'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #ebeff1'
                }}>
                <Avatar
                  variant='rounded'
                  src={url}>
                  <CardMembership />
                </Avatar>
                <div class="right-side-bold-yellow" style={{ marginLeft: '10px', width: '100%' }}>{name}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '60px' }}>{size / 1000} kb</div>
                  <IconButton
                    style={{ marginTop: '0px', color: 'red' }}>
                    <HighlightOff />
                  </IconButton>
                </div>
              </div>
            </div>
          )}

        <GridList cellHeight={180}>
          {awards.map(({ id, name, imageUrl }) => (
            <GridListTile key={id} cols={1}>
              <img src={imageUrl} alt={NamedNodeMap} />
              <GridListTileBar
                title={name}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${name}`}
                    onClick={() => this.handleDelete({ id })}>
                    <Delete />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>

        <div className='float-right' style={{ marginTop: '10px' }}>
          <Button
            text='Save Changes'
            type='button'
            onClick={this.handleOpenTitleModal}
            buttonType={TYPES.Generic}
          />
        </div>

        <AwardNameModel
          {...this.state}
          {...this.props}
          onClose={() => this.setState({ isTitleModalOpen: false })}
          onSubmit={this.onSubmit}
        />

        <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}
const mapStateToProps = ({ manageFirm, auth }) => ({ ...manageFirm, auth });
export default connect(mapStateToProps, actions)(FirmAwards);