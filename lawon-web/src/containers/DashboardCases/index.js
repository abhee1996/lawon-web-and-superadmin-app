import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Avatar } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { connect } from 'react-redux';
import { findKey } from 'lodash';
import moment from 'moment';
import LoadingBar from 'react-top-loading-bar'

import DashboardHeading from '../../components/atoms/DashboardMainHeading'
import HandleCases from '../../components/molecules/handlecases'
import * as actions from '../../actions/instruction';
import { INSTRUCTION_STATUS } from '../../constants';
import { EmptyList } from '../../components/molecules/NotFound/EmptyView';

const drawerWidth = 550;

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
    flexShrink: 0
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

class DashboardCases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidMount() {
    const { getInstructions } = this.props;
    getInstructions();
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  handleDrawerOpenContent = (id) => {
    const { getInstructionsById } = this.props;

    getInstructionsById({ id }).then(() => {
      this.setState({ open: true });
    })
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handlePageNo = (page) => {
    const { setPage, getInstructions } = this.props;
    setPage({ page });
    getInstructions();
  }

  render() {
    const { classes, instructions = [], total, pagination } = this.props;
    const { page, pageSize } = pagination;
    const { open } = this.state;

    const maxPage = Math.ceil(total/ pageSize);

    return (
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
              })} >
              <div className=''>
                <DashboardHeading text='Cases' />
              </div>
              <div className='admin-options-section cases-section row'>
                {(!instructions || !instructions.length)
                  && <EmptyList>No Cases Found</EmptyList>}
                {instructions.map(({ id, status, createdAt, User }, index) => {
                  const { firstName, lastName, imageUrl } = User || {};
                  return (
                    <div key={index} className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent(id)}>
                      <div className='col-sm-1'>
                        <div className='box-image'>
                          <Avatar src={imageUrl} />
                        </div>
                      </div>
                      <div className='col-sm-7'>
                        <div class="team-list-name">{`${firstName} ${lastName}`} </div>
                      </div>
                      <div className='col-sm-2'>
                        <div class="team-list-para">{findKey(INSTRUCTION_STATUS, (value) => value === status)}</div>
                      </div>
                      <div className='col-sm-2'>
                        <div class="team-list-para">{moment(createdAt).format('DD MMMM YYYY')}</div>
                        <div class="team-list-para">{moment(createdAt).format('HH:mm')}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='pagination-dim'>
                <Pagination
                  page={page}
                  count={maxPage}
                  disableRipple={true}
                  color='primary'
                  onChange={(e, page) => this.handlePageNo(page)}
                />
              </div>
            </main>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="right"
              open={open}
              classes={{ paper: classes.drawerPaper }}>
              <span className='close-cross' onClick={() => this.handleDrawerClose()}>X</span>
              <div className='account-settings-area'>
                <HandleCases {...this.state} {...this.props} />
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}

const wrappedDashboardCases = withStyles(styles, { withTheme: true })(DashboardCases);

const mapStateToProps = ({ instruction }) => ({
  ...instruction
});

export default connect(mapStateToProps, actions)(wrappedDashboardCases)
