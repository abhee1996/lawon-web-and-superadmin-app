import React, { Component } from "react";
import { Button, TYPES } from "../../components/atoms/YellowButton";
import { Link } from "react-router-dom";
import { adminAPIs } from "../../apiConstants/adminAPIs";
import ReactPlaceholder from "react-placeholder";
import Dialog from "@material-ui/core/Dialog";
import "react-placeholder/lib/reactPlaceholder.css";
import { connect } from "react-redux";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

import 'react-day-picker/lib/style.css';
import "react-day-picker/lib/style.css";
import _ from "lodash";
import SearchDateApply from "../../components/atoms/SearchDateApply";

var startIndex;
var allPlanInfo;
function GeneralInquriesTable({
  selectToDelete,
  load,
  paginateMovie,
  handleChangeCheckbox,
  viewPlan


}) {
  return (
    <div>
      <div class="table-responsive">
        <table class="table">
          <ReactPlaceholder
            type="text"
            showLoadingAnimation={true}
            rows={13}
            color="#EBEFF1"
            background="#fff"
            ready={load}
            style={{ padding: 30 }}
          >
            <thead>
              <tr>
                <th width="5%" class="table-th border-l">
                  {selectToDelete ? (
                    <input
                      onChange={handleChangeCheckbox}
                      type="checkbox"
                      name="selectToDelete"
                      checked
                    />
                  ) : (
                      <input
                        onChange={handleChangeCheckbox}
                        name="selectToDelete"
                        type="checkbox"
                      />
                    )}
                </th>
                <th class="table-th">
                  User
                </th>
                <th class="table-th">
                  Subject
                </th>
                <th class="table-th">
                  Email
                </th>
                <th class="table-th">
                  Message
                </th>
                <th class="table-th">
                  Create At
              </th>
                <th class="table-th">
                  Action
                </th>

              </tr>
            </thead>
            <tbody>
              {paginateMovie.map(item => (
                <tr class="dashed-line">
                  <td>
                    {" "}
                    {selectToDelete ? (
                      <input
                        type="checkbox"
                        name="plan"
                        value={item.id}
                        checked
                      />
                    ) : (
                        <input type="checkbox" />
                      )}{" "}
                  </td>
                  {console.log("hello", selectToDelete)}
                  <td>Erick </td>
                  <td>{item.name}</td>
                  <td>Erick@yahoo.com</td>
                  <td>This is message you can write any thing there</td>
                  <td>24 Dec 2018</td>
                  <td>
                    <div onClick={viewPlan} style={{ background: '#feb41d', width: '23px', height: '22px', paddingTop: '2px', paddingLeft: '5px' }}>
                      <i class="fa fa-eye" aria-hidden="true"></i></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </ReactPlaceholder>
        </table>
      </div>
    </div>
  );
}

function EnterpriceTable({
  selectToDelete,
  load,
  paginateMovie,
  handleChangeCheckbox,
  showDropdownMenu,
  viewPlan

}) {
  return (
    <div>
      <div class="table-responsive">
        <table class="table">
          <ReactPlaceholder
            type="text"
            showLoadingAnimation={true}
            rows={13}
            color="#EBEFF1"
            background="#fff"
            ready={load}
            style={{ padding: 30 }}
          >
            <thead>
              <tr>
                <th width="5%" class="table-th border-l">
                  {selectToDelete ? (
                    <input
                      onChange={handleChangeCheckbox}
                      type="checkbox"
                      name="selectToDelete"
                      checked
                    />
                  ) : (
                      <input
                        onChange={handleChangeCheckbox}
                        name="selectToDelete"
                        type="checkbox"
                      />
                    )}
                </th>
                <th class="table-th">
                  User
                </th>
                <th class="table-th">
                  Subject
                </th>
                <th class="table-th">
                  Email
                </th>
                <th class="table-th">
                  Message
                </th>
                <th class="table-th">
                  Create At
                </th>
                <th class="table-th">
                  Create New
                </th>
                <th class="table-th">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginateMovie.map(item => (
                <tr class="dashed-line">
                  <td>
                    {" "}
                    {selectToDelete ? (
                      <input
                        type="checkbox"
                        name="plan"
                        value={item.id}
                        checked
                      />
                    ) : (
                        <input type="checkbox" />
                      )}{" "}
                  </td>
                  {console.log("hello", selectToDelete)}
                  <td>Erick Friedman</td>
                  <td>{item.name}</td>
                  <td>Friedman@yahoo.com</td>
                  <td>This is text message you can write anything there</td>
                  <td>5 Dec 2019</td>
                  <td>
                    <div onClick={viewPlan} style={{ background: '#feb41d', width: '23px', height: '22px', paddingTop: '2px', paddingLeft: '7px' }}>
                      <i class="fa fa-plus" aria-hidden="true"></i></div>

                  </td>
                  <td>
                    <div onClick={viewPlan} style={{ background: '#feb41d', width: '23px', height: '22px', paddingTop: '2px', paddingLeft: '5px' }}>
                      <i class="fa fa-eye" aria-hidden="true"></i></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </ReactPlaceholder>
        </table>
      </div>
    </div>
  );
}

class ContactInquiries extends Component {
  state = {
    open: false,
    dropdownId: 0,
    setOpen: false,
    Open: false,
    dialogId: 0,
    setOpen: false,
    Open: false,
    dialogId: 0,
    selectToDelete: false
  };
  constructor() {
    super();

    this.state = {
      displayMenu: false,
      plans: [],
      allPlanInfo: [],
      currentPage: 1,
      nofDataDisplay: 5,
      setOpen: false,
      Open: false,
      selectToDelete: false,
      search: "",
      GenInqT: true,
      EnPrT: false,
      setOpenView: false,
      OpenView: false,
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }
  handleChangeCheckbox = event => {
    let ischecked = event.target.checked;
    console.log("change in checkbox", ischecked);
    this.setState({
      [event.target.name]: event.target.checked
    });
  };
  showDropdownMenu = e => {
    if (this.state.dropdownId == e) {
      this.setState({
        dropdownId: 0
      });
    } else {
      this.setState(
        {
          displayMenu: true,
          dropdownId: e
        },
        () => {
          document.addEventListener("click", this.hideDropdownMenu);
        }
      );
    }
  };
  handleChangeInput = event => {
    this.state.allPlanInfo
      .filter(item =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
      .map(item => {
        console.log("this is elite");
      });
  };

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }
  handleClickOpen = e => {
    console.log("this is my id", e);
    localStorage.setItem("deletePlanId", e);
    if (this.state.setOpen == true) {
      this.setState({ setOpen: false });
    } else {
      this.setState({
        setOpen: true,
        dialogId: e
      });
    }
  };
  dialogClose = () => {
    this.setState({
      setOpenView: false,
    });
  };

  firstPage() {
    this.setState({ currentPage: 1 });
  }

  previousPage() {
    this.setState({
      currentPage: this.state.currentPage - 1
    });
  }
  lastPage() {
    this.setState({
      currentPage: Math.round(
        this.state.allPlanInfo.length / this.state.nofDataDisplay
      )
    });
  }
  nextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1
    });
  }
  async componentDidMount() {
    var responsevar = await adminAPIs.adminGetAllPlans();
    console.log("responsevar", responsevar);
    if (responsevar.code == 200 || responsevar.code == 201) {
      allPlanInfo = responsevar.data.sort((a, b) => a.sort - b.sort);
      console.log("responsevar code is 200", allPlanInfo);
      this.setState({
        allPlanInfo: responsevar.data,
        load: true
      });
      this.props.onPlanInfoDispatch();
      console.log("my data");
    } else {
      console.log("responsevar failed");
    }
  }


  viewPlan = e => {
    if (this.state.setOpenView == true) {
      this.setState({ setOpenView: false });
    } else {
      this.setState({
        setOpenView: true,
        dialogId: e
      });
    }
    // this.props.history.push({
    //   pathname: "/main/dashboardmaster/manageplanView/",
    //   search: "selectedplan=" + e
    // });

  };
  render() {
    const {
      allPlanInfo,
      currentPage,
      nofDataDisplay,
      GenInqT,
      EnPrT
    } = this.state;

    console.log(
      "check feels value tttttttt",
      allPlanInfo,
      currentPage,
      nofDataDisplay
    );
    const paginateMovie = (function (allPlanInfo, currentPage, nofDataDisplay) {
      startIndex = (currentPage - 1) * nofDataDisplay;
      console.log("Start INDX", startIndex);
      return _(allPlanInfo)
        .slice(startIndex)
        .take(nofDataDisplay)
        .value();
    })(allPlanInfo, currentPage, nofDataDisplay);

    const totalnofLi = Math.ceil(allPlanInfo.length / nofDataDisplay);
    const makeLiArry = _.range(1, totalnofLi + 1);
    const paginate = li => {
      this.setState({ currentPage: li });
    };
    return (
      <div class="main">
        <div class="manage-plan-section">
          <div class="heading">Contact Inquiries </div>
          <div class="col-md-12 no-padding">
            <SearchDateApply />
            <div className="col-md-4">
              <Link to="/main/dashboardmaster/admincreateplan">
                <button class="create-new-plan-btn" style={{ width: "70px", fontSize: "20px", height: "33px" }}>
                  <i class="fa fa-download" aria-hidden="true"></i>
                </button>
              </Link>
            </div>

          </div>
          <div className="col-md-5 no-padding">
            <br /> <br />
            <div className="col-md-5 no-padding" >
              {" "}
              <Link>
                <button
                  style={{ float: "none" }}
                  class="create-new-plan-btn"
                  onClick={() =>
                    this.setState({
                      GenInqT: true,
                      EnPrT: false
                    })
                  }
                >
                  <i class="fa fa-plus-circle"></i> General Inquiries
              </button>
              </Link>
            </div>
            <div className="col-md-6">
              {" "}
              <Link>
                <button
                  class="create-new-plan-btn"
                  onClick={() =>
                    this.setState({
                      GenInqT: false,
                      EnPrT: true
                    })
                  }
                >
                  <i class="fa fa-plus-circle"></i> Bespoke Packages
                  </button>
              </Link>
            </div>

          </div>
          <div class="sub-heading"></div>
          <div class="members-detail-section">
            <div class="col-md-12 no-padding">
              <div class="member-bg ">
                All Packages{" "}
                {this.state.selectToDelete ? (
                  <i class="fa fa-trash trash"> </i>
                ) : null}
                <span class="member-select-span">
                  <select
                    class="member-select"
                    name="nofDataDisplay"
                    onChange={this.handleChangeInput}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                </span>
              </div>

              {GenInqT ? (
                <GeneralInquriesTable
                  selectToDelete={this.state.selectToDelete}
                  load={this.state.load}
                  paginateMovie={paginateMovie}
                  viewPlan={this.viewPlan}
                  handleChangeCheckbox={this.handleChangeCheckbox}

                />
              ) : (
                  <EnterpriceTable
                    selectToDelete={this.state.selectToDelete}
                    load={this.state.load}
                    paginateMovie={paginateMovie}
                    viewPlan={this.viewPlan}
                    handleChangeCheckbox={this.handleChangeCheckbox}
                    showDropdownMenu={this.showDropdownMenu}

                  />
                )}
            </div>
          </div>
        </div>
        <div class="col-md-12 pagination">
          <div class="col-md-4"></div>
          <div class="col-md-4 pagination-padding">
            <ul class="pagination ">
              <div class="pagination">
                <li class="page-item">
                  <a class="page-link" aria-label="firstPage">
                    {this.state.currentPage == 1 ? (
                      <button
                        disabled
                        class="disable"
                        onClick={() => this.firstPage()}
                      >
                        <i class="fa fa-angle-double-left"></i>
                      </button>
                    ) : (
                        <button onClick={() => this.firstPage()}>
                          <i class="fa fa-angle-double-left"></i>
                        </button>
                      )}
                  </a>
                </li>
              </div>
              <div class="pagination">
                <li class="page-item">
                  <a class="page-link" aria-label="Previous">
                    {this.state.currentPage == 1 ? (
                      <button
                        disabled
                        class="disable"
                        onClick={() => this.previousPage()}
                      >
                        <i class="fa fa-angle-left"></i>
                      </button>
                    ) : (
                        <button onClick={() => this.previousPage()}>
                          <i class="fa fa-angle-left"></i>
                        </button>
                      )}
                  </a>
                </li>
              </div>
              {makeLiArry
                .filter(item => item == currentPage)
                .map(li => (
                  <div class="pagination">
                    {currentPage == 1 ? null : (
                      <li>
                        {console.log("test", li)}
                        <a
                          class="page-link page-num "
                          onClick={() => paginate(li - 1)}
                        >
                          {li - 1}
                        </a>
                      </li>
                    )}
                    <li
                      key={li}
                      className={
                        li === currentPage ? "page-item active" : "page-item"
                      }
                    >
                      {console.log("test", li)}
                      <a
                        class="page-link page-num "
                        onClick={() => paginate(li)}
                      >
                        {li}
                      </a>
                    </li>
                    {totalnofLi == currentPage ? null : (
                      <li>
                        <a
                          class="page-link page-num "
                          onClick={() => paginate(li + 1)}
                        >
                          {li + 1}
                        </a>
                      </li>
                    )}
                  </div>
                ))}
              <div class="pagination">
                <li class="page-item">
                  <a class="page-link" disabled="true" aria-label="Next">
                    {this.state.currentPage == totalnofLi ? (
                      <button disabled class="disable">
                        <i class="fa fa-angle-right"></i>
                      </button>
                    ) : (
                        <button onClick={() => this.nextPage()}>
                          <i class="fa fa-angle-right"></i>
                        </button>
                      )}
                  </a>
                </li>
              </div>
              <div class="pagination">
                <li class="page-item">
                  <a class="page-link ">
                    {this.state.currentPage == totalnofLi ? (
                      <button disabled class="disable">
                        <i class="fa fa-angle-double-right"></i>
                      </button>
                    ) : (
                        <button onClick={() => this.lastPage()}>
                          <i class="fa fa-angle-double-right"></i>
                        </button>
                      )}
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <Dialog onClose={this.handleClose} open={this.state.setOpenView}>
          <div>
            <div class="col-md-12 plan-popup" style={{ padding: "0px", margin: "0px" }}>
              <div class="col-md-12" style={{ background: "#feb41c", textAlign: "center" }}>
                <h2>Packages Details</h2>
              </div>
              <div class="col-md-5"> <br></br>  </div>
              <div class="col-md-12">
                <div class="dialog-popup-subtext">
                  <table class="table">
                    <tr style={{ paddingBottom: "15px", borderBottom: "1px solid #E3EBF8" }}>
                      <td width="20%" class="table-th"><h3>Name</h3></td>
                      <td><h3 style={{ fontSize: '15px' }}>Khan</h3></td>
                    </tr>
                    <tr style={{ paddingBottom: "15px", borderBottom: "1px solid #E3EBF8" }}>
                      <td width="20%" class="table-th">Email</td>
                      <td><h3 style={{ fontSize: '15px' }}>khan@yahoo.com</h3></td>
                    </tr>
                    <tr style={{ paddingBottom: "15px", borderBottom: "1px solid #E3EBF8" }}>
                      <td width="20%" class="table-th">Subject</td>
                      <td><h3 style={{ fontSize: '15px' }}>Wsign</h3></td>
                    </tr>
                    <tr style={{ paddingBottom: "15px", borderBottom: "1px solid #E3EBF8" }}>
                      <td width="20%" class="table-th">Phone</td>
                      <td><h3 style={{ fontSize: '15px' }}>6767878787</h3></td>
                    </tr>
                    <tr>
                      <td width="20%" class="table-th">Message</td>
                      <td><h3 style={{ fontSize: '15px' }}>This is message box</h3></td>
                    </tr>
                  </table>

                </div>
              </div>

              <div class="col-md-12  created-popup-action">
                <div class="col-md-6"></div>

                <div class="col-md-3 no-padding ">
                </div>
                <div class="col-md-3 no-padding" style={{ paddingBottom: "20px" }}>
                  <Button
                    text="Close"
                    type="button"
                    buttonType="btn dialog-delete-btn"
                    onClick={() => this.dialogClose()}
                  />
                </div>

                <div class="col-md-4"></div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
const mapStoreToProps = state => {
  return {
    AllPlanInfo: state.AllPlanInfo
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onPlanInfoDispatch: () =>
      dispatch({ type: "PLANS_INFO", AllPlanInfo: allPlanInfo })
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(ContactInquiries);
