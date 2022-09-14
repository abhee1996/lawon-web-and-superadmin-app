import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { Pagination } from '@material-ui/lab';
import LoadingBar from "react-top-loading-bar";
import moment from 'moment';
import {
  withStyles,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  createMuiTheme,
  MuiThemeProvider,
  Button,
  IconButton,
  Tooltip,
  Menu
} from '@material-ui/core';
import { Refresh, ExpandMore } from '@material-ui/icons';

import "react-placeholder/lib/reactPlaceholder.css";
import * as actions from "../../actions/user/userConsultation";
import { EmptyList } from '../../components/molecules/NotFound/EmptyView';
import { CONSULTATION_STATUS } from '../../common/constants';

const styles = () => ({
  root: {},
  paper: {},
  listItemText: {
    fontSize: "24px"
  }
});

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

const allStatus = ['Active', 'Closed', 'Canceled', 'Active-Rescheduled'];
const channelType = ['Phnoe Call', 'Video Call'];

class UserAllConsultations extends Component {
  state = {
    open: false,
    anchorEl: null,
    selectedIndex: ''
  };

  componentDidMount() {
    const { getConsultaion } = this.props;
    getConsultaion();
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

  handleClick = ({ currentTarget }) => {
    this.setState({ anchorEl: currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handlePageNo = (page) => {
    const { setPage, getConsultaion } = this.props;

    setPage({ page });
    getConsultaion();
  }

  handleSetStatusFilter = ({ target: { value } }) => {
    const { setPage, getConsultaion, setStatusFilter } = this.props;

    setPage({ page: 1 });
    setStatusFilter({ status: value });
    getConsultaion();
  }

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
    const { anchorEl, selectedIndex } = this.state;
    const { allConsultations = [], history, pagination, total, getConsultaion, loading } = this.props;
    const { page, pageSize } = pagination || {};
    const maxPage = Math.ceil(total / pageSize);

    return (
      <MuiThemeProvider theme={theme}>
        <div className="user-main-content">
          <LoadingBar
            onRef={ref => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />

          <div className="container">
            <h1>Consultations</h1>
            <div className="user-con-filter page-extras">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControl variant="outlined" style={{ width: '110px' }} size='small'>
                  <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                  <Select
                    onChange={this.handleSetStatusFilter}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Status">
                    <MenuItem value='all'>All</MenuItem>
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={2}>Closed</MenuItem>
                    <MenuItem value={3}>Canceled</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip title='Refresh'>
                  <IconButton
                    disabled={loading}
                    onClick={getConsultaion}
                    style={{ marginLeft: '5px' }}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
              </div>
              <button
                style={{ margin: '0px' }}
                className='btn top-dashboard-btn'
                onClick={() => (window.location = '#/main/userbookconsultation')}>
                Book a new consultation
              </button>
            </div>

            <div className="user-all-con-table col-md-12">
              <div className="row user-con-table-head">
                <div className="col-md-2">Lawyer</div>
                <div className="col-md-2">Firm</div>
                <div className="col-md-2">Date</div>
                <div className="col-md-2">Call Type</div>
                <div className="col-md-2">Status</div>
                <div className="col-md-2"></div>
              </div>
              <div className="row user-con-table-body">
                {(!allConsultations || !allConsultations.length)
                  && <EmptyList>No Consultation Found</EmptyList>}
                {allConsultations.map(({ id, status, startTime, Lawyer, channel }, index) => {
                    const { firstName, lastName, Organization } = Lawyer || {};
                    const { name } = Organization || {};
                    return (
                      <div
                        className="col-md-12 no-padding user-con-table-detail">
                        <div className="col-md-2">{firstName} {lastName}</div>
                        <div className="col-md-2">{name || 'N/A'}</div>
                        <div className="col-md-2">{moment(startTime).format('DD/MM/YYYY, HH:mm')}</div>
                        <div className="col-md-2 right-side-bold-yellow">{channelType[channel - 1]}</div>
                        <div className="col-md-2">{allStatus[status - 1]}</div>

                        <div className="col-md-1 user-con-angle-down" style={{ float: 'right'}}>
                          <IconButton
                            style={{ padding: '1px' }}
                            aria-owns={Boolean(anchorEl) ? id : undefined}
                            aria-haspopup="true"
                            onClick={(e) => this.handleClick(e, index)}>
                            <ExpandMore />
                          </IconButton>
                        </div>
                        <Menu
                          id={id}
                          anchorEl={anchorEl}
                          open={index === selectedIndex}
                          onClose={this.handleClose}
                          PaperProps={{
                            style: { width: 150 }
                          }}>
                          <MenuItem
                            key={1}
                            onClick={() => history.push(`/main/consultation/${id}`)}>
                            View Consultation
                          </MenuItem>
                          {(status == CONSULTATION_STATUS.ACTIVE || status == CONSULTATION_STATUS.ACTIVE_RESCHEDULED)
                            && (
                              <>
                                <MenuItem
                                  onClick={() => history.push(`/main/consultation/${id}?action=reschedule`)}
                                  key={2}>
                                  Reschedule
                                </MenuItem>
                                <MenuItem
                                  onClick={() => history.push(`/main/consultation/${id}?action=cancel`)}
                                  key={2}>
                                  Cancel
                                </MenuItem>
                              </>
                            )}
                        </Menu>
                      </div>
                    )
                  }
                )}
              </div>
              <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'center' }}>
                <Pagination
                  page={page}
                  count={maxPage}
                  shape="rounded"
                  color='primary'
                  onChange={(e, page) => this.handlePageNo(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userConsultation } = user || {};
  return {
    ...userConsultation
  };
};

const withRedux = connect(mapStateToProps, actions);

export default compose(withStyles(styles), withRedux)(UserAllConsultations);
