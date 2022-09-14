import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { adminAPIs } from '../../apiConstants/adminAPIs'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import { connect } from 'react-redux'
import { Button, TYPES } from '../../components/atoms/YellowButton'
import Dialog from '@material-ui/core/Dialog';
import SearchBar from '../../components/atoms/Searchbar';
import _ from "lodash";

var startIndex
var categoryInfo;
var subcatgoryResponse
class Categories extends Component {
    state = {
        id: 0,
        dropdownId: 0,
        subDropdownId: 0,
        open: false,
        setOpen: false,
        Open: false,
        dialogId: 0,
    };
    constructor() {
        super();

        this.state = {
            displayMenu: false,
            category: [],
            subcategory: [],
            load: false,
            currentPage: 1,
            nofDataDisplay: 5,
            setOpen: false,
            Open: false,
            dialogId: 0,

        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.subShowDropdownMenu = this.subShowDropdownMenu.bind(this);
    };
    subShowDropdownMenu = (e) => {

        if (this.state.subDropdownId == e) {
            this.setState({
                subDropdownId: 0
            })
        } else {
            this.setState({
                displayMenu: true,
                subDropdownId: e
            }, () => {
                document.addEventListener('click', this.hideDropdownMenu);
            });
        }

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
        this.setState({
            displayMenu: false,
            dropdownId: 0,
            subDropdownId: 0

        }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

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
        this.setState({ currentPage: Math.round(this.state.category.length / this.state.nofDataDisplay) })
    }
    nextPage() {
        this.setState({
            currentPage: this.state.currentPage + 1
        })
    }
    toggleCollapse = (e) => () => {

        if (this.state.id == e) {
            this.setState({ id: 0 })
        }
        else {
            this.setState({
                id: e
            })
        }


    }
    // async componentDidMount() {
    //     // categoryInfo = await adminAPIs.adminGetAllCategories();
    //     // subcatgoryResponse = await adminAPIs.adminGetAllSubCategories();
    //     console.log('One', categoryInfo)
    //     if (categoryInfo?.code == 200 || categoryInfo?.code == 201) {
    //         this.props.onCategoryInfoDispatch()

    //         if (subcatgoryResponse?.code == 200 || subcatgoryResponse?.code == 201) {
    //             console.log('sucatgoryResponse? code is 200')
    //             this.props.onSubCategoryInfoDispatch()
    //             this.setState({
    //                 subcategory: subcatgoryResponse.data.sort((a, b) => (a.sort - b.sort)),
    //                 load: true
    //             })
    //             console.log("Two", subcatgoryResponse)
    //         }
    //         else {
    //             console.log('sucatgoryResponse failed')
    //         }

    //         console.log('categoryInfo? code is 200')
    //         this.setState({
    //             category: categoryInfo.data.sort((a, b) => (a.sort - b.sort)),
    //             load: true
    //         })

    //     }
    //     else {
    //         console.log('categoryInfo failed')
    //     }


    // }
    // handleClickOpenSubCategory = (e) => {
    //     console.log("this is my id subca", e)

    //     localStorage.setItem('deleteSubCategoryId', e)
    //     if (this.state.setOpen == true) {
    //         this.setState({ setOpen: false, })
    //     }
    //     else {
    //         this.setState({
    //             setOpen: true,
    //             dialogId: e
    //         })
    //     }


    // }
    // handleClickOpen = (e) => {
    //     console.log("this is my id", e)
    //     localStorage.setItem('deleteCategoryId', e)

    //     if (this.state.setOpen == true) {
    //         this.setState({ setOpen: false, })
    //     }
    //     else {
    //         this.setState({
    //             setOpen: true,
    //             dialogId: e
    //         })
    //     }


    // }
    // dialogClose = () => {
    //     console.log("this is my id")
    //     this.setState({
    //         setOpen: false
    //     })

    // }
    // async deleteCategory(e) {

    //     var responsevar = ''//await adminAPIs.adminDeleteCategory();
    //     if (responsevar?.code == 200 || responsevar?.code == 201) {
    //         localStorage.removeItem('deleteCategoryId')
    //         console.log("success")
    //         categoryInfo = {code:200}
            
    //         //await adminAPIs.adminGetAllCategories();
    //         if (categoryInfo?.code == 200 || categoryInfo?.code == 201) {
    //             ///this.props.onCategoryInfoDispatch()

    //             this.setState({
    //                 category: this.props.CategoryInfo,
    //                 setOpen: false,

    //             })
    //         }
    //         this.props.history.push({
    //             pathname: '/main/dashboardmaster/categories',

    //         });
    //     }
    //     else {
    //         console.log("error")
    //     }
    // }
    // async deleteSubCategory(e) {

    //     var responsevar = ''//await adminAPIs.adminDeleteSubCategory();
    //     if (responsevar?.code == 200 || responsevar?.code == 201) {
    //         localStorage.removeItem('deleteSubCategoryId')
    //         console.log("success")
    //         subcatgoryResponse = ''//await adminAPIs.adminGetAllSubCategories();
    //         if (subcatgoryResponse?.code == 200 || subcatgoryResponse?.code == 201) {
    //             this.props.onSubCategoryInfoDispatch()

    //             this.setState({
    //                 subcategory: this.props.SubCategoryInfo,
    //                 setOpen: false,
    //             })
    //         }
    //         this.props.history.push({
    //             pathname: '/main/dashboardmaster/categories',

    //         });
    //     }
    //     else {
    //         console.log("error")
    //     }
    // }
    // editCategory = (e) => {
    //     this.props.history.push({
    //         pathname: '/main/dashboardmaster/editcategory/',
    //         search: 'selectedcategory=' + e,
    //     })
    //     localStorage.setItem('updateCategoryId', e)

    // }
    // editSubCategory = (e) => {
    //     this.props.history.push({
    //         pathname: '/main/dashboardmaster/editsubcategory/',
    //         search: 'selectedsubcategory=' + e,
    //     })
    //     localStorage.setItem('updateSubCategoryId', e)

    // }

    render() {
        const { category, currentPage, nofDataDisplay } = this.state;

        console.log("check feels value", category, currentPage, nofDataDisplay);
        const paginateMovie = (function (category, currentPage, nofDataDisplay) {
            startIndex = (currentPage - 1) * nofDataDisplay;
            console.log("Start INDX", startIndex);
            return _(category)
                .slice(startIndex)
                .take(nofDataDisplay)
                .value();
        })(category, currentPage, nofDataDisplay);

        const totalnofLi = Math.ceil(category.length / nofDataDisplay);
        const makeLiArry = _.range(1, totalnofLi + 1);
        const paginate = li => {
            this.setState({ currentPage: li });
        };
        return (
            <div class="main">
                <div class="manage-plan-section">
                    <div class="heading"> Categories</div>
                    <div class="col-md-12 no-padding">
                        <div class=" col-md-6 no-padding">
                            <SearchBar />

                            {/* <input type="text" class="form-control onboarding-search" placeholder="Search" onChange={this.handleChangeInput} /> */}
                        </div>
                        <div class="col-md-3">
                            <Link to='/main/dashboardmaster/admincreateplan'>
                                <button class="create-new-plan-btn"><i class="fa fa-plus-circle"></i> Create Category</button>

                            </Link>
                        </div>
                        <div class="col-md-3">
                            <Link to='/main/dashboardmaster/admincreateplan'>
                                <button class="create-new-plan-btn"><i class="fa fa-plus-circle"></i> Create SubCategory </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* <div class="manage-plan-section">
                    <div class="dashboard-main-heading">Manage Categories
                    </div>
                    <div>
                        <Link to="/main/dashboardmaster/adminsubcategory">
                            <button class="create-sub-plan-btn ">
                                <i class="fa fa-plus-circle"></i>Create SubCategory
                        </button>
                        </Link>
                        <Link to='/main/dashboardmaster/createcategory'>
                            <button class="create-new-plan-btn m-r-25">
                                <i class="fa fa-plus-circle"></i>Create Category
                            </button>
                        </Link>
                    </div>
                    <div class="col-md-12 no-padding">
                        <div class=" col-md-4 no-padding">
                            <input type="text" class="form-control onboarding-search" placeholder="Search" />
                        </div>
                    </div>
                    <div class="sub-heading"></div>
                </div> */}
               
                <div class="members-detail-section">
                    <div class="col-md-12 manage-categories">
                        <div class="member-bground">
                            All Categories
                            <span class="member-select-span">
                                <select class="member-select" name='nofDataDisplay' onChange={this.handleChangeInput}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </span>
                        </div>
                        <div class="table-responsive manage-category">
                            <ReactPlaceholder type="text"
                                showLoadingAnimation={true}
                                rows={13}
                                color="#EBEFF1"
                                background="#fff"
                                ready={this.state.load}
                                style={{ padding: 30 }}
                            >
                                <table class="table">
                                    <tr>
                                        <td>
                                            <table class="  width">
                                                <tr>
                                                    <td>
                                                        <table class="table no-margin">
                                                            <thead>
                                                                <tr>
                                                                    <th width="7%" class="table-th border-l">
                                                                        <input type="checkbox" />
                                                                    </th>

                                                                    <th width="12%" class="table-th">Image</th>
                                                                    <th width="17%" class="table-th">Category Name</th>
                                                                    <th width="25%" class="table-th">Description</th>
                                                                    <th width="10%" class="table-th">sort </th>
                                                                    <th width="10%" class="table-th">Status</th>
                                                                    <th width="12%" class="table-th border-r">Action</th>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                    </td>
                                                </tr>

                                            </table>
                                        </td>
                                    </tr>
                                    {paginateMovie.map((item) =>
                                        <tr>
                                            <td>
                                                <table class=" dashed-line width">
                                                    <tr>
                                                        <td>
                                                            <table class="table">

                                                                <tbody>
                                                                    <tr class="">
                                                                        <td width="7%">
                                                                            {this.state.id == item.id ? <button class="btn-collapse" onClick={this.toggleCollapse(item.id)}>-</button> : <button class="btn-collapse-black" onClick={this.toggleCollapse(item.id)}>+</button>}
                                                                            <input type="checkbox" />
                                                                        </td>

                                                                        <td width="12%"><img width="50px" height="50px" src={item.imageUrl} /></td>
                                                                        <td width="17%">{item.name}</td>
                                                                        <td width="25%">{item.description}</td>
                                                                        <td width="10%">{item.sort}</td>
                                                                        <td width="10%">{item.isActive ? <span class="active">Active</span> : <span class="disable">Disable</span>}</td>
                                                                        <td width="12%">
                                                                            <div className='col-md-2 user-con-angle-down' onClick={() => this.showDropdownMenu(item.id)}>
                                                                                <i className='fa fa-ellipsis-h'></i>
                                                                            </div>
                                                                            {this.state.displayMenu && this.state.dropdownId == item.id ? (
                                                                                <div className='dropdwon-question-status'>
                                                                                    <div onClick={() => this.editCategory(item.id)}>Edit</div>
                                                                                    <div>View Category</div>
                                                                                    <div onClick={() => this.handleClickOpen(item.id)}>Delete</div>

                                                                                </div>
                                                                            ) :
                                                                                (
                                                                                    null
                                                                                )
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    {this.state.id == item.id ? <tr>
                                                        <td class="subcategory-table-padding">
                                                            <table class="table table-subcategory">
                                                                {this.state.subcategory.filter(item => item.CategoryId == this.state.id).map(item =>
                                                                    <tr class="dashed-line">
                                                                        <td width="4%">
                                                                            <span class="text-FCA900">
                                                                                <input type="checkbox" />
                                                                            </span>
                                                                        </td>

                                                                        <td width="12%">{<img width=" 50px" height="50px" src={item.imageUrl} />}</td>
                                                                        <td width="17%">{item.name}</td>
                                                                        <td width="25%">{item.description}</td>
                                                                        <td width="10%">{item.sort}</td>
                                                                        <td width="10%">{item.isActive ? <span class="active">Active</span> : <span class="disable">Disable</span>}</td>
                                                                        <td width="10%"><div className='col-md-2 user-con-angle-down' onClick={() => this.subShowDropdownMenu(item.id)}>
                                                                            <i className='fa fa-ellipsis-h'></i>
                                                                        </div>
                                                                            {this.state.displayMenu && this.state.subDropdownId == item.id ? (
                                                                                <div className='dropdwon-question-status'>
                                                                                    <div onClick={() => this.editSubCategory(item.id)}>Edit</div>
                                                                                    <div>View Category</div>
                                                                                    <div onClick={() => this.handleClickOpenSubCategory(item.id)}>Delete</div>                                                                              </div>
                                                                            ) :
                                                                                (
                                                                                    null
                                                                                )
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </table>
                                                        </td>
                                                    </tr> : null}
                                                </table>
                                            </td>
                                        </tr>
                                    )}

                                </table>
                            </ReactPlaceholder>
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
                                        onClick={() => this.deleteCategory()}
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
                                        onClick={() => this.deleteSubCategory()}
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
        CategoryInfo: state.CategoryInfo,
        SubCategoryInfo: state.SubCategoryInfo

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onCategoryInfoDispatch: () => dispatch({ type: 'CATEGORY_INFO', CategoryInfo: categoryInfo.data }),
        onSubCategoryInfoDispatch: () => dispatch({ type: 'SUBCATEGORY_INFO', SubCategoryInfo: subcatgoryResponse.data })
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(Categories)
