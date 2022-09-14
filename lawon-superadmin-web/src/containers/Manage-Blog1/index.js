import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, TYPES } from '../../components/atoms/YellowButton'
import { Input } from '../../components/atoms/InputField'
import { adminAPIs } from '../../apiConstants/adminAPIs'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux'
import _ from "lodash";
import SearchBar from '../../components/atoms/Searchbar';
var startIndex
var blogCategories
class ManageBlog1 extends Component {
  state = {
    open: false,
    dropdownId: 0,
    setOpen: false,
    Open: false,
    dialogId: 0,
  }
  constructor() {
    super();

    this.state = {
      displayMenu: false,
      load: false,
      dropdownId: 0,
      blogsCategories: [],
      currentPage: 1,
      nofDataDisplay: 5,
      setOpen: false,
      Open: false,
      dialogId: 0,
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

  };
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
  handleClickOpen = (e) => {
    console.log("this is my id", e)
    localStorage.setItem('deleteCategoryId', e)

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
  showBlogs = (e) => {
    this.props.history.push({
      pathname: '/main/dashboardmaster/categoryblogs/',
      search: 'selectedblogs=' + e,
    })
    localStorage.setItem('updateHelpArticleId', e)

  }
  handleChangeInput = (event) => {

    this.setState({
      [event.target.name]: event.target.value,

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
    this.setState({ currentPage: Math.ceil(this.state.blogsCategories.length / this.state.nofDataDisplay) })
  }
  nextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1
    })
  }
  handleClickOpen = (e) => {
    console.log("this is my id", e)
    localStorage.setItem('deleteBlogCategoriesArticleId', e)

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
  async componentDidMount() {
    var responsevar = await adminAPIs.adminGetAllBlogsCategories();
    console.log('responsevar', responsevar)
    blogCategories = responsevar
    if (responsevar.code == 200 || responsevar.code == 201) {
      console.log('responsevar code is 200')
      this.setState({
        blogsCategories: responsevar.data.sort((a, b) => (a.sort - b.sort)),
        load: true,
      })
      this.props.onBlogCategoriesDispatch()
      console.log("my data", this.state.blogsCategories)
    }
    else {
      console.log('responsevar failed')
    }

  }
  async deleteBlogCategoryWithArticles(e) {

    var responsevar = await adminAPIs.adminDeleteBlogWithArticle();
    if (responsevar.code == 200 || responsevar.code == 201) {
      console.log('responsevar code is 200')
      localStorage.removeItem('deleteBlogCategoriesArticleId')
      this.setState({
        setOpen: false
      })
      console.log("success")
      blogCategories = await adminAPIs.adminGetAllBlogsCategories();
      if (blogCategories.code == 200 || blogCategories.code == 201) {
        this.props.onBlogCategoriesDispatch()
        this.setState({
          blogsCategories: this.props.BlogCategories,
        })
      }
      this.props.history.push({
        pathname: '/main/dashboardmaster/manageblog1',

      });
    }
    else {
      console.log("error")
    }
  }

  render() {
    const { blogsCategories, currentPage, nofDataDisplay } = this.state;
    console.log("check feels value", blogsCategories, currentPage, nofDataDisplay);
    const paginateMovie = (function (blogsCategories, currentPage, nofDataDisplay) {
      startIndex = (currentPage - 1) * nofDataDisplay;
      console.log("Start INDX", startIndex);
      return _(blogsCategories)
        .slice(startIndex)
        .take(nofDataDisplay)
        .value();
    })(blogsCategories, currentPage, nofDataDisplay);
    const totalnofLi = Math.ceil(this.state.blogsCategories.length / nofDataDisplay);
    const makeLiArry = _.range(1, totalnofLi + 1);
    const paginate = li => {
      this.setState({ currentPage: li });
    };

    return (
      <div class="main">
        <div class="manage-plan-section">
          <div class="heading"> Blog </div>
          <div class="col-md-12 no-padding">
            <div class=" col-md-6 no-padding">
              <SearchBar />

              {/* <input type="text" class="form-control onboarding-search" placeholder="Search" onChange={this.handleChangeInput} /> */}
            </div>
            <div class="col-md-3">
              <Link to='/main/dashboardmaster/admincreateplan'>
                <button class="create-new-plan-btn"><i class="fa fa-plus-circle"></i>   Add Blog Post</button>

              </Link>
            </div>
            <div class="col-md-3">
              <Link to='/main/dashboardmaster/admincreateplan'>
                <button class="create-new-plan-btn"><i class="fa fa-plus-circle"></i> Add Blog Category </button>
              </Link>
            </div>
          </div>
        </div>
        <div class="superadmin-dashboard">
{/*           

          
          <div class="heading">
            <Link to='/main/dashboardmaster/addblogcategory'>
              <button class="create-sub-plan-btn">
                <i class="fa fa-plus-circle"></i>
                Add Blog Category
                        </button>
            </Link>
            <Link to='/main/dashboardmaster/addblog'>
              <button class="add-new-firm1">
                <i class="fa fa-plus-circle"></i>
                Add Blog Post
                        </button>
            </Link>

          </div>
          <div class="col-md-12 no-padding">
            <div class=" col-md-4 no-padding">
              <input type="text" class="form-control onboarding-search" placeholder="Search" />
            </div>
          </div> */}



          <div class="members-detail-section">
            <div class="col-md-12 no-padding">
              <div class="member-bg ">
                Blogs
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
                        <th width="5%" class="table-th border-l"><input type="checkbox" /></th>
                        <th width="20%" class="table-th">Image</th>
                        <th width="35%" class="table-th">Category</th>
                        <th width="15%" class="table-th">No of articles</th>
                        <th width="15%" class="table-th">Sort</th>
                        <th width="10%" class="table-th">Status </th>
                        <th width="10%" class="table-th border-r">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateMovie.map(item =>
                        <tr class="dashed-line" >
                          <td><input type="checkbox" /></td>
                          <td>
                            <img width=" 50px" height="50px" src={item.imageUrl} />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.TotalArticles}</td>
                          <td>{item.sort}</td>
                          <td>{item.isActive ? <span class="active">Active</span> : <span class="disable">Disable</span>}</td>
                          <td> <div className='col-md-2 user-con-angle-down' onClick={() => this.showDropdownMenu(item.id)}>
                            <i className='fa fa-ellipsis-h'></i>
                          </div>
                            {this.state.displayMenu && this.state.dropdownId == item.id ? (
                              <div className='dropdwon-question-status'>
                                <div onClick={() => this.showBlogs(item.id)}>View</div>
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
                    onClick={() => this.deleteBlogCategoryWithArticles()}
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
    BlogCategories: state.BlogCategories

  };
};
const mapDispatchToProps = dispatch => {
  return {
    onBlogCategoriesDispatch: () => dispatch({ type: 'BLOG_CATEGORIES', BlogCategories: blogCategories.data }),

  }
}
export default connect(mapStoreToProps, mapDispatchToProps)(ManageBlog1)


