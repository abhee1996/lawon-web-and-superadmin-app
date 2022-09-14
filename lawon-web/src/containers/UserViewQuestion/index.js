import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import moment from "moment";
import LoadingBar from "react-top-loading-bar";
import { withStyles, IconButton, Menu, MenuItem, createMuiTheme, MuiThemeProvider, } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ExpandMore, WorkOutline, MailOutlineSharp, PermDeviceInformationOutlined, AttachFile } from "@material-ui/icons";
import { round } from 'lodash';

import { getTotalPrice } from "../../utils/utils";
import * as actions from "../../actions/user/questions";
import { CONVERSATION_STATUS } from '../../common/constants';
import { EmptyList } from '../../components/molecules/NotFound/EmptyView';
import AttachmentModal from './AttachmentModal';

const styles = () => ({
  listItemText: { fontSize: "24px" }
});

const statuses = ['Open', 'Closed'];

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

class UserViewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      dialogOpen: false,
      buttonId: null,
      open: false,
      anchorEl: null,
      selectedIndex: '',
      isAttachementModalOpen: false
    };
  }

  componentDidMount() {
    const { getConversations, match } = this.props;
    const { params } = match;
    const { id } = params || {};

    getConversations({ id });
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;

    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleClick = ({ currentTarget }, index) => {
    this.setState({
      anchorEl: currentTarget,
      selectedIndex: index
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      selectedIndex: ''
    });
  };

  render() {
    const { conversation, history } = this.props;
    const {
      title,
      problem,
      createdAt,
      EnquiryConversations = [],
      EnquriyAttachments = [],
      SubCategory = {}
    } = conversation || {};

    const { anchorEl, selectedIndex } = this.state;
    const { name } = SubCategory || {}
    return (
      <MuiThemeProvider theme={theme}>
        <div className="user-main-content-consultation">
          <LoadingBar
            onRef={ref => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />
          <div className="container-fluid user-consultation-upper">
            <div className="col-md-12">
              <div className="col-md-4 gray-text pointer">
                <span>
                  <i class="fa fa-angle-left"></i>
                </span>
                <Link to="/main/userallquestions">
                  <span> GO BACK TO ALL QUESTIONS</span>
                </Link>
              </div>
              <div className="col-md-6 pl0">
                <div className="user-consult-book-time">
                  <span>
                    Asked on {moment(createdAt).format("DD/MM/YY")} at {moment(createdAt).format("HH:mm")}
                  </span>
                  <span>SubCategory: {name}</span>
                </div>
                <h4 class="bold">{title}</h4>
                <div className="right-side-light-para">{problem}</div>
                <div style={{
                  marginTop: '10px',
                  fontWeight: 'bold',
                  fontSize: 'small',
                  color: 'gray',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <IconButton
                    onClick={() => EnquriyAttachments.length && this.setState({ isAttachementModalOpen: true })}
                    size='small'>
                    <AttachFile/>
                  </IconButton>
                  Attachments ({EnquriyAttachments.length})
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
          <div className="">
            <div className="container">
              <h3>Answers</h3>
              <div className="user-all-con-table col-md-12">
                <div className="row user-con-table-head">
                  <div className="col-md-2">Lawyer</div>
                  <div className="col-md-2">Firm</div>
                  <div className="col-md-2">RECEVIED</div>
                  <div className="col-md-2">FEE</div>
                  <div className="col-md-2">Status</div>
                  <div className="col-md-2"></div>
                </div>

                <div className="row user-con-table-body">
                {(!EnquiryConversations || !EnquiryConversations.length)
                        && <EmptyList>You don't have any response from lawyer against your enquiry</EmptyList>}
                  {EnquiryConversations.map(({ id, Lawyer, createdAt, EnquiryQuotation, status, Instruction, Consultation }, index) => {
                    const { firstName, LastName, Organization } = Lawyer || {};
                    const { name } = Organization || {};

                    const { legalFee, estimatedDisbursements, vatTax, other } = EnquiryQuotation || {};
                    const total = getTotalPrice({ legalFee, vatTax, estimatedDisbursements, other });

                    return (
                      <div className="col-md-12 no-padding user-con-table-detail">
                        <div className="col-md-2 right-side-dark-para">
                          {firstName} {LastName}
                        </div>
                        <div className="col-md-2">{name}</div>
                        <div className="col-md-2">
                          {moment(createdAt).format("DD/MM/YYYY, HH:mm")}
                        </div>
                        <div className="col-md-2 right-side-bold-yellow">
                          {EnquiryQuotation ? `£${round(total, 2).toFixed(2)}` : 'N/A'}
                        </div>
                        <div className="col-md-2">{statuses[status - 1]}</div>

                        <div className="col-md-2 user-con-angle-down" style={{ float: 'right', width: '200px', display: 'flex' }}>
                          <div
                            style={{
                              marginRight: '30px',
                              width: '70px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              color: '#80808042'
                            }}>
                            <MailOutlineSharp/>
                            <PermDeviceInformationOutlined style={{ color: Consultation && 'black' }}/>
                            <WorkOutline style={{ color: Instruction && 'black' }}/>
                          </div>
                          <IconButton
                            size='small'
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={(e) => this.handleClick(e, index)}>
                            <ExpandMore />
                          </IconButton>
                        </div>
                        <Menu
                          id={id}
                          anchorEl={anchorEl}
                          keepMounted
                          open={selectedIndex === index}
                          onClose={this.handleClose}
                          PaperProps={{
                            style: { width: 150 }
                          }}>
                          <MenuItem
                            key={1}
                            onClick={() => history.push(`/main/question/conversation/${id}/repley`)}>
                            View Answer
                          </MenuItem>
                          {status === CONVERSATION_STATUS.OPEN
                            && (
                              <>
                                <MenuItem
                                  key={2}
                                  onClick={() => history.push(`/main/question/conversation/${id}/repley?action=respond`)}>
                                  Respond
                                </MenuItem>
                                <MenuItem
                                  key={3}
                                  onClick={() => history.push(`/main/question/conversation/${id}/repley?action=book_consultation`)}>
                                  Book a consultation
                                </MenuItem>
                                <MenuItem
                                  key={4}
                                  onClick={() => history.push(`/main/question/conversation/${id}/instruction`)}>
                                  Instruct the lawyer
                                </MenuItem>
                                <MenuItem
                                  key={5}
                                  onClick={() => history.push(`/main/question/conversation/${id}/repley?action=close_matter`)}>
                                  Close the matter
                                </MenuItem>
                              </>
                            )}
                        </Menu>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <AttachmentModal
            {...this.props}
            {...this.state}
            onClose={() => this.setState({ isAttachementModalOpen: false })}
          />
        </div>
      </MuiThemeProvider>
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

export default compose(withStyles(styles), withRedux)(UserViewQuestion);
