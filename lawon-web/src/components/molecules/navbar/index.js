import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Menu, MenuItem, IconButton, Avatar, BottomNavigation, BottomNavigationAction, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../../actions/user/auth';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    background: '#fff',
    color: '#gray'
  },
  logo: {
    width: '80px',
    height: '20px'
  },
  toolbar: {
    marginLeft: '20px'
  },
  navigation: {
    marginLeft: '60px'
  },
  navigationAction: {
    fontSize: '14px',
    fontWeight: 'bold'
  }
});

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  palette: {
    primary: {
      main: '#feb41c',
    }
  },
  typography: {
    htmlFontSize: 12
  }
});

const getQuestionValue = () => {
  const consultationsRoutes = [
    '#/main/userallquestions',
    '#/main/askalawyer',
    '#/main/askalawyerdescription',
    '#/main/askalawyerconfirm',
    '#/main/userviewquestion/',
    '/main/question/conversation/'
  ];

  const route = consultationsRoutes.find(x => x == window.location.hash);
  if (route) return route;

  if (consultationsRoutes.some(x => window.location.hash.includes(x)))
  return window.location.hash;
}

const getConsultationValue = () => {
  const consultationsRoutes = [
    '#/main/userallconsultations',
    '#/main/userbookconsultation',
    '#/main/user/consultation',
    '#/main/consultation'
  ];

  const route = consultationsRoutes.find(x => x == window.location.hash);
  if (route) return route;

  if (consultationsRoutes.some(x => window.location.hash.includes(x)))
  return window.location.hash;
}

const getInstructionValue = () => {
  const consultationsRoutes = [
    '#/main/userallinsturctions',
    '#/main/user/instructions/details'
  ];

  const route = consultationsRoutes.find(x => x == window.location.hash);
  if (route) return route;

  if (consultationsRoutes.some(x => window.location.hash.includes(x)))
  return window.location.hash;
}

const Navbar = ({ user, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { imageUrl, firstName, lastName } = user || {};

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <div class="notification-container" id="notificationContainer">
        <div class="notification-grid-header">
          <h3>Notifications</h3>
        </div>
        <div id="notification-list" class="notification-list">
          <div className='notify-item'>
            <img
              style={{ display: 'inline' }}
              height="30"
              src={require("../../../assets/img/user-dummy.png")}
            />
            <div
              style={{ display: 'inline', marginLeft: '5px' }}
            >New request from user</div>
            {/* <p class="no-notify">No new notification</p> */}
          </div>


        </div>
        <div class="notification-grid-footer"></div>
      </div>

      <MuiThemeProvider theme={theme}>
        <AppBar position='fixed' className={classes.root}>
          <Toolbar>
            <a href='#/'>
              <Avatar
                className={classes.logo}
                variant='square'
                src={require("../../../assets/img/logo.png")}
              />
            </a>
            <BottomNavigation className={classes.navigation} value={window.location.hash}>
              <BottomNavigationAction
                label={<span className={classes.navigationAction}>Dashboard</span>}
                value="#/main/userdashboardmain"
                onClick={() => (window.location = '#/main/userdashboardmain')}
                showLabel={true}
              />
              <BottomNavigationAction
                label={<span className={classes.navigationAction}>Questions</span>}
                value={getQuestionValue()}
                onClick={() => (window.location = '#/main/userallquestions')}
                showLabel={true}
              />
              <BottomNavigationAction
                label={<span className={classes.navigationAction}>Consultations</span>}
                value={getConsultationValue()}
                onClick={() => (window.location = '#/main/userallconsultations')}
                showLabel={true}
              />
              <BottomNavigationAction
                label={<span className={classes.navigationAction}>Instructions</span>}
                value={getInstructionValue()}
                onClick={() => (window.location = '#/main/userallinsturctions')}
                showLabel={true}
              />
            </BottomNavigation>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%'
            }}>
              <Link target='_blank' to='/main/Help'>
                <span className='notify-bell'>
                  <i className='fa fa-question-circle'></i>
                </span>
              </Link>
              <span className='notify-bell'>
                <i className='fa fa-bell'></i>
              </span>
              <IconButton
                onClick={handleClick}
                aria-controls="simple-menu"
                aria-haspopup="true">

                <Avatar src={imageUrl} />
              </IconButton>
              <div style={{ maxWidth: '150px' }}>{firstName} {lastName}</div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ width: '170px', fontSize: '14px' }}>
                <MenuItem onClick={() => (window.location = '#/main/userprofile')}>Profile</MenuItem>
                <MenuItem onClick={() => (window.location = '#/main/user/payment-history')}>Payment History</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

const mapStateToProps = ({ user }) => {
  const { auth } = user || {};
  return { ...auth };
}

export default connect(mapStateToProps, actions)(Navbar);
