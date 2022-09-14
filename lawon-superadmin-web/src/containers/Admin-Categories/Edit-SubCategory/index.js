import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../../../components/atoms/InputField'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import SimpleReactValidator from 'simple-react-validator';
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import queryString from 'query-string';
import { connect } from 'react-redux'
class EditSubCategories extends Component {
    state = {
        userImageURL: 'images/user-dummyprofile.png',
        userFile: "",
    }
    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            parentCategoryName: '',
            subCategoryName: '',
            description: '',
            isActive: '',
            include: '',
            sort: '',
            userImageURL: 'images/dummyupload.png',
            userFile: "",
            CategoryId:"",
        }
    }
    handleChangeFile = event => {
        this.setState({
            userImageURL: URL.createObjectURL(event.target.files[0]),
            userFile: event.target.files[0]
        })
    }
    handlecheckPackage = (event) => {
        if (event.target.checked == true) {
            this.setState({
                isPercentage: event.target.checked
            })
            console.log("is check true")
        }
        else {
            this.setState({
                isPercentage: event.target.checked
            })
            console.log("is check false")
        }
    }
    handleChangeInput = (event) => {
        let isChecked = event.target.checked;
        console.log('change is triggered', isChecked)
        this.setState({
            [event.target.name]: event.target.value,
            isNonTechnical: isChecked
        })
        console.log("Select parentCategoryName", this.state.parentCategoryName)
    }
    componentDidMount() {
        var url = this.props.location.search;
        var params = queryString.parse(url);
        console.log('params.selectedsubcategory', params.selectedsubcategory)

        this.props.SubCategoryInfo.filter(item => item.id == params.selectedsubcategory).map((item => {
            console.log(item.name)
            this.setState({
                subCategoryName: item.name,
                isActive: item.isActive,
                userImageURL: item.imageUrl,
                CategoryId: item.CategoryId,
                description: item.description,
                sort: item.sort,
                include: item.includeMenu,
                
            })

        }))

    }
   async updateSubCategory() {

        if (
            this.validator.fieldValid('parentCategoryName'),
            this.validator.fieldValid('subCategoryName'),
            this.validator.fieldValid('description'),
            this.validator.fieldValid('Enable'),
            this.validator.fieldValid('Include'),
            this.validator.fieldValid('Sort')

        ) {
            this.props.onStart()
            console.log('submitted')
            const dataObj = {
                name: this.state.subCategoryName,
                isActive: this.state.isActive,
                media: this.state.userFile,
                CategoryId: this.state.CategoryId,
                description:this.state.description,
                sort : this.state.sort,
            }

            const datafile = new FormData();
            for (let item in dataObj) {
                if (dataObj[item] != '') {
                    console.log("data to be sent is not empty ", dataObj[item])
                    //dataToBeSent[item] = dataObj[item];
                    datafile.append(item, dataObj[item]);
                }
            }
            console.log('Datafile obj', datafile);
            var responsevar = await adminAPIs.adminUpdateSubCategory(datafile);
            console.log('responsevar', responsevar);
           

            if (responsevar.code == 200 || responsevar.code == 201) {
                this.props.onComplete()
                this.props.history.push({
                    pathname: '/main/dashboardmaster/categories',

                });
                this.props.onCompleted()
            }
            else {
                console.log('Problem in register')
                console.log('not submitted')
            }
        }
        else {

            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
            console.log('not submitted')
        }
    }
    render() {
        return (
            <div class="main">
                <div class="manage-plan-section">
                    <div class="dashboard-main-heading">
                        Create Subcategory
                </div>
                    <div>
                        <Link to="/main/dashboardmaster/adminsubcategory">
                            <button class="create-sub-plan-btn">
                                <i class="fa fa-plus-circle"></i>Create SubCategory
                        </button>
                        </Link>
                        <Link to='/main/dashboardmaster/createcategory'>
                            <button class="create-new-plan-btn m-r-25">
                                <i class="fa fa-plus-circle"></i>Create Category
                            </button>
                        </Link>
                    </div>
                    <div class="sub-heading"></div>
                </div>
                <div class="admin-create-categories-section">
                    <div class="row bg">
                        <div class="col-md-6">
                        <div class="col-md-12 margin">
                            <div class="category-text">Subcategory Name*</div>
                            <div class="col-md-12 no-padding">
                                <Input
                                    type={'text'}
                                    name={'subCategoryName'}
                                    value={this.state.subCategoryName}
                                    handleChange={this.handleChangeInput}
                                    id={'subCategoryName'}
                                />
                                <span class="danger-text">
                                    {this.validator.message('subCategoryName', this.state.subCategoryName, 'required|alpha_space')}
                                </span>
                            </div>

                        </div>
                        <div class="col-md-12 ">
                            <div class="col-md-12 no-padding">
                                <div class="category-text">Description*</div>
                                <div class="form-group">
                                    <textarea value={this.state.description} class="form-control" rows="5" id="description" name="description" onChange={this.handleChangeInput}></textarea>
                                </div>
                                <span class="danger-text">
                                    {this.validator.message('description', this.state.description, 'required')}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-12 ">
                            <div class="col-md-12 no-padding">
                                <div class="category-text">sort*</div>
                                <div class="form-group">
                                    <input
                                        type='number'
                                        name='sort'
                                        value={this.state.sort}
                                        id='sort'
                                        min="1"
                                        max="10"
                                        class="form-control"
                                        onChange={this.handleChangeInput}
                                    />
                                    <span class="danger-text">
                                        {this.validator.message('Sort', this.state.sort, 'required|numeric')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 ">
                            <div class="col-md-12 no-padding">
                                <div class="category-text">
                                    Category Image / Icon
                                    </div>
                                <div className='user-img-box'>
                                    <input type="file" onChange={this.handleChangeFile} />
                                    <img className="image" src={this.state.userImageURL} />
                                    <div class="middle">
                                        <div class="text">
                                            <div className='upload-icon'>
                                                <i className='fa fa-upload'></i>
                                            </div>
                                            <div> Upload Profile Photo</div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 ">
                            <div class="col-md-12 no-padding">
                                <div class="category-text">
                                    Enable Category *
                                    </div>
                                <div class="non-tech-check">
                                    <label class="custom-check-box-container ">
                                        Yes
                                            <input type="radio" name="isActive" value="true" onChange={this.handleChangeInput} />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                <div>
                                    <label class="custom-check-box-container ">
                                        No
                                            <input type="radio" name="isActive" value="false" onChange={this.handleChangeInput} />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                <span class="danger-text">
                                    {this.validator.message('Enable', this.state.isActive, 'required')}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-12 ">
                            <div class="col-md-12 no-padding">
                                <div class="category-text">
                                    Include / show in menu *
                                    </div>
                                <div class="non-tech-check">
                                    <label class="custom-check-box-container ">
                                        Yes
                                            <input type="radio" name="include" value="true" onChange={this.handleChangeInput} />
                                        <span class="checkmark">
                                        </span>
                                    </label>
                                </div>
                                <div>
                                    <label class="custom-check-box-container ">
                                        No
                                            <input type="radio" name="include" value="false" onChange={this.handleChangeInput} />
                                        <span class="checkmark">
                                        </span>

                                    </label>
                                </div>
                                <span class="danger-text">
                                    {this.validator.message('Include', this.state.include, 'required')}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div  class="col-md-12">
                        <div class="category-text">Categories*</div>
                        <ul class="blog-catgory-names-ul">
                            {this.props.CategoryInfo.map((item => <li>
                                {this.state.CategoryId == item.id ?

                                    <input
                                        type="radio"
                                        name="CategoryId"
                                        value={item.id}
                                        onChange={this.handleChangeInput}
                                        checked="checked"
                                    /> : <input
                                        type="radio"
                                        name="CategoryId"
                                        value={item.id}
                                        onChange={this.handleChangeInput}
                                    />}
                                <label for="scales">{item.name}</label>
                            </li>
                            ))}
                        </ul>
                        <span class="danger-text">
                            {this.validator.message('CategoryId', this.state.CategoryId, 'required')}
                        </span>
                        </div>
                    </div>
                        </div>
                    
                    <div class="col-md-12">
                        <div class="col-md-4"></div>
                        <div class="col-md-4 padding-bottom-40">
                            <Link to='/main/dashboardmaster/categories'>
                                <Button
                                    text="Cancel"
                                    type="button"
                                    buttonType="btn btn-generic"

                                />
                            </Link>
                            <Button
                                text="Save Subcategory"
                                type="button"
                                buttonType="btn register-btn"
                                onClick={() => this.updateSubCategory()}
                            />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
const mapStoreToProps = state => {
    return {
        SubCategoryInfo: state.SubCategoryInfo,
        CategoryInfo:state.CategoryInfo

    };
};
const mapDispatchToProps = dispatch => {
    return {
        onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
        onComplete: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
        onCompleted: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0 })

    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(EditSubCategories)


