import React, { Component } from 'react';
import DashboardHeading from '../../components/atoms/DashboardMainHeading';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class AdminDashboard extends Component {
  state = {}

  render() {
    const { lawyer } = this.props;
    const { lawyerType, firstName } = lawyer || {};
    return (
      <div className='main'>
        <div className='container-fluid no-padding'>
          <div className=''>
            {lawyerType == 1 ?
              <DashboardHeading
                text='Admin'
              />
              :
              ''
            }
            <div class="dashboard-sub-heading">Hello, {firstName} </div>
          </div>
          <div className='admin-options-section'>
            <Link to='/main/dashboardmaster/accountsettings'>
              <div className='col-sm-12 dashboard-admin-options'>
                <div className='col-sm-1 options-img'>
                  <img src={require('../../assets/img/ico_blackaccount.png')} />
                </div>

                <div className='col-sm-10'>
                  <div className='dashboard-options-heading'>
                    Account Settings</div>
                  <div className='dashboard-options-subheading'>
                    Set up your profile as admin and lawyer</div>
                </div>
                <div className='col-sm-1 options-arrow'>

                  <img src={require('../../assets/img/admin-arrow.png')} />
                </div>
              </div>
            </Link>


              <React.Fragment>
                <Link to='/main/dashboardmaster/managefirm'>
                  <div className='col-sm-12 dashboard-admin-options'>
                    <div className='col-sm-1 options-img'>
                      <img src={require('../../assets/img/ico_blackmanagefirm.png')} />
                    </div>
                    <div className='col-sm-10'>
                      <div className='dashboard-options-heading'>
                        Manage Your Firm</div>
                      <div className='dashboard-options-subheading'>
                        Set up your firm profile</div>
                    </div>
                    <div className='col-sm-1 options-arrow'>

                      <img src={require('../../assets/img/admin-arrow.png')} />

                    </div>
                  </div>
                </Link>
                <Link to='/main/dashboardmaster/manageteam'>
                  <div className='col-sm-12 dashboard-admin-options'>
                    <div className='col-sm-1 options-img'>
                      <img src={require('../../assets/img/ico_blackmanageteam.png')} />
                    </div>
                    <div className='col-sm-10'>
                      <div className='dashboard-options-heading'>
                        Manage Your Team</div>
                      <div className='dashboard-options-subheading'>
                        Add, edit and remove your colleagues to the system</div>
                    </div>
                    <div className='col-sm-1 options-arrow'>
                      <img src={require('../../assets/img/admin-arrow.png')} />
                    </div>
                  </div>
                </Link>
              </React.Fragment>

          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = ({ auth }) => ({ ...auth });
export default connect(mapStoreToProps, null)(AdminDashboard);