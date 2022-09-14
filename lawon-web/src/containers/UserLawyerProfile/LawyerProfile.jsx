import React from "react";
import moment from 'moment';
import { Rating } from '@material-ui/lab';

export default ({ lawyerProfileDetails }) => {
  const {
    LawyerPracticeAreas = [],
    totalEnquiries = [],
    totalConsultations = [],
    aboutMe,
    ConsultationReviews = [],
    totalInstructions = 0,
  } = lawyerProfileDetails || {};

  console.log("totalEnquiries", totalEnquiries.length);

  return (
    <div className="col-md-12">
      <div className="right-side-subheading">About Me</div>
      <p>{aboutMe}</p>
      {
          (!aboutMe)
          && (
            <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'lighter', color: 'gray' }}>Bio not provided</div>
          )
        }
      <div className="hr-line-sep"></div>
      <div className="services-offered">
        <div className="right-side-subheading">Services Offered</div>
        <div className="row">
          {LawyerPracticeAreas.map(({ id, name, imageUrl }) => (
            <div className="col-md-4" key={id}>
              <span>
                <img style={{ height: '25px', width: '25px' }} alt={name} src={imageUrl} />
              </span>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hr-line-sep"></div>
      <div className="lawyer-activity">
        <div className="right-side-subheading">Activity</div>
        <div className="row">
          <div className="col-md-4">
            <div>Questions answered</div>
            <div className="right-side-bold-yellow">
              {totalEnquiries.length > 0 && totalEnquiries[0].TotalEnquiries}
            </div>
          </div>
          <div className="col-md-4">
            <div>Consultations booked </div>
            <div className="right-side-bold-yellow">
              {totalConsultations.length > 0 &&
                totalConsultations[0].TotalConsultations}
            </div>
          </div>
          <div className="col-md-4">
            <div>Instructions made</div>
            <div className="right-side-bold-yellow">{totalInstructions}</div>
          </div>
        </div>
      </div>
      <div className="hr-line-sep"></div>
      <div className="lawyer-review">
        <div className="right-side-subheading">Reviews</div>
        {
          (ConsultationReviews && ConsultationReviews.length === 0)
          && (
            <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'lighter', color: 'gray' }}>No reviews found</div>
          )
        }
        {
          ConsultationReviews.map(({ comment, rating, createdAt, User }) => {
            const { firstName, lastName } = User || {};
            return (
              <div className="row">
                <div className="col-md-3">
                  <div>{firstName} {lastName}</div>
                  <div className="gray-text">{moment(createdAt).fromNow()}</div>
                </div>
                <div className="col-md-2">
                  <Rating
                    value={Number(rating || 0)}
                    readOnly
                    size='large'
                  />
                </div>
                <div className="col-md-7">
                  {comment}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};
