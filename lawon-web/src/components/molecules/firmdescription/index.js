import React from 'react';
import { TextField,  Snackbar } from '@material-ui/core';
import LoadingBar from 'react-top-loading-bar'
import { connect } from 'react-redux'

import { Button, TYPES } from '../../atoms/YellowButton'
import * as actions from '../../../actions/organization';


class FirmDescription extends React.Component {
  state = {
    bio: '',
    message: ''
  }

  componentDidMount() {
    const { auth } = this.props;
    const { lawyer } = auth || {};
    const { Organization } = lawyer || {};
    const { bio } = Organization || {};

    this.setState({ bio })
  }

  handleChangeInput = ({ target: { value } }) => {
    this.setState({ bio: value });
  }

  firmBioSubmit = () => {
    const { organizationFirmProfileSetup } = this.props;
    const { bio } = this.state;
    organizationFirmProfileSetup({ bio })
      .then(({ errorMessage }) => {
        if (errorMessage) {
          return this.setState({
            message: { description: errorMessage }
          });
        }

        this.setState({
          message: {
            description: 'Description has been updated successfully.',
            type: 'success'
          },
          image: ''
        })
      });
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  render() {
    const { bio, message } = this.state;
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
        <div className='right-side-heading'>Description</div>
        <div className='col-sm-12 no-padding'>
          <div className='col-sm-12 pl0'>
            <div className='right-side-subheading'>This is your opportunity to tell your clients why they should choose your firm</div>
            <div className='firm-desc'>
              <div className="form-group">
                <TextField
                  placeholder='Type your description here'
                  onChange={this.handleChangeInput}
                  value={bio}
                  style={{ width: '100%' }}
                  multiline
                  variant='outlined'
                  rows='5'
                />
              </div>
              <div className='float-right'>
                <Button
                  disabled={!bio}
                  text='Save Changes'
                  type='button'
                  onClick={this.firmBioSubmit}
                  buttonType={TYPES.Generic}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, oganization }) => ({ auth, ...oganization });
export default connect(mapStateToProps, actions)(FirmDescription);