import React, { Component } from "react";
import { Button, TYPES } from "../../components/atoms/YellowButton";
import { Link } from "react-router-dom";
import { adminAPIs } from "../../apiConstants/adminAPIs";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { connect } from "react-redux";
import moment from "moment";
// import DayPickerInput from 'react-day-picker/DayPickerInput';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

import 'react-day-picker/lib/style.css';
import _ from "lodash";

import SearchDateApply from "../../components/atoms/SearchDateApply";

var startIndex;
var allPlanInfo;
class TransactionHistory extends Component {
 
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
      setOpenView: false,
      OpenView: false,
      selectToDelete: false,
      search: ""
    };


  }
 
  handleChangeInput = event => {
    this.state.allPlanInfo
      .filter(item =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
      .map(item => {
        console.log("this is elite");
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
  render() {
    const { allPlanInfo, currentPage, nofDataDisplay } = this.state;

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
          <div class="heading">Payment History</div>
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
          <div class="sub-heading"></div>
          <div class="members-detail-section">
            <div class="col-md-12 no-padding">
              <div class="member-bg ">
                Payment History{" "}
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
              <div class="table-responsive">
                <table class="table">
                  <ReactPlaceholder
                    type="text"
                    showLoadingAnimation={true}
                    rows={13}
                    color="#EBEFF1"
                    background="#fff"
                    ready={this.state.load}
                    style={{ padding: 30 }}
                  >
                    <thead>
                      <tr>
                        <th class="table-th">
                          Package Name
                        </th>
                        <th class="table-th">
                          Amount
                        </th>
                        <th class="table-th">
                          User
                        </th>
                        <th class="table-th">
                          Period
                        </th>
                     
                        <th class="table-th">
                          Expire
                        </th>
                        <th class="table-th">
                          invoice
                        </th>
                        <th class="table-th border-r">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateMovie.map(item => (
                        <tr class="dashed-line">
                          <td>{item.name}</td>
                          <td>£ {Math.round(item.monthlyFee)}</td>
                          <td>{item.name}</td>
                          <td>{Math.round(item.trialPeriod)} Months</td>
                          <td>
                            {moment(item.createAt).isValid()
                              ? moment(item.createAt).format("Do MMM  YYYY")
                              : ""}
                          </td>
                          <td>
                          Invoice
                       
                          </td>
                          <td>
                          {moment(item.updatedAt).isValid()
                            ? moment(item.updatedAt).format("Do MMM  YYYY")
                            : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </ReactPlaceholder>
                </table>
              </div>
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
export default connect(mapStoreToProps, mapDispatchToProps)(TransactionHistory);
