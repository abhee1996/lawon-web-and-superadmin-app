import React, {Component} from 'react'
import {Input} from '../../components/atoms/InputField'

class Help extends Component {
    state={
        id:0,
    };
      
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
       
    render(){
        return(
           
                <div class="help-section">
                    <div class="heading">
                        How we can help you today ?
                    </div>
                    <div class="row input-question">
                        <div class="col-md-8 col-md-offset-2">
                        <Input 
                            type={'text'}              
                            name= {'input-question'}                                                     placeholder = {'Title'}
                            handleChange={this.handleChangeInput}
                            id={'input-question'}
                            placeholder={"Type your question here...."}
                        />
                        </div>
                        
                    </div>
                    <div class="row ">
                      
                        <div class="col-md-4 ">
                            <div class="using-lawon">
                                <img src={require('../../assets/img/using.png')}/>
                                <div class="subheading">Using LawOn </div>
                                <div class="description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore .</div>
                            </div>
                        </div>
                        <div class="col-md-4 ">
                            <div class="using-lawon">
                                <img src={require('../../assets/img/using.png')}/>
                                <div class="subheading">Using LawOn </div>
                                <div class="description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore .</div>
                            </div>
                        </div>
                        <div class="col-md-4 ">
                            <div class="using-lawon">
                                <img src={require('../../assets/img/using.png')}/>
                                <div class="subheading">Using LawOn </div>
                                <div class="description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore .</div>
                            </div>
                        </div>
                    </div>
                    <div class="row bg">
                        <div class="col-md-12 no-padding">
                            <div class="heading">Getting Started with LawOn</div>
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
                        <div class="col-md-12 no-padding">
                            <div class="heading">Lawyers Management</div>
                             <div class="margin">
                                <div class="accordion-head">{this.state.id==5 ? <div class=" minus" onClick={this.toggleCollapse(5)}> <img  class="image-minus" src="/images/-.png"/> </div> : <div class="plus" onClick={this.toggleCollapse(5)}><img class="image-plus" src="/images/+.png"/></div>}
                                        Who will be providing me with legal advice?</div>
                                 {this.state.id==5 ? 
                                 <div class=" panel-accordion ">
                                    <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers 
                                        to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop 
                                        via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                                </div>:<div></div>}       
                            </div>
                            <div class="margin">
                                <div class="accordion-head">{this.state.id==6 ? <div class=" minus" onClick={this.toggleCollapse(6)}> <img  class="image-minus" src="/images/-.png"/> </div> : <div class="plus" onClick={this.toggleCollapse(6)}><img class="image-plus" src="/images/+.png"/></div>}
                                        Who will be providing me with legal advice?</div>
                                 {this.state.id==6 ? 
                                 <div class=" panel-accordion ">
                                    <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers 
                                        to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop 
                                        via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                                </div>:<div></div>}       
                            </div>
                    </div>                  
                        <div class="col-md-12 no-padding">
                            <div class="heading">About Plans</div>
                             <div class="margin">
                                <div class="accordion-head">{this.state.id==7 ? <div class=" minus" onClick={this.toggleCollapse(7)}> <img  class="image-minus" src="/images/-.png"/> </div> : <div class="plus" onClick={this.toggleCollapse(7)}><img class="image-plus" src="/images/+.png"/></div>}
                                        Who will be providing me with legal advice?</div>
                                 {this.state.id==7 ? 
                                 <div class=" panel-accordion ">
                                    <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers 
                                        to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop 
                                        via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                                </div>:<div></div>}       
                            </div>
                            <div class="margin">
                                <div class="accordion-head">{this.state.id==8 ? <div class=" minus" onClick={this.toggleCollapse(8)}> <img  class="image-minus" src="/images/-.png"/> </div> : <div class="plus" onClick={this.toggleCollapse(8)}><img class="image-plus" src="/images/+.png"/></div>}
                                        Who will be providing me with legal advice?</div>
                                 {this.state.id==8 ? 
                                 <div class=" panel-accordion ">
                                    <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers 
                                        to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop 
                                        via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                                </div>:<div></div>}       
                            </div>
                            <div class="margin">
                                <div class="accordion-head">{this.state.id==9 ? <div class=" minus" onClick={this.toggleCollapse(9)}> <img  class="image-minus" src="/images/-.png"/> </div> : <div class="plus" onClick={this.toggleCollapse(9)}><img class="image-plus" src="/images/+.png"/></div>}
                                        Who will be providing me with legal advice?</div>
                                 {this.state.id==9 ? 
                                 <div class=" panel-accordion ">
                                    <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers 
                                        to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop 
                                        via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                                </div>:<div></div>}       
                            </div>
                         </div>                  
                        <div class="col-md-12 no-padding">
                            <div class="heading">About Payments</div>
                             <div class="margin">
                                <div class="accordion-head">{this.state.id==10 ? <div class=" minus" onClick={this.toggleCollapse(10)}> <img  class="image-minus" src="/images/-.png"/> </div> : <div class="plus" onClick={this.toggleCollapse(10)}><img class="image-plus" src="/images/+.png"/></div>}
                                        Who will be providing me with legal advice?</div>
                                 {this.state.id==10 ? 
                                 <div class=" panel-accordion ">
                                    <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers 
                                        to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop 
                                        via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                                </div>:<div></div>}       
                            </div>
                            <div class="margin">
                                <div class="accordion-head">{this.state.id==11 ? <div class=" minus" onClick={this.toggleCollapse(11)}> <img  class="image-minus" src="/images/-.png"/> </div> : <div class="plus" onClick={this.toggleCollapse(11)}><img class="image-plus" src="/images/+.png"/></div>}
                                        Who will be providing me with legal advice?</div>
                                 {this.state.id==11 ? 
                                 <div class=" panel-accordion ">
                                    <p>LawOn is a legal advice service that helps you track down a good lawyer and provides useful answers 
                                        to burning legal questions. LawOn will be available on android, iOS mobile devices and on any desktop 
                                        via internet browser. LawOn is a free legal advice service. Submit your law question, receive answers,
                                         consult with local lawyers, and choose the best lawyer to represent you. Job done!</p>
                                </div>:<div></div>}       
                            </div>
                        </div>                  
                    </div>                
                    <div class="contact-us row">
                        <div class="heading">
                            Or you can contact us at:
                        </div>
                        <div class="text-p">
                            We are always here to help you!
                        </div>
                        <div class="padding-top-bottom">
                            <div class="col-md-offset-3 col-md-3">
                                <button class="btn btn-support">
                                    <span class="e-mail">
                                        <img src="./images/email-icon.png"/>
                                    </span>E-mail: support@lawon.co.uk
                                </button>
                            </div>
                            <div class="col-md-5">
                                <button class="btn btn-support">
                                    <span class="e-mail">
                                        <img src="./images/phone-icon.png"/>
                                    </span>Call Us: 0044 123 4667 890
                                </button>
                            </div>
                        </div>
                    </div>
                
                </div>
           
        )
    }
}

export default Help