
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import LoadingBar from 'react-top-loading-bar';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Avatar } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import DashboardHeading from '../../components/atoms/DashboardMainHeading';
import HandleConsultations from '../../components/molecules/handleconsultations';
import * as actions from '../../actions/consultation';
import CallView from './CallView';
import { EmptyList } from '../../components/molecules/NotFound/EmptyView';

const drawerWidth = 550;

const CONSULTATION_STATUS = {
  ACTIVE: 1,
  CLOSED: 2,
  CANCELED: 3,
  RESCHEDULED: 4
};

const allStatus = ['Active', 'Closed', 'Canceled', 'Active-Rescheduled'];
const channelType = ['Phnoe Call', 'Video Call'];

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    top: 67
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
});

class DashboardConsultations extends React.Component {
  componentDidMount() {
    this.handleAll();
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  state = {
    open: false,
    shownGroup: 0,
    selectedConsultationId: '',
    showCallView: false,
    showConsultations: true
  };

  handleDrawerOpenContent = (id) => {
    const { getConsultationDetails } = this.props;

    getConsultationDetails({ id }).then(() => {
      this.setState({
        shownGroup: 1,
        open: true,
        selectedConsultationId: id
      });
    })
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleStatus = (status) => {
    const { setConsultaionStatus, setConsultaionArchived, getConsultations, lawyerId } = this.props;
    setConsultaionStatus(status);
    setConsultaionArchived(false);
    getConsultations({ lawyerId });
  }

  handleArchived = () => {
    const { setConsultaionArchived, setConsultaionStatus, getConsultations, lawyerId } = this.props;
    setConsultaionArchived(true);
    setConsultaionStatus('');
    getConsultations({ lawyerId });
  }

  handleAll = () => {
    const { getConsultations, setConsultaionArchived, setConsultaionStatus, lawyerId } = this.props;
    setConsultaionArchived('');
    setConsultaionStatus('');
    getConsultations({ lawyerId });
  }

  handleCallBtns = () => {
    const { showCallView, showConsultations, selectedConsultationId } = this.state;
    const { makeCall } = this.props;

    this.setState({
      showCallView: !showCallView,
      showConsultations: !showConsultations,
      open: false
    });

    makeCall({ consultationId: selectedConsultationId });
  }

  handleJoinCall = ({ token, sessionId }) => {
    const { setSession } = this.props;
    const { showCallView, showConsultations } = this.state;

    setSession({ sessionId, token });
    this.setState({
      showCallView: !showCallView,
      showConsultations: !showConsultations,
      open: false
    });
  }

  handleOpenDetails = () => {
    this.setState({ open: true });
  }

  imageClick = (e) => {
    console.log('Click', e);
  }

  render() {
    const { classes, theme, consultations } = this.props;
    const { open, showCallView, showConsultations } = this.state;
    const { ACTIVE, CLOSED, RESCHEDULED } = CONSULTATION_STATUS;

    return (
      <React.Fragment>

        <div className='main'>
          <LoadingBar
            onRef={ref => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />

          <div className='container-fluid no-padding'>
            <div className={classes.root}>
              <main
                className={classNames(classes.content, {
                  [classes.contentShift]: open,
                })}>
                {showCallView && <CallView {...this.props} onOpenDtails={this.handleOpenDetails} />}
                {showConsultations &&
                  <div>
                    <div className=''>
                      <DashboardHeading
                        text='Consultations'
                      />
                      <div className='filter-enquiries'>
                        <span onClick={this.handleAll} className='active-filter'>ALL</span>
                        <span onClick={() => this.handleStatus(ACTIVE)}>ACTIVE</span>
                        <span onClick={() => this.handleStatus(RESCHEDULED)}>RESCHEDULED</span>
                        <span onClick={() => this.handleStatus(CLOSED)}>COMPLETED</span>
                        <span onClick={this.handleArchived}>ARCHIVED</span>
                      </div>
                    </div>
                    <div className='admin-options-section cases-section'>
                      {(!consultations || !consultations.length)
                        && <EmptyList>No Consultation Found</EmptyList>}
                      {consultations.map(consultation => (
                        <div className='col-sm-12 dashboard-consult-options pr0' onClick={() => this.handleDrawerOpenContent(consultation.id)}>

                          <div className='col-sm-1'>
                            <div className='box-image'>
                              <Avatar src={consultation.User.imageUrl} />
                            </div>
                          </div>

                          <div className='col-sm-3'>
                            <div class="team-list-name">{consultation.User.firstName} {consultation.User.lastName} </div>
                          </div>
                          <div className='col-sm-2'>
                            <div class="team-list-para">{channelType[consultation.channel - 1]}</div>
                          </div>
                          <div className='col-sm-2'>
                            <div class="team-list-para">{allStatus[consultation.status - 1]}</div>
                          </div>
                          <div className='col-sm-2'>
                            <div class="team-list-para consult-date">{moment(consultation.createdAt).format('DD MMMM YYYY')}</div>
                            <div class="">{moment(consultation.createdAt).format('HH:mm')}</div>
                          </div>
                          <div className='col-sm-2 no-padding'>
                            <div className='cousult-timeleft-box' style={{ width: '136px' }}>
                              <div>{moment(consultation.startTime).fromNow()}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              </main>
              <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                  paper: classes.drawerPaper,
                }}>
                <span className='close-cross' onClick={() => this.handleDrawerClose()}>
                  X
                </span>
                <div className='account-settings-area'>
                  {this.state.shownGroup == 1 &&
                    <HandleConsultations
                      {...this.state}
                      {...this.props}
                      onCall={this.handleCallBtns}
                      onCallJoin={this.handleJoinCall}
                    />}
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const wrappedComponent = withStyles(styles, { withTheme: true })(DashboardConsultations);

const mapStateToProps = ({ consultation }) => ({
  ...consultation
});

export default connect(mapStateToProps, actions)(wrappedComponent);
