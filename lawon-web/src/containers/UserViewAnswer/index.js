import React, { Component } from "react";
import { Dialog, DialogContent, Drawer, withStyles, createMuiTheme, ThemeProvider, Avatar, Button, Backdrop, CircularProgress, IconButton } from "@material-ui/core";
import { GetApp } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import moment from "moment";
import queryString from 'query-string';
import { Alert } from '@material-ui/lab';

import * as actions from "../../actions/user/questions";
import ReplyToLawyer from "./ReplyToLawyer";
import { getTotalPrice } from "../../utils/utils";
import BookConsultation from './BookConsultation';
import CloseConversation from './CloseConversation';
import { CONVERSATION_STATUS } from '../../common/constants';

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  paper: {
    height: "calc(100% - 380px)"
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 11
  },
});

class UserViewAnswer extends Component {
  state = {
    bottom: false,
    isOpen: true,
    lawyerID: null,
    userID: null,
    dialogOpen: false,
    buttonId: null,
    open: false
  };


  componentDidMount() {
    const { getQuestionDetails, match, location } = this.props;
    const { params } = match;
    const { conversationId } = params || {};

    this.setState({ conversationId });
    getQuestionDetails({ conversationId });

    const queryParams = queryString.parse(location.search);
    const { action } = queryParams || {};

    // eslint-disable-next-line default-case
    switch (action) {
      case 'respond': {
        this.setState({ buttonId: 3, open: true });
        break;
      }
      case 'book_consultation': {
        this.setState({ buttonId: 4, open: true });
        break;
      }
      case 'close_matter': {
        this.setState({ buttonId: 1, open: true });
        break;
      }
    }
  }

  closeDrawer = () => {
    this.setState({ open: false });
  };

  setButton = (id) => {
    this.setState({ buttonId: id, open: true });
  };

  openPopupCancelConsult = () => {
    this.setState({ dialogOpen: true, open: false });
  };

  closePopupCancelConsult = () => {
    this.setState({ dialogOpen: false });
  };

  handleCloseConversation = ({ id }) => {
    const { getQuestionDetails, match, closeConversation } = this.props;
    const { params } = match;
    const { conversationId } = params || {};

    this.setState({ open: false });

    closeConversation({
      conversationId: id,
    })
      .then(({ errorMessage }) => {
        if (errorMessage) return;

        getQuestionDetails({ conversationId });
      })
  }

  handleReply = ({ replyContent, media, id }) => {
    const { userReply, match, getQuestionDetails } = this.props;
    const { params } = match;
    const { conversationId } = params || {};

    this.setState({ open: false });

    userReply({
      replyContent,
      media,
      EnquiryConversationId: id
    })
      .then(({ errorMessage }) => {
        if (errorMessage) return;
    
        getQuestionDetails({ conversationId });
      });
  }

  chooseNext = () => {
    const { getFreeInterval, questionsDetails } = this.props;
    const { LawyerId, id } = questionsDetails || {};

    return (
      <div className="drawer-up-doc">
        <div className="right-side-dark-para">CHOOSE YOUR NEXT STEP</div>
        <div className="calltype-btn">
          <Button
            style={{ marginRight: '10px' }}
            color='primary'
            variant='outlined'
            onClick={() => this.setButton(3)}>
            Reply to lawyer
          </Button>
          <Button
            style={{ marginRight: '10px' }}
            color='primary'
            variant='contained'
            onClick={() => {
              this.setButton(4);
              getFreeInterval({
                lawyerId: LawyerId,
                date: moment().format('DD-MM-YYYY')
              })
            }}>
            Book a consultation
          </Button>
          <Link to={`/main/question/conversation/${id}/instruction`}>
            <Button color='primary' variant='contained'>Instruct the lawyer</Button>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const { open, buttonId } = this.state;
    const { classes, questionsDetails, loading } = this.props;
    const { EnquiryQuotation, EnquiryReplies = [], id, status, Enquiry } = questionsDetails || {};

    const {
      title,
      problem,
      createdAt,
      id: enquiryId
    } = Enquiry || {};


    const { legalFee, estimatedDisbursements, vatTax, other } = EnquiryQuotation || {};
    return (
      <ThemeProvider theme={theme}>
        <div className="user-main-content-consultation">
          <div className="container-fluid user-consultation-upper">
            <div className="col-md-12">
              <div className="col-md-3 gray-text pointer">
                <span>
                  <i className="fa fa-angle-left"></i>
                </span>
                <Link to="/main/userallquestions">
                  <span> GO BACK TO ALL QUESTIONS</span>
                </Link>
              </div>
              <div className="col-md-6 pl0">
                <div className="user-consult-book-time">
                  <span>
                    asked on {moment(createdAt).format("DD/MM/YY")} at{" "}
                    {moment(createdAt).format("HH:mm")}
                  </span>
                  <span>category: PROPERTY</span>
                </div>
                <h2>{title}</h2>
                <div className="right-side-light-para">{problem}</div>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
          <div>
            <div className="container-fluid">
              <div className="col-md-3"></div>
              <div className="col-md-7">
                <div className="user-view-answer-box">
                  {EnquiryReplies.map(
                    ({
                      id,
                      createdAt,
                      replyContent,
                      EnquriyAttachments,
                      User,
                      Lawyer
                    }, index) => {
                      const { firstName, lastName, imageUrl } =  User || Lawyer|| {};

                      return (
                        <div className="row enquiry-section" key={id} >
                          <div className="col-sm-2">
                            <div className="box-image">
                              <Avatar src={imageUrl} />
                            </div>
                          </div>
                          <div className="col-sm-10 pl0">
                            <div className="enquiry-user-name-date">
                              <span className="right-side-bold-yellow">
                                {firstName}{" "}
                                {lastName}
                              </span>
                              <span className="team-list-para-enquiry right-side-light-yellow">
                                {moment(createdAt).format("DD MMM YYYY, HH:mm")}
                              </span>
                              {index === 0
                                && (
                                  <span className="right-side-bold-gray float-right">
                                    £{getTotalPrice({
                                      legalFee,
                                      vatTax,
                                      estimatedDisbursements,
                                      other
                                    })}
                                  </span>
                                )
                              }
                            </div>
                            <div className="right-side-light-para">
                              {replyContent}
                            </div>
                            {(EnquriyAttachments && EnquriyAttachments.length > 0)
                              && (
                                <div className="right-side-light-para" style={{ marginTop: '10px'}}>
                                  {EnquriyAttachments.map(({ name, url, id }) => {
                                    return (
                                      <div
                                        key={id}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          width: '100%',
                                        }}>
                                        <div>
                                          <IconButton
                                            onClick={() => window.open(url, '_blank')}
                                            size='small'>
                                            <GetApp />
                                          </IconButton>
                                        </div>
                                        <div className="right-side-bold-yellow">{name}</div>
                                      </div>
                                    )
                                  })}
                                </div>
                              )}
                          </div>
                        </div>
                      );
                    }
                  )}
                  <div className="row">
                    {status === CONVERSATION_STATUS.CLOSED
                      && (
                        <Alert
                          color='info'
                          severity='info'>
                          This conversation is Closed. You cannot respond this Lawyer anymore.
                        </Alert>
                      )}

                    {status === CONVERSATION_STATUS.OPEN
                      && (
                        <div className="float-right">
                          <div className="right-side-dark-para">
                            Do you want to continue your case with this lawyer?
                          </div>
                          <div className="btns-reply-lawyer">
                            <Button
                              color='primary'
                              variant='outlined'
                              onClick={() => this.setButton(1)}>
                              No
                            </Button>
                            <Button
                              style={{ marginLeft: '5px',background:'#feb41c',color:'#fff' }}
                              color='primary'
                              variant='outlined'
                              onClick={() => this.setButton(2)}>
                              Yes
                            </Button>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Drawer classes={{ paper: classes.paper }} anchor="bottom" open={open}>
            <div>
              <span
                onClick={this.closeDrawer}
                style={{ float: "right", padding: "20px" }}>
                <i className="fa fa-close"></i>
              </span>
              <div className="container bottom-drawer-area">
                <div className="col-md-offset-3 col-md-7">
                  {buttonId === 1
                    && (
                      <CloseConversation
                        onNo={() => this.setState({ open: false })}
                        onYes={() => this.handleCloseConversation({ id })}
                      />
                    )}
                  {buttonId === 2 && this.chooseNext()}
                  {buttonId === 3
                    && (
                      <ReplyToLawyer
                        {...this.state}
                        handleReply={(data) => this.handleReply({ ...data, id })}
                      />
                    )}
                  {buttonId === 4
                    && (
                      <BookConsultation
                        {...this.props}
                        {...this.state}
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
                  Your conversation has been closed
              </div>
                <div className="text-center dialog-subhead">
                  Go back to your answers
              </div>
              </div>
              <div className="user-profile-btn">
                <Button
                  onClick={this.closePopupCancelConsult}>
                  Ok
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { questions } = user || {};
  return {
    ...questions
  };
};

const withRedux = connect(mapStateToProps, actions);

export default compose(withStyles(styles), withRedux)(UserViewAnswer);
