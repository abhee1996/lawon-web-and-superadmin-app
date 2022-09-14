import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../../components/atoms/InputField";
import { Button, TYPES } from "../../../components/atoms/YellowButton";
import { TextArea } from "../../../components/atoms/textarea";
import { connect } from "react-redux";
import moment from "moment";
import { lawyerAPIs } from "../../../apiConstants/lawyerAPIs";
import LoadingBar from "react-top-loading-bar";
import ReactPlaceholder from "react-placeholder/lib";

var totalAmount = 0;

function EnquiryDetails(props) {
  return (
    <div className="col-sm-12 pl0">
      {/* <div class="right-side-light-para-cases">I have reached the end of my
   tenancy and my landlord has not yet returned my deposit. 
   How do I go about getting my deposit back?</div> */}
      <div class="right-side-subheading">ESTIMATE</div>
      <div class="right-side-subheading">FIXED FEE</div>
      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div class="right-side-light-para">Legal Fee</div>
        </div>
        <div className="col-sm-2">
          <div class="right-side-light-para">£1500</div>
        </div>
        <div className="col-sm-6">
          <div class="right-side-light-para">
            optional description written before
          </div>
        </div>
      </div>

      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div class="right-side-light-para">VAT @ 20%</div>
        </div>
        <div className="col-sm-2">
          <div class="right-side-light-para">£300</div>
        </div>
        <div className="col-sm-6">
          <div class="right-side-light-para" />
        </div>
      </div>

      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div class="right-side-light-para">Estimated Disbursements</div>
        </div>
        <div className="col-sm-2">
          <div class="right-side-light-para">£600</div>
        </div>
        <div className="col-sm-6">
          <div class="right-side-light-para">
            optional description written before
          </div>
        </div>
      </div>

      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div class="right-side-light-para">Other</div>
        </div>
        <div className="col-sm-2">
          <div class="right-side-light-para">£200</div>
        </div>
        <div className="col-sm-6">
          <div class="right-side-light-para">
            optional description written before
          </div>
        </div>
      </div>

      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div class="right-side-dark-para">TOTAL</div>
        </div>
        <div className="col-sm-2">
          <div class="right-side-dark-para">£2600</div>
        </div>
        <div className="col-sm-6" />
      </div>

      <div class="right-side-subheading">CONSULTATION</div>
      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div class="right-side-light-para">7 July 2017, 23:20</div>
        </div>
        <div className="col-sm-2">
          <div class="right-side-light-para">video</div>
        </div>
        <div className="col-sm-6">
          <Link to="/main/dashboardmaster/dashboardconsultation">
            <div class="right-side-bold-yellow">GO TO CONSULTATION</div>
          </Link>
        </div>
      </div>

      <div class="right-side-subheading">ACTIVITY</div>
      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div class="right-side-light-para">7 July 2017, 23:20</div>
        </div>
        <div className="col-sm-8">
          <div class="right-side-light-para">Amanda sent enquiry</div>
        </div>
      </div>
      <div className="row cases-fee-row">
        <div className="col-sm-4">
          <div class="right-side-light-para">7 July 2017, 23:20</div>
        </div>
        <div className="col-sm-8">
          <div class="right-side-light-para">
            Joe replies to enquiry and provide a quote
          </div>
        </div>
      </div>
    </div>
  );
}

class EnquiryDetailsGet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonId: 1,
      slide: 0,
      isShowtext: 1,
      addActive: 1,
      enquirystate: props.enquiryState,
      enquiryPropID: props.selectedEnquiryDataID,
      replyContent: "",
      legalFee: "",
      vatTax: "",
      estimatedDisbursements: "",
      otherAmount: "",
      totalAmount: 0,
      lawyerNotes: "",
      selectedEnquiryDataObjState: [],
      selectedEnquiryUserDataObjState: [],
    };
    this.setButton = this.setButton.bind(this);
    this.setSlide = this.setSlide.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedEnquiryDataObjState: this.props.selectedEnquiryDataObj,
      selectedEnquiryUserDataObjState: this.props.selectedEnquiryDataObj.User,
    });
    console.log(
      "selectedEnquiryDataObjState",
      this.state.selectedEnquiryDataObjState
    );
  }

  componentDidUpdate(prevProps) {
    console.log("i m update", prevProps);
    if (
      this.props.selectedEnquiryDataObj.id !==
      prevProps.selectedEnquiryDataObj.id
    ) {
      console.log("i m update iffff");
      this.setState({
        selectedEnquiryDataObjState: this.props.selectedEnquiryDataObj,
        selectedEnquiryUserDataObjState: this.props.selectedEnquiryDataObj.User,
      });
    }
  }

  setButton(id) {
    this.setState({
      buttonId: id,
      addActive: id,
    });
  }
  setSlide(idslide, isShowtext) {
    this.setState({ slide: idslide, isShowtext: isShowtext });
  }
  async archiveEnquiry() {
    const archiveEnquiryObj = {
      EnquiryId: this.props.selectedEnquiryDataObj.id,
      LawyerId: this.props.lawyerAuthDataObj.id,
      type: 2,
    };
    var responsevar = await lawyerAPIs.archiveEnquiry(archiveEnquiryObj);
    console.log("responsevarEnquiry", responsevar);
  }

  async saveNotesEnquiry() {
    this.LoadingBar.continuousStart();
    const saveNotesEnquiryObj = {
      name: "",
      notes: this.state.lawyerNotes,
      EnquiryId: this.props.selectedEnquiryDataObj.id,
    };
    var responsevar = await lawyerAPIs.saveLawyerEnquiryNotes(
      saveNotesEnquiryObj
    );
    console.log("responsevarEnquiry", responsevar);
    this.LoadingBar.complete();
    this.setState({
      lawyerNotes: "",
    });
  }

  async replyToEnquiry() {
    const objToBeSent = {
      replyContent: this.state.replyContent,
      EnquiryId: this.props.selectedEnquiryDataObj.id,
      LawyerId: this.props.lawyerAuthDataObj.id,
      UserId: this.props.selectedEnquiryDataObj.UserId,
      quote: {
        legalFee: this.state.legalFee,
        vatTax: this.state.vatTax,
        estimatedDisbursements: this.state.estimatedDisbursements,
        other: this.state.otherAmount,
        EnquiryId: this.props.selectedEnquiryDataObj.id,
        LawyerId: this.props.lawyerAuthDataObj.id,
      },
    };
    var responsevar = await lawyerAPIs.replyToEnquiryByLawyer(objToBeSent);
    console.log("responsevarEnquiry", responsevar);
  }

  EnquiryAttachment() {
    return (
      <React.Fragment>
        {this.state.selectedEnquiryDataObjState.EnquriyAttachments.length >
        0 ? (
          <div className="col-sm-12 pl0">
            {this.state.selectedEnquiryDataObjState.EnquriyAttachments.map(
              (items) => (
                <div className="row attachment-area">
                  <div className="col-sm-3">
                    <div className="pdf-box">PDF</div>
                  </div>
                  <div className="col-sm-9">
                    <div className="attachment-name">{items.name}</div>
                    <div className="attachment-date">
                      added {moment(items.createdAt).format("LL")},{" "}
                      {moment(items.createdAt).format("HH:mm")}
                    </div>
                    <div className="attachment-options">
                      <span>
                        {" "}
                        <img
                          height=""
                          src={require("../../../assets/img/download-icon.png")}
                        />
                      </span>
                      <span className="download-text">DOWNLOAD</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <h3 className="text-center">No Attachment Found</h3>
        )}
      </React.Fragment>
    );
  }

  EnquiryNotes() {
    return (
      <div className="col-sm-12 pl0">
        <div className="col-md-12 no-padding notes-row">
          <div className="right-side-dark-para">
            Use this section to make your own files notes on this matter. The
            user will not be able to see the information you enter here
          </div>
          <br />
          {this.state.selectedEnquiryDataObjState.EnquriyNotes && (
            <React.Fragment>
              {this.state.selectedEnquiryDataObjState.EnquriyNotes.map(
                (items) => (
                  <div className="lawyer-notes">
                    <div className="gray-text">
                      {moment(items.createdAt).format("LL")},{" "}
                      {moment(items.createdAt).format("HH:mm")}
                    </div>
                    <div class="right-side-light-para">{items.notes}</div>
                  </div>
                )
              )}
            </React.Fragment>
          )}
        </div>
        <form>
          <div class="form-group pt-10">
            <TextArea
              type={"text"}
              name="lawyerNotes"
              value={this.state.lawyerNotes}
              placeholder={"Type your notes here"}
              handleChange={this.handleChangeInput}
              id={""}
            />
          </div>
          <div className="col-md-12 no-padding">
            <div className="step-section-btns">
              <Button
                text="Send"
                type="button"
                onClick={() => this.saveNotesEnquiry()}
                buttonType={TYPES.Generic}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }

  handleChangeInput = (event) => {
    if (event.target.name === "legalFee") {
      this.setState({
        vatTax: (event.target.value * 20) / 100,
      });
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.addTotal(event.target.value);
  };

  addTotal(value) {
    totalAmount += Number(value);
    console.log("totalAmount", totalAmount);
  }

  EnquiryEnq() {
    return (
      <div>
        <div className="col-sm-12 pl0">
          <div className="row enquiry-section">
            <div className="col-sm-2">
              <div className="box-image">
                <img src={require("../../../assets/img/user-dummy.png")} />
              </div>
            </div>
            <div className="col-sm-10 pl0">
              <div className="enquiry-user-name-date">
                <span className="team-list-name-enquiry">John Doe</span>
                <span className="team-list-para-enquiry">
                  08 Jul 2017, 10:12
                </span>
              </div>
              <div className="right-side-light-para">
                <p>Hi Amanda</p>
                <p>
                  The tenancy agreement you signed at the beginning of the
                  tenancy should set out the situations where the deposit may
                  not be returned to you or may be used by the landlord. The
                  landlord is legally obliged to hold your deposit in a tenancy
                  deposit protection scheme, which gives you the protection of
                  knowing that the deposit you have paid is secure.
                </p>

                <p>
                  - Please attach a copy of your tenancy agreement
                  <br />
                  - Are you aware which deposit scheme the deposit is being
                  held?
                  <br />- Did you leave the property in the same condition it
                  was in at the start of the tenancy?
                </p>

                <p>
                  Alternatively, I am happy to offer you a free consultation to
                  advise you on next steps.
                </p>
                <p>Kind regards,</p>
                <p>John,</p>
              </div>

              <div className="provided-box float-right">
                <span className="provided-yellow-box">£</span>
                <span className="provided-black-box">
                  <span className="blackbox-bold">Quote Provided</span>
                  <span className="blackbox-light">DETAILS</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-side-subheading">REPLY</div>
        <form>
          <div class="form-group pt-10">
            <TextArea
              type={"text"}
              name="replyContent"
              placeholder={"Write a reply"}
              handleChange={this.handleChangeInput}
              id={""}
            />
          </div>
        </form>
        <div className="provide-a-quote">
          {this.state.isShowtext === 1 && (
            <div
              class="right-side-bold-yellow"
              onClick={() => this.setSlide(1, 0)}
            >
              PROVIDE A QUOTE
            </div>
          )}
          {this.state.slide === 1 && (
            <div className="quote-slide-down">
              <div class="right-side-subheading">
                PROVIDE A QUOTE
                <div
                  class="right-side-bold-yellow float-right"
                  onClick={() => this.setSlide(0, 1)}
                >
                  CLOSE
                </div>
              </div>
              <div class="right-side-light-para">
                Choose Fixed or Estimated fee to provide the most transparency
                to the user
              </div>
              <div className="provide-a-quote-box">
                <div className="filter-lawyer-prof">
                  <span className="active-filter">FIXED FEE</span>
                  <span>ESTIMATED FEE</span>
                </div>
                <div className="row consult-fee-row form-area">
                  <div className="col-sm-4 quote-padding">
                    <div class="right-side-light-para">Legal Fee</div>
                  </div>
                  <div className="col-sm-2">
                    <Input
                      type={"text"}
                      name="legalFee"
                      placeholder={"£"}
                      handleChange={this.handleChangeInput}
                      id={""}
                    />
                  </div>
                  <div className="col-sm-2 quote-padding">
                    <img src={require("../../../assets/img/plus-btn.png")} />
                  </div>
                </div>
                <div className="row consult-fee-row form-area">
                  <div className="col-sm-4 quote-padding">
                    <div class="right-side-light-para">VAT @ 20%</div>
                  </div>
                  <div className="col-sm-2">
                    <Input
                      type={"text"}
                      name="vatTax"
                      value={this.state.vatTax}
                      placeholder={"£"}
                      handleChange={this.handleChangeInput}
                      id={""}
                    />
                  </div>
                  <div className="col-sm-2 quote-padding" />
                </div>

                <div className="row consult-fee-row form-area">
                  <div className="col-sm-4 quote-padding">
                    <div class="right-side-light-para">
                      Estimated Disbursements
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <Input
                      type={"text"}
                      name="estimatedDisbursements"
                      placeholder={"£"}
                      handleChange={this.handleChangeInput}
                      id={""}
                    />
                  </div>
                  <div className="col-sm-2 quote-padding">
                    <img src={require("../../../assets/img/plus-btn.png")} />
                  </div>
                </div>

                <div className="row consult-fee-row form-area">
                  <div className="col-sm-4 quote-padding">
                    <div class="right-side-light-para">Other</div>
                  </div>
                  <div className="col-sm-2">
                    <Input
                      type={"text"}
                      name="otherAmount"
                      placeholder={"£"}
                      handleChange={this.handleChangeInput}
                      id={""}
                    />
                  </div>
                  <div className="col-sm-2 quote-padding">
                    <img src={require("../../../assets/img/plus-btn.png")} />
                  </div>
                </div>
                <div className="row consult-fee-row form-area">
                  <div className="col-sm-4 quote-padding">
                    <div class="right-side-dark-para">TOTAL</div>
                  </div>
                  <div className="col-sm-2">
                    <Input
                      type={"text"}
                      name="totalAmount"
                      value={this.state.totalAmount}
                      placeholder={"£"}
                      handleChange={this.handleChangeInput}
                      id={""}
                    />
                  </div>
                  <div className="col-sm-2 quote-padding" />
                </div>
              </div>
            </div>
          )}

          <div className="col-md-12 no-padding">
            <div className="step-section-btns">
              <Button
                text="Cancel"
                type="button"
                onClick={() => {}}
                buttonType={TYPES.Generic}
              />
              <Button
                text="Reply"
                type="button"
                onClick={() => this.replyToEnquiry()}
                buttonType={TYPES.Generic}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (
      this.state.selectedEnquiryUserDataObjState &&
      this.state.selectedEnquiryDataObjState
    ) {
      return (
        <div>
          <LoadingBar
            onRef={(ref) => (this.LoadingBar = ref)}
            height={3}
            color="#feb41c"
          />
          <div className="col-sm-12 no-padding top-cases-section">
            <div className="right-side-enq-heading">
              {this.state.selectedEnquiryDataObjState.title}
              <span
                onClick={() => this.archiveEnquiry()}
                className="right-side-archive"
              >
                ARCHIVE
              </span>
            </div>
            <div className="row">
              <div className="col-sm-1">
                <div className="box-image">
                  <img
                    src={this.state.selectedEnquiryUserDataObjState.imageUrl}
                  />
                </div>
              </div>
              <div className="col-sm-11">
                <div className="enq-name-date">
                  <span className="enq-name-date-text">
                    {this.state.selectedEnquiryUserDataObjState.firstName}{" "}
                    {this.state.selectedEnquiryUserDataObjState.lastName}
                  </span>
                  <span className="enq-name-date-time">
                    {moment(
                      this.state.selectedEnquiryDataObjState.createdAt
                    ).format("LL")}
                    ,{" "}
                    {moment(
                      this.state.selectedEnquiryDataObjState.createdAt
                    ).format("HH:mm")}
                  </span>
                </div>

                <div className="enq-title">
                  {this.state.selectedEnquiryDataObjState.problem}
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12 no-padding">
            <div className="filter-lawyer-prof">
              <span
                className={this.state.addActive === 1 && "active-filter"}
                onClick={() => this.setButton(1)}
              >
                ENQUIRY
              </span>
              <span
                className={this.state.addActive === 2 && "active-filter"}
                onClick={() => this.setButton(2)}
              >
                ATTACHMENT
              </span>
              <span
                className={this.state.addActive === 3 && "active-filter"}
                onClick={() => this.setButton(3)}
              >
                NOTES
              </span>
              <span
                className={this.state.addActive === 4 && "active-filter"}
                onClick={() => this.setButton(4)}
              >
                DETAILS
              </span>
            </div>

            {this.state.buttonId === 1 && this.EnquiryEnq()}
            {this.state.buttonId === 2 && this.EnquiryAttachment()}
            {this.state.buttonId === 3 && this.EnquiryNotes()}
            {this.state.buttonId === 4 && <EnquiryDetails />}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <ReactPlaceholder
            type="text"
            rows={8}
            showLoadingAnimation={true}
            ready={this.state.load}
          />
        </div>
      );
    }
  }
}

const mapStoreToProps = (state) => {
  return {
    //   selectedEnquiryDataObj: state.common.selectedEnquiryData,
    selectedEnquiryDataObj: state.enquiries.enquireyDetails,
    lawyerAuthDataObj: state.common.lawyerRegistrationData.lawyer,
  };
};

export default connect(
  mapStoreToProps,
  null
)(EnquiryDetailsGet);
