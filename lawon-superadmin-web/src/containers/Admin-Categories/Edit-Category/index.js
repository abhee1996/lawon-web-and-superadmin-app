import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../../../components/atoms/InputField'
import { Button, TYPES } from '../../../components/atoms/YellowButton'
import SimpleReactValidator from 'simple-react-validator';
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch';
import queryString from 'query-string';
import { connect } from 'react-redux'
const Theme = createMuiTheme(
    {
        palette:
        {
            primary:
            {
                main: '#feb41d'
            },
            secondary:
            {
                main: '#fafafa'
            }
        }
    }
)
class EditCategory extends Component {
    state = {
        userImageURL: 'images/user-dummyprofile.png',
        userFile: "",
    }
    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            newCategory: 'false',
            name: '',
            description: '',
            sort: '',
            isActive: 'false',
            includeMenu: "false",
            isNonTechnical: "",
            userImageURL: 'images/dummyupload.png',
            userFile: "",
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
                [event.target.name]: event.target.checked,
                          })
            console.log("is check true")
        }
        else {
            this.setState({
                [event.target.name]: event.target.checked,
                
            })
            console.log("is check false")
        }
    }
    handleChangeCheckBox = (event) => {
        let isChecked = event.target.checked;
        console.log('change is triggered', isChecked)

        this.setState({
            [event.target.name]: !isChecked,
        })


    }
    handleChangeInput = (event) => {
        let isChecked = event.target.checked;
        console.log('change is triggered', isChecked)

        this.setState({
            [event.target.name]: event.target.value,
            isNonTechnical: isChecked
        })
        console.log("sort is triggered")
    }

    componentDidMount() {
        var url = this.props.location.search;
        var params = queryString.parse(url);
        console.log('params.selectedCoupon', params.selectedcategory)

        this.props.CategoryInfo.filter(item => item.id == params.selectedcategory).map((item =>
                this.setState({
                    name:item.name,
                    isActive:item.isActive,
                    userImageURL:item.imageUrl,
                    userFile:item.imageUrl,
                    sort: item.sort,
                    includeMenu: item.includeMenu,
                    description:item.description
                    
                })

        ))

    }
    async updateCategory(){
   
            console.log('submitted')
            this.props.onStart()
            const dataObj = { 
                name: this.state.name,
                isActive: this.state.isActive,
                media: this.state.userFile,
                description: this.state.description,
                sort: this.state.sort,
                includeMenu: this.state.includeMenu
            }
             
            const datafile = new FormData();
            for(let item in dataObj ){
                if(dataObj[item] != null)
                {
                    console.log("data to be sent is not empty ", dataObj[item])
                  //dataToBeSent[item] = dataObj[item];
                  datafile.append(item, dataObj[item]);
                }
              }
              console.log('Datafile obj' , datafile); 
            var responsevar = await adminAPIs.adminUpdateCategory(datafile);
        console.log('responsevar', responsevar);
        console.log('accesstokken',localStorage.getItem("userAccessToken"))
       
      if(responsevar.code == 200 || responsevar.code == 201){
          this.props.onComplete()
        this.props.history.push({
            pathname: '/main/dashboardmaster/categories',
             
            });
            this.props.onCompleted()
      }
      else{
         console.log('Problem in register')
         console.log('not submitted')
      }
       
    }
  

    render() {
        return (
            <div class="main">
                <div class="manage-plan-section">
                    <div class="dashboard-main-heading">
                        Edit Category
                </div>
                   
              </div>

                <div class="admin-create-categories-section">
                    <div class="row bg">
                       <div class="col-md-12 margin">
                            <div class="category-text">Title*</div>
                            <div class="col-md-4 no-padding">
                                <Input
                                    type={'text'}
                                    name={'name'}
                                    value={this.state.name}
                                    handleChange={this.handleChangeInput}
                                    id={'name'}
                                />
                                <span class="danger-text">
                                    {this.validator.message('Title', this.state.name, 'required|alpha_space')}
                                </span>
                            </div>

                        </div>
                        <div class="col-md-12 ">
                            <div class="col-md-4 no-padding">
                                <div class="category-text">Description*</div>
                                <div class="form-group">
                                    <textarea class="form-control" value={this.state.description} rows="5" id="description" name="description" onChange={this.handleChangeInput}></textarea>
                                    <span class="danger-text">
                                        {this.validator.message('Description', this.state.description, 'required')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 ">
                            <div class="col-md-4 no-padding">
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
                            <div class="col-md-4 no-padding">
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
                        <div class="col-md-12">
                        <div class="category-text">
                            Publish*
                       <MuiThemeProvider theme={Theme}>
                                <Switch
                                    onChange={this.handlecheckPackage}
                                    value="checkedA"
                                    color='primary'
                                    name="includeMenu"
                                    checked={this.state.includeMenu}
                                />
                            </MuiThemeProvider>
                        </div>
                    </div>
                        <div class="col-md-12">
                            <div class="category-text">
                                Status*
                                <MuiThemeProvider theme={Theme}>
                                    <Switch
                                        onChange={this.handlecheckPackage}
                                        value="checkedA"
                                        color='primary'
                                        name="isActive"
                                        checked={this.state.isActive}
                                    />
                                </MuiThemeProvider>
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
                                text="Update Category"
                                type="button"
                                buttonType="btn register-btn"
                                onClick={() => this.updateCategory()}
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
        CategoryInfo: state.CategoryInfo
  
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
        onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
        onComplete: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
        onCompleted: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0 })

    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(EditCategory)
