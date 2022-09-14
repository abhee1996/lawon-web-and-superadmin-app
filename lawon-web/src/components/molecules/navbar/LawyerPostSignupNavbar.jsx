import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Menu, MenuItem, IconButton, Avatar, Tooltip } from '@material-ui/core';
import { Help, Notifications } from '@material-ui/icons';

import { connect } from 'react-redux';
import * as actions from '../../../actions/auth';


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

const Navbar = ({ lawyer, logoutLawyer }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { imageUrl, firstName, lastName } = lawyer || {};

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='fixed' className={classes.root}>
      <Toolbar>
        <a href='#/'>
          <Avatar
            className={classes.logo}
            variant='square'
            src={require("../../../assets/img/logo.png")}
          />
        </a>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%'
        }}>
          <Tooltip title='Notifications'>
            <IconButton
              size='small'>
              <Notifications />
            </IconButton>
          </Tooltip>
          <Tooltip title='Help'>
            <IconButton
              size='small'>
              <Help />
            </IconButton>
          </Tooltip>
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
            <MenuItem onClick={() => window.open('#/main/Help')}>Get Help</MenuItem>
            <MenuItem onClick={logoutLawyer}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = ({ auth }) => ({ ...auth });

export default connect(mapStateToProps, actions)(Navbar);
