import React, { Component } from "react";
import moment from "moment";
import { Avatar } from '@material-ui/core';
import { EmptyList } from '../../components/molecules/NotFound/EmptyView';

class ActiveEnquiries extends Component {
  render() {
    const { enquiries = [], onClickRow } = this.props;

    return (
      <div className="admin-options-section">
        {(!enquiries || !enquiries.length)
          && <EmptyList>No Enquiries Found</EmptyList>}
        {enquiries.map(({ User, id, title, createdAt }) => (
          <div
            key={id}
            className="col-sm-12 dashboard-admin-options team-list"
            onClick={() => onClickRow({ id })}>
            <div className="col-sm-1">
              <div className="box-image">
                {/* {isViewed ? "" : <span className="yellow-dot" />} */}
                <Avatar
                  src={User.imageUrl}
                  style={{ width: '40px', height: '40px' }}
                />
              </div>
            </div>
            <div className="col-sm-7">
              <div class="team-list-name">{title}</div>
              <div class="team-list-para">
                {User.firstName} {User.lastName}
              </div>
            </div>
            <div className="col-sm-2">
              <div class="team-list-para">
                {moment(createdAt).format("LL")}
              </div>
              <div class="team-list-para">
                {moment(createdAt).format("HH:mm")}
              </div>
            </div>
            <div className="col-sm-2 download-btns-sec">
              <span>
                <img src={require("../../assets/img/forward.png")} />
              </span>
              <span>
                <img src={require("../../assets/img/archive.png")} />
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ActiveEnquiries;
