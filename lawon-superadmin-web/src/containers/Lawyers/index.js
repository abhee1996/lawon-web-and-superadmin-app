import React, { Component } from "react";
import { adminAPIs } from "../../apiConstants/adminAPIs";
import "react-placeholder/lib/reactPlaceholder.css";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import SearchBar from "../../components/atoms/Searchbar";
import Table from "../../components/atoms/Table";
import PageTopBar from "../../components/atoms/PageTopBar";
import DeleteBox from "../../components/atoms/DeleteBox";

import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

import 'react-day-picker/lib/style.css';

var allPlanInfo;
const tableTitle = ['', 'First Name', 'Last Name', 'Email', 'Organization Name', 'Phone Number', 'Details',];
class LawyersPage extends Component {

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
    let responsevar = await adminAPIs.paginateLawyers(skip, limit);
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
      let responsevar = await adminAPIs.paginateLawyers(skip, limit);
      if (responsevar.code == 200 || responsevar.code == 201) {
        this.setState({
          allPlanInfo: responsevar.data.rows,
          count: responsevar.data.count,
          load: true
        });
      }
    }
  }
  paginationPageChange = (pageNumber) => { this.setState({ currentPage: pageNumber })}
  render() {
    const { allPlanInfo, currentPage, limitRecords, count, load } = this.state;

    return (
      <div class="row" style={{ background: "#ebeff1", margin: "80px 10px 5px 25px" }}>
        <div class="col-md-12">
          <PageTopBar title={"Lawyers List"} />
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
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          <Table allPlanInfo={allPlanInfo} load={load} tableTitle={tableTitle} title={"All Lawyers"} />
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
export default connect(mapStoreToProps, mapDispatchToProps)(LawyersPage);
