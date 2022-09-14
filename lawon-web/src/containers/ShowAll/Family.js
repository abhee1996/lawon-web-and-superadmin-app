import React,{Component} from 'react'
import './ShowAll.css'
import BlogBox from '../BlogBox/BlogBox';
import ViewMore from '../ViewMoreButton/ViewMore.js'

class Family extends Component {
    render(){
        return(
            <div>
                <section class="blogContent">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <BlogBox 
                                    CategoryName="Family" 
                                    Title="A Guide to parenting when going through a divorce" 
                                    author_Name="Ismaeel Waseem"
                                    URL="https://lawon.co.uk/guide-parenting-going-divorce/"
                                    Date="March 28, 2018"
                                    Image_URL="./images/Cryptocurrency-resize-1.jpg"/>
                        
                                <BlogBox 
                                    CategoryName="Family" 
                                    Title="A Guide to parenting when going through a divorce" 
                                    author_Name="Ismaeel Waseem"
                                    URL='"https://lawon.co.uk/guide-parenting-going-divorce/"'
                                    Date="March 28, 2018"
                                    Image_URL="./images/paul-garcia-217101-1.jpg"/>
                               
                            </div>
                        </div>
                    </div>
                    <ViewMore/>
                </section>
            </div>
        )
    }
}
export default Family 