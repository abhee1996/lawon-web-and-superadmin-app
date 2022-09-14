
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import PersonalSettings from '../../components/molecules/personalsettings';
import LawyerProfileSettings from '../../components/molecules/lawyerprofilesettings';
import ConnectionSettings from '../../components/molecules/connectionsettings';
import NotificationSettings from '../../components/molecules/notificationsettings';

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

class AccountSettings extends React.Component {
  state = {
    open: false,
    shownGroup: 0,
    buttonId: null
  };

  componentDidMount() {
    const { location } = this.props;
    const { search } = location || {};
    const { message, error } = queryString.parse(search);

    const googleAuthPopup = window.opener;
    if (googleAuthPopup && (message || error)) {
      googleAuthPopup.postMessage({ message, error }, window.location.origin);
    }
  }

  setButton = (id) => {
    this.setState({ buttonId: id, open: true });
  }


  handleDrawerClose = () => {
    this.setState({
      open: false,
    });
  };


  render() {
    const { classes } = this.props;
    const { open, buttonId } = this.state;


    return (
      <div className='main'>
        <div className='container-fluid no-padding'>
          <div className={classes.root}>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open,
              })}>
              <div className=''>
                <div class="dashboard-main-heading">
                  <Link to='/main/dashboardmaster/admindashboard'>
                    <span className='top-heading-arrow'>
                      <i className='fa fa-arrow-left' />
                    </span>
                  </Link>
                  Account Settings
                </div>
              </div>
              <div className='admin-options-section'>
                <div className='col-sm-12 dashboard-admin-options' onClick={() => this.setButton(1)}>
                  <div className='col-sm-1 options-img'>
                    <img src={require('../../assets/img/icon-user.png')} />
                  </div>
                  <div className='col-sm-10'>
                    <div className='dashboard-options-heading'>

                      Personal Settings</div>
                    <div className='dashboard-options-subheading'>
                      Your name and contact details</div>
                  </div>
                </div>
                <div className='col-sm-12 dashboard-admin-options' onClick={() => this.setButton(2)}>
                  <div className='col-sm-1 options-img'>
                    <img src={require('../../assets/img/icon-profile.png')} />
                  </div>
                  <div className='col-sm-10'>
                    <div className='dashboard-options-heading'>
                      Lawyer Profile</div>
                    <div className='dashboard-options-subheading'>
                      Your law speciality, bio and availability</div>
                  </div>
                </div>
                <div className='col-sm-12 dashboard-admin-options' onClick={() => this.setButton(3)}>
                  <div className='col-sm-1 options-img'>
                    <img src={require('../../assets/img/icon-connection.png')} />
                  </div>
                  <div className='col-sm-10'>
                    <div className='dashboard-options-heading'>
                      Connections</div>
                    <div className='dashboard-options-subheading'>
                      Connect your calendar to LawOn</div>
                  </div>
                </div>
                <div className='col-sm-12 dashboard-admin-options' onClick={() => this.setButton(4)}>
                  <div className='col-sm-1 options-img'>
                    <img src={require('../../assets/img/icon-user.png')} />
                  </div>
                  <div className='col-sm-10'>
                    <div className='dashboard-options-heading'>
                      Notifications Settings</div>
                    <div className='dashboard-options-subheading'>
                      Control what emails you get from LawOn</div>
                  </div>
                </div>
              </div>

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
                {buttonId === 1 && <PersonalSettings />}
                {buttonId === 2 && <LawyerProfileSettings />}
                {buttonId === 3 && <ConnectionSettings />}
                {buttonId === 4 && <NotificationSettings />}

              </div>

            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(AccountSettings);
