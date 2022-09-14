import React, { Component } from 'react';
import NavBar from '../../components/molecules/navbar'
import SideBar from '../../components/molecules/sidebar'
import RightSideBar from '../../components/molecules/dashboardRightSidebar'
import { connect } from 'react-redux';

class DashboardMasterPage extends Component {
  render() {
    // const { isLogin, history } = this.props;
    // if(!isLogin) {
    //   history.push('/main/login');
    // }

    return (
      <div>
        <RightSideBar />
        <SideBar />
      </div>
    );
  }
}

const mapStateToProps = ({ common }) => ({ ...common });

export default connect(mapStateToProps, null)(DashboardMasterPage);