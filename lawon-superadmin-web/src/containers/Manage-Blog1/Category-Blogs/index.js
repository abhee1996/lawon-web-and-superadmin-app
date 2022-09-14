import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import { Input } from '../../../components/atoms/InputField'
import { adminAPIs } from '../../../apiConstants/adminAPIs'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Dialog from '@material-ui/core/Dialog';
import queryString from 'query-string';
import { connect } from 'react-redux'
import _ from "lodash";

var startIndex
var categoryBlogs
class CategoryBlog extends Component {
  state = {
    open: false,
    dropdownId: 0,
  }
  constructor() {
    super();

    this.state = {
      displayMenu: false,
      load: false,
      dropdownId: 0,
      categoryBlogs: [],
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
  handleChangeInput = (event) => {

    this.setState({
      [event.target.name]: event.target.value,

    })

  }
  handleClickOpen = (e) => {
    console.log("this is my id", e)
    localStorage.setItem('deleteBlogId', e)

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
    this.setState({ currentPage: Math.round(this.state.categoryBlogs.length / this.state.nofDataDisplay) })
  }
  nextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1
    })
  }
  editBlog = (e) => {
    this.props.history.push({
      pathname: '/main/dashboardmaster/editBlog/',
      search: 'selectedblog=' + e,
    })
    localStorage.setItem('editBlogId', e)

  }
  async deleteBlog() {

    var responsevar = await adminAPIs.adminDeleteBlog();
    if (responsevar.code == 200 || responsevar.code == 201) {
      localStorage.removeItem('deletecategoryBlogsId')
      console.log("success")
      categoryBlogs = await adminAPIs.adminGetCategoryBlogs();
      if (categoryBlogs.code == 200 || categoryBlogs.code == 201) {
        this.props.onCategoryBlogsDispatch()
        this.setState({
          categoryBlogs: this.props.CategoryBlogs,
          setOpen: false
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
  async componentDidMount() {
    var url = this.props.location.search;
    var params = queryString.parse(url);
    console.log('params.selectedblogs', params.selectedblogs)
    var responsevar = await adminAPIs.adminGetCategoryBlogs()
    if (responsevar.code == 200 || responsevar.code == 201) {
      console.log('responsevar code is 200')
      var selected = responsevar.data.filter(item => item.id == params.selectedblogs)
      this.setState({
        categoryBlogs: selected[0].Blogs.sort((a,b)=>(a.sort-b.sort)),
        load: true
      })
      categoryBlogs = selected[0].Blogs
      this.props.onCategoryBlogsDispatch()
      console.log("my data", this.state.categoryBlogs)
    }
    else {
      console.log('responsevar failed')
    }

  }
  render() {
    const { categoryBlogs, currentPage, nofDataDisplay } = this.state;

    console.log("check feels value", categoryBlogs, currentPage, nofDataDisplay);
    const paginateMovie = (function (categoryBlogs, currentPage, nofDataDisplay) {
      startIndex = (currentPage - 1) * nofDataDisplay;
      console.log("Start INDX", startIndex);
      return _(categoryBlogs)
        .slice(startIndex)
        .take(nofDataDisplay)
        .value();
    })(categoryBlogs, currentPage, nofDataDisplay);

    const totalnofLi = Math.ceil(categoryBlogs.length / nofDataDisplay);
    const makeLiArry = _.range(1, totalnofLi + 1);
    const paginate = li => {
      this.setState({ currentPage: li });
    };
    return (
      <div class="main">
        <div class="superadmin-dashboard">
          <div class="onboard-heading">Blogs</div>
          <div class="heading">

          </div>

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
                        <th width="5%" class="table-th">Sort</th>
                        <th width="15%" class="table-th">Image</th>
                        <th width="20%" class="table-th">Heading</th>
                        <th width="30%" class="table-th">Content</th>
                        <th width="10%" class="table-th">Published </th>
                        <th width="10%" class="table-th">status </th>

                        <th width="10%" class="table-th border-r">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateMovie.map(item =>


                        <tr class="dashed-line" >
                          <td><input type="checkbox" /></td>
                          <td>{item.sort} </td>
                          <td>
                            <img class="image-circle" src={item.imageUrl} />
                          </td>
                          <td class="table-heading">{item.heading}</td>
                          <td class="">{item.content}</td>
                          <td>{item.isPublished ? "True" : "False"}</td>
                          <td>{item.isActive ? <span class="active">Active</span> : <span class="disable">Disable</span>}</td>
                          <td> <div className='col-md-2 user-con-angle-down' onClick={() => this.showDropdownMenu(item.id)}>
                            <i className='fa fa-ellipsis-h'></i>
                          </div>
                            {this.state.displayMenu && this.state.dropdownId == item.id ? (
                              <div className='dropdwon-question-status'>
                                <div onClick={() => this.editBlog(item.id)}>Edit</div>
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
                  <a class="page-link" aria-label="Previous">
                    {this.state.currentPage == 1 ?
                      <button disabled class="disable"><i class="fa fa-angle-double-left"></i></button> :
                      <button onClick={() => this.firstPage()}><i class="fa fa-angle-double-left"></i></button>}
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
                  <a class="page-link" aria-label="Next">
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
                    onClick={() => this.deleteBlog()}
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
    CategoryBlogs: state.CategoryBlogs

  };
};
const mapDispatchToProps = dispatch => {
  return {
    onCategoryBlogsDispatch: () => dispatch({ type: 'Category_Blogs', CategoryBlogs: categoryBlogs }),

  }
}
export default connect(mapStoreToProps, mapDispatchToProps)(CategoryBlog)


