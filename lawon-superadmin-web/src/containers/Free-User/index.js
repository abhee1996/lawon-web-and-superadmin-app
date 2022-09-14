import React, { Component } from "react";
import { Button } from "../../components/atoms/YellowButton";
import { adminAPIs } from "../../apiConstants/adminAPIs";
import Dialog from "@material-ui/core/Dialog";
import "react-placeholder/lib/reactPlaceholder.css";
import { connect } from "react-redux";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import { renderToString } from "react-dom/server";
// import jsPDF from "jspdf";
import 'react-day-picker/lib/style.css';

import Pagination from "react-js-pagination";
import SearchBar from "../../components/atoms/Searchbar";
import Table from "../../components/atoms/Table";
import PageTopBar from "../../components/atoms/PageTopBar";
import DeleteBox from "../../components/atoms/DeleteBox";

require("bootstrap/less/bootstrap.less");

var allPlanInfo;

// const Prints = ({ value }) => {
//   return (
//     <div>

//       <table style={{ width: "100%" }}>
//         <tr>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Email</th>
//           <th>Phone Number</th>
//           <th>Date</th>
//         </tr>
//         {value.map(({ id, firstName, lastName, email, phoneNumber, createAt }) => (
//           <tr key={id}>
//             <td>{firstName}</td>
//             <td>{lastName}</td>
//             <td>{email}</td>
//             <td>{phoneNumber}</td>
//             <td>{createAt}</td>
//           </tr>
//         ))}
//       </table>

//     </div>

//   );
// }

const tableTitle = ['', 'First Name', 'Last Name', 'Email', 'Phone Number', 'Date', 'Action'];

class FreeUsers extends Component {

  state = {
    allPlanInfo: [],
    count: "",
    limitRecords: 5,
    currentPage: 1,
    load: false,
    inviteBoxSet: false,
    deleteBoxSet: false,
    startDate: "",
    endDate: "",
    searchValue: "",
  };

  async componentDidMount() {
    let limit = this.state.limitRecords;
    let currentPage = this.state.currentPage;
    let skip = (currentPage * limit) - limit;
    let responsevar = await adminAPIs.paginateUsers(skip, limit);
    if (responsevar.code == 200 || responsevar.code == 201) {
      this.setState({
        allPlanInfo: responsevar.data.rows,
        count: responsevar.data.count,
        load: true
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      let limit = this.state.limitRecords;
      let currentPage = this.state.currentPage;
      let skip = (currentPage * limit) - limit;
      let responsevar = await adminAPIs.paginateUsers(skip, limit);
      if (responsevar.code == 200 || responsevar.code == 201) {
        this.setState({
          allPlanInfo: responsevar.data.rows,
          count: responsevar.data.count,
          load: true
        });
        this.props.onPlanInfoDispatch();
        console.log("my data");
      }
    }
  }

  // handleSearch = async (value) => {
  //   if (value != "") { this.setState({ searchValue:value }) } 
  //   else { this.setState({ searchValue: "" }) }

  //   this.setState({ searchValue: value });
  //   let getvalue = this.state.searchValue;
  //   let start = this.state.startDate;
  //   let end = this.state.endDate
  //   let responsevar = await adminAPIs.SearchUsers(getvalue, start, end);
  //   if (responsevar.code == 200 || responsevar.code == 201) {
  //     allPlanInfo = responsevar.data.rows;
  //     this.setState({
  //       allPlanInfo,
  //       load: true
  //     });
  //     this.props.onPlanInfoDispatch();
  //   }
  // }

  // dateApply = async (event, { startDate, endDate }) => {
  //   this.setState({ startDate: startDate.toDate().toISOString(), endDate: endDate.toDate().toISOString() });
  //   let getvalue = this.state.searchValue;
  //   let start = this.state.startDate;
  //   let end = this.state.endDate
  //   console.log("value start end", getvalue, start, end);
  //   let responsevar = await adminAPIs.SearchUsers(getvalue, start, end);
  //   console.log("Start and End Date", responsevar);
  //   if (responsevar.code == 200 || responsevar.code == 201) {
  //     allPlanInfo = responsevar.data.rows;
  //     this.setState({
  //       allPlanInfo,
  //       load: true,
  //     });
  //     this.props.onPlanInfoDispatch();
  //   }
  // }

  // handleChangeInput = event => {
  //   this.state.allPlanInfo
  //     .filter(item =>
  //       item.name.toLowerCase().includes(event.target.value.toLowerCase())
  //     )
  //     .map(() => {
  //       console.log("this is elite");
  //     });
  // };

  paginationPageChange = (pageNumber) => { this.setState({ currentPage: pageNumber }) }

  // dialogOpen = () => {
  //   if (this.state.inviteBoxSet == true) { this.setState({ inviteBoxSet: false }); }
  //   else { this.setState({ inviteBoxSet: true }); }
  // };
  // dialogClose = () => {
  //   this.setState({
  //     inviteBoxSet: false,
  //     deleteBoxSet: false,
  //   });
  // };

  // print = (value) => {
  //   const string = renderToString(<Prints value={value} />);
  //   const pdf = new jsPDF();
  //   pdf.fromHTML(string);
  //   pdf.save("pdf");
  // };

  render() {
    const dailogBtnCS = {
      fontSize: "11px", float: "right", fontWeight: "500", height: "30px", width: "170px", padding: "4px 0",
      textAlign: "center", display: "block", color: "#000", textDecoration: "none", border: "1px solid #FEB41D",
      borderRadius: "4px", background: "linear-gradient(to right, #feb41d 0%,#ffce6a 100%)",
    };
    const { allPlanInfo, currentPage, limitRecords, count, load } = this.state;
    return (
      <div class="row" style={{ background: "#ebeff1", margin: "80px 10px 5px 25px" }}>
        <div class="col-md-12">
          <PageTopBar title={"Users List"} />
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class=" col-md-5">
                  <SearchBar handleSearch={this.handleSearch} />
                </div>
                <div className="col-md-4">
                  <DateRangePicker onApply={this.dateApply}>
                    <input
                      style={{ width: "120%" }}
                      class="form-control"
                      type="text"
                      placeholder="01/01/2019 - 01/15/2019"
                    />
                  </DateRangePicker>
                </div>
                <div className="col-md-3">
                  <button
                    style={dailogBtnCS} onClick={() => this.dialogOpen()}>
                    <i class="fa fa-plus-circle"></i> Invite Users
              </button>
                </div>
              </div>
            </div>
          </div>
          <Table allPlanInfo={allPlanInfo} load={load} tableTitle={tableTitle} title={"All Users"} />
        </div>

        <div class="row">
          <div class="col-md-5 col-md-offset-4">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={limitRecords}
              totalItemsCount={count}
              pageRangeDisplayed={5}
              onChange={this.paginationPageChange}
            />
          </div>
        </div>
        <DeleteBox
          deleteBoxSet={this.state.deleteBoxSet}
          deletePlan={this.deletePlan}
          dialogClose={this.dialogClose}
        />
        {/* <Dialog open={this.state.inviteBoxSet}>
          <div>
            <div class="col-md-12 plan-popup" style={{ padding: "0px", margin: "0px" }}>
              <div class="col-md-12" style={{ background: "#feb41c" }}>
                <h1>Users Invitations </h1>
              </div>
              <div class="col-md-5"> <br></br>  </div>
              <div class="col-md-12">
                <div class="dialog-popup-subtext">
                  <form action="/action_page.php">
                    <div class="form-group" style={{ marginBottom: "0px" }}>
                      <label for="email" style={{ fontSize: "15px" }}>Email</label>
                      <input type="email" class="form-control" id="email" name="email" />
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-12  created-popup-action" style={{ paddingBottom: '20px' }}>
                <div class="col-md-6"></div>

                <div class="col-md-3 no-padding ">
                  <Button
                    text="Send"
                    type="button"
                    buttonType="btn dialog-delete-btn"
                    onClick={() => this.dialogClose()}
                  />
                </div>
                <div class="col-md-3 no-padding ">
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
        </Dialog> */}
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
export default connect(mapStoreToProps, mapDispatchToProps)(FreeUsers);
