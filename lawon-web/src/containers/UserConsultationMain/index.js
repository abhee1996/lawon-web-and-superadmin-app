import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import moment from "moment";
import { IconButton, LinearProgress, Dialog, DialogContent, DialogTitle, Drawer, Avatar, Box, Typography, Backdrop, CircularProgress, createMuiTheme, ThemeProvider, Button, Snackbar } from "@material-ui/core";
import { HighlightOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import { Input } from "../../components/atoms/InputField";
import * as actions from "../../actions/user/userConsultation";
import UploadDocument from "./UploadDocument";
import CallType from "./CallType";
import CancelConsultation from "./CancelConsultation";
import Reschedule from "./Reschedule";
import { CONSULTATION_STATUS } from '../../common/constants';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    height: "calc(100% - 350px)",
  },
};

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

const allStatus = ['Active', 'Closed', 'Cancelled', 'Active-Rescheduled'];

class UserConsultationMain extends Component {
  state = {
    bottom: false,
    isOpen: true,
    categoryName: "",
    callType: "Phone Call",
  };

  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      buttonId: null,
      open: false,
      attachmentData: [],
      dialogContact: false,
      dialogDocument: false,
      media: [],
      mobile: "",
      seletedId: '',
      message: ''
    };
  }

  componentDidMount() {
    const { match, getConsultation, location } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    getConsultation({ id });

    const queryParams = queryString.parse(location.search);
    const { action } = queryParams || {};

    // eslint-disable-next-line default-case
    switch (action) {
      case 'reschedule': {
        this.setState({ buttonId: 4, open: true });
        break;
      }
      case 'cancel': {
        this.setState({ buttonId: 3, open: true });
        break;
      }
    }
  }

  closeDrawer = () => {
    this.setState({ open: false });
  };

  setButton = (id) => {
    this.setState({ buttonId: id, open: true });
    if (id === 4) {
      const { getFreeInterval } = this.props;
      getFreeInterval({ date: moment().format("DD-MM-YYYY") });
    }
  }

  closePopupCancelConsult = () => {
    this.setState({ dialogOpen: false });
  };

  handleContact = () => {
    this.setState({ dialogContact: true, open: false });
  };
  closeContact = () => {
    this.setState({ dialogContact: false });
  };

  uploadDocumentDrawer = () => {
    this.setState({ dialogDocument: true, open: false });
  };
  closeDocumentDrawer = () => {
    this.setState({ dialogDocument: false });
  };

  handleOnChangeProfile = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleUpdateContact = () => {
    const { contactUpdate } = this.props;
    const { mobile } = this.state;
    contactUpdate({ mobile });
  };

  setCallType = (channel) => {
    const { consultationCallType } = this.props;
    consultationCallType({ channel });
    this.setState({ open: false });
  };

  firmProfile = () => {
    const { history } = this.props;
    history.push(`/main/userlawyerprofile`);
  };

  handleUpload = ({ file }) => {
    const { uploadAttachment, match } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    this.setState({ open: false });
    uploadAttachment({ consultationId: id, file })
      .then(({ isUploaded }) => {
        if (!isUploaded) return
        this.componentDidMount();
      });
  }

  handleDeleteAttachment = ({ id }) => {
    const { deleteAttachment, getConsultation, match } = this.props;
    const { params } = match || {};

    this.setState({ seletedId: id });
    deleteAttachment({ id }).then(({ isDeleted }) => {
      if (!isDeleted) return;

      getConsultation({ id: params.id });
    })
  }

  handleRescheduled = () => {
    const { match, getConsultation } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    getConsultation({ id });

    this.setState({
      open: false,
      message: {
        description: 'Consultation has been rescheduled successfully.'
      }
    });
  }

  handleCancelled = () => {
    const { match, getConsultation } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    getConsultation({ id });

    this.setState({
      message: {
        description: 'Consultation has been cancelled successfully.'
      }
    });
  }

  render() {
    const { open, seletedId, message, buttonId } = this.state;

    const { classes, bookConsultation, uploadDoc } = this.props;

    const { consultation, loading: loadingConsultation } = bookConsultation || {};
    const { id, Lawyer, startTime, SubCategory, status, mobile, channel, ConsultationAttachments = [] } = consultation || {};
    const { Organization, firstName, lastName, imageUrl, jobTitle, id: lawyerId } = Lawyer || {};
    const { name } = Organization || {};
    const { name: subcategoryName } = SubCategory || {};

    const { progress, loading, loadingDelete } = uploadDoc || {};

    return (
      <ThemeProvider theme={theme}>
        <div className="user-main-content-consultation">
          <div className="container-fluid user-consultation-upper">
            <div className="col-md-12">
              <div className="col-md-4 gray-text pointer">
                <span>
                  <i class="fa fa-angle-left"></i>
                </span>
                <Link to='/main/userallconsultations'>
                  <span> GO BACK TO ALL CONSULTATIONS</span>
                </Link>

              </div>
              <div className="col-md-6">
                <div className="user-consult-book-time">
                  <span>
                    Booked on {moment(startTime).format("LL")} at{" "}
                    {moment(startTime).format("HH:mm A")}
                  </span>
                  <span>Category: {subcategoryName}</span>
                </div>
                <h2>
                  Consultations with {firstName} {lastName}
                </h2>
                <div className="right-side-dark-para">STATUS: {allStatus[status - 1]}</div>
                <div className="user-consult-btn">
                  {(status == CONSULTATION_STATUS.ACTIVE)
                    && (
                      <Button
                        color='primary'
                        variant='outlined'
                        style={{ marginRight: '10px' }}
                        onClick={() => this.setButton(4)}>
                        Reschedule
                      </Button>
                    )}
                  {(status == CONSULTATION_STATUS.ACTIVE || status == CONSULTATION_STATUS.ACTIVE_RESCHEDULED)
                    && (
                      <Button
                        variant='outlined'
                        onClick={() => this.setButton(3)}>
                        Cancel
                      </Button>
                    )}
                  {(status == CONSULTATION_STATUS.CLOSED)
                    && (
                      <button
                        className='btn top-dashboard-btn'
                        onClick={() => (window.location = `#/main/user/consultation/${id}/instruct-lawyer/payment`)}>
                        Instruct Lawyer
                      </button>
                    )}
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>

          <div className="container">
            <div className="col-md-offset-1 col-md-10">
              <div className="col-md-12 user-consultation-lower">
                <div className="row">
                  <div className="col-md-2 right-side-dark-para">Lawyer</div>
                  <div className="col-md-10">
                    <div className="col-md-3">
                      <div className="consult-details-img">
                        <Avatar
                          style={{ height: '100%', width: '100%' }}
                          variant="square"
                          src={imageUrl}
                        />
                      </div>
                    </div>
                    <div className="col-md-9 no-padding">
                      <div className="right-side-dark-para">
                        <Link style={{ color: '#000' }} to={`/main/user/lawyerprofile/${lawyerId}`}>
                          {firstName} {lastName}
                        </Link>
                      </div>
                      <div>{name}</div>
                      <div className="pt10">{jobTitle}</div>
                    </div>
                  </div>
                </div>

                <div className="row user-con-consult">
                  <div className="col-md-2 right-side-dark-para">
                    Consultation
                  </div>
                  <div className="col-md-10">
                    <div className="col-md-12 no-padding">
                      <div className="gray-text col-md-2">Date</div>
                      <div className="col-md-10">
                        {moment(startTime).format("dddd, DD MMMM YYYY")}
                      </div>
                    </div>

                    <div className="col-md-12 no-padding">
                      <div className="gray-text col-md-2">Time</div>
                      <div className="col-md-10">
                        {moment(startTime).format("hh:mm A")}
                      </div>
                    </div>

                    <div className="col-md-12 no-padding">
                      <div className="gray-text col-md-2">Call Type</div>
                      <div className="col-md-10">
                        {channel === 1 && "Phone  Call"}
                        {channel === 2 && "Video Call"}
                        <span
                          className="gray-text change-call-type font-12"
                          onClick={() => this.setButton(2)}>
                          (Change)
                        </span>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="update-contact-box">
                        <div className="">
                          Please, make sure your contact details are up to date
                        </div>
                        {/* <Link to='/main/userprofile'>
                        <Button
                          text='Update my Contact Details'
                          type='button'
                          onClick={() => { }}
                          buttonType={TYPES.Document}
                        />
                      </Link> */}

                        <button
                          className='document-btn btn'
                          onClick={this.handleContact}>
                          Update my Contact Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row upload-doc-box">
                  <div className="col-md-2 right-side-dark-para">Details</div>
                  <div className="col-md-10">
                    <div className="col-md-12">
                      {" "}
                      details
                  </div>
                  </div>
                </div>

                <div className="row upload-doc-box">
                  <div className="col-md-2 right-side-dark-para">Documents</div>
                  <div className="col-md-10">
                    {
                      ConsultationAttachments.map(({ name, url, id, createdAt }) => (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #ebeff1'
                          }}>
                          <div class="right-side-bold-yellow" style={{ marginLeft: '10px' }}>{name}</div>
                          <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <div style={{ width: '100px' }}>125 kb</div>
                            <div style={{ width: '100px' }}>{moment(createdAt).format('LL')}</div>
                            <IconButton
                              style={{ marginTop: '0px', color: 'red' }}
                              onClick={() => this.handleDeleteAttachment({ id })}>
                              {
                                loadingDelete && seletedId === id
                                  ? <CircularProgress size={19} color='inherit' />
                                  : <HighlightOff />
                              }
                            </IconButton>
                          </div>
                        </div>
                      ))
                    }
                    {
                      (loading)
                      && (
                        <Box display="flex" alignItems="center">
                          <Box width="100%" mr={1}>
                            <LinearProgress
                              variant={
                                (loading && (progress === 0 || progress === 100))
                                  ? 'indeterminate'
                                  : 'determinate'
                              }
                              value={progress}
                            />
                          </Box>
                          <Box minWidth={55}>
                            <Typography variant="body2" color="textSecondary">
                              {
                                progress === 100
                                  ? 'Processing...'
                                  : `Uploading...${Math.round(progress)}%`
                              }
                            </Typography>
                          </Box>
                        </Box>
                      )
                    }

                    <button
                      className='document-btn btn'
                      disableRipple
                      onClick={() => this.setButton(1)}>
                      Upload document
                    </button>
                    <div className="download-app-sec">
                      <div
                        style={{ fontSize: '18px' }}
                      >Download the app</div>
                      <p>
                        For the full lawOn experience, and access to
                       <br />
                        all our features, download the app today.
                     </p>

                      <div
                        style={{ padding: '18px 0' }}>
                        <p>

                          - Ask questions on the spot
                          <br />
                          - Book consultations from your sofa
                          <br />
                          - Talk to your lawyer via chat or video
                        </p>
                      </div>

                      <div>
                        <img
                          style={{ marginRight: '10px' }}
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
          <Drawer classes={{ paper: classes.paper }} anchor="bottom" open={open}>
            <div>
              <span
                onClick={() => this.closeDrawer()}
                style={{ float: "right", padding: "20px" }}>
                <i className="fa fa-close"></i>
              </span>

              <div className="container bottom-drawer-area">
                <div className="col-md-offset-3 col-md-7">
                  {buttonId === 1 && (
                    <UploadDocument
                      handleFile={this.handleChangeFile}
                      {...this.props}
                      {...this.state}
                      onUpload={this.handleUpload}
                    />
                  )}

                  {buttonId === 2 && (
                    <CallType
                      handleClose={this.closeDrawer}
                      handleCallType={this.setCallType}
                    />
                  )}

                  {buttonId === 3 && (
                    <CancelConsultation
                      {...this.props}
                      onYes={this.handleCancelled}
                      Close={this.closeDrawer}
                    />
                  )}
                  {buttonId === 4 && (
                    <Reschedule
                      {...this.props}
                      onClose={this.closeDrawer}
                      onRescheduled={this.handleRescheduled}
                    />
                  )}
                </div>
              </div>
            </div>
          </Drawer>
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.dialogOpen}>
            <DialogContent>
              <div className="user-consult-dialog">
                <div className="dialog-head text-center">
                  Your consultation has been cancelled
                </div>
                <div className="text-center dialog-subhead">
                  If you would like to book another consultation, please click{" "}
                  <strong>here</strong>
                </div>
              </div>
              <div className="user-profile-btn">
                <Button
                  onClick={() => this.closePopupCancelConsult()}>
                  Ok
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog
            onClose={this.closeContact}
            aria-labelledby="customized-dialog-title"
            open={this.state.dialogContact}
            fullWidth={true}
            maxWidth="sm">
            <DialogTitle id="alert-dialog-title">
              <h2>Please provide your contact details</h2>
            </DialogTitle>
            <DialogContent>
              <div className="row">
                <div className="col-md-12">
                  <div className="right-side-subheading">Contact</div>
                  <div className="form-area">
                    <form>
                      <div class="form-group">
                        <Input
                          type={"text"}
                          name={"mobile"}
                          placeholder={"Mobile Number"}
                          handleChange={this.handleOnChangeProfile}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="user-profile-btn">
                    <button
                      style={{ display: 'inline', width: '100px', height: '34px', marginRight: '10px' }}
                      className='btn btn-generic-yellow-transp'
                      onClick={this.closeContact}>
                      Cancel
                    </button>
                    <button
                      style={{ display: 'inline', width: '100px', height: '34px', textTransform: 'capitalize' }}
                      className='btn universalBtn'
                      disabled={!this.state.mobile}
                      onClick={this.handleUpdateContact}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Backdrop open={loadingConsultation} style={{ zIndex: '100', color: '#fff' }}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={message && message.description}
            onClose={() => this.setState({ message: '' })}
            autoHideDuration={4000}
            message={message.description}
          />
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userConsultation } = user || {};
  return { ...userConsultation };
};

const withRedux = connect(mapStateToProps, actions);

export default compose(
  withStyles(styles, { withTheme: true }),
  withRedux
)(UserConsultationMain);
