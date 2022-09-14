import React, {Component} from 'react'
import './BlogHead.css'
import ShowAll from '../ShowAll/ShowAll'
import Family from '../ShowAll/Family'
import News from '../ShowAll/News'
import Property from '../ShowAll/Property'
import Wills from '../ShowAll/Wills'
import Injury from '../ShowAll/Injury'


class BlogHead extends Component{
    state={
        showAll:true,
        Family:false,
        News:false,
        Injury:false,
        Property:false,
        Wills:false,
        Name:"Blog",
    };
handleShowAll=()=>{
    this.setState({
        showAll:true,
        Family:false,
        News:false,
        Injury:false,
        Property:false,
        Wills:false,
        Name:"Blog"
        });
};
handleFamily=()=>{
    this.setState({
        showAll:false,
        Family:true,
        News:false,
        Injury:false,
        Property:false,
        Wills:false,
        Name:"Family"
    });
};
handleNews=()=>{
    this.setState({
        showAll:false,
        Family:false,
        News:true,
        Injury:false,
        Property:false,
        Wills:false,
        Name:"News",
    });
};
handleInjury=()=>{
    this.setState({
        showAll:false,
        Family:false,
        News:false,
        Injury:true,
        Property:false,
        Wills:false,
        Name:"Personal Injury"
    });
};
handleProperty=()=>{
    this.setState({
        showAll:false,
        Family:false,
        News:false,
        PersonalInjury:false,
        Property:true,
        Wills:false,
        Name:"Property",
    });
};
handleWills=()=>{
    this.setState({
        showAll:false,
        Family:false,
        News:false,
        PersonalInjury:false,
        Property:false,
        Wills:true,
        Name:"Wills, Probate & Inheritance"
    }); 
}
    render(){
        return (
            <div>

                <section class="blogHead">
                     <div class="container">
                        <div class="row">
                             <div class="col-sm-12">
                                    <img src="http://uwebsolutions.co.uk/dev/lawon/wp-content/uploads/2017/11/headerYellow.png" alt=""/>
                                    <h1 id="filterHead">{this.state.Name}</h1>
                                    <h2 class="blog-heading">Latest news and law advices from LawOn</h2>
                                < div class="nav nav-pills">
                                    <li class="active"><button class="selected" href="#showAll" data-toggle="tab" onClick={this.handleShowAll}>Show all</button></li>
                                    <li><button href="#family" data-toggle="tab" onClick={this.handleFamily} >Family</button></li>
                                    <li><button href="#news" data-toggle="tab" onClick={this.handleNews} >News</button></li>
                                    <li><button href="#personalInjury" data-toggle="tab" onClick={this.handleInjury} >Personal Injury</button></li>
                                    <li><button href="#property" data-toggle="tab" onClick={this.handleProperty} >Property</button></li>
                                    <li><button href="#wills" data-toggle="tab" onClick={this.handleWills}>Wills, Probate &amp; Inheritance</button></li>
                                </div>
                            </div>
                        </div>
                      </div>
                </section>
                
                {this.state.showAll ? <ShowAll/> : ''}
                {this.state.Family ? <Family/> : ''}
                {this.state.Wills ? <Wills/> : ''}
                {this.state.Injury ? <Injury/> : ''}
                {this.state.Property ? <Property/> : ''}
                {this.state.News? <News/> : ''}
            </div>
        )
    }
}

export default BlogHead