import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { Rating } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
import { Business } from '@material-ui/icons'
import Popup from "../../components/molecules/ErrorPopup";

import * as action from "../../actions/user/organization";
import UserInstructFirmInfo from "./UserInstructFirmInfo";
import UserInstructFirmPeople from "./UserInstructFirmPeople";
import UserInstructFirmReviews from "./UserInstructFirmReviews";

class FirmProfile extends Component {
  state = {
    buttonId: 1,
    addActive: 1,
    dialogOpen: false,
  };

  componentDidMount() {
    const { getOrganization, match } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    getOrganization({ id });
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    if (loading) {
      this.LoadingBar.continuousStart();
    } else {
      this.LoadingBar.complete();
    }
  }

  setButton = (id) => {
    this.setState({
      buttonId: id,
      addActive: id,
    });
  };

  render() {
    const { buttonId, addActive } = this.state;
    const { organizationDetails } = this.props;
    const { name, address1, town, website, rating } = organizationDetails || {};
    const { rating: firmRating, total } = rating || {};

    return (
      <div className="user-main-content-consultation lawyer-profile">
        <LoadingBar
          onRef={(ref) => (this.LoadingBar = ref)}
          height={3}
          color="#feb41c"
        />
        <section>
          <div className="container-fluid user-consultation-upper">
          <span style={{position:'absolute'}}><i className='fa fa-arrow-left'></i></span>
            <div className="col-md-10 col-md-offset-1 upload-userimg-sec" style={{paddingLeft:'6em'}}>
              <div className="col-md-2">
                <Avatar
                  variant='square'
                  style={{ height: '150px', width: '150px' }}>
                  <Business style={{ fontSize: '10rem' }}/>
                </Avatar>
              </div>
         
              <div className="col-md-7" style={{paddingLeft:'30px'}}>
                <h2>{name}</h2>
                <div>
                  <span className='ico-mini'>
                  <i className='fa fa-globe'></i>
                  </span>
                  
                  {address1}
                  <br />
                  {town}
                </div>
                <div className="pb-15">
                <span className='ico-mini'>
                  <i className='fa fa-laptop'></i>
                  </span>
                {website}</div>
                <div className="user-profile-rating">
                  <Rating value={firmRating || 0} readOnly/>
                  <span className="gray-text"> {total} reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lawyer-profile-section">
          <div className="container">
            <div className="col-md-10 col-md-offset-1">
              <div className="col-md-12">
                <div className="filter-lawyer-profile">
                  <span
                    className={addActive === 1 && "active-filter"}
                    onClick={() => this.setButton(1)}>
                    INFORMATION
                  </span>
                  <span
                    className={addActive === 2 && "active-filter"}
                    onClick={() => this.setButton(2)}>
                    PEOPLE
                  </span>
                  <span
                    className={addActive === 3 && "active-filter"}
                    onClick={() => this.setButton(3)}>
                    REVIEWS
                  </span>
                </div>
              </div>
              <div className="col-md-12 lawyer-profile-area">
                {buttonId === 1 && <UserInstructFirmInfo {...this.props} />}
                {buttonId === 2 && <UserInstructFirmPeople {...this.props} />}
                {buttonId === 3 && <UserInstructFirmReviews {...this.props}/>}
              </div>
            </div>
          </div>
        </section>
        <Popup ref={(ref) => (this.popup = ref)} />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { organization } }) => {
  return {
    ...organization,
  };
}

export default connect(mapStateToProps, action)(FirmProfile);
