import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';

import * as actions from '../../actions/user/instruction';
class UserInstructLawyerConfirm extends Component {
  componentDidMount() {
    const { getInstructionsById, match: { params } } = this.props;
    const { id } = params || {};
    getInstructionsById({ id });
  }
    render() {
      const { instructionDetails, loading } = this.props;
      const { Lawyer, reference } = instructionDetails || {};
      const { firstName, lastName, Organization, phoneNumber } = Lawyer || {};
      const { name } = Organization || {};

        return ( 
          <div className='user-main-content-consultation'>
            <div className='container'>
            <div className='add-details-box confirm-instruct'>          

            <div className='row add-details-btm-sec'>
            <h2 class="text-center">Your have instructed <strong>{firstName} {lastName}</strong> to act on your behalf</h2>
            
            <div className='instruct-confirm-details'>
                <p>
                <strong>{name}</strong> have received your instructions and they'll contact you soon to sign paperwork. If there's anything you want to check,
                 just give <strong>{firstName}</strong> a call on {phoneNumber}. 
                </p>
                <p>
                Your reference number is <strong>{reference}</strong>. 
    
                </p>
                <p>
                If anything comes up, {firstName} will call you.   
                </p>
            </div>

            <div className='text-center right-side-bold-yellow pt40'>GO BACK TO DASHBOARD</div>
                 
            <div className='download-app-sec text-center'>
            <img src = {require('../../assets/img/download-app.png')} />
            </div>
           
            </div>
            </div>
            </div>
            <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
         );
    }
}
 
const mapStateToProps = ({ user }) => {
  const { instruction } = user || {};
  return { ...instruction };
}
export default connect(mapStateToProps, actions)(UserInstructLawyerConfirm);