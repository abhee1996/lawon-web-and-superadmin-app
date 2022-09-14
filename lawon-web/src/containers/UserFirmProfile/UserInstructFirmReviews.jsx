import React, { Component } from "react";
import { Rating } from '@material-ui/lab';
import moment from 'moment';

class UserInstructFirmReviews extends Component {
  render() {
    const { organizationDetails } = this.props;
    const { reviews = [] } = organizationDetails || {};

    return (
      <div className="col-md-12">
        <div className="lawyer-review">
          <div className="right-side-subheading">All Reviews</div>

          {reviews.map(({ rating, comment, User }) => {
            const { firstName, lastName } = User || {};
            return (
              <div className="row">
                <div className="col-md-3">
                  <div>{firstName} {lastName}</div>
                  <div className="gray-text">{moment().fromNow()}</div>
                </div>
                <div className="col-md-2">
                  <Rating readOnly value={rating || 0}/>
                </div>
                <div className="col-md-7">{comment}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserInstructFirmReviews;
