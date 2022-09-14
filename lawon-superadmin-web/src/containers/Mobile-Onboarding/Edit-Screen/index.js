import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {Input} from '../../../components/atoms/InputField'
import {Button, TYPES} from '../../../components/atoms/YellowButton'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch';
import queryString from 'query-string';
import { adminAPIs } from '../../../apiConstants/adminAPIs';
import SimpleReactValidator from 'simple-react-validator';
import {connect} from 'react-redux'
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

class EditScreen extends Component {
    state={
        userImageURL:'images/dummyupload.png',
            userFile:"",
      
    }
    constructor(props){
        super(props)
        this.validator = new SimpleReactValidator();
        this.state={
            title:'',
            subTitle:'',
            description:'',
            screenPosition:null,
            imageUrl:'',
            userImageURL:'images/dummyupload.png',
            userFile:"",
              }
    }
    handlecheckPackage=(event)=>{      
        if(event.target.checked == true){
            this.setState({
                isActive:event.target.checked
            })
            console.log("is check true")
        }
        else{
            this.setState({
                isActive:event.target.checked
            })
            console.log("is check false")
        }
    }
    handleChangeFile = event =>{
        this.setState({
          userImageURL: URL.createObjectURL(event.target.files[0]),
          userFile: event.target.files[0]
        })
      }
    handleChangeInput = (event) =>{
        let isChecked = event.target.checked;
         console.log('change is triggered',isChecked)  
        this.setState({ 
          [event.target.name]:event.target.value,
          isNonTechnical:isChecked
        })   
        console.log("name", event.target.value)
        console.log("name", this.state.title)
      }

      componentDidMount(){       
        var url = this.props.location.search;
        var params = queryString.parse(url);
        
        console.log('params selectedOnBoardingScreen',params.selectedOnBoardingScreen)  
        localStorage.setItem("OnBoardScreenId",params.selectedOnBoardingScreen)
        this.props.MobileOnBoardingInfo.filter(item=>item.id==params.selectedOnBoardingScreen).map((item=>
            this.setState({
                title:item.title,
                subTitle: item.subTitle,
                description:item.description,
                screenPosition:item.screenPosition,
                userImageURL:item.imageUrl,
                userFile:item.imageUrl
                
            })
            ))
      }

      async updateScreen(){
          this.props.onStart()
        const dataObj={
            title:this.state.title,
            subTitle:this.state.subTitle,
            description:this.state.description,
            screenPosition:this.state.screenPosition,
            media:this.state.userFile
        }
        const datafile= new FormData();
        for(let item in dataObj ){ 
            if(dataObj[item] != '')
            {
                console.log("data to be sent is not empty ", dataObj[item])
                datafile.append(item, dataObj[item]);
            }
          }
  
         
          
         
          var responsevar = await adminAPIs.adminEditOnBoardingScreen(datafile);
        
          console.log('Response Var' , responsevar);
          if(responsevar.code == 200 || responsevar.code == 201){
              this.props.onComplete()
            localStorage.removeItem('OnBoardScreenId')
              console.log("success")
              this.props.history.push({
                   pathname: '/main/dashboardmaster/mobileonboard',
                   
                 });
                 this.props.onCompleted()
          }
      }
      

    render(){ 
        return(
            <div class="main">
            <div class="manage-plan-section">
            <div class="dashboard-main-heading">
            Add New Screen
            </div>
            <div class="sub-heading"></div>
            </div>
           
            <div class="admin-create-categories-section">
                <div class="row bg">
                       <div class="col-md-12 margin">
                          <div class="category-text">Title*</div>
                            <div class="col-md-4 no-padding">
                                <Input 
                                    type={'text'}              
                                    name= {'title'}              
                                  
                                    handleChange={this.handleChangeInput}
                                    id={'title'}
                                    value={this.state.title}
                                />
                                <span class="danger-text">
                                     {this.validator.message('title', this.state.title, 'required|alpha_space')}
                                     </span>
                            </div>
                        
                        </div>
                        <div class="col-md-12 margin">
                        <div class="category-text">Subtitle*</div>
                          <div class="col-md-4 no-padding">
                              <Input 
                                  type={'text'}              
                                  name= {'subTitle'}              
                                  
                                  handleChange={this.handleChangeInput}
                                  id={'subTitle'}
                                  value={this.state.subTitle}
                              />
                              <span class="danger-text">
                                   {this.validator.message('subtitle', this.state.title, 'required|alpha_space')}
                                   </span>
                          </div>
                      
                      </div>
                        <div class="col-md-12 ">
                            <div class="col-md-4 no-padding">
                                <div class="category-text">Description*</div>
                                <div class="form-group">
                                    <textarea 
                                        class="form-control" 
                                        rows="5" 
                                        id="description" 
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChangeInput}
                                        >
                                    </textarea>
                                </div>
                                <span class="danger-text">
                                {this.validator.message('description', this.state.description, 'required')}
                                </span>
                            </div>
                        </div>
                        <div class="col-md-12 ">
                            <div class="col-md-4 no-padding">
                                <div class="category-text">sort*</div>
                                <div class="form-group">
                                <input 
                                type='number'              
                                name= 'screenPosition'              
                                value={this.state.screenPosition}
                                id='screenPosition'
                                min="1"
                                max="10" 
                                class="form-control"
                                onChange={this.handleChangeInput}
                                />
                                <span class="danger-text">
                                    {this.validator.message('sort', this.state.sort, 'required|numeric')}
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
                            <input type="file" onChange={this.handleChangeFile}/>
                            <img className="image" src = {this.state.userImageURL} />
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
                                Status*
                                <MuiThemeProvider theme={Theme}>
                                    <Switch
                                    onChange={this.handlecheckPackage}
                                    value="checkedA"
                                    color='primary'
                                        />
                                </MuiThemeProvider>
                            </div>
                        </div>
                </div>
                <div class="col-md-12">
                    <div class="col-md-4"></div>
                    <div class="col-md-4 padding-bottom-40">
                            <Link to='/main/dashboardmaster/mobileonboard'>
                                <Button 
                                    text="Cancel"
                                    type="button"
                                    buttonType="btn btn-generic"
                                    
                                />
                            </Link>
                            <Button 
                            text="Update Screen"
                            type="button"
                            buttonType="btn register-btn"
                            onClick={()=>this.updateScreen()}
                            
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
        MobileOnBoardingInfo: state.MobileOnBoardingInfo
  
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      onStart: () => dispatch({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 70 }),
      onComplete: () => dispatch ({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 100 }),
      onCompleted: () => dispatch ({ type: 'LOADING_PROGRESS_BAR', LoadingProgressBar: 0})
   
    }
  }

  export default connect(mapStoreToProps,mapDispatchToProps)(EditScreen)