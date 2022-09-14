import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Backdrop, CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import LawyerProfile from "./LawyerProfile";
import FirmProfile from "./FirmProfile";
import * as actions from "../../actions/user/lawyerProfile";

class UserLawyerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonId: 1,
      addActive: 1,
    };
  }

  setButton = (id) => {
    this.setState({
      buttonId: id,
      addActive: id,
    });
  };

  componentDidMount() {
    const { getLawyerProfile, match } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    getLawyerProfile({ lawyerId: id });
  }

  render() {
    const { lawyerProfileDetails, loading } = this.props;
    const { firstName, lastName, jobTitle, imageUrl, Organization, lawyerRating } = lawyerProfileDetails || {};
    const { name } = Organization || {};
    const { rating, total } = lawyerRating || {};

    return (
      <div className="user-main-content-consultation lawyer-profile">
        <section>
          <div className="container-fluid user-consultation-upper">
          <span style={{position:'absolute'}}><i className='fa fa-arrow-left'></i></span>
            <div className="col-md-8 col-md-offset-2 upload-userimg-sec">
              <div className="col-md-1" />

              <div className="col-md-5 user-img-box">
                <Avatar
                  variant='square'
                  src={imageUrl}
                  style={{ height: '100%', width: '100%' }}
                />
              </div>
           
              <div className="col-md-5">
                <h2 style={{marginBottom:'0px'}}> {firstName} {lastName}</h2>
                <div className="right-side-bold-yellow">{name}</div>
                <div className="pb-15">{jobTitle}</div>
                <div className="user-profile-rating">
                  <span>
                    <Rating
                      style={{ position: 'relative', top: '4px', right: '3px' }}
                      value={Number(rating || 0)}
                      readOnly
                      size='large'
                    />
                  </span>
                  <span className="gray-text">{total || 0} reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lawyer-profile-section">
          <div className="container">
            <div className="col-md-8 col-md-offset-2">
              <div className="col-md-12">
                <div className="filter-lawyer-profile">
                  <span
                    className={this.state.addActive === 1 && "active-filter"}
                    onClick={() => this.setButton(1)}>
                    LAWYER
                  </span>
                  <span
                    className={this.state.addActive === 2 && "active-filter"}
                    onClick={() => this.setButton(2)}>
                    FIRM
                  </span>
                </div>
              </div>
              <div className="col-md-12 lawyer-profile-area">
                {this.state.buttonId === 1 && <LawyerProfile {...this.props} />}
                {this.state.buttonId === 2 && <FirmProfile {...this.props}/>}
              </div>
            </div>
          </div>
        </section>
        <Backdrop open={loading} style={{ zIndex: '100', color: '#fff' }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { lawyerProfile } = user || {};
  return { ...lawyerProfile };
};

export default connect(mapStateToProps, actions)(UserLawyerProfile);
