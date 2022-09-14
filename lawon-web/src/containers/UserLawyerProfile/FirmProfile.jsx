import React from "react";
import { Button, TYPES } from "../../components/atoms/YellowButton";
import { Link } from "react-router-dom";
import { Avatar } from '@material-ui/core';
import { DescriptionOutlined } from '@material-ui/icons';

export default ({ lawyerProfileDetails }) => {
  const { Organization } = lawyerProfileDetails || {};
  const { bio, OrganizationAwards = [], id } = Organization || {};
  return (
    <div className="col-md-12">
      <div className="right-side-subheading">Information</div>
      <p>
        {bio}
      </p>
      <div className="hr-line-sep"></div>
      <div className="firm-awards">
        <div className="right-side-subheading">Awards & Accreditationssss</div>
        <div className='row'>
          {
            OrganizationAwards.map(({ imageUrl, name }) => (
              <div className='col-md-3'>
                <Avatar
                  src={imageUrl}
                  variant='square'
                  style={{ height: '100%', width: '100%' }}>
                  <DescriptionOutlined style={{ height: '100%', width: '100%' }} />
                </Avatar>
                <div>{name}</div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="hr-line-sep"></div>
      <Link to={`/main/user/firm-profile/${id}`}>
        <Button
        style={{marginLeft:'0px'}}
          text="SEE FIRM PROFILE"
          type="button"
          onClick={() => { }}
          buttonType={TYPES.Generic}
        />
      </Link>
    </div>
  );
};
