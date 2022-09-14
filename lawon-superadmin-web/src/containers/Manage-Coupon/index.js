import React, { Component } from 'react'
import { Button, TYPES } from '../../components/atoms/YellowButton'
import { Input } from '../../components/atoms/InputField'
import { Link } from 'react-router-dom';
import { adminAPIs } from '../../apiConstants/adminAPIs'
import queryString from 'query-string';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux'
import moment from 'moment'
import _ from "lodash";
import SearchBar from '../../components/atoms/Searchbar';
var couponInfo;
var startIndex
class ManageCoupon extends Component {
  state = {
    open: false,
    dropdownId: 0,
    code: "",
    noOfUsage: "",
    discount: "",
    isPercentage: "",
  }
  constructor() {
    super();
    this.state = {
      displayMenu: false,
      coupon: [],
      load: false,
      currentPage: 1,
      nofDataDisplay: 5,
      setOpen: false,
      Open: false,
      dialogId: 0,
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  };
  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  showDropdownMenu = (e) => {
    if (this.state.dropdownId == e) {
      this.setState({
        dropdownId: 0
      })
    } else {
      this.setState({
        displayMenu: true,
        dropdownId: e
      }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
      });
    }
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  firstPage() {
    this.setState({ currentPage: 1 })

  }
  previousPage() {
    this.setState({
      currentPage: this.state.currentPage - 1
    })
  }
  lastPage() {
    this.setState({ currentPage: Math.round(this.state.coupon.length / this.state.nofDataDisplay) })
  }
  nextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1
    })
  }
  async componentDidMount() {
    var responsevar = await adminAPIs.adminGetAllCoupons();
    console.log('responsevar', responsevar)
    couponInfo = responsevar;
    console.log("COuponINfo", couponInfo.data)
    if (responsevar.code == 200 || responsevar.code == 201) {
      console.log('responsevar code is 200')
      this.setState({
        coupon: responsevar.data,
        load: true
      })
      this.props.onCouponInfoDispatch();
      console.log("my data IS", this.state.coupon)

    }
    else {
      console.log('responsevar failed')
    }

  }
  handleClickOpen = (e) => {
    console.log("this is my id", e)
    localStorage.setItem('deleteCouponId', e)

    if (this.state.setOpen == true) {
      this.setState({ setOpen: false, })
    }
    else {
      this.setState({
        setOpen: true,
        dialogId: e
      })
    }
  }
  dialogClose = () => {
    console.log("this is my id")
    this.setState({
      setOpen: false
    })
  }
  async deleteCoupon() {
    var responsevar = await adminAPIs.adminDeleteCoupon();
    if (responsevar.code == 200 || responsevar.code == 201) {
      localStorage.removeItem('deleteCouponId')
      this.setState({ setOpen: false})
      console.log("success")
      couponInfo = await adminAPIs.adminGetAllCoupons();
      if (couponInfo.code == 200 || couponInfo.code == 201) {
        this.props.onCouponInfoDispatch()
        this.setState({coupon: this.props.CouponInfo})
      }
      this.props.history.push({ pathname: '/main/dashboardmaster/managecoupon', });
    }
  }
  editCoupon = (e) => {
    console.log("eee", e)

    this.props.history.push({
      pathname: '/main/dashboardmaster/editcoupon/',
      search: 'selectedcoupon=' + e,
    })
    localStorage.setItem('couponId', e)
  }


  render() {
    const { coupon, currentPage, nofDataDisplay } = this.state;
    console.log("check feels value", coupon, currentPage, nofDataDisplay);
    const paginateMovie = (function (coupon, currentPage, nofDataDisplay) {
      startIndex = (currentPage - 1) * nofDataDisplay;
      console.log("Start INDX", startIndex);
      return _(coupon)
        .slice(startIndex)
        .take(nofDataDisplay)
        .value();
    })(coupon, currentPage, nofDataDisplay);

    const totalnofLi = Math.ceil(coupon.length / nofDataDisplay);
    const makeLiArry = _.range(1, totalnofLi + 1);
    const paginate = li => {
      this.setState({ currentPage: li });
    };
    return (
      <div class="main">
        <div class="superadmin-dashboard">
          <div class="onboard-heading" style={{ paddingBottom: "20px" }}>Manage Coupon</div>

          <div class=" col-md-6 no-padding">
            <SearchBar />

            {/* <input type="text" class="form-control onboarding-search" placeholder="Search" onChange={this.handleChangeInput} /> */}
          </div>

          <div class="heading">

            <Link to='/main/dashboardmaster/createcoupon'>
              <button class="add-new-firm">
                <i class="fa fa-plus-circle"></i>
                Create Coupon
              </button>
            </Link>
          </div>

          <div class="col-md-12 no-padding">
            {/* <div class="col-md-4 no-padding">
              <input type="text" class="form-control onboarding-search" placeholder="Firm Id" />
            </div>
            <div class="col-md-4 no-padding margin-left-10" >
              <input type="text" class="form-control onboarding-search" placeholder="Firm Name" />
            </div> */}
          </div>

          <div class="members-detail-section">
            <div class="col-md-12 no-padding">
              <div class="member-bg ">
                All Coupons
                <span class="member-select-span">
                  <select class="member-select" name='nofDataDisplay' onChange={this.handleChangeInput}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                </span>
              </div>

              <div class="table-responsive">
                <ReactPlaceholder type="text"
                  showLoadingAnimation={true}
                  rows={13}
                  color="#EBEFF1"
                  background="#fff"
                  ready={this.state.load}
                  style={{ padding: 30 }}
                >
                  <table class="table" >
                    <thead>
                      <tr>
                        <th width="10%" class="table-th border-l">Code</th>
                        <th width="10%" class="table-th">Counter</th>
                        <th width="15%" class="table-th">Valid From</th>
                        <th width="15%" class="table-th">Valid Till</th>
                        <th width="10%" class="table-th">Amount</th>
                        <th width="10%" class="table-th">Status </th>
                        <th width="10%" class="table-th">Coupon Type</th>
                        <th width="10%" class="table-th border-r">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateMovie.map((item) =>
                        <tr class="dashed-line">
                          <td><span class="text-FCA900">{item.code}</span></td>
                          <td>{item.noOfUsage}</td>
                          <td>{moment(item.validFrom).isValid() ? moment(item.validFrom).format("Do MMM  YYYY") : ""}</td>
                          <td>{moment(item.validFrom).isValid() ? moment(item.validTo).format("Do MMM  YYYY") : ""}</td>
                          <td>{item.discount}$</td>
                          <td>{item.isPercentage ? <span class="active">Active</span> : <span class="disable">Disable</span>}</td>
                          <td>{item.couponType}</td>
                          <td> <div className='col-md-2 user-con-angle-down' onClick={() => this.showDropdownMenu(item.id)}>
                            <i className='fa fa-ellipsis-h'></i>
                          </div>
                            {this.state.displayMenu && this.state.dropdownId == item.id ? (
                              <div className='dropdwon-question-status'>
                                <div onClick={() => this.editCoupon(item.id)}>Edit</div>
                                <div onClick={() => this.handleClickOpen(item.id)}>Delete</div>
                              </div>
                            ) :
                              (
                                null
                              )
                            }

                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </ReactPlaceholder>
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
                    {this.state.currentPage == 1 ?
                      <button disabled class="disable" onClick={() => this.firstPage()}><i class="fa fa-angle-double-left"></i></button> :
                      <button onClick={() => this.firstPage()}><i class="fa fa-angle-double-left"></i></button>
                    }
                  </a>
                </li>
              </div>
              <div class="pagination">
                <li class="page-item">
                  <a class="page-link" aria-label="Previous">
                    {this.state.currentPage == 1 ?
                      <button disabled class="disable" onClick={() => this.previousPage()}><i class="fa fa-angle-left"></i></button> :
                      <button onClick={() => this.previousPage()}><i class="fa fa-angle-left"></i></button>}
                  </a>
                </li>
              </div>
              {makeLiArry.filter(item => item == currentPage).map(li => (
                <div class="pagination">


                  {currentPage == 1 ? null :


                    <li

                    >
                      {console.log("test", li)}
                      <a class="page-link page-num " onClick={() => paginate(li - 1)}>
                        {li - 1}
                      </a>
                    </li>
                  }<li
                    key={li}
                    className={
                      li === currentPage ? "page-item active" : "page-item"
                    }
                  >
                    {console.log("test", li)}
                    <a class="page-link page-num " onClick={() => paginate(li)}>
                      {li}
                    </a>
                  </li>
                  {totalnofLi == currentPage ? null : <li

                  >

                    <a class="page-link page-num " onClick={() => paginate(li + 1)}>
                      {li + 1}
                    </a>
                  </li>
                  }
                </div>

              ))}
              <div class="pagination">
                <li class="page-item">
                  <a class="page-link" disabled="true" aria-label="Next">
                    {this.state.currentPage == totalnofLi ?
                      <button disabled class="disable"><i class="fa fa-angle-right"></i></button> :
                      <button onClick={() => this.nextPage()}><i class="fa fa-angle-right"></i></button>}

                  </a>
                </li>
              </div>
              <div class="pagination">
                <li class="page-item">
                  <a class="page-link " >
                    {this.state.currentPage == totalnofLi ?
                      <button disabled class="disable"><i class="fa fa-angle-double-right"></i></button> :
                      <button onClick={() => this.lastPage()}><i class="fa fa-angle-double-right"></i></button>}
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <Dialog onClose={this.handleClose} open={this.state.setOpen}>
          <div>
            <div class="col-md-12 plan-popup">
              <div class="col-md-5"></div>
              <div class="col-md-2 logo-alert">
                <img src="./images/firm-details/created.png " />
              </div>
              <div class="col-md-5"></div>
              <div class="col-md-12 created-popup-text">

                <div class="dialog-popup-subtext">
                  Are you sure you want to delete?
            </div>

              </div>
              <div class="col-md-12  created-popup-action">
                <div class="col-md-6"></div>

                <div class="col-md-3 no-padding ">

                  <Button
                    text="Delete"
                    type="button"
                    buttonType="btn dialog-delete-btn"
                    onClick={() => this.deleteCoupon()}
                  />
                </div>
                <div class="col-md-3 no-padding ">

                  <Button
                    text="Cancel"
                    type="button"
                    buttonType="btn btn-generic"
                    onClick={() => this.dialogClose()}
                  />
                </div>
                <div class="col-md-4"></div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}
const mapStoreToProps = state => {
  return {CouponInfo: state.CouponInfo};
};
const mapDispatchToProps = dispatch => {
  return {
    onCouponInfoDispatch: () => dispatch({ type: 'COUPON_INFO', CouponInfo: couponInfo.data }),

  }
}
export default connect(mapStoreToProps, mapDispatchToProps)(ManageCoupon)
