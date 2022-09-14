import React, {Component} from 'react'
import SignUp from '../SignUp/SignUp.js';
import { Button, TYPES } from '../../components/atoms/YellowButton'
import { Input } from '../../components/atoms/InputField'
import {CollapsibleComponent, CollapsibleHead, CollapsibleContent} from 'react-collapsible-component'
import LiveChat from 'react-livechat'
import Footer from '../../components/molecules/footer';
import {TextArea} from '../../components/atoms/textarea'

import "./ContactUs.css"

class ContactUs extends Component{
    state={
        isExpanded:false,
        id:0,
        chat:false ,
 
    };
    componentDidMount() {
        window.scrollTo(0, 0)
      }
     
    toggleCollapse = (e)=> () =>{
       
        if(this.state.id==e){
            this.setState({id:0})
        }
        else{
          this.setState({
            id:e
          })
        }
        

    }
       
    
showChat = () => {
    
        if(this.state.chat==false){
       
                 this.setState({
                         chat:true,
                        
                     })
                    }
                    else{
                       this.setState({
                        chat:false
                       }) 
                    }
                    
                
               
    }


    render(){
        return (
            <div>

                <section class="contact-us ">
               
                    <div class="banner">
                        Contact Us
                    </div>
                    <div class="bg-image">
                        <div class="row no-margin facing-problem">
                            <div class="col-md-6 col-md-offset-3 ">
                                <div class="heading">Are you facing any problem?</div>
                                <p>If you need instant support then use live chat option to reach us quickly.
                                     Our support team will reply as soon as possibleafter you send us a mesage.</p>
                                <div class="start-chat">
                                    <button class="btn btn-chat" onClick={this.showChat}><span class="chat-icon"><img src="./images/chat-icon.png"/></span>Start Live Chat</button>

                                </div>
                            </div>
                            
                            

                        </div>
                        <div class="row no-margin">
                            <div class="col-md-8 col-md-offset-2 opacity-bg-image"> 
                                <div class="support-sec">
                                <div class="heading">Or you can contact us at:</div>
                                <p>We are always here to help you!</p>
                                <div class="col-md-offset-1 col-md-10 padding-top-bottom">
                                    <div class="col-md-offset-1 col-md-5">
                                        <button class="btn btn-support" ><span class="e-mail"><img src="./images/email-icon.png" /></span>E-mail: support@lawon.co.uk</button>
                                    </div>
                                    <div class="col-md-5">
                                        <button class="btn btn-support"><span class="e-mail"><img src="./images/phone-icon.png" /></span>Call Us: 0044 123 4667 890</button>
                                    </div>
                                </div>
                              
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className='form-contact'>
                    <div className='container'>
                    <div className='row'>
                    <div className='col-md-6 col-md-offset-3'>
                    <div class="heading margin-bottom text-center">
                         May be we have already the solution for you!
                         <br/>
                           Fill the below form to contact us
                        </div>
                        <div className='form-area'>
                        <form>
                        <div class="form-group pb-20">
                        <Input type={'text'}
                        name={'fullname'}
                        placeholder={'FULL NAME'}                       
                        id={''}
                        />                       
                        </div>
                        <div class="form-group pb-20">
                        <Input type={'text'}
                        name={'email'}
                        placeholder={'EMAIL'}                       
                        id={''}
                        />                       
                        </div>
                        <div class="form-group pb-20">
                        <select class="member-select form-control">
                          <option value="1">Subject</option>
                          <option value="5">5</option>
                          <option value="10">10</option>
                          
                         </select>                      
                        </div>
                        <div class="form-group pb-20">
                        <TextArea type={'text'}              
                        name= {'message'}        
                        placeholder = {'MESSAGE'}
                        />                     
                        </div>
                        <button style={{width:'100%'}} className='universalBtn'>SEND</button>



    
                        </form>
                        </div>
                    </div>
                    </div>
                    </div>

                    </div>
                    <div class="question-sec">
                        <div class="row no-margin" >
                        <div class="col-md-6 col-md-offset-3 heading margin-bottom">
                         May be we have already the solution for you!
                            Frequently asked questions
                        </div>
                        <div class="col-md-8 col-md-offset-2">
                             <div class="margin">
                                <div class="accordion-head">{this.state.id==1 ? <div class=" minus" onClick={this.toggleCollapse(1)}> <img  class="image-minus" src="/images/-.png"/> </div> : <div class="plus" onClick={this.toggleCollapse(1)}><img class="image-plus" src="/images/+.png"/></div>}
                                        Who will be providing me with legal advice?</div>
                                 {this.state.id==1 ? 
                                 <div class=" panel-accordion ">
                                    <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers 
                                        to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop 
                                        via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                                </div>:<div></div>}       
                            </div>
                            <div class="margin">
                                <div class="accordion-head">{this.state.id==2 ? <div class=" minus" onClick={this.toggleCollapse(2)}> <img  class="image-minus" src="/images/-.png"/> </div> : <div class="plus" onClick={this.toggleCollapse(2)}><img class="image-plus" src="/images/+.png"/></div>}
                                        Who will be providing me with legal advice?</div>
                                 {this.state.id==2 ? 
                                 <div class=" panel-accordion ">
                                    <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers 
                                        to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop 
                                        via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                                </div>:<div></div>}       
                            </div>
                            <div class="margin">
                                <div class="accordion-head">{this.state.id==3 ? <div class=" minus" onClick={this.toggleCollapse(3)}> <img  class="image-minus" src="/images/-.png"/> </div> : <div class="plus" onClick={this.toggleCollapse(3)}><img class="image-plus" src="/images/+.png"/></div>}
                                        Who will be providing me with legal advice?</div>
                                 {this.state.id==3 ? 
                                 <div class=" panel-accordion ">
                                    <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers 
                                        to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop 
                                        via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                                </div>:<div></div>}       
                            </div>
                            <div class="margin">
                                <div class="accordion-head">{this.state.id==4 ? <div class=" minus" onClick={this.toggleCollapse(4)}> <img  class="image-minus" src="/images/-.png"/> </div> : <div class="plus" onClick={this.toggleCollapse(4)}><img class="image-plus" src="/images/+.png"/></div>}
                                        Who will be providing me with legal advice?</div>
                                 {this.state.id==4 ? 
                                 <div class=" panel-accordion ">
                                    <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers 
                                        to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop 
                                        via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                                </div>:<div></div>}       
                            </div>
                        </div>                  
                        </div>
                    </div>
                    
                    <SignUp 
                        headTitle="Start Getting the Legal Help You Deserve" 
                        paragraphTitle="LawOn will simplify the whole process of accessing legal advice. Sign up to keep in the loop and be notified when it is available. The smart way to lawyer up is nearly here."
                        />
       
                        
                </section>
                { this.state.chat && <div><LiveChat  
                onChatLoaded={this.onChatLoaded}            
                license={10718557} /></div> }
                {console.log(this.state.chat)   }           
                <Footer/>
            </div>

        )
    }
}

export default ContactUs