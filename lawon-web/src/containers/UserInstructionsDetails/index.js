import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Avatar, createMuiTheme, ThemeProvider } from "@material-ui/core";

import * as actions from '../../actions/user/instruction';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 13
  }
});

const allStatus = ['Active', 'Closed'];

class UserInstructionsDetails extends Component {
  state = {
    bottom: false,
    isOpen: true,
  }

  componentDidMount() {
    const { getInstructionsById, match } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    getInstructionsById({ id });
  }

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      buttonId: null,
      open: false
    }
    this.setButton = this.setButton.bind(this);
  }

  setButton(id) {
    this.setState({ buttonId: id, open: true });
  }

  render() {
    const { instructionDetails } = this.props;
    const { Lawyer, details, fee, Consultation, status, createdAt, SubCategory } = instructionDetails || {};
    const { id: lawyerId, firstName, lastName, Organization, jobTitle, imageUrl } = Lawyer || {};
    const { name: organizationName, id: orgId } = Organization || {};
    const { Category } = SubCategory || {};
    const { name: categoryName } = Category || {};
    const { startTime } = Consultation || {};
    return (
      <ThemeProvider theme={theme}>
        <div className='user-main-content-consultation'>
          <div className='container-fluid user-consultation-upper'>
            <div className='col-md-12'>
              <div className='col-md-4 gray-text pointer'>
                <span><i class="fa fa-angle-left"></i></span>
                <Link to='/main/userallinsturctions'>
                  <span>  GO BACK TO ALL INSTRUCTIONS</span>
                </Link>
              </div>
              <div className='col-md-6 pl0<h4 class="">Here are the details of your case which we have sent to your lawyer</h4>'>
                <div className='user-consult-book-time'>
                  <span>
                    Booked on {moment(createdAt).format('DD/MM/YY')} at {moment(createdAt).format('HH:mm')}
                  </span>
                  <span>
                    Category: {categoryName}
                  </span>
                </div>
                <h2>Instructions for {firstName} {lastName} </h2>
                <div className='right-side-dark-para'>STATUS: {allStatus[status - 1]}</div>
              </div>
              <div className='col-md-2'></div>
            </div>
          </div>

          <div className='container'>
            <div className='col-md-offset-1 col-md-10'>

              <div className='col-md-12 user-consultation-lower'>
                <h4 className="here-details">Here are the details of your case which we have sent to your lawyer</h4>
                <div className='row'>
                  <div className='col-md-2 right-side-dark-para'>
                    Lawyer
                  </div>
                  <div className='col-md-10'>
                    <div className='col-md-3'>
                      <div className='consult-details-img'>
                        <Avatar
                          style={{ height: '100%', width: '100%' }}
                          variant="square"
                          src={imageUrl}
                        />
                      </div>
                    </div>
                    <div className='col-md-9 no-padding'>
                      <div className='right-side-dark-para'>
                        <Link to={`/main/user/lawyerprofile/${lawyerId}`}>
                          {firstName} {lastName}
                        </Link>
                      </div>
                      <div>
                        <Link to={`/main/user/firm-profile/${orgId}`}>
                          {organizationName}
                        </Link>
                      </div>
                      <div className='pt10'>{jobTitle || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {
                  Consultation
                  && (
                    <div className='row user-con-consult'>
                      <div className='col-md-2 right-side-dark-para'>
                        Case Details
                      </div>
                      <div className='col-md-10'>
                        <div className='col-md-12 no-padding'>
                          <div className='gray-text col-md-2'>Date</div>
                          <div className='col-md-10'>{moment(startTime).format('dddd, DD MMMM YYYY')}</div>
                        </div>

                        <div className='col-md-12 no-padding'>
                          <div className='gray-text col-md-2'>Time</div>
                          <div className='col-md-10'>{moment(startTime).format('HH:mm')}</div>
                        </div>

                        <div className='col-md-12 no-padding'>
                          <div className='gray-text col-md-2'>Call Type</div>
                          <div className='col-md-10'>Phone</div>
                        </div>
                      </div>
                    </div>
                  )
                }

                <div className='row user-con-consult'>
                  <div className='col-md-2 right-side-dark-para'>
                    Case Details
                </div>
                  <div className='col-md-10'>
                    <div className='col-md-12'>
                      <div>{details}</div>
                    </div>
                  </div>
                </div>

                <div className='row user-con-consult'>
                  <div className='col-md-2 right-side-dark-para'>Instruction Fee</div>
                  <div className='col-md-10'>
                    <div className='col-md-12'>
                      <div className='right-side-dark-para'>£{fee}</div>
                      <div className=''>
                        That price includes:
                        <br />
                        - Legal Fee
                        <br />
                        - Estimated Disbursements
                        <br />
                        - VAT Tax(20%)
                        </div>
                    </div>
                  </div>
                </div>


           

                    <div className='row'>
                     <div className='col-md-2'></div>
                     <div className='col-md-10'>
                     <div className="download-app-sec">
                    <div
                     style={{fontSize:'18px'}}
                    >Download the app</div>
                     <p>
                       For the full lawOn experience, and access to
                       <br/>
                       all our features, download the app today.
                     </p>

                     <div 
                         style={{padding:'18px 0'}}
                     >
                       <p>

                         - Ask questions on the spot
                         <br/>
                         - Book consultations from your sofa
                         <br/>
                         - Talk to your lawyer via chat or video
                       </p>
                     </div>
                     <div>
                     <img
                     style={{marginRight:'10px'}}
                        className=""
                        width='150'
                        height=''
                        src={require("../../assets/img/download-ap.png")}
                      />
                            <img
                             width='150'
                             height=''
                        className=""
                        src={require("../../assets/img/download-g.png")}
                      />
                     </div>
                     
                  
                    </div>
                     </div>
                     </div>
              </div>


            </div>
          </div>

        </div>
      </ThemeProvider>
    );
  }
}

const mapStateTpProps = ({ user }) => {
  const { instruction } = user || {};
  return { ...instruction };
}

export default connect(mapStateTpProps, actions)(UserInstructionsDetails);
