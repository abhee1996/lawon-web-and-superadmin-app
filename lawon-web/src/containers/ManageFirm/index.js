
import React from 'react';
import classNames from 'classnames';
import { Drawer, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import DashboardHeading from '../../components/atoms/DashboardMainHeading'
import DashboardSubHeading from '../../components/atoms/DashboardSubHeading'

import FirmContactInfo from '../../components/molecules/firmcontactinfo'
import FirmDescription from '../../components/molecules/firmdescription'
import FirmAwards from '../../components/molecules/firmawards'
import FirmPracticeArea from '../../components/molecules/firmpracticearea'
import FirmBranches from '../../components/molecules/managefirmbranches'



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

class ManageYourFirm extends React.Component {
  state = {
    shownGroup: 0,
    mobileOpen: false,
  };
  
  constructor() {
    super();
    this.state = {
      buttonId: 1,
      open: true
    }
  };

  setButton = (id) => {
    this.setState({ buttonId: id, open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
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
              <div className='dashboard-main-heading'>
                <Link to='/main/dashboardmaster/admindashboard'>
                  <span className='top-heading-arrow'>
                    <i className='fa fa-arrow-left' />
                  </span>
                </Link>
                Manage Your Firm
                <DashboardSubHeading text='Admin' />
              </div>
              <div className='admin-options-section'>
                <div className='col-sm-12 dashboard-admin-options' onClick={() => this.setButton(1)}>
                  <div className='col-sm-1 options-img'>
                    <img src={require('../../assets/img/firm-contact.png')} />
                  </div>
                  <div className='col-sm-10'>
                    <div className='dashboard-options-heading'>
                      Contact Information</div>
                    <div className='dashboard-options-subheading'>
                      Address, phone number</div>
                  </div>
                </div>
                <div className='col-sm-12 dashboard-admin-options' onClick={() => this.setButton(2)}>
                  <div className='col-sm-1 options-img'>
                    <img src={require('../../assets/img/firm-description.png')} />
                  </div>
                  <div className='col-sm-10'>
                    <div className='dashboard-options-heading'>
                      Description</div>
                    <div className='dashboard-options-subheading'>
                      Your company bio</div>
                  </div>
                </div>
                <div className='col-sm-12 dashboard-admin-options' onClick={() => this.setButton(3)}>
                  <div className='col-sm-1 options-img'>
                    <img src={require('../../assets/img/firm-award.png')} />
                  </div>
                  <div className='col-sm-10'>
                    <div className='dashboard-options-heading'>
                      Awards & Accreditations</div>
                    <div className='dashboard-options-subheading'>
                      Upload any awards and accreditations</div>
                  </div>
                </div>
                <div className='col-sm-12 dashboard-admin-options' onClick={() => this.setButton(4)}>
                  <div className='col-sm-1 options-img'>
                    <img src={require('../../assets/img/firm-practice.png')} />
                  </div>
                  <div className='col-sm-10'>
                    <div className='dashboard-options-heading'>
                      Practice Areas</div>
                    <div className='dashboard-options-subheading'>
                      Define what are your firm specialities</div>
                  </div>
                </div>
                <div className='col-sm-12 dashboard-admin-options' onClick={() => this.setButton(5)}>
                  <div className='col-sm-1 options-img'>
                    <img src={require('../../assets/img/firm-branch.png')} />
                  </div>
                  <div className='col-sm-10'>
                    <div className='dashboard-options-heading'>
                      Branches</div>
                    <div className='dashboard-options-subheading'>
                      Select towns where your firm have branches</div>
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
              <span className='close-cross' onClick={() => this.handleDrawerClose()}> X</span>
              <div className='account-settings-area'>
                {buttonId === 1 && <FirmContactInfo />}
                {buttonId === 2 && <FirmDescription />}
                {buttonId === 3 && <FirmAwards />}
                {buttonId === 4 && <FirmPracticeArea />}
                {buttonId === 5 && <FirmBranches />}
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ManageYourFirm);
