import React, { Component } from 'react'
import { Input } from '../../components/atoms/InputField'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Link } from 'react-router-dom';
import { adminAPIs } from '../../apiConstants/adminAPIs'
import { Markup } from 'interweave';
import { connect } from 'react-redux'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import { Button, TYPES } from '../../components/atoms/YellowButton'
import Dialog from '@material-ui/core/Dialog';
import _ from "lodash";
import SearchBar from '../../components/atoms/Searchbar';
var firstIndex
var startIndex
var helpArticleCategories;
var helpArticleInfo
class Help extends Component {
  state = {
    open: false,
    displayMenu: false,
    show: 1,
    adminHelpArticleCategories: "",
    adminHelpArticles: "",
    dropdownId: "",
    load: false
  }
  constructor() {
    super();

    this.state = {
      displayMenu: false,
      show: 1,
      adminHelpArticleCategories: [],
      adminHelpArticles: [],
      dropdownId: "",
      currentPage: 1,
      nofDataDisplay: 5,
      articleCategoryPage: 1,
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
  handleChangeInput = (event) => {

    this.setState({
      [event.target.name]: event.target.value,

    })

  }
  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }
  firstPage() {
    this.setState({
      currentPage: 1,
      articleCategoryPage: 1
    })

  }
  previousPage() {
    this.setState({
      currentPage: this.state.currentPage - 1,
      articleCategoryPage: this.state.articleCategoryPage - 1
    })
  }
  lastPage() {
    this.setState({ currentPage: Math.ceil(this.state.adminHelpArticles.length / this.state.nofDataDisplay) })
  }
  lastPageCategory() {
    this.setState({ articleCategoryPage: Math.ceil(this.state.adminHelpArticleCategories.length / this.state.nofDataDisplay) })
  }
  nextPage() {
    this.setState({
      currentPage: this.state.currentPage + 1,
      articleCategoryPage: this.state.articleCategoryPage + 1
    })
  } s
  showall = (e) => () => {

    this.setState({
      show: e,
      articleCategoryPage: 1,
      currentPage: 1,
      nofDataDisplay: 5
    })
  }
  editHelpArticle = (e) => {
    this.props.history.push({
      pathname: '/main/dashboardmaster/edithelparticle/',
      search: 'selectedhelarticle=' + e,
    })
    localStorage.setItem('updateHelpArticleId', e)

  }
  editHelpArticleCategory = (e) => {
    this.props.history.push({
      pathname: '/main/dashboardmaster/edithelparticlecategory/',
      search: 'selectedhelarticle=' + e,
    })
    localStorage.setItem('updateHelpArticleCategoryId', e)

  }
  async showallArticleCategories() {
    this.setState({
      load: false,
      show: 2
    })
    var responsevar = await adminAPIs.getAdminHelpArticleCategory();
    console.log('responsevar', responsevar)
    helpArticleCategories = responsevar
    if (responsevar.code == 200 || responsevar.code == 201) {
      console.log('responsevar code is 200')
      this.props.onHelpArticleCategoriesInfoDispatch()
      this.setState({
        adminHelpArticleCategories: responsevar.data,
        load: true,


      })


    }
    else {
      console.log('responsevar failed')
    }
  }
  handleClickOpen = (e) => {
    console.log("this is my id", e)
    localStorage.setItem('deleteHelpArticleId', e)

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
  handleClickOpenHelpCategory = (e) => {
    console.log("this is my id subca", e)

    localStorage.setItem('deleteHelpCategoryId', e)
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
  async deleteHelpArticle(){

    var responsevar = await adminAPIs.deleteAdminHelpArticle();
    if (responsevar.code == 200 || responsevar.code == 201) {
      localStorage.removeItem('deleteHelpArticleId')
      this.setState({
        setOpen: false
      })
      console.log("success")
      helpArticleInfo = await adminAPIs.getAdminHelpArticle();
      if (helpArticleInfo.code == 200 || helpArticleInfo.code == 201) {
        this.props.onHelpArticleInfoDispatch()
        this.setState({
          helpArticleInfo: this.props.HelpArticleInfo,
        })
      }
      this.props.history.push({
        pathname: '/main/dashboardmaster/help',

      });
    }
    else {
      console.log("error")
    }
  }
  async deleteArticleCategory() {

    var responsevar = await adminAPIs.deleteAdminHelpArticleCategory();
    if (responsevar.code == 200 || responsevar.code == 201) {
      localStorage.removeItem('deleteHelpCategoryId')
      this.setState({
        setOpen: false
      })
      console.log("success")
      helpArticleCategories = await adminAPIs.getAdminHelpArticleCategory();
      if (helpArticleCategories.code == 200 || helpArticleCategories.code == 201) {
        this.props.onHelpArticleCategoriesInfoDispatch()
        this.setState({
          adminHelpArticleCategories: this.props.HelpArticleCategories,
        })
      }
      this.props.history.push({
        pathname: '/main/dashboardmaster/help',

      });
    }
    else {
      console.log("error in api")
    }
  }
  async componentDidMount() {
    var responsevar = await adminAPIs.getAdminHelpArticle();
    console.log('responsevar', responsevar)
    helpArticleInfo = responsevar;
    if (responsevar.code == 200 || responsevar.code == 201) {
      console.log('responsevar code is 200')

      this.props.onHelpArticleInfoDispatch();
      this.setState({
        adminHelpArticles: responsevar.data,
        load: true
      })


    }
    else {
      console.log('responsevar failed')
    }

  }
  render() {
    const { adminHelpArticles, currentPage, nofDataDisplay, adminHelpArticleCategories, articleCategoryPage, } = this.state;
    const paginateArticleCategory = (function (adminHelpArticleCategories, currentPage, nofDataDisplay) {
      firstIndex = (articleCategoryPage - 1) * nofDataDisplay;
      return _(adminHelpArticleCategories)
        .slice(firstIndex)
        .take(nofDataDisplay)
        .value();
    })(adminHelpArticleCategories, articleCategoryPage, nofDataDisplay);
    const totalnofLines = Math.ceil(adminHelpArticleCategories.length / nofDataDisplay);
    const makeLinesArry = _.range(1, totalnofLines + 1);
    const paginatee = li => {
      this.setState({ articleCategoryPage: li });
    };

    const paginateMovie = (function (adminHelpArticles, currentPage, nofDataDisplay) {
      startIndex = (currentPage - 1) * nofDataDisplay;
      console.log("Start INDX", startIndex);
      return _(adminHelpArticles)
        .slice(startIndex)
        .take(nofDataDisplay)
        .value();
    })(adminHelpArticles, currentPage, nofDataDisplay);
    const totalnofLi = Math.ceil(adminHelpArticles.length / nofDataDisplay);
    const makeLiArry = _.range(1, totalnofLi + 1);
    const paginate = li => {
      this.setState({ currentPage: li });
    };

    return (
      <div class="main">
        <div class="manage-help-section">
          <div class="heading">Manage Help Articles & Categories</div>

          <div class="col-md-12 no-padding">
            <div class="col-md-2 no-padding"  >
              <button class="showall " onClick={this.showall(1)}>
                Show All Articles
                                </button>
            </div>
            <div class="col-md-2 no-padding" >
              <button class="showall " onClick={() => this.showallArticleCategories()}>Show All Categories
                                </button>
            </div>
            <Link to='/main/dashboardmaster/addnewarticle'>
              <button class="add-new-article ">
                <i class="fa fa-plus-circle"></i>
                Add New Article
                            </button>
            </Link>
            <Link to='/main/dashboardmaster/addnewcategory'>
              <button class="add-new-article m-r-25">
                <i class="fa fa-plus-circle"></i>
                Add New Category
                            </button>
            </Link>
          </div>
          <div class="details">

            {this.state.show == 1 ?
              <div class="show-articles">
                <div class=" col-md-4 no-padding">
                    <SearchBar />

                  {/* <input type="text" class="form-control search" placeholder="Search" /> */}
                </div>
                <div class="members-detail-section">
                  <div class="col-md-12 no-padding">
                    <div class="member-bg ">
                      Articles List
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
                              <th width="20%" class="table-th">Question</th>
                              <th width="40%" class="table-th ">Answer</th>
                              <th width="10%" class="table-th">Sort</th>
                              <th width="10%" class="table-th">Status</th>
                              <th width="10%" class="table-th border-r">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginateMovie.map((item) =>
                              <tr class="dashed-line">
                                <td><input type="checkbox" /></td>
                                <td ><div class="" >
                                  {item.question}
                                </div>
                                </td>
                                <td  ><Markup content={JSON.parse(item.answer)} /></td>
                                <td>{item.sort}</td>
                                <td>{item.status ? <span class="active">Active</span> : <span class="disable">Disable</span>}</td>
                                <td> <div className='col-md-2 user-con-angle-down' onClick={() => this.showDropdownMenu(item.id)}>
                                  <i className='fa fa-ellipsis-h'></i>
                                </div>
                                  {this.state.displayMenu && this.state.dropdownId == item.id ? (
                                    <div className='dropdwon-question-status'>
                                      <div onClick={() => this.editHelpArticle(item.id)}>Edit</div>
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
              : null}
            {this.state.show == 2 ?

              <div class="show-categories">
                <div class=" col-md-4 no-padding">
                  <input type="text" class="form-control search" placeholder="Search" />
                </div>
                <div class="members-detail-section">
                  <div class="col-md-12 no-padding">
                    <div class="member-bg ">
                      Category List
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
                              <th width="10%" class="table-th border-l"><input type="checkbox" /></th>
                              <th width="55%" class="table-th">Categories</th>
                              <th width="15%" class="table-th">Sort</th>
                              <th width="10%" class="table-th">Status</th>
                              <th width="10%" class="table-th border-r">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginateArticleCategory.map((item) => <tr class="dashed-line">
                              <td><input type="checkbox" /></td>
                              <td><span >
                                {item.name}
                              </span>
                              </td>
                              <td>{item.sort}</td>
                              <td>{item.isActive ? <span class="active">Active</span> : <span class="disable">Disable</span>}</td>
                              <td> <div className='col-md-2 user-con-angle-down' onClick={() => this.showDropdownMenu(item.id)}>
                                <i className='fa fa-ellipsis-h'></i>
                              </div>
                                {this.state.displayMenu && this.state.dropdownId == item.id ? (
                                  <div className='dropdwon-question-status'>
                                    <div onClick={() => this.editHelpArticleCategory(item.id)}>Edit</div>
                                    <div onClick={() => this.handleClickOpenHelpCategory(item.id)}>Delete</div>
                                  </div>
                                ) :
                                  (
                                    null
                                  )
                                }

                              </td>
                            </tr>)}
                          </tbody>
                        </table>
                      </ReactPlaceholder>
                    </div>


                  </div>
                </div>

              </div>
              : null
            }
          </div>
        </div>
        {this.state.show == 1 ?

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
          : null}
        {this.state.show == 2 ?
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
                      {this.state.articleCategoryPage == 1 ?
                        <button disabled class="disable" onClick={() => this.previousPage()}><i class="fa fa-angle-left"></i></button> :
                        <button onClick={() => this.previousPage()}><i class="fa fa-angle-left"></i></button>}
                    </a>
                  </li>
                </div>
                {makeLiArry.filter(item => item == articleCategoryPage).map(li => (
                  <div class="pagination">


                    {articleCategoryPage == 1 ? null :


                      <li

                      >
                        {console.log("test", li)}
                        <a class="page-link page-num " onClick={() => paginatee(li - 1)}>
                          {li - 1}
                        </a>
                      </li>
                    }<li
                      key={li}
                      className={
                        li === articleCategoryPage ? "page-item active" : "page-item"
                      }
                    >
                      {console.log("test", li)}
                      <a class="page-link page-num " onClick={() => paginatee(li)}>
                        {li}
                      </a>
                    </li>
                    {totalnofLi == articleCategoryPage ? null : <li

                    >

                      <a class="page-link page-num " onClick={() => paginatee(li + 1)}>
                        {li + 1}
                      </a>
                    </li>
                    }
                  </div>

                ))}
                <div class="pagination">
                  <li class="page-item">
                    <a class="page-link" disabled="true" aria-label="Next">
                      {this.state.articleCategoryPage == totalnofLi ?
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
                      <button onClick={() => this.lastPageCategory()}><i class="fa fa-angle-double-right"></i></button>}

                  </a>
                  </li>
                </div>
              </ul>

            </div>
          </div>
          : null}
          <Dialog onClose={this.handleClose}  open={this.state.setOpen}>
          <div>
          <div class="col-md-12 plan-popup">
              <div class="col-md-5"></div>
              <div class="col-md-2 logo-alert">
                  <img src="./images/firm-details/created.png "/>
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
                    onClick={() => this.deleteHelpArticle()}
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
            
          <Dialog onClose={this.handleClose}  open={this.state.setOpen}>
          <div>
          <div class="col-md-12 plan-popup">
              <div class="col-md-5"></div>
              <div class="col-md-2 logo-alert">
                  <img src="./images/firm-details/created.png "/>
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
                    onClick={() => this.deleteArticleCategory()}
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
    HelpArticleCategories: state.HelpArticleCategories,
    HelpArticleInfo: state.HelpArticleInfo

  };
};
const mapDispatchToProps = dispatch => {
  return {
    onHelpArticleCategoriesInfoDispatch: () => dispatch({ type: 'HELP_ARTICLE_CATEGORIES', HelpArticleCategories: helpArticleCategories.data }),
    onHelpArticleInfoDispatch: () => dispatch({ type: "HELP_ARTICLE", HelpArticleInfo: helpArticleInfo.data })
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Help)