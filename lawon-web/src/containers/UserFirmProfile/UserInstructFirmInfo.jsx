import React, { Component } from "react";

class UserInstructFirmInfo extends Component {
  state = {
    dummyImage:
      "https://nastlaw.com/wp-content/uploads/2018/07/chambersusa2018.jpg",
  };
  render() {
    const { dummyImage } = this.state;
    const { organizationDetails } = this.props;
    const {
      bio,
      OrganizationAwards = [],
      OrganizationPracticeAreas = [],
      OrganizationBranches = [],
    } = organizationDetails || {};

    console.log("OrganizationAwards", OrganizationAwards);
    return (
      <div className="col-md-12">
        <div className="right-side-subheading">Information</div>
        <p>{bio}</p>
        <div className="hr-line-sep"></div>
        <div className="firm-awards">
          <div className="right-side-subheading">Awards & Accreditations</div>
          <div className="row">
            {OrganizationAwards.map(
              ({ id, name, imageUrl }) => (
                <div className="col-md-3" key={id}>
                  <p> {name} </p>
                  <img
                    style={{ width: "150px", height: "150px" }}
                    className=""
                    src={
                      imageUrl != "" && imageUrl != null ? imageUrl : dummyImage
                    }
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="hr-line-sep"></div>
        <div className="services-offered">
          <div className="right-side-subheading">Speciality</div>
          <div className="row">
            {OrganizationPracticeAreas.map(
              ({ id, SubCategory: { name, imageUrl } }) => (
                <div className="col-md-4" key={id}>
                  <span>
                    <img
                      className=""
                      style={{ width: "35px", height: "35px" }}
                      src={
                        imageUrl != "" && imageUrl != null
                          ? imageUrl
                          : require("../../assets/img/lawyer-cricle.png")
                      }
                    />
                  </span>
                  <span> {name} </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="hr-line-sep"></div>
        <div className="services-offered">
          <div className="right-side-subheading">Branches</div>
          <div className="row">
            {OrganizationBranches.map(({ id, name }) => (
              <div className="col-md-4" key={id}>
                <span>
                  <img
                    className=""
                    src={require("../../assets/img/lawyer-cricle.png")}
                  />
                </span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default UserInstructFirmInfo;
