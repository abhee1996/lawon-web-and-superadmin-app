
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import compose from 'recompose/compose';

import { Button, TYPES } from '../../components/atoms/YellowButton';
import AddColleague from '../../components/molecules/addcolleague';
import EditTeamMember from '../../components/molecules/editteammember';
import * as actions from '../../actions/lawyer';

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

class ManageYourTeam extends React.Component {
  state = {
    open: false,
    shownGroup: 0,
    selectedLawyer: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      lawyersList: [],
      load: false,
      selectedlawyerID: ''
    }
  }

  componentDidMount() {
    const { getLawyers } = this.props;
    getLawyers();
  }


  handleDrawerOpen = (setting) => {
    this.setState({ open: true });
    if (setting === 1) {
      this.setState({ shownGroup: 1 });
    }

    else if (setting === 2) {
      this.setState({ shownGroup: 2 });
    }

    return null
  };

  async handleDrawerOpenContent(lawyerId) {
    const { manageLawers } = this.props;
    const { lawyers = [] } = manageLawers || {};

    const selectedLawyer = lawyers.find(({ id }) => id === lawyerId);
    this.setState({
      shownGroup: 2,
      open: true,
      selectedLawyer
    });
  };


  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeInput = ({ target: { name, value }}) => {
    this.setState({ 
      ...this.state,
      selectedLawyer: {
        ...this.state.selectedLawyer,
        [name]: value 
      }
    });
  }

  render() {
    const { classes, manageLawers, loading } = this.props;
    const { lawyers = [] } = manageLawers || {};
    const { open } = this.state;

    return (
      <div className='main'>
        <div className='container-fluid no-padding'>
          <div className={classes.root}>

            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}>
              <div className='manage-team'>
                <div class="dashboard-main-heading">
                  <Link to='/main/dashboardmaster/admindashboard'>
                    <span className='top-heading-arrow'>
                      <i className='fa fa-arrow-left'></i>
                    </span>
                  </Link>
                  Manage Your Team
                </div>
                <Button
                  text='Add Colleague'
                  type='submit'
                  onClick={() => this.handleDrawerOpen(1)}
                  buttonType={TYPES.TopDashbord}
                />
              </div>

              <div className='admin-options-section'>
                  {lawyers.length > 0 ?
                    <div>
                      {lawyers.map((({ firstName, lastName, jobTitle, email, isActive, imageUrl, id }) =>
                        <div className='col-sm-12 dashboard-admin-options team-list' onClick={() => this.handleDrawerOpenContent(id)}>
                          <div className='col-sm-1'>
                            <div className='box-image'>
                              <Avatar src={imageUrl}/>
                            </div>
                          </div>
                          <div className='col-sm-2'>
                            <div class="team-list-name">{firstName} {lastName}</div>
                            <div class="team-list-para">{jobTitle}</div>
                          </div>
                          <div className='col-sm-6'>
                            <div class="team-list-para team-email">{email}</div>
                          </div>
                          <div className='col-sm-2 user-status'>
                            {isActive ? <span>Active</span> : <span>Inactive</span>}
                          </div>
                        </div>
                      ))
                      }
                    </div>
                    :
                    <div className='text-center'><h1>Record Not Found</h1></div>}
              </div>
            </main>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="right"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <span className='close-cross' onClick={() => this.handleDrawerClose()}>X</span>
              <div className='account-settings-area'>
                {
                  this.state.shownGroup === 1 && 
                  <AddColleague
                    {...this.props}
                    onClose={this.handleDrawerClose}
                  />
                }
                {
                  this.state.shownGroup === 2 && 
                  <EditTeamMember
                    {...this.state}
                    {...this.props}
                    handleChangeInput={this.handleChangeInput}
                    onDrawerClose={this.handleDrawerClose}
                  />}
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ lawyer }) => ({ ...lawyer });

const withRedux = connect(mapStateToProps, actions);

export default compose(
  withStyles(styles, { withTheme: true }),
  withRedux
)(ManageYourTeam);