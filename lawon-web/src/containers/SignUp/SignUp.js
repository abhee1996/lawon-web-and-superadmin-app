import React,{Component} from 'react' 
import './SignUp.css'
import { Link } from "react-router-dom";
class SignUp extends Component{
    render(){
        return(
            <div>
                <section class="smartleague realLegalHelp background" >
                   <div class="container">
                     <div class="row">
                          <div class="col-sm-12">
                               <h2>Sign up for launch</h2>
                               <p>Notify me when the LawOn app is ready to download</p>
                               <Link to="/main/usersocialreg">
                               <a class="universalBtn" href="javascript:void(0);" data-toggle="modal" data-target="#signUp">Sign Up</a>
                               </Link>
                              
                            </div>
                         </div>      
                     </div>
                  </section>
            </div>
        )
    }
}
export default SignUp