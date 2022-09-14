import React, { Component } from "react";
import { Avatar } from '@material-ui/core';

class UserInstructFirmPeople extends Component {
  state = {};
  render() {
    const { organizationDetails } = this.props;
    const { name, Lawyers = [], totalConsutations, totalInstructions, totalQuestionReplied } = organizationDetails || {};
    return (
      <div className="col-md-12">
        <div className="right-side-subheading">Lawyers</div>
        <div className="row">
          {Lawyers.map(({ id, firstName, lastName, imageUrl }) => (
            <div className="col-md-4 firm-people" key={id}>
              <div className="col-md-4">
                <Avatar
                  style={{ width: '50px', height: '50px' }}
                  src={imageUrl}
                />
              </div>
              <div className="col-md-8 no-padding">
                <div>{firstName} {lastName}</div>
                <div className="gray-text"> {name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="hr-line-sep"></div>
        <div className="lawyer-activity">
          <div className="right-side-subheading">Activity</div>
          <div className="row">
            <div className="col-md-4">
              <div>Questions answered</div>
              <div className="right-side-bold-yellow">{totalQuestionReplied}</div>
            </div>
            <div className="col-md-4">
              <div>Consultations booked </div>
              <div className="right-side-bold-yellow">{totalConsutations}</div>
            </div>
            <div className="col-md-4">
              <div>Instructions made</div>
              <div className="right-side-bold-yellow">{totalInstructions}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInstructFirmPeople;
