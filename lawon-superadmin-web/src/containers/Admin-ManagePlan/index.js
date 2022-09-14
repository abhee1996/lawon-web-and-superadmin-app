import React, { Component } from 'react'
import { Button, TYPES } from '../../components/atoms/YellowButton'
import { Link } from 'react-router-dom';
import { adminAPIs } from '../../apiConstants/adminAPIs';
import ReactPlaceholder from 'react-placeholder';
import Dialog from '@material-ui/core/Dialog';
import "react-placeholder/lib/reactPlaceholder.css";
import { connect } from 'react-redux'
import moment from 'moment'
import _ from "lodash";
import SearchBar from '../../components/atoms/Searchbar';

var startIndex
var allPlanInfo
class AdminManagePlan extends Component {
  state = {
    open: false,
    dropdownId: 0,
    setOpen: false,
    Open: false,
    dialogId: 0,
    setOpen: false,
    Open: false,
    dialogId: 0,
    selectToDelete: false,
  }
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
      search:"",


    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);

  };
  handleChangeCheckbox = (event) => {
    let ischecked = event.target.checked
    console.log("change in checkbox", ischecked)
    this.setState({
      [event.target.name]: event.target.checked
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
  handleChangeInput = event => {

    this.state.allPlanInfo.filter(item=>item.name.toLowerCase().includes(event.target.value.toLowerCase())).map(item=>{ console.log("this is elite")})
     
    
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }
  handleClickOpen = (e) => {
    console.log("this is my id", e)
    localStorage.setItem("deletePlanId", e)
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

 

  firstPage() {
    this.setState({ currentPage: 1 })

  }

  previousPage() {
    this.setState({
      currentPage: this.state.currentPage - 1
    })
  }
  lastPage() {
    this.setState({ currentPage: Math.round(this.state.allPlanInfo.length / this.state.nofDataDisplay) })
  }
  nextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1
    })
  }
  async componentDidMount() {
    var responsevar = await adminAPIs.adminGetAllPlans();
    console.log('responsevar', responsevar)
    if (responsevar.code == 200 || responsevar.code == 201) {
      allPlanInfo = responsevar.data.sort((a, b) => (a.sort - b.sort))
      console.log('responsevar code is 200')
      this.setState({
        allPlanInfo: responsevar.data,
        load: true
      })
      this.props.onPlanInfoDispatch()
      console.log("my data")
    }
    else {
      console.log('responsevar failed')
    }

  }
  async deletePlan() {


    var responsevar = await adminAPIs.adminDeletePlan();
    if (responsevar.code == 200 || responsevar.code == 201) {
      localStorage.removeItem("deletePlanId")
      console.log("success")
      this.setState({ setOpen: false })
      var planResponse = await adminAPIs.adminGetAllPlans();
      if (planResponse.code == 200 || planResponse.code == 201) {
        allPlanInfo = planResponse.data
        this.props.onPlanInfoDispatch()
        this.setState({
          allPlanInfo: this.props.AllPlanInfo,
        })

      }
      this.props.history.push({
        pathname: '/main/dashboardmaster/manageplan',

      });
    }
    else {
      console.log("error")
    }
  }
  editPlan = (e) => {
    this.props.history.push({
      pathname: '/main/dashboardmaster/admineditplan/',
      search: 'selectedplan=' + e,
    })


  }
  viewPlan = (e) => {
    this.props.history.push({
      pathname: '/main/dashboardmaster/manageplanView/',
      search: 'selectedplan=' + e,
    })


  }
  render() {
    const { allPlanInfo, currentPage, nofDataDisplay } = this.state;

    console.log("check feels value", allPlanInfo, currentPage, nofDataDisplay);
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
          <div class="heading">Manage Plan</div>

          <div class="col-md-12 no-padding">
            <div class=" col-md-4 no-padding">
              <SearchBar />
              {/* <input type="text" class="form-control onboarding-search" placeholder="Search" onChange={this.handleChangeInput} /> */}
            </div>
            <div>
              <Link to='/main/dashboardmaster/admincreateplan'>
                <button class="create-new-plan-btn"><i class="fa fa-plus-circle"></i> Create New Plan</button>

              </Link>
            </div>
          </div>
          <div class="sub-heading">

          </div>
          <div class="members-detail-section">
            <div class="col-md-12 no-padding">
              <div class="member-bg ">
                All Plans {this.state.selectToDelete ? <i class="fa fa-trash trash"> </i> : null}
                <span class="member-select-span">
                  <select class="member-select" name='nofDataDisplay' onChange={this.handleChangeInput}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                </span>
              </div>
              <div class="table-responsive">
                <table class="table" >
                  <ReactPlaceholder type="text"
                    showLoadingAnimation={true}
                    rows={13}
                    color="#EBEFF1"
                    background="#fff"
                    ready={this.state.load}
                    style={{ padding: 30 }}
                  >
                    <thead>
                      <tr>
                        <th width="5%" class="table-th border-l">{this.state.selectToDelete ? <input onChange={this.handleChangeCheckbox} type="checkbox" name="selectToDelete" checked /> : <input onChange={this.handleChangeCheckbox} name="selectToDelete" type="checkbox" />}</th>
                        <th width="10%" class="table-th">Sort</th>
                        <th width="20%" class="table-th">Title</th>
                        <th width="10%" class="table-th">Price</th>
                        <th width="15%" class="table-th">Trial Period</th>
                        <th width="15%" class="table-th">Created At</th>
                        <th width="15%" class="table-th">Updated At</th>
                        <th width="10%" class="table-th border-r">Action</th>
                      </tr>
                    </thead>
                    <tbody>

                      {paginateMovie.map((item) =>
                        <tr class="dashed-line">
                          <td> {this.state.selectToDelete ? <input type="checkbox" name="plan" value={item.id} checked /> : <input type="checkbox" />} </td>
                          {console.log("hello", this.state.selectToDelete)}
                          <td>{item.sort}
                          </td>
                          <td>{item.name}</td>
                          <td>£ {Math.round(item.monthlyFee)}</td>
                          <td>{Math.round(item.trialPeriod)} Months</td>
                          <td>
                            {moment(item.createAt).isValid() ? moment(item.createAt).format("Do MMM  YYYY") : ""}
                          </td>
                          <td>
                            {moment(item.updatedAt).isValid() ? moment(item.updatedAt).format("Do MMM  YYYY") : ""}

                          </td>
                          <td> <div className='col-md-2 user-con-angle-down' onClick={() => this.showDropdownMenu(item.id)}>
                            <i className='fa fa-ellipsis-h'></i>
                          </div>
                            {this.state.displayMenu && this.state.dropdownId == item.id ? (
                              <div className='dropdwon-question-status'>

                                <div onClick={() => this.viewPlan(item.id)}>View</div>

                                <div onClick={() => this.editPlan(item.id)}>Edit</div>
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
                    onClick={() => this.deletePlan()}
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
  return {
    AllPlanInfo: state.AllPlanInfo

  };
};
const mapDispatchToProps = dispatch => {
  return {
    onPlanInfoDispatch: () => dispatch({ type: 'PLANS_INFO', AllPlanInfo: allPlanInfo }),

  }
}
export default connect(mapStoreToProps, mapDispatchToProps)(AdminManagePlan)

