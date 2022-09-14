import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";

import * as actions from "../../actions/enquiries";

class ArchiveEnquiries extends Component {
  state = {};
  componentDidMount() {
    const { getArchivedEnquiries } = this.props;
    getArchivedEnquiries();
  }
  render() {
    const { archivedEnquiries, handleDrawer } = this.props;
    const { enquiries } = archivedEnquiries || {};

    return (
      <div className="admin-options-section">
        {enquiries.map((items, index) => (
          <div
            className="col-sm-12 dashboard-admin-options team-list"
            onClick={() => handleDrawer(1, items.id, index)}>
            <div className="col-sm-1">
              <div className="box-image">
                {items.isViewed ? "" : <span className="yellow-dot" />}
                <img src={items.User.imageUrl} />
              </div>
            </div>
            <div className="col-sm-7">
              <div class="team-list-name">{items.title}</div>
              <div class="team-list-para">
                {items.User.firstName} {items.User.lastName}
              </div>
            </div>
            <div className="col-sm-2">
              <div class="team-list-para">
                {moment(items.createdAt).format("LL")}
              </div>
              <div class="team-list-para">
                {moment(items.createdAt).format("HH:mm")}
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

const mapStateToProps = ({ enquiries }) => {
  return {
    ...enquiries,
  };
};

export default connect(
  mapStateToProps,
  actions
)(ArchiveEnquiries);
