import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import moment from 'moment';
import LoadingBar from 'react-top-loading-bar';
import {
  Dialog,
  Drawer,
  DialogContent,
  withStyles,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  createMuiTheme,
  MuiThemeProvider,
  Button
} from '@material-ui/core';
import { ExpandMore, Refresh } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';

import * as actions from '../../actions/user/questions';
import CancelMatter from './CloseMetterContent';
import { EmptyList } from '../../components/molecules/NotFound/EmptyView';

const styles = {
  list: { width: 250 },
  fullList: { width: 'auto' },
  paper: { height: 'calc(100% - 350px)' }
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

const allStatus = ['Active', 'Closed'];


class UserAllQuestions extends Component {
  constructor() {
    super();
    this.state = {
      displayMenu: false,
      dialogOpen: false,
      buttonId: null,
      open: false,
      anchorEl: null,
      selectedIndex: ''
    };
  };

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;

    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  closeDrawer = () => {
    this.setState({ open: false });
  }

  setButton = ({ btnId, id }) => {
    this.setState({
      buttonId: btnId,
      open: true,
      selectedQuestionId: id
    });
    this.handleClose();
  }
  openPopupCancelConsult = () => {
    this.setState({ dialogOpen: true, open: false });
  };

  closePopupCancelConsult = () => {
    this.setState({ dialogOpen: false });
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
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

  handlePageNo = (page) => {
    const { setPage, getQuestions } = this.props;

    setPage({ page });
    getQuestions();
  }

  handleSetStatusFilter = ({ target: { value } }) => {
    const { setPage, getQuestions, setStatusFilter } = this.props;

    setPage({ page: 1 });
    setStatusFilter({ status: value });
    getQuestions();
  }

  render() {
    const { questions = [], classes, history, pagination, total, getQuestions, loading } = this.props;
    const { page, pageSize } = pagination || {};
    const maxPage = Math.ceil(total / pageSize);
    const { open, anchorEl, buttonId, selectedIndex } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className='user-main-content'>
          <LoadingBar
            onRef={ref => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />
          <div className='container'>
            <h1>Questions</h1>
            <div className='user-con-filter page-extras'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControl variant="outlined" style={{ width: '110px' }} size='small'>
                  <InputLabel id='filter-label'>Status</InputLabel>
                  <Select
                    onChange={this.handleSetStatusFilter}
                    labelId='filter-label'
                    label="Status">
                    <MenuItem value='all'>All</MenuItem>
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={2}>Closed</MenuItem>
                  </Select>
                </FormControl>
                <IconButton
                  onClick={getQuestions}
                  disabled={loading}
                  style={{ marginLeft: '5px' }}>
                  <Refresh />
                </IconButton>
              </div>
              <button
                className='btn top-dashboard-btn'
                onClick={() => (window.location = '#/main/askalawyer')}>
                Ask the Lawyer
              </button>
            </div>

            <div className='user-all-con-table col-md-12'>
              <div className='row user-con-table-head'>
                <div className='col-md-6'>QUESTION</div>
                <div className='col-md-2'>DATE ASKED</div>
                <div className='col-md-2'>ANSWERS  </div>
                <div className='col-md-2'>Status</div>
                <div className='col-md-2'></div>
              </div>

              <div className='row user-con-table-body'>
                {
                  (!questions || !questions.length)
                  && <EmptyList>No Question Found</EmptyList>
                }
                {
                  questions.map(({ id, title = '', status, createdAt, EnquiryConversations }, index) => (
                    <div className='col-md-12 no-padding user-con-table-detail' key={id}>
                      <div className='col-md-6'>
                        {title.length > 70 ? `${title.slice(0, 70).trim()}...` : title}
                      </div>
                      <div className='col-md-2'>{moment(createdAt).format('DD/MM/YYYY, HH:mm')}</div>
                      <div className='col-md-2'>{EnquiryConversations.length} Responses</div>
                      <div className='col-md-1'>{allStatus[status - 1]}</div>

                      <div className="col-md-1 user-con-angle-down" style={{ float: 'right' }}>
                        <IconButton
                          size='small'
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
                          onClick={() => history.push(`/main/userviewquestion/${id}`)}>
                          View Question
                        </MenuItem>
                        {status === 1
                          && (
                            <MenuItem
                              key={2}
                              onClick={() => this.setButton({ btnId: 1, id })}>
                              Close Question
                            </MenuItem>
                          )}
                      </Menu>
                    </div>
                  ))
                }
              </div>
            </div>
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

          <Drawer
            classes={{ paper: classes.paper }}
            anchor="bottom"
            open={open}>
            <div>
              <div className='container bottom-drawer-area'>
                <div className='col-md-offset-3 col-md-7'>
                  {
                    buttonId === 1
                    && <CancelMatter {...this.props} {...this.state} onClose={this.closeDrawer} />
                  }
                  {buttonId === 2 && this.changeCallTypeDrawer()}
                  {buttonId === 3 && this.cancelConsultationDrawer()}
                  {buttonId === 4 && this.reschedulaeConsultationDrawer()}
                </div>
              </div>
            </div>
          </Drawer>
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.dialogOpen}>

            <DialogContent>
              <div className='user-consult-dialog'>
                <div className='dialog-head text-center'>
                  Your matter has been closed
              </div>
              </div>
              <div className='user-profile-btn'>
                {/* <Button
                  text='OK'
                  type='button'
                  onClick={() => this.closePopupCancelConsult()}
                  buttonType={TYPES.Generic}
                /> */}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { questions } = user || {};
  return {
    ...questions
  }
}

const withRedux = connect(mapStateToProps, actions);

export default compose(
  withStyles(styles),
  withRedux
)(UserAllQuestions);