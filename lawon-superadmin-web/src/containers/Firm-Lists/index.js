import React, { Component } from "react";
import { adminAPIs } from "../../apiConstants/adminAPIs";
import "react-placeholder/lib/reactPlaceholder.css";
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
// import jsPDF from "jspdf";
import 'react-day-picker/lib/style.css';
import Pagination from "react-js-pagination";
import SearchBar from "../../components/atoms/Searchbar";
import Table from "../../components/atoms/Table";
import PageTopBar from "../../components/atoms/PageTopBar";

require("bootstrap/less/bootstrap.less");

const tableTitle = ['', 'Firm ID', 'Firm Name', 'Current Package', 'Organization Status', 'View Details'];
class FirsmList extends Component {

state = {
    allPlanInfo: [],
    count: "",
    limitRecords: 5,
    currentPage: 1,
    load: false,
    inviteBoxSet: false,
    deleteBoxSet: false,
    searchValue: "",
};
async componentDidMount() {
    let limit = this.state.limitRecords;
    let currentPage = this.state.currentPage;
    let skip = (currentPage * limit) - limit;
    let responsevar = await adminAPIs.paginateFirm(skip, limit);
    if (responsevar.code == 200 || responsevar.code == 201) {
        this.setState({
            allPlanInfo: responsevar.data.rows,
            count: responsevar.data.count,
            load: true
        });
    }};

async componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
        let limit = this.state.limitRecords;
        let currentPage = this.state.currentPage;
        let skip = (currentPage * limit) - limit;
        let responsevar = await adminAPIs.paginateFirm(skip, limit);
        if (responsevar.code == 200 || responsevar.code == 201) {
            this.setState({
                allPlanInfo: responsevar.data.rows,
                count: responsevar.data.count,
                load: true
            });
    }}};
paginationPageChange = (pageNumber) => { this.setState({ currentPage: pageNumber }) }

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
            
            <PageTopBar title={"All Firms"} />
            
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class=" col-md-5">
                            <SearchBar handleSearch={this.handleSearch} />
                        </div>
                        <div className="col-md-4"></div>
                        <div className="col-md-3">
                            <button style={dailogBtnCS} onClick={() => this.dialogOpen()}>
                                <i class="fa fa-plus-circle"></i> Add New Firm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Table allPlanInfo={allPlanInfo} load={load} tableTitle={tableTitle} title={"All Firms"} />
            
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
)}};
export default FirsmList;



// import React, { Component } from 'react'
// import { Button, TYPES } from '../../components/atoms/YellowButton'
// import { Input } from '../../components/atoms/InputField'
// import { Link } from "react-router-dom";
// import axios from "axios";
// // import MembersDetail from './Members-details'

// class FirsmList extends Component {

//     state = { isLoading: true, firmsData: [], };

//     async componentDidMount() {
//         const promise = await axios.get("http://192.168.18.195:3000/organizations/profile/1");
//         const firmsData = promise.data;
//         this.setState({ firmsData, isLoading: false });
//     }

//     // async componentDidMount() {
//     //     var responsevar = await adminAPIs.adminGetAllCoupons();
//     //     console.log('responsevar', responsevar)
//     //     couponInfo = responsevar;
//     //     console.log("COuponINfo", couponInfo.data)
//     //     if (responsevar.code == 200 || responsevar.code == 201) {
//     //       console.log('responsevar code is 200')
//     //       this.setState({

//     //         coupon: responsevar.data,
//     //         load: true
//     //       })
//     //       this.props.onCouponInfoDispatch();
//     //       console.log("my data IS", this.state.coupon)

//     //     }
//     //     else {
//     //       console.log('responsevar failed')
//     //     }

//     //   }
//     render() {
//         const { firmsData, isLoading } = this.state;
//         console.log("firmsData", firmsData);
//         return (
//             <div class='main'>

//                 <div class="superadmin-dashboard">
//                     <div class="heading">
//                         Search Filters!

//                         <button class="documents-btn">
//                             <img class="margin-right" src="./images/firm-details/PDF.png" />
//                             PDF

//                         </button>

//                         <button class="add-new-firm">
//                             <i class="fa fa-plus-circle"></i>
//                             Add New Firm

//                         </button>
//                     </div>

//                     <div class="col-md-12 padding-0">
//                         <div class="row bg">
//                             <div class="col-md-10">
//                                 <div class='col-md-12'>
//                                     <div class="col-md-6">
//                                         <Input
//                                             type={'text'}
//                                             name={'plan-title'}
//                                             placeholder={'Firm ID'}
//                                             handleChange={this.handleChangeInput}
//                                             id={'plan-title'}
//                                         />
//                                     </div>
//                                     <div class="col-md-6">
//                                         <Input
//                                             type={'text'}
//                                             name={'plan-title'}
//                                             placeholder={'Firm Name'}
//                                             handleChange={this.handleChangeInput}
//                                             id={'plan-title'}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div class="col-md-2">
//                                 <Button
//                                     text="Apply Filters"
//                                     type="button"
//                                     buttonType="btn register-btn"
//                                 />
//                             </div>
//                         </div>
//                     </div>


//                     <div class="col-md-12 no-padding">
//                         <div class="members-detail-section">
//                             <div class="col-md-12 no-padding">
//                                 <div class="table-responsive">
//                                     <table class="table" >
//                                         <thead>
//                                             <tr>

//                                                 <th class="table-th border-l">Firm ID</th>
//                                                 <th class="table-th">Firm Name</th>
//                                                 <th class="table-th">Current Package</th>
//                                                 <th class="table-th">Organization Status</th>
//                                                 <th class="table-th border-r">View Details</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {/* {!isLoading ? (
//                                                 firmsData.map(firm => (
//                                                     <tr className="dashed-line">
//                                                         <td>{firm.code}</td>
//                                                     </tr>
//                                                 ))
//                                             ) : null} */}
//                                         </tbody>
//                                     </table>
//                                 </div>


//                             </div>
//                         </div>
//                     </div>
//                 </div>


//             </div>
//         )
//     }
// }
// export default FirsmList